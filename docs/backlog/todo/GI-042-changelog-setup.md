# [GI-042] CHANGELOG.md Setup

**Priority:** medium
**Assigned Agent:** product-manager
**Status:** todo
**Created:** 2026-02-06

## Description
Initialize CHANGELOG.md following Keep a Changelog format to track all notable changes to the project.

## Acceptance Criteria
- [ ] CHANGELOG.md created in project root
- [ ] Follow Keep a Changelog format (https://keepachangelog.com/)
- [ ] Initial release documented (v0.1.0 or v1.0.0)
- [ ] Process for updating changelog (add to CONTRIBUTING.md)
- [ ] Sections: Added, Changed, Deprecated, Removed, Fixed, Security

## Related Files
- `CHANGELOG.md` — Changelog file
- `CONTRIBUTING.md` — Add section on updating changelog

## Technical Notes
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Format:
  ```markdown
  # Changelog

  ## [Unreleased]
  ### Added
  - New feature X

  ## [1.0.0] - 2026-02-15
  ### Added
  - Initial MVP release
  - Group creation and joining
  - Prediction submission
  - Fixed scoring
  - Leaderboard
  ```
- Update on every release
- Link to GitHub releases

## Dependencies
- None (can be done anytime)
