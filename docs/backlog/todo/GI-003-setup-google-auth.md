# [GI-003] Setup Google Sign-In Authentication

**Priority:** critical
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Configure Google OAuth authentication via Supabase Auth. Users should be able to sign in with their Google account and have a profile automatically created.

## Acceptance Criteria
- [ ] Google OAuth provider configured in Supabase dashboard
- [ ] Redirect URLs configured (localhost for dev, Vercel URL for production)
- [ ] Auth callback route created: `src/app/api/auth/callback/route.ts`
- [ ] Login page created: `src/app/(auth)/login/page.tsx`
- [ ] Profile creation trigger: on first sign-in, create a row in `profiles` table
- [ ] Users redirected to dashboard after successful login
- [ ] Session management works (users stay logged in across page reloads)
- [ ] Logout functionality implemented

## Related Files
- `src/app/(auth)/login/page.tsx` — Login page
- `src/app/api/auth/callback/route.ts` — OAuth callback handler
- `src/lib/supabase/server.ts` — Server-side Supabase client
- `src/middleware.ts` — Auth middleware to protect routes
- `.env.example` — Document required env vars

## Technical Notes
- Use Supabase Auth UI library or build a custom Google sign-in button
- Store display name and avatar URL from Google profile in `profiles` table
- Consider adding a database trigger to auto-create profile on auth.users insert
- Handle edge cases: user cancels OAuth flow, email already exists, etc.

## Dependencies
- Blocked by: GI-001 (needs `profiles` table)
