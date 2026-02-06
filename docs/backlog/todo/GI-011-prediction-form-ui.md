# [GI-011] Prediction Form UI

**Priority:** high
**Assigned Agent:** frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Build a form where users can enter their predictions (home score, away score) for a match. The form should handle validation, optimistic updates, and locked state after kickoff.

## Acceptance Criteria
- [ ] Prediction form: `src/app/(dashboard)/groups/[groupId]/predict/[matchId]/page.tsx`
- [ ] Display match details at the top (teams, kickoff time)
- [ ] Input fields for home score and away score (number inputs, 0-20 range)
- [ ] "Submit Prediction" button
- [ ] If prediction already exists, pre-fill the form with current values
- [ ] Show "Update Prediction" instead of "Submit" if updating
- [ ] Disable form if kickoff time has passed (show "Predictions are locked" message)
- [ ] Optimistic UI: show updated prediction immediately, sync with server
- [ ] Show success toast on successful submission
- [ ] Show error toast if submission fails (with error message)

## Related Files
- `src/app/(dashboard)/groups/[groupId]/predict/[matchId]/page.tsx` — Prediction form
- `src/components/features/predictions/prediction-form.tsx` — Form component
- `src/app/api/predictions/route.ts` — API endpoint (GI-010)

## Technical Notes
- Use React Hook Form with Zod validation
- Fetch existing prediction on page load (GET `/api/predictions?match_id=X&group_id=Y`)
- Check kickoff time client-side before allowing submission
- Use shadcn/ui Form, Input, Button components
- Responsive design, RTL support

## Dependencies
- Blocked by: GI-010 (API endpoint)
