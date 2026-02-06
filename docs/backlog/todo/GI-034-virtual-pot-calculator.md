# [GI-034] Virtual Pot Calculator (Phase 2)

**Priority:** low
**Assigned Agent:** frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Add calculator for external payment settlement. No real payments, just a tool to calculate prize distribution.

## Acceptance Criteria
- [ ] Virtual pot page: `/groups/[groupId]/pot`
- [ ] Input: entry fee per person
- [ ] Calculate total pot based on member count
- [ ] Show distribution by rank (e.g., 1st: 50%, 2nd: 30%, 3rd: 20%)
- [ ] Customizable distribution percentages
- [ ] Display payout amounts for each member
- [ ] Copy payment info to clipboard (for Venmo, PayPal, etc.)
- [ ] Disclaimer: "No actual payments processed. Use external services."

## Related Files
- `src/app/(dashboard)/groups/[groupId]/pot/page.tsx` — Pot calculator page
- `src/components/features/pot/pot-calculator.tsx` — Calculator component

## Technical Notes
- This is a client-side calculator (no backend needed)
- Default distribution: 1st: 50%, 2nd: 30%, 3rd: 20%
- Allow group admin to customize distribution
- Show member names with payout amounts
- Include tax disclaimer (consult local laws)

## Dependencies
- Blocked by: GI-015 (leaderboard must exist to determine winners)
