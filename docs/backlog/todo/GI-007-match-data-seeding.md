# [GI-007] Match Data Seeding (World Cup 2026 Placeholder)

**Priority:** medium
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Seed the database with placeholder match data for the 2026 World Cup. This allows development and testing of predictions and scoring features before real data is available.

## Acceptance Criteria
- [ ] Create a seeding script: `scripts/seed-matches.ts`
- [ ] Seed the `tournaments` table with World Cup 2026
- [ ] Seed the `matches` table with at least 20 placeholder matches
- [ ] Match data includes: home team, away team, kickoff time, venue
- [ ] Kickoff times are realistic (distributed over tournament dates)
- [ ] Some matches in the past (for testing scoring), some in the future (for predictions)
- [ ] Script is idempotent (can run multiple times without duplicating data)
- [ ] Documentation: how to run the script (`pnpm seed` or `ts-node scripts/seed-matches.ts`)

## Related Files
- `scripts/seed-matches.ts` — Seeding script
- `supabase/migrations/` — May need to add seed data to a migration
- `package.json` — Add `seed` script

## Technical Notes
- Use real team names (e.g., Brazil, Germany, Argentina) for realism
- Use placeholder kickoff times (e.g., every 3 days starting from a fixed date)
- Mark some matches as "completed" with final scores for testing the scoring engine
- Consider adding logos/flags as URLs (optional for MVP)
- Seed data should be realistic enough for demos and screenshots

## Dependencies
- Blocked by: GI-001 (schema must exist)
- Blocks: GI-008 (match listing needs data)
