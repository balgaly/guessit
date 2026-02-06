# [GI-026] Pre-Deployment Security Audit

**Priority:** critical
**Assigned Agent:** security-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Comprehensive security audit before MVP launch. This is a blocking requirement for production deployment.

## Acceptance Criteria
- [ ] All RLS policies audited (verify no data leakage)
- [ ] All API routes checked for input validation (Zod schemas)
- [ ] No secrets in client-side code verified
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified (user-generated content sanitized)
- [ ] Rate limiting implemented where needed (GI-027)
- [ ] CORS configuration reviewed
- [ ] Security checklist from CLAUDE.md completed
- [ ] Findings documented by severity (CRITICAL, HIGH, MEDIUM, LOW)
- [ ] All CRITICAL and HIGH findings resolved

## Related Files
- All files in `src/app/api/` — API routes
- `supabase/migrations/` — RLS policies
- `docs/security-audit-report.md` — Create this report

## Technical Notes
- Use automated tools: npm audit, Snyk, OWASP ZAP
- Manual code review of auth flows
- Test RLS with multiple users
- Verify environment variables are never exposed client-side
- Check for common OWASP Top 10 vulnerabilities

## Dependencies
- Blocked by: All API and database tickets (GI-001 through GI-015)
- Blocks: GI-029 (staging deployment), GI-030 (production deployment)
