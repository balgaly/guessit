# [GI-037] Analytics Events Table and Tracking

**Priority:** medium
**Assigned Agent:** data-analyst
**Status:** todo
**Created:** 2026-02-06

## Description
Implement analytics events table mentioned in schema and set up event tracking for key user actions.

## Acceptance Criteria
- [ ] `analytics_events` table created in database
- [ ] Event tracking for key user actions (sign up, create group, join group, submit prediction)
- [ ] Privacy-compliant tracking (no PII without consent)
- [ ] Dashboard for viewing metrics (admin only)
- [ ] Integration with analytics tools (optional: Google Analytics, Plausible, etc.)
- [ ] GDPR-compliant (user can opt out)

## Related Files
- `supabase/migrations/` — Add analytics_events table
- `src/lib/analytics/track.ts` — Event tracking utilities
- `src/app/(dashboard)/admin/analytics/page.tsx` — Analytics dashboard

## Technical Notes
- Track events: sign_up, create_group, join_group, submit_prediction, view_leaderboard
- Store: event_name, user_id, timestamp, metadata (JSON)
- Consider using Supabase Realtime for live analytics
- Aggregate events for reporting (daily active users, retention, etc.)
- Comply with GDPR: allow users to opt out, delete their data

## Dependencies
- Blocked by: GI-001 (database schema)
