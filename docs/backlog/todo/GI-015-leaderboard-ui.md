# [GI-015] Leaderboard UI Page

**Priority:** high
**Assigned Agent:** frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Build a leaderboard page that displays group members ranked by points. This is one of the core features users will check frequently.

## Acceptance Criteria
- [ ] Leaderboard page: `src/app/(dashboard)/groups/[groupId]/leaderboard/page.tsx`
- [ ] Fetch leaderboard from `/api/groups/[groupId]/leaderboard` (GI-014)
- [ ] Display ranked list: rank, avatar, display name, total points
- [ ] Highlight the current user's row (e.g., with a different background color)
- [ ] Show medals or icons for top 3 (🥇🥈🥉)
- [ ] Responsive design, RTL support
- [ ] Empty state: "No scores yet. Start predicting!"

## Related Files
- `src/app/(dashboard)/groups/[groupId]/leaderboard/page.tsx` — Leaderboard page
- `src/components/features/leaderboard/leaderboard-table.tsx` — Table component
- `src/app/api/groups/[groupId]/leaderboard/route.ts` — API (GI-014)

## Technical Notes
- Use shadcn/ui Table or Card components
- Format points with commas (e.g., 1,234 pts)
- Show user avatars (use Next.js Image for optimization)
- Consider adding filters: "This Week", "All Time" (future enhancement)
- Auto-refresh every 60 seconds (optional for MVP)

## Dependencies
- Blocked by: GI-014 (API endpoint)
