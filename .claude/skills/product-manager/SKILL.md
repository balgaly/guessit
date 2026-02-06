---
name: product-manager
description: Feature specification, user stories, acceptance criteria, sprint planning, and roadmap management. Use when planning features, writing specs, or organizing work.
context: fork
agent: product-manager
---

## Feature Spec Process
1. Start with the user problem (never start with the solution)
2. Write user stories in "As a / I want / So that" format
3. Define acceptance criteria in "Given / When / Then" format
4. List explicit out-of-scope items to prevent scope creep
5. Identify dependencies on other features or infrastructure
6. Estimate effort as T-shirt size (XS: < 2hrs, S: 2-4hrs, M: 4-8hrs, L: 1-2 days, XL: 3-5 days)

## Sprint Template
```markdown
## Sprint {number}: {theme}
**Goal:** One sentence describing what success looks like
**Duration:** 1 week

### Tasks
| # | Task | Size | Agent | Status |
|---|------|------|-------|--------|
| 1 | ... | S | frontend-lead | ⬜ |
| 2 | ... | M | backend-lead | ⬜ |

### Definition of Done
- [ ] All acceptance criteria pass
- [ ] Tests written and passing
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Code reviewed by subagent
```

## Roadmap
**Phase 1 — MVP (Weeks 1-3)**
Auth → Groups (CRUD) → Match listing → Predictions → Fixed scoring → Basic leaderboard

**Phase 2 — Differentiators (Weeks 4-5)**
Odds API integration → Odds-based scoring → Public groups → Virtual pot calculator

**Phase 3 — Polish & Launch (Weeks 6-7)**
Dashboard → Social sharing → Push notifications → Hebrew i18n → Performance optimization

**Phase 4 — Growth (Post-Launch)**
Multi-tournament → Default groups → Analytics → Monetization experiments
