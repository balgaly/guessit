# [GI-031] Odds-Based Scoring Implementation (Phase 2)

**Priority:** medium
**Assigned Agent:** backend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Implement odds-based scoring as an alternative to fixed scoring. Uses betting odds to award points (higher odds = more points).

## Acceptance Criteria
- [ ] Odds API integration implemented (as per odds-api skill)
- [ ] Odds caching in `odds_cache` table
- [ ] `calculateOddsScore` function implemented in `src/lib/scoring/odds.ts`
- [ ] Group creation allows selecting scoring mode (fixed or odds)
- [ ] Odds displayed on prediction form
- [ ] Points calculation: `round(decimal_odds * 10)`
- [ ] Fallback to fixed scoring if odds unavailable
- [ ] Tests for odds scoring (100% coverage)

## Related Files
- `src/lib/scoring/odds.ts` — Odds scoring logic
- `src/lib/odds/api.ts` — Odds API integration
- `.claude/skills/odds-api/SKILL.md` — Reference implementation

## Technical Notes
- Use the-odds-api.com for odds data
- Store odds in `odds_cache` table with timestamps
- Refresh odds every 6 hours (GI-032)
- Handle edge cases: odds not available, API down, etc.
- Consider caching strategy for performance

## Dependencies
- Blocked by: GI-012 (scoring foundation)
- Related: GI-032 (odds refresh cron)
