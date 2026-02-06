---
name: qa-engineer
description: Test strategy, test writing patterns, edge case identification, and coverage analysis. Use when writing tests, planning test strategy, or investigating bugs.
context: fork
agent: qa-engineer
---

## Test File Locations
```
src/
├── lib/__tests__/               # Unit tests for business logic
│   ├── scoring.test.ts          # Scoring engine tests (CRITICAL)
│   ├── odds.test.ts             # Odds normalization tests
│   └── validation.test.ts       # Input validation tests
├── components/__tests__/        # Component tests
│   ├── prediction-form.test.tsx
│   └── leaderboard.test.tsx
└── e2e/                         # End-to-end Playwright tests
    ├── auth.spec.ts             # Sign-in/sign-out flows
    ├── groups.spec.ts           # Create/join/leave groups
    ├── predictions.spec.ts      # Submit/update predictions
    └── leaderboard.spec.ts      # Leaderboard display and updates
```

## Unit Test Pattern (Vitest)
```typescript
import { describe, it, expect } from 'vitest'
import { calculateFixedScore } from '@/lib/scoring'

describe('calculateFixedScore', () => {
  const defaultConfig = { pointsExactScore: 5, pointsCorrectWinner: 3 }

  it('awards exact score points when prediction matches result exactly', () => {
    const prediction = { homeScore: 2, awayScore: 1 }
    const result = { homeScore: 2, awayScore: 1 }
    expect(calculateFixedScore(prediction, result, defaultConfig)).toBe(5)
  })

  it('awards correct winner points when outcome matches but score differs', () => {
    const prediction = { homeScore: 3, awayScore: 0 }
    const result = { homeScore: 1, awayScore: 0 }
    expect(calculateFixedScore(prediction, result, defaultConfig)).toBe(3)
  })

  it('awards 0 points for incorrect prediction', () => {
    const prediction = { homeScore: 2, awayScore: 0 }
    const result = { homeScore: 0, awayScore: 1 }
    expect(calculateFixedScore(prediction, result, defaultConfig)).toBe(0)
  })

  it('handles draw prediction when result is also a draw', () => {
    const prediction = { homeScore: 1, awayScore: 1 }
    const result = { homeScore: 2, awayScore: 2 }
    expect(calculateFixedScore(prediction, result, defaultConfig)).toBe(3)
  })

  it('handles 0-0 exact score (edge: zero goals)', () => {
    const prediction = { homeScore: 0, awayScore: 0 }
    const result = { homeScore: 0, awayScore: 0 }
    expect(calculateFixedScore(prediction, result, defaultConfig)).toBe(5)
  })
})
```

## E2E Test Pattern (Playwright)
```typescript
import { test, expect } from '@playwright/test'

test.describe('prediction submission', () => {
  test.beforeEach(async ({ page }) => {
    // Authenticate via stored session
    await page.goto('/dashboard')
  })

  test('user can submit a prediction for an upcoming match', async ({ page }) => {
    await page.click('[data-testid="match-card-upcoming"]')
    await page.fill('[data-testid="home-score"]', '2')
    await page.fill('[data-testid="away-score"]', '1')
    await page.click('[data-testid="submit-prediction"]')
    await expect(page.locator('[data-testid="prediction-success"]')).toBeVisible()
  })

  test('user cannot submit prediction after kickoff', async ({ page }) => {
    // Navigate to a match that has started
    await page.goto('/matches/started-match-id')
    await expect(page.locator('[data-testid="predictions-locked"]')).toBeVisible()
    await expect(page.locator('[data-testid="submit-prediction"]')).toBeDisabled()
  })
})
```

## Coverage Targets
- **Scoring engine:** 100% line coverage (this is the core product)
- **API routes:** 80%+ coverage (all happy paths + main error paths)
- **Components:** 60%+ coverage (interactive components with user input)
- **E2E:** Cover all critical user journeys (auth, group, predict, leaderboard)
