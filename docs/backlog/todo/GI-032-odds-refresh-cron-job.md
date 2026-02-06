# [GI-032] Odds Cache Refresh Cron Job (Phase 2)

**Priority:** medium
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create cron job to refresh betting odds every 6 hours from the-odds-api.com.

## Acceptance Criteria
- [ ] Cron endpoint: `/api/admin/refresh-odds`
- [ ] Fetch odds from the-odds-api.com for upcoming matches
- [ ] Update `odds_cache` table with new odds
- [ ] Run every 6 hours (Vercel Cron configuration)
- [ ] Handle API rate limits (500 requests/month on free tier)
- [ ] Log refresh results (success, failures, API usage)
- [ ] Alert on failures (email or Slack notification)
- [ ] Protected endpoint (requires admin auth or API key)

## Related Files
- `src/app/api/admin/refresh-odds/route.ts` — Cron endpoint
- `vercel.json` — Cron configuration
- `src/lib/odds/api.ts` — Odds API client

## Technical Notes
- Vercel Cron syntax: `{ "path": "/api/admin/refresh-odds", "schedule": "0 */6 * * *" }`
- Track API usage to avoid exceeding free tier limits
- Consider upgrading to paid tier for production
- Implement exponential backoff for API failures
- Cache odds with TTL (time to live)

## Dependencies
- Blocked by: GI-031 (odds-based scoring)
