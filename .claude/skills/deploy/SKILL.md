---
name: deploy
description: Deploy the app to staging or production. Use when asked to deploy, ship, release, or go live.
context: fork
agent: devops-engineer
---

## Pre-Deployment Checklist

### Before ANY deployment:
1. All tests pass: `pnpm test`
2. TypeScript compiles: `pnpm typecheck`
3. Lint clean: `pnpm lint`
4. Build succeeds: `pnpm build`
5. No console.log statements in production code (search and remove)
6. Environment variables are set for the target environment

### Before PRODUCTION deployment (additional):
7. Security review completed by security-engineer agent
8. Database migrations tested on staging first
9. Odds API key quota is sufficient
10. Monitoring configured (Sentry DSN set, Vercel Analytics enabled)
11. Health check endpoint responds correctly
12. CHANGELOG.md updated with release notes

## Staging Deployment
```bash
# Automatic: merging to main deploys to staging via Vercel
git checkout main
git merge feature/branch-name
git push origin main
# Vercel builds and deploys automatically
# Verify at: https://staging.guessit.app (or Vercel preview URL)
```

## Production Deployment
```bash
# 1. Ensure staging is verified and stable
# 2. Create release tag
git tag -a v{X.Y.Z} -m "Release {X.Y.Z}: {description}"
git push origin v{X.Y.Z}
# 3. GitHub Actions builds, tests, and deploys to production
# 4. Post-deploy verification:
curl https://guessit.app/api/health
# 5. Monitor Sentry for 15 minutes for error spikes
# 6. Announce in team channel
```

## Rollback Procedure
If something goes wrong after production deployment:
1. Go to Vercel Dashboard → Deployments
2. Find the previous stable deployment
3. Click "Promote to Production"
4. This instantly rolls back without requiring a code revert
5. If database migration caused the issue: run the down migration FIRST, then rollback

## Post-Deploy Monitoring (15-minute watch)
- Check Sentry for new errors
- Hit /api/health to verify database connectivity
- Submit a test prediction on production
- Check Supabase dashboard for unusual connection spikes
- Verify odds refresh cron is still running
