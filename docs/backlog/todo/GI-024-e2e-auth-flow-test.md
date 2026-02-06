# [GI-024] E2E Test for Auth Flow

**Priority:** high
**Assigned Agent:** qa-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Write end-to-end test for Google OAuth authentication flow using Playwright.

## Acceptance Criteria
- [ ] Test complete OAuth flow (click Google button → redirect → callback → dashboard)
- [ ] Test profile creation on first login
- [ ] Test session persistence (refresh page, still logged in)
- [ ] Test logout functionality
- [ ] Test protected route redirects (unauthenticated user → login page)
- [ ] Use Playwright for E2E testing

## Related Files
- `src/app/(auth)/login/page.tsx` — Login page (GI-003)
- `tests/e2e/auth.spec.ts` — Test file to create

## Technical Notes
- Use Playwright's authentication handling
- Mock Google OAuth for testing (don't require real Google credentials in CI)
- Test with multiple browsers (Chromium, Firefox, WebKit)
- Use Page Object pattern for maintainability

## Dependencies
- Blocked by: GI-003 (auth must be implemented)
