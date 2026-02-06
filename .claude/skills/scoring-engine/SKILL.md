---
name: scoring-engine
description: Prediction scoring calculation, leaderboard generation, and score reconciliation. Use when implementing or debugging the scoring system.
---

## Scoring Modes

### Mode 1: Fixed Scoring
Each group configures point values:
- `points_exact_score` (default: 5) — Predicted exact final score
- `points_correct_winner` (default: 3) — Predicted correct outcome (home win / draw / away win)
- `points_correct_goal_diff` (optional, default: 0) — Correct goal difference but wrong score

### Mode 2: Odds-Based Scoring
Points are derived from betting odds to reward risky predictions:
- Base points = round(decimal_odds × 10)
- If exact score: base points × `exact_multiplier` (default: 1.5, configurable per group)
- Fallback: if odds not available for a match, use fixed scoring as default

### Outcome Determination
```typescript
type Outcome = 'home' | 'draw' | 'away'

function getOutcome(homeScore: number, awayScore: number): Outcome {
  if (homeScore > awayScore) return 'home'
  if (homeScore < awayScore) return 'away'
  return 'draw'
}
```

## Score Calculation Trigger
Scores are calculated AFTER a match result is confirmed:
1. Admin cron job (`/api/admin/calculate-scores`) runs after each match
2. For each match with a confirmed result:
   a. Fetch all predictions across all groups
   b. For each prediction, calculate points based on the group's scoring mode
   c. Upsert into `scores` table
   d. Trigger leaderboard recalculation
3. Leaderboard = SUM(scores) per user per group, ordered descending

## Leaderboard Calculation
```sql
-- Efficient leaderboard query using window functions
SELECT
  user_id,
  profiles.display_name,
  profiles.avatar_url,
  SUM(s.points) as total_points,
  COUNT(CASE WHEN s.points > 0 THEN 1 END) as correct_predictions,
  COUNT(s.id) as total_predictions,
  RANK() OVER (ORDER BY SUM(s.points) DESC) as rank
FROM scores s
JOIN predictions p ON s.prediction_id = p.id
JOIN profiles ON profiles.id = s.user_id
WHERE p.group_id = $1
GROUP BY user_id, profiles.display_name, profiles.avatar_url
ORDER BY total_points DESC;
```

## Edge Cases to Handle
- Match postponed: no score calculation, predictions remain open
- Match cancelled: 0 points for everyone, clearly mark as "cancelled"
- Result updated after initial scoring: recalculate all affected scores
- User has no prediction for a match: 0 points (not null — explicitly 0)
- Two users have same total points: same rank, next rank skips (1, 2, 2, 4)
- Odds are exactly 1.00 (never happens, but handle): 10 points
- Draw predicted, draw occurs, but different scores: correct winner points only
