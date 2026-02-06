# [GI-006] Groups UI Pages (List, Create, Join)

**Priority:** high
**Assigned Agent:** frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Build the user interface for viewing, creating, and joining groups. This is the first screen users see after logging in.

## Acceptance Criteria
- [ ] Groups list page: `src/app/(dashboard)/groups/page.tsx`
- [ ] Display all groups the user is a member of (fetch from `/api/groups`)
- [ ] "Create Group" button opens a modal or navigates to create page
- [ ] Create group form with fields: name, type (public/private), scoring type (fixed/odds)
- [ ] Join group form: enter 6-character code or paste invite link
- [ ] Show group details: name, member count, upcoming matches
- [ ] Responsive design (works on mobile)
- [ ] RTL support for Hebrew text
- [ ] Empty state: "You're not in any groups yet. Create one or join with a code."

## Related Files
- `src/app/(dashboard)/groups/page.tsx` — Groups list
- `src/app/(dashboard)/groups/create/page.tsx` — Create group form
- `src/app/(dashboard)/groups/join/page.tsx` — Join group form
- `src/components/features/groups/group-card.tsx` — Group card component
- `src/components/features/groups/create-group-modal.tsx` — Create modal

## Technical Notes
- Use shadcn/ui components: Card, Button, Dialog, Form
- Fetch groups with React Server Components (or use `useEffect` + client component)
- Show loading states while fetching
- Show error states if API calls fail (with toast notifications)
- Optimistic UI: add group to list immediately after creation, then sync with server

## Dependencies
- Blocked by: GI-004 (API must exist), GI-005 (join API)
