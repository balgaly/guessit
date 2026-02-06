# [GI-018] Health Check Endpoint

**Priority:** low
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create a simple health check endpoint for monitoring and uptime services to verify the API is responsive.

## Acceptance Criteria
- [ ] GET `/api/health` — Returns 200 OK with JSON payload
- [ ] Response includes: status, timestamp, version
- [ ] Example: `{ "status": "ok", "timestamp": "2026-02-06T12:34:56Z", "version": "1.0.0" }`
- [ ] No authentication required (public endpoint)
- [ ] Can be used by Vercel, UptimeRobot, or other monitoring services

## Related Files
- `src/app/api/health/route.ts` — Health check endpoint

## Technical Notes
- Keep it simple: no database queries (to avoid false negatives if DB is slow)
- Consider adding optional `?full=true` query param to check DB connection
- Include version from `package.json`

## Dependencies
- None (can be done anytime)
