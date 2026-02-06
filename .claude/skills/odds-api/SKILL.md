---
name: odds-api
description: Betting odds API integration, caching strategy, and odds normalization. Use when working on odds-based scoring, the scoring engine, or match data integration.
---

## API Provider: the-odds-api.com
Free tier: 500 requests/month (sufficient for a single tournament with 6-hour refresh cycles)

### Fetching Odds
```typescript
// GET https://api.the-odds-api.com/v4/sports/{sport}/odds
// Params: apiKey, regions=eu, markets=h2h, oddsFormat=decimal

const response = await fetch(
  `https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds?` +
  `apiKey=${process.env.ODDS_API_KEY}&regions=eu&markets=h2h&oddsFormat=decimal`
)
const matches = await response.json()
// Each match has: home_team, away_team, commence_time, bookmakers[].markets[].outcomes[]
```

### Response Shape (simplified)
```json
{
  "id": "abc123",
  "home_team": "Brazil",
  "away_team": "Germany",
  "commence_time": "2026-06-15T18:00:00Z",
  "bookmakers": [{
    "markets": [{
      "key": "h2h",
      "outcomes": [
        { "name": "Brazil", "price": 2.10 },
        { "name": "Germany", "price": 3.40 },
        { "name": "Draw", "price": 3.20 }
      ]
    }]
  }]
}
```

### Normalization Strategy
We average odds across all bookmakers for a single "consensus" number per outcome:
```typescript
function normalizeOdds(bookmakers: Bookmaker[]): { home: number; draw: number; away: number } {
  const allH2H = bookmakers.flatMap(b => b.markets.filter(m => m.key === 'h2h'))
  // Average each outcome across bookmakers
  // Round to 2 decimal places
  // Store in odds_cache table
}
```

### Caching Rules
- Refresh every 6 hours via Vercel Cron (`/api/admin/refresh-odds`)
- Store in `odds_cache` table: match_id, home_odds, draw_odds, away_odds, fetched_at
- Lock odds at match kickoff_time (never update after)
- If API fails, keep existing cached values (log error to Sentry)
- Track remaining API quota from response headers (`x-requests-remaining`)

### Rate Limit Budget
500 requests/month ÷ 30 days = ~16 requests/day
With 4 refreshes/day (every 6 hours) × 1 request per refresh = 4 requests/day (well within budget)
For tournament with 64 matches over 30 days: comfortable margin
