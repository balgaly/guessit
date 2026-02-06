# [GI-004] Groups CRUD API Routes

**Priority:** high
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Implement API routes for creating, reading, updating, and deleting groups. Groups are the core organizational unit of the app.

## Acceptance Criteria
- [ ] POST `/api/groups` — Create a new group (requires auth)
- [ ] GET `/api/groups` — List user's groups (filtered by membership)
- [ ] GET `/api/groups/[id]` — Get group details (requires membership)
- [ ] PATCH `/api/groups/[id]` — Update group settings (requires admin role)
- [ ] DELETE `/api/groups/[id]` — Delete a group (requires admin role)
- [ ] All routes validate input with Zod schemas
- [ ] All routes return proper HTTP status codes (200, 201, 400, 403, 404, 500)
- [ ] Creator is automatically added as admin to `group_memberships` when creating a group
- [ ] RLS policies enforced (users can only see/modify groups they're members of)

## Related Files
- `src/app/api/groups/route.ts` — GET (list) and POST (create)
- `src/app/api/groups/[id]/route.ts` — GET (details), PATCH (update), DELETE (delete)
- `src/lib/supabase/server.ts` — Supabase client
- `src/types/group.ts` — TypeScript types for Group

## Technical Notes
- Group creation fields: `name`, `type` (public/private), `scoring_type` (fixed/odds), `scoring_config` (JSON)
- Default scoring config: `{ points_correct_winner: 3, points_exact_score: 5 }`
- Generate a unique 6-character join code for private groups (alphanumeric, uppercase)
- Ensure join code is unique (check for collisions)
- Handle concurrent group creation (race conditions on join codes)

## Dependencies
- Blocked by: GI-001 (schema), GI-002 (RLS policies)
- Blocks: GI-005 (group joining), GI-006 (group listing UI)
