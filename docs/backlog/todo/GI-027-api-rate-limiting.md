# [GI-027] API Route Rate Limiting

**Priority:** high
**Assigned Agent:** security-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Implement rate limiting on API routes to prevent abuse, brute-force attacks, and excessive usage.

## Acceptance Criteria
- [ ] Rate limiting middleware created
- [ ] Applied to auth endpoints (prevent login spam)
- [ ] Applied to prediction submission (prevent spam predictions)
- [ ] Applied to group joining (prevent brute-force code guessing)
- [ ] Configurable limits per endpoint
- [ ] Proper error messages (429 Too Many Requests)
- [ ] IP-based tracking (with proper headers for proxies)
- [ ] Bypass for authenticated admin users (optional)

## Related Files
- `src/lib/middleware/rate-limit.ts` — Middleware to create
- `src/app/api/*/route.ts` — Apply to all API routes

## Technical Notes
- Use `@upstash/ratelimit` with Redis or Vercel KV
- Suggested limits:
  - Auth: 5 requests per 15 minutes per IP
  - Predictions: 10 requests per minute per user
  - Group joining: 5 requests per 15 minutes per IP
- Use exponential backoff for repeat offenders
- Log rate limit violations for monitoring

## Dependencies
- Blocked by: GI-003, GI-004, GI-005, GI-010 (API routes must exist)
- Blocks: GI-026 (security audit)
