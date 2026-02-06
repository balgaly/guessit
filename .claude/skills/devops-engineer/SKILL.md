---
name: devops-engineer
description: CI/CD pipelines, Vercel deployment, Supabase management, monitoring, environment setup, and infrastructure automation. Use when deploying, setting up environments, or configuring CI/CD.
context: fork
agent: devops-engineer
---

## Environment Setup
Three environments: development (local), staging (Vercel preview), production (Vercel production)

### Local Development
```bash
# Prerequisites: Node.js 20+, pnpm
pnpm install
cp .env.example .env.local
# Fill in Supabase URL, keys, and Odds API key
pnpm dev
```

### Supabase Setup
```bash
# Install Supabase CLI
npx supabase init
npx supabase start        # Local Supabase instance
npx supabase db push       # Apply migrations
npx supabase gen types typescript --local > src/types/database.ts
```

## Deployment Procedure

### To Staging (automatic on PR merge to main)
1. GitHub Actions runs: lint → typecheck → test → build
2. If all pass, Vercel deploys automatically
3. Run E2E tests against staging URL
4. Verify Supabase migrations applied

### To Production (manual via release tag)
```bash
git tag -a v1.0.0 -m "Release 1.0.0: MVP launch"
git push origin v1.0.0
# GitHub Actions triggers production deployment
# Post-deploy: run smoke tests, check Sentry for errors
```

## Database Migration Procedure
```bash
# Create migration
npx supabase migration new add_groups_table
# Edit the migration file in supabase/migrations/
# Test locally
npx supabase db reset
# Push to staging
npx supabase db push --linked
# After verification, push to production
```

## Monitoring Setup
- **Sentry:** Error tracking with source maps — `SENTRY_DSN` env var
- **Vercel Analytics:** Web Vitals automatically tracked
- **Supabase Dashboard:** Database size, active connections, auth events
- **Custom:** `/api/health` endpoint returning DB connection status and app version
- **Uptime:** Free UptimeRobot check on `/api/health` every 5 minutes

## Incident Response
1. Check Sentry for error spike details
2. Check Vercel deployment logs for recent deploys
3. Check Supabase dashboard for database issues
4. If critical: roll back to previous Vercel deployment via dashboard
5. Post-incident: write brief incident report in `docs/incidents/`
