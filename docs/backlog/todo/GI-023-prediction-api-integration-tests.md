# [GI-023] Integration Tests for Prediction API

**Priority:** high
**Assigned Agent:** qa-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Write integration tests for the prediction submission API route to ensure all business logic and validation works correctly.

## Acceptance Criteria
- [ ] Test successful prediction submission
- [ ] Test prediction updates (upsert behavior)
- [ ] Test kickoff time locking (403 Forbidden after kickoff)
- [ ] Test validation errors (invalid scores, missing fields)
- [ ] Test RLS enforcement (can only predict in own groups)
- [ ] Test authorization (unauthenticated requests rejected)
- [ ] Mock Supabase client
- [ ] Tests run in CI

## Related Files
- `src/app/api/predictions/route.ts` — API endpoint (GI-010)
- `src/app/api/predictions/route.test.ts` — Test file to create

## Technical Notes
- Use Vitest or Jest with Supertest
- Mock Supabase responses
- Test happy path and error paths
- Test edge cases: exactly at kickoff time, 1 second before, 1 second after

## Dependencies
- Blocked by: GI-010 (API endpoint must exist)
