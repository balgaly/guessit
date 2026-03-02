# [GI-019] Scaffold Next.js 15 Project with TypeScript and Tailwind

**Priority:** critical
**Assigned Agent:** devops-engineer
**Status:** done
**Created:** 2026-02-06

## Description
Initialize the Next.js 15 project with TypeScript, Tailwind CSS, shadcn/ui, and proper folder structure. This is the foundation for all development work.

## Acceptance Criteria
- [x] Next.js 16 with App Router initialized
- [x] TypeScript configured in strict mode
- [x] Tailwind CSS 4 installed and configured
- [x] shadcn/ui installed with component registry
- [x] Folder structure matches CLAUDE.md (app/, components/, lib/, types/, hooks/)
- [x] pnpm as package manager
- [x] RTL support configured in root layout (`dir="rtl"`)
- [x] Dev server and build run successfully

## Related Files
- `package.json` — Dependencies and scripts
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind configuration
- `next.config.js` — Next.js configuration
- `src/app/layout.tsx` — Root layout with RTL

## Technical Notes
- Use `pnpm create next-app@latest` with TypeScript and Tailwind options
- Install shadcn/ui: `pnpm dlx shadcn-ui@latest init`
- Configure absolute imports with `@/` alias
- Set up RTL: `<html lang="he" dir="rtl">` for Hebrew support

## Dependencies
- None (foundation task, must be done first)
- Blocks: All other tickets
