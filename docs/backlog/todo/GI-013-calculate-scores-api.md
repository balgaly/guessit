# [GI-013] Calculate Scores API (Cron Job)

**Priority:** high
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create an API endpoint (or Supabase Edge Function) that recalculates scores for all predictions after a match ends. This should run automatically via cron.

## Acceptance Criteria
- [ ] POST `/api/admin/calculate-scores` — Recalculate scores for completed matches
- [ ] Query all completed matches that don't have scores calculated yet
- [ ] For each match, fetch all predictions
- [ ] Calculate points using the fixed scoring engine (GI-012)
- [ ] Insert/update rows in the `scores` table
- [ ] Mark match as "scored" to avoid recalculating
- [ ] Endpoint is protected (requires admin auth or API key)
- [ ] Can be triggered manually or via Vercel Cron (schedule: every hour)

## Related Files
- `src/app/api/admin/calculate-scores/route.ts` — Score calculation endpoint
- `vercel.json` — Cron job configuration
- `src/lib/scoring/fixed.ts` — Scoring engine (GI-012)

## Technical Notes
- Use Supabase service role key for admin operations (bypass RLS)
- Query: `SELECT * FROM matches WHERE status = 'completed' AND scored = false`
- Batch process matches (avoid timeout on large datasets)
- Log scoring results for debugging
- Consider idempotency: if scores already exist, skip or recalculate?

## Dependencies
- Blocked by: GI-012 (scoring engine)
- Blocks: GI-014 (leaderboard needs scores)
