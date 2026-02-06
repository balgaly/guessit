# [GI-033] Public Groups Feature (Phase 2)

**Priority:** low
**Assigned Agent:** backend-lead, frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Allow users to create and browse public groups that anyone can join without a code or invite link.

## Acceptance Criteria
- [ ] Public group type supported in `groups` table (already in schema)
- [ ] Public groups browseable by all authenticated users
- [ ] Join public group without code/link (one-click join)
- [ ] Search and filter public groups (by name, size, activity)
- [ ] Public group listing page: `/groups/browse`
- [ ] Sort by: most members, most active, recently created
- [ ] RLS policies updated (public groups readable by all)

## Related Files
- `src/app/(dashboard)/groups/browse/page.tsx` — Public groups listing
- `src/app/api/groups/public/route.ts` — API endpoint for public groups
- `src/components/features/groups/public-group-card.tsx` — Public group card

## Technical Notes
- Add `is_public` boolean field to groups table (or use existing `type` field)
- RLS policy: SELECT on groups where `is_public = true` for all authenticated users
- Consider adding tags/categories for groups
- Show member count and activity indicators
- Preview leaderboard leaders before joining

## Dependencies
- Blocked by: GI-006 (groups UI foundation)
