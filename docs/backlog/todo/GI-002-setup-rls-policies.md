# [GI-002] Setup Row-Level Security Policies

**Priority:** critical
**Assigned Agent:** security-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Implement Row-Level Security (RLS) policies for all tables to ensure users can only access data they're authorized to see. This is a security-critical task.

## Acceptance Criteria
- [ ] RLS enabled on all tables (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`)
- [ ] SELECT policies: users can only see their own profiles, groups they're members of, predictions in their groups
- [ ] INSERT policies: users can create predictions in groups they're members of
- [ ] UPDATE policies: users can update their own predictions (before kickoff only)
- [ ] DELETE policies: only group admins can delete groups
- [ ] Service role bypasses RLS for admin/cron operations
- [ ] All policies tested with different user roles (admin, member, non-member)

## Related Files
- `supabase/migrations/` — RLS policy definitions
- `src/lib/supabase/server.ts` — Supabase client setup
- `src/lib/supabase/client.ts` — Client-side Supabase

## Technical Notes
- Use `auth.uid()` to reference the current user
- Policies for `group_memberships`: users can read groups they're in
- Policies for `predictions`: users can CRUD their own predictions in groups they've joined
- Policies for `matches`: public read access (anyone can see match schedule)
- Policies for `scores`: read-only, calculated by backend
- Test with multiple users to ensure no data leakage

## Dependencies
- Blocked by: GI-001 (database schema must exist first)
- Blocks: GI-004, GI-007, GI-008, GI-010 (all API routes depend on RLS)
