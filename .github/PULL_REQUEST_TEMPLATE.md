## Description

<!-- Brief summary of what this PR does -->

Closes #<!-- Issue number -->

## Changes Made

<!-- Detailed list of changes -->
-
-
-

## Testing

<!-- How was this tested? -->

**Test coverage:**
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] Edge cases considered
- [ ] Error handling tested

**Test commands run:**
```bash
pnpm typecheck
pnpm lint
pnpm test
```

## Screenshots (if applicable)

<!-- Add screenshots for UI changes -->

## Code Quality Checklist

Before requesting review, ensure:

- [ ] Code follows project conventions (see [CLAUDE.md](../CLAUDE.md))
- [ ] No `any` types in TypeScript (strict mode enforced)
- [ ] All API routes validate input with Zod schemas
- [ ] Database queries use RLS policies (never bypass RLS)
- [ ] No secrets or API keys in client-side code
- [ ] Commits follow conventional commit format (`feat:`, `fix:`, `chore:`)
- [ ] PR description references the issue (e.g., "Closes #42")
- [ ] All tests pass locally
- [ ] No console.log statements left in code
- [ ] Error boundaries added for React components (if applicable)
- [ ] Accessibility considered (WCAG 2.1 AA compliance)

## Security Checklist

- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities in user-generated content
- [ ] No exposed secrets or credentials
- [ ] Input validation on all user inputs
- [ ] Rate limiting considered for API routes
- [ ] CORS configured correctly

## Documentation

- [ ] Code comments added where logic isn't self-evident
- [ ] README updated (if needed)
- [ ] API documentation updated (if adding/changing endpoints)
- [ ] Type definitions exported (if creating reusable utilities)

## Ticket Reference

**Ticket ID:** <!-- e.g., GI-042 or #42 -->
**PR Title Format:** `<type>: <description> [#42]`

**Examples:**
- `feat: add group invite links [#42]`
- `fix: prevent predictions after kickoff [#38]`
- `chore: update dependencies [#55]`
- `docs: improve setup guide [#60]`

---

**Automated checks:**
- ✅ All CI checks must pass (lint, typecheck, test, security-scan)
- ✅ Agent code review (security-engineer, qa-engineer)
- ✅ Human review required (maintainer approval)

**Note:** Only @balgaly can merge PRs. Please be patient while awaiting review.
