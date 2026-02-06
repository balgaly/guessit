# [GI-014] Leaderboard API Endpoint

**Priority:** high
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create an API endpoint that returns the leaderboard for a group, showing all members ranked by their total points.

## Acceptance Criteria
- [ ] GET `/api/groups/[groupId]/leaderboard` — Fetch leaderboard
- [ ] Return list of users with: user ID, display name, avatar, total points, rank
- [ ] Sort by total points (descending), then by name (ascending) for ties
- [ ] Include the current user's rank even if they're not in the top 10
- [ ] RLS enforced: only group members can view the leaderboard
- [ ] Handle empty state (no scores yet)

## Related Files
- `src/app/api/groups/[groupId]/leaderboard/route.ts` — Leaderboard endpoint
- `src/types/leaderboard.ts` — TypeScript types

## Technical Notes
- Query:
  ```sql
  SELECT
    p.user_id,
    u.display_name,
    u.avatar_url,
    SUM(s.points) AS total_points,
    RANK() OVER (ORDER BY SUM(s.points) DESC) AS rank
  FROM predictions p
  JOIN scores s ON s.prediction_id = p.id
  JOIN profiles u ON u.id = p.user_id
  WHERE p.group_id = ?
  GROUP BY p.user_id, u.display_name, u.avatar_url
  ORDER BY total_points DESC, u.display_name ASC
  ```
- Consider caching with `Cache-Control: max-age=60` (leaderboard changes slowly)
- Pagination optional for MVP (most groups will have < 100 members)

## Dependencies
- Blocked by: GI-013 (scores must be calculated)
- Blocks: GI-015 (leaderboard UI)
