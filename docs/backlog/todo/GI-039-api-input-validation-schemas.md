# [GI-039] API Input Validation Schemas

**Priority:** high
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Create centralized Zod schemas for all API route input validation to ensure consistency and type safety.

## Acceptance Criteria
- [ ] Zod schemas for all API inputs in `src/lib/validation/schemas.ts`
- [ ] Centralized schema definitions (avoid duplication)
- [ ] Proper error messages for validation failures
- [ ] TypeScript type inference from schemas
- [ ] Reusable validation utilities
- [ ] Documentation on how to add new schemas

## Related Files
- `src/lib/validation/schemas.ts` — All Zod schemas
- `src/lib/validation/validate.ts` — Validation utilities
- All files in `src/app/api/` — API routes (use schemas)

## Technical Notes
- Define schemas for: CreateGroupInput, JoinGroupInput, SubmitPredictionInput, etc.
- Use Zod's `.parse()` for validation (throws on error)
- Export inferred TypeScript types: `export type CreateGroupInput = z.infer<typeof createGroupSchema>`
- Include custom error messages: `z.string().min(1, "Group name is required")`
- Consider using Zod's `.transform()` for data normalization

## Dependencies
- None (can be done in parallel with other tickets)
- Improves: GI-004, GI-005, GI-010 (all API routes)
