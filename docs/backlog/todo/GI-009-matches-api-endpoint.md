# [GI-009] Matches API Endpoint

**Priority:** high
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create an API endpoint to fetch upcoming matches for a tournament. This powers the match listing page.

## Acceptance Criteria
- [ ] GET `/api/matches` — Fetch all matches (with optional filters)
- [ ] Query params: `tournament_id`, `status` (upcoming/completed/all), `limit`, `offset`
- [ ] Return matches sorted by kickoff time (ascending)
- [ ] Include team details (names, logos if available)
- [ ] Include venue and kickoff time
- [ ] For completed matches, include final score
- [ ] Proper error handling and HTTP status codes

## Related Files
- `src/app/api/matches/route.ts` — API endpoint
- `src/types/match.ts` — TypeScript types

## Technical Notes
- Default to showing only upcoming matches unless `status=all` is specified
- Consider caching with `Cache-Control` headers (matches don't change frequently)
- Use Supabase query with `.order('kickoff_time', { ascending: true })`
- RLS policy: matches are public (anyone can read)

## Dependencies
- Blocked by: GI-001 (schema), GI-007 (seeded data)
- Blocks: GI-008 (UI needs this endpoint)
