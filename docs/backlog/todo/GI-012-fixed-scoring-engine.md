# [GI-012] Fixed Scoring Engine Implementation

**Priority:** critical
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Implement the fixed scoring algorithm: award points for correct winner predictions and exact score predictions. This is the core business logic for the MVP.

## Acceptance Criteria
- [ ] Scoring function: `src/lib/scoring/fixed.ts`
- [ ] Input: prediction (home_score, away_score), actual result (home_score, away_score), group scoring config
- [ ] Output: points awarded
- [ ] Logic:
  - Correct winner: `group.points_correct_winner` points (default 3)
  - Exact score: `group.points_exact_score` points (default 5)
  - Exact score implies correct winner (don't double-count)
- [ ] Handle ties correctly (both teams score the same)
- [ ] Return 0 points if prediction is wrong
- [ ] Write unit tests for all edge cases

## Related Files
- `src/lib/scoring/fixed.ts` — Scoring logic
- `src/lib/scoring/fixed.test.ts` — Unit tests
- `src/types/scoring.ts` — TypeScript types

## Technical Notes
- Scoring scenarios:
  1. Exact score match → points_exact_score (e.g., 5)
  2. Correct winner but wrong score → points_correct_winner (e.g., 3)
  3. Wrong winner or wrong tie → 0 points
- Edge case: user predicts 2-2, result is 2-2 → exact score
- Edge case: user predicts 3-1, result is 2-1 → correct winner
- Edge case: user predicts 1-1 (tie), result is 2-2 (tie) → correct outcome? (define behavior)

## Dependencies
- Blocked by: GI-001 (schema)
- Blocks: GI-013 (score calculation API)
