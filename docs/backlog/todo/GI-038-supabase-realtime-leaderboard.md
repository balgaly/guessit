# [GI-038] Supabase Realtime Setup for Leaderboard

**Priority:** medium
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Configure Supabase Realtime subscriptions for live leaderboard updates without page refresh.

## Acceptance Criteria
- [ ] Realtime subscription on `scores` table
- [ ] Live leaderboard updates when scores change
- [ ] Optimistic UI updates (show prediction immediately, then sync)
- [ ] Connection management (handle reconnects)
- [ ] Error handling for connection drops
- [ ] Visual indicator when data is updating
- [ ] Throttle updates to avoid overwhelming UI

## Related Files
- `src/app/(dashboard)/groups/[groupId]/leaderboard/page.tsx` — Leaderboard page (GI-015)
- `src/hooks/useRealtimeLeaderboard.ts` — Custom hook for realtime data

## Technical Notes
- Use Supabase Realtime: `supabase.channel().on('postgres_changes', ...)`
- Subscribe to INSERT and UPDATE on `scores` table filtered by group_id
- Consider using React Query or SWR for caching and optimistic updates
- Show "Updating..." indicator when new data arrives
- Throttle updates to max 1 per second to avoid jank

## Dependencies
- Blocked by: GI-015 (leaderboard must exist)
