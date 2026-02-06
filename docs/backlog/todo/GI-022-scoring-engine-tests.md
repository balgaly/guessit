# [GI-022] Comprehensive Test Suite for Scoring Engine

**Priority:** critical
**Assigned Agent:** qa-engineer
**Status:** todo
**Created:** 2026-02-06

## Description
Write 100% test coverage for the fixed scoring engine with all edge cases. The scoring logic is business-critical and must be bulletproof.

## Acceptance Criteria
- [ ] Unit tests for all scoring scenarios (exact score, correct winner, wrong prediction)
- [ ] Edge case: both teams score same (tie prediction)
- [ ] Edge case: user predicts tie, result is tie with different score
- [ ] Edge case: scores at boundaries (0-0, 10-10, etc.)
- [ ] 100% code coverage requirement (enforced in CI)
- [ ] Tests run in CI pipeline
- [ ] Clear test descriptions and documentation
- [ ] Performance tests (scoring should be fast even for 1000s of predictions)

## Related Files
- `src/lib/scoring/fixed.ts` — Scoring logic (GI-012)
- `src/lib/scoring/fixed.test.ts` — Test file to create

## Technical Notes
- Use Vitest for unit testing
- Test matrix:
  - Exact score: 5 points
  - Correct winner: 3 points
  - Tie prediction correct: 3 points (or define this behavior)
  - Wrong: 0 points
- Mock group scoring config
- Use descriptive test names: `it('should award 5 points for exact score match', ...)`

## Dependencies
- Blocked by: GI-012 (scoring engine must exist)
