---
name: data-analyst
description: Analytics events, KPI tracking, user behavior analysis, and metrics queries. Use when defining metrics, analyzing data, or building analytics dashboards.
context: fork
agent: data-analyst
---

## Analytics Events Schema
Track these events in the `analytics_events` table:

### Core Events
| Event Name | Properties | When |
|------------|-----------|------|
| `sign_up` | `{ method: 'google' }` | First authentication |
| `group_created` | `{ type, scoring_mode }` | Group creation |
| `group_joined` | `{ method: 'code' \| 'link' \| 'public' }` | Joining a group |
| `prediction_submitted` | `{ group_id, match_id, is_update }` | Prediction submit/update |
| `leaderboard_viewed` | `{ group_id }` | Leaderboard page view |
| `invite_shared` | `{ method: 'copy' \| 'whatsapp' \| 'telegram' }` | Invite link shared |
| `odds_viewed` | `{ match_id }` | User viewed odds for a match |

### Event Tracking Implementation
```typescript
// lib/analytics.ts — lightweight, no external dependency
import { createClient } from '@/lib/supabase/server'

export async function trackEvent(
  userId: string,
  eventName: string,
  properties: Record<string, any> = {}
) {
  const supabase = await createClient()
  // Fire-and-forget — analytics should never block the main flow
  supabase.from('analytics_events').insert({
    user_id: userId,
    event_name: eventName,
    event_properties: properties
  }).then() // intentionally not awaited
}
```

## Key Queries

### Daily Active Users (DAU)
```sql
SELECT DATE(created_at) as day, COUNT(DISTINCT user_id) as dau
FROM analytics_events
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY day;
```

### Activation Funnel (sign up → join group → first prediction)
```sql
WITH funnel AS (
  SELECT
    user_id,
    MIN(CASE WHEN event_name = 'sign_up' THEN created_at END) as signed_up,
    MIN(CASE WHEN event_name = 'group_joined' THEN created_at END) as joined_group,
    MIN(CASE WHEN event_name = 'prediction_submitted' THEN created_at END) as first_prediction
  FROM analytics_events
  GROUP BY user_id
)
SELECT
  COUNT(*) as total_signups,
  COUNT(joined_group) as joined_group,
  COUNT(first_prediction) as made_prediction,
  ROUND(100.0 * COUNT(joined_group) / COUNT(*), 1) as join_rate_pct,
  ROUND(100.0 * COUNT(first_prediction) / COUNT(*), 1) as predict_rate_pct
FROM funnel;
```

### Viral Coefficient
```sql
-- How many new users does each invite generate?
SELECT
  DATE(e.created_at) as day,
  COUNT(DISTINCT CASE WHEN e.event_name = 'invite_shared' THEN e.user_id END) as inviters,
  COUNT(DISTINCT CASE WHEN e.event_name = 'group_joined'
    AND e.event_properties->>'method' = 'link' THEN e.user_id END) as joined_via_invite,
  ROUND(
    COUNT(DISTINCT CASE WHEN e.event_name = 'group_joined'
      AND e.event_properties->>'method' = 'link' THEN e.user_id END)::numeric /
    NULLIF(COUNT(DISTINCT CASE WHEN e.event_name = 'invite_shared' THEN e.user_id END), 0),
    2
  ) as viral_coefficient
FROM analytics_events e
WHERE e.created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(e.created_at);
```

## Success Metrics for Launch
- **Activation:** > 70% of sign-ups join at least one group within 24 hours
- **Engagement:** > 50% of group members predict at least 80% of matches
- **Retention:** > 40% D7 retention (return after 1 week)
- **Virality:** Each group creator invites at least 5 people, > 60% join
- **Scale target:** 100 active users across 10+ groups by end of group stage
