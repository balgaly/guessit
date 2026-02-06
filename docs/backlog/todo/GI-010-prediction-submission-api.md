# [GI-010] Prediction Submission API

**Priority:** critical
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Implement API routes for users to submit and update their predictions for matches. Predictions should be validated and locked at kickoff time.

## Acceptance Criteria
- [ ] POST `/api/predictions` — Submit or update a prediction
- [ ] Input validation: match_id, group_id, home_score, away_score (all required)
- [ ] Validate scores are non-negative integers (0-20 range reasonable)
- [ ] Check if match has already started (compare `kickoff_time` with current time)
- [ ] If kickoff passed, return 403 Forbidden with message "Predictions are locked"
- [ ] Upsert logic: if prediction exists, update it; otherwise, insert new
- [ ] Return the created/updated prediction
- [ ] RLS enforced: users can only create predictions in groups they're members of

## Related Files
- `src/app/api/predictions/route.ts` — POST endpoint
- `src/types/prediction.ts` — TypeScript types

## Technical Notes
- Use Zod schema for input validation
- Kickoff time check: `SELECT kickoff_time FROM matches WHERE id = ? AND kickoff_time > NOW()`
- Upsert: `INSERT INTO predictions (...) ON CONFLICT (user_id, match_id, group_id) DO UPDATE SET ...`
- Consider adding a field `locked` to predictions table (set to true at kickoff)
- Log prediction submissions for analytics (optional)

## Dependencies
- Blocked by: GI-001 (schema), GI-002 (RLS), GI-007 (match data)
- Blocks: GI-011 (prediction form UI)
