---
name: backend-lead
description: API route implementation, Supabase queries, business logic, scoring engine, data migrations, and server-side patterns. Use when building API endpoints, writing database queries, or implementing business logic.
context: fork
agent: backend-lead
---

## API Route Template
Every API route follows this exact pattern:

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// 1. Schema at the top — this IS the documentation
const schema = z.object({
  // ... fields with .min(), .max(), .uuid(), etc.
})

export async function POST(req: NextRequest) {
  try {
    // 2. Auth check
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 3. Input validation
    const body = await req.json()
    const input = schema.parse(body)

    // 4. Business logic (call lib/ functions, not inline)
    const result = await someBusinessFunction(supabase, user.id, input)

    // 5. Response
    return NextResponse.json({ data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('API Error:', error) // Replace with Sentry in production
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Supabase Query Patterns

### User-facing queries (use RLS)
```typescript
// Uses the user's JWT — RLS policies apply automatically
const supabase = await createClient()
const { data, error } = await supabase.from('groups').select('*')
// User only sees groups they belong to (RLS handles filtering)
```

### Admin/cron queries (bypass RLS)
```typescript
// Only for server-side cron jobs and admin operations
import { createServiceClient } from '@/lib/supabase/admin'
const supabase = createServiceClient()
// This bypasses RLS — use with extreme care
```

## Scoring Implementation

### Fixed Scoring
```typescript
function calculateFixedScore(prediction: Prediction, result: MatchResult, config: ScoringConfig): number {
  // Exact score match
  if (prediction.homeScore === result.homeScore && prediction.awayScore === result.awayScore) {
    return config.pointsExactScore // default: 5
  }
  // Correct winner/draw
  const predictedOutcome = getOutcome(prediction.homeScore, prediction.awayScore)
  const actualOutcome = getOutcome(result.homeScore, result.awayScore)
  if (predictedOutcome === actualOutcome) {
    return config.pointsCorrectWinner // default: 3
  }
  return 0
}
```

### Odds-Based Scoring
```typescript
function calculateOddsScore(prediction: Prediction, result: MatchResult, odds: MatchOdds, config: ScoringConfig): number {
  const actualOutcome = getOutcome(result.homeScore, result.awayScore) // 'home' | 'draw' | 'away'
  const predictedOutcome = getOutcome(prediction.homeScore, prediction.awayScore)

  if (predictedOutcome !== actualOutcome) return 0

  // Get the odds for the actual outcome
  const outcomeOdds = odds[actualOutcome] // e.g., 1.70 for favorites, 5.00 for underdogs
  let points = Math.round(outcomeOdds * 10) // 1.70 → 17 points, 5.00 → 50 points

  // Bonus for exact score
  if (prediction.homeScore === result.homeScore && prediction.awayScore === result.awayScore) {
    points = Math.round(points * config.exactMultiplier) // default: 1.5x
  }

  return points
}
```

## Cron Jobs (via Vercel Cron or Supabase pg_cron)
- **Every 6 hours:** Refresh odds cache from the-odds-api.com
- **After each match ends:** Calculate scores for all predictions in all groups
- **Daily:** Clean up expired invite codes, update tournament standings
