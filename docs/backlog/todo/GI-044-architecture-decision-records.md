# [GI-044] Architecture Decision Records (ADRs)

**Priority:** low
**Assigned Agent:** cto-architect
**Status:** todo
**Created:** 2026-02-06

## Description
Document architectural decisions in ADR format to provide context for future contributors and maintainers.

## Acceptance Criteria
- [ ] `docs/adr/` folder created
- [ ] ADR template created (docs/adr/template.md)
- [ ] Initial ADRs for key decisions documented:
  - ADR-001: Why Next.js 15 App Router
  - ADR-002: Why Supabase for backend
  - ADR-003: Why fixed + odds-based scoring
  - ADR-004: Why markdown-based backlog system
- [ ] Process for creating new ADRs (add to CONTRIBUTING.md)
- [ ] README in docs/adr/ explaining the system

## Related Files
- `docs/adr/README.md` — ADR system explanation
- `docs/adr/template.md` — ADR template
- `docs/adr/001-nextjs-app-router.md` — Example ADR
- `CONTRIBUTING.md` — Add section on ADRs

## Technical Notes
- ADR format:
  - Title (numbered sequentially)
  - Status (proposed, accepted, deprecated, superseded)
  - Context (what's the issue we're facing?)
  - Decision (what did we decide?)
  - Consequences (what are the trade-offs?)
- Use lightweight ADRs (1-2 pages max)
- Store as markdown files
- Number sequentially: 001, 002, 003, etc.

## Dependencies
- None (can be done anytime, useful for documentation)
