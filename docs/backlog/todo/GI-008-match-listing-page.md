# [GI-008] Match Listing Page

**Priority:** high
**Assigned Agent:** frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Build a page that lists all upcoming matches for a tournament (World Cup 2026). Users should see match details and be able to navigate to the predictions form.

## Acceptance Criteria
- [ ] Match listing page: `src/app/(dashboard)/matches/page.tsx`
- [ ] Fetch matches from `/api/matches` (to be created in GI-009)
- [ ] Display match cards with: home team, away team, kickoff time, venue
- [ ] Group matches by date or tournament stage (e.g., "Group Stage", "Round of 16")
- [ ] Show countdown to kickoff for upcoming matches
- [ ] Show final score for completed matches
- [ ] "Predict" button for each match (navigates to predictions form)
- [ ] Disable "Predict" button if kickoff time has passed
- [ ] Responsive design and RTL support

## Related Files
- `src/app/(dashboard)/matches/page.tsx` — Match listing
- `src/components/features/matches/match-card.tsx` — Match card component
- `src/app/api/matches/route.ts` — API endpoint (created in GI-009)

## Technical Notes
- Use shadcn/ui Card, Badge, Button components
- Format dates with `date-fns` or `Intl.DateTimeFormat`
- Show kickoff time in user's local timezone
- Consider adding filters: "Upcoming", "Completed", "All"
- Empty state: "No matches scheduled yet."

## Dependencies
- Blocked by: GI-007 (needs match data), GI-009 (needs API endpoint)
