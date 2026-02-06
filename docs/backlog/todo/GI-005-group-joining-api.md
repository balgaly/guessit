# [GI-005] Group Joining API (Code and Invite Link)

**Priority:** high
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Allow users to join private groups via a 6-character code or an invite link. Handle edge cases like already a member, group full, invalid code, etc.

## Acceptance Criteria
- [ ] POST `/api/groups/join` — Join via 6-character code
- [ ] POST `/api/groups/[id]/join` — Join via group ID (from invite link)
- [ ] Validate code format (6 alphanumeric chars, case-insensitive)
- [ ] Check if user is already a member (return 409 Conflict if so)
- [ ] Add user to `group_memberships` with role `member`
- [ ] Return group details after successful join
- [ ] Handle invalid codes (return 404 Not Found)
- [ ] Input validation with Zod

## Related Files
- `src/app/api/groups/join/route.ts` — Join via code
- `src/app/api/groups/[id]/join/route.ts` — Join via invite link
- `src/types/group.ts` — Group types

## Technical Notes
- Normalize join codes to uppercase before querying
- Consider rate limiting to prevent brute-force code guessing
- Invite link format: `https://guessit.app/groups/join?code=ABC123`
- For public groups, anyone can join without a code (check `type` field)
- Log join events for analytics (optional: track who invited whom)

## Dependencies
- Blocked by: GI-004 (groups must exist first)
- Blocks: GI-006 (UI needs these endpoints)
