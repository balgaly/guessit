# [GI-020] Create Supabase Client Utilities

**Priority:** critical
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create server and browser Supabase client utilities for database access with proper authentication handling.

## Acceptance Criteria
- [ ] `src/lib/supabase/server.ts` — Server-side client with cookie-based auth
- [ ] `src/lib/supabase/client.ts` — Browser client for client components
- [ ] Proper TypeScript types exported
- [ ] Documentation on when to use each client (comments in files)
- [ ] Environment variables properly configured

## Related Files
- `src/lib/supabase/server.ts` — Server client
- `src/lib/supabase/client.ts` — Browser client
- `.env.example` — Environment variable template

## Technical Notes
- Server client: Use `@supabase/ssr` for cookie-based auth
- Browser client: Use `@supabase/supabase-js` for client-side operations
- Never use service role key client-side
- Server client should be used in Server Components and API routes
- Browser client should be used in Client Components only

## Dependencies
- Blocked by: GI-019 (project must exist first)
- Blocks: GI-001, GI-003, and all backend/frontend tickets
