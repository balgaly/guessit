# [GI-025] E2E Test for Group Creation and Joining

**Priority:** high
**Assigned Agent:** qa-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Write end-to-end test for creating and joining groups with multi-user scenarios.

## Acceptance Criteria
- [ ] Test group creation flow (name, type, scoring config)
- [ ] Test invite code generation (6 characters, unique)
- [ ] Test joining via code
- [ ] Test joining via invite link
- [ ] Test member list display
- [ ] Multi-user test: User A creates, User B joins
- [ ] Use Playwright for E2E testing

## Related Files
- `src/app/(dashboard)/groups/` — Group pages (GI-006)
- `tests/e2e/groups.spec.ts` — Test file to create

## Technical Notes
- Use Playwright contexts for multi-user testing
- Test both private and public groups (when public is implemented)
- Verify invite link format
- Test invalid code handling

## Dependencies
- Blocked by: GI-006 (group UI must exist)
