# [GI-001] Setup Database Schema

**Priority:** critical
**Assigned Agent:** cto-architect
**Status:** todo
**Created:** 2026-02-06

## Description
Design and implement the complete database schema for GuessIt in Supabase. This includes all tables, relationships, indexes, and constraints needed for the MVP.

## Acceptance Criteria
- [ ] All tables created with proper column types and constraints
- [ ] Foreign key relationships established
- [ ] Indexes created for frequently queried columns
- [ ] Database migration file created in `supabase/migrations/`
- [ ] Schema matches the overview in CLAUDE.md

## Related Tables
- `profiles` — extends Supabase auth.users with display info
- `groups` — contest rooms with type, settings, scoring config
- `group_memberships` — user-group relationships with roles
- `tournaments` — event definitions (World Cup 2026, etc.)
- `matches` — individual games with teams, times, results
- `predictions` — user predictions per match per group
- `scores` — calculated scores per prediction
- `odds_cache` — cached betting odds per match

## Technical Notes
- Use UUID for all primary keys
- Add `created_at` and `updated_at` timestamps to all tables
- Ensure proper cascade delete behavior for relationships
- Consider indexes on: `group_memberships(user_id, group_id)`, `predictions(user_id, match_id, group_id)`, `matches(kickoff_time)`
- Schema should support both fixed and odds-based scoring
- Include fields for Hebrew i18n (team names, group names, etc.)

## Dependencies
- Blocks: GI-002, GI-004, GI-007, GI-008, GI-010
