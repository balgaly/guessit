# [GI-017] Environment Configuration Setup

**Priority:** medium
**Assigned Agent:** devops-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Document and configure all environment variables needed for local development, staging, and production environments.

## Acceptance Criteria
- [ ] Create `.env.example` with all required environment variables
- [ ] Document where to get each key (comments in .env.example)
- [ ] Configure environment variables in Vercel dashboard (production and preview)
- [ ] Configure Supabase environment variables (local, staging, production)
- [ ] Add validation script to check required env vars on startup
- [ ] Update CONTRIBUTING.md with env var setup instructions

## Related Files
- `.env.example` — Template for all environments
- `src/lib/env.ts` — Environment variable validation
- `CONTRIBUTING.md` — Setup instructions

## Technical Notes
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `THE_ODDS_API_KEY`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

Use `@t3-oss/env-nextjs` or Zod for validation.

## Dependencies
- None (can be done early)
