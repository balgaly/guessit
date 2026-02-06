# [GI-029] Staging Deployment and Verification

**Priority:** high
**Assigned Agent:** devops-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Deploy to staging (Vercel preview environment) and run comprehensive verification tests with real users.

## Acceptance Criteria
- [ ] Deploy to Vercel preview/staging environment
- [ ] Verify Google Sign-In works in staging
- [ ] Verify group creation and joining
- [ ] Verify prediction submission
- [ ] Verify leaderboard displays correctly
- [ ] Multi-user testing with incognito windows
- [ ] Performance testing (Lighthouse scores: >90 performance, >90 accessibility)
- [ ] Mobile responsiveness check (iOS Safari, Android Chrome)
- [ ] Deployment checklist completed

## Related Files
- `docs/deployment-checklist.md` — Create this checklist

## Technical Notes
- Use two browsers/incognito windows for multi-user testing
- Test on multiple devices (desktop, mobile)
- Check console for errors
- Verify all environment variables are set correctly
- Test with real data (create 2-3 groups, submit predictions)
- Monitor Vercel logs for errors

## Deployment Checklist:
- [ ] All tests passing in CI
- [ ] Environment variables set in Vercel
- [ ] Database migrations run
- [ ] OAuth callback URLs updated
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Forms submit correctly
- [ ] Real-time updates work
- [ ] Mobile responsive

## Dependencies
- Blocked by: GI-028 (Vercel configuration), GI-026 (security audit)
