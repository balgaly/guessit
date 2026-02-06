# [GI-016] CI/CD Pipeline Setup (GitHub Actions)

**Priority:** high
**Assigned Agent:** devops-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Set up automated CI/CD pipeline using GitHub Actions to run tests, linting, type-checking, and deploy to Vercel on every push.

## Acceptance Criteria
- [ ] GitHub Actions workflow: `.github/workflows/ci.yml`
- [ ] Run on every PR and push to main
- [ ] Jobs: lint (ESLint), typecheck (tsc), test (Vitest)
- [ ] Fail the build if any job fails
- [ ] Vercel integration: auto-deploy preview on PR, production on merge to main
- [ ] Status checks required before merging (configure branch protection)
- [ ] Add badges to README.md (build status, test coverage)

## Related Files
- `.github/workflows/ci.yml` — CI pipeline
- `package.json` — Scripts for lint, typecheck, test
- `README.md` — Add badges

## Technical Notes
- Use Vercel GitHub integration for automatic deployments
- Cache `node_modules` in GitHub Actions to speed up builds
- Consider running E2E tests with Playwright (optional for MVP)
- Set up Supabase CLI in CI for running migrations in preview environments

## Dependencies
- None (can be done in parallel with other tasks)
