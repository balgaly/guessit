# [GI-040] Match Results Admin Interface

**Priority:** medium
**Assigned Agent:** frontend-lead, backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create admin interface to update match results (final scores) and trigger score calculation.

## Acceptance Criteria
- [ ] Admin-only page: `/admin/matches`
- [ ] List all matches (upcoming and completed)
- [ ] Form to enter final scores for completed matches
- [ ] Mark match as completed
- [ ] Button to trigger score calculation (calls GI-013 endpoint)
- [ ] Audit log of changes (who updated, when, what changed)
- [ ] Restricted access (only admins can access)

## Related Files
- `src/app/(dashboard)/admin/matches/page.tsx` — Admin matches page
- `src/app/api/admin/matches/[id]/result/route.ts` — Update match result endpoint
- `src/components/features/admin/match-result-form.tsx` — Result form

## Technical Notes
- Check user role: only allow if `user.role === 'admin'`
- Validate final scores (non-negative integers, reasonable range)
- Automatically trigger score calculation after updating result
- Log all changes to an `audit_log` table
- Consider adding bulk update (update multiple matches at once)

## Dependencies
- Blocked by: GI-013 (score calculation endpoint)
