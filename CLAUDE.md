# GuessIt — Social Prediction Platform

## Project Overview
A scalable web platform for prediction contests between friends. Initial launch targets the **2026 World Cup**, but the architecture supports any event (Eurovision, Premier League, etc.). Users create/join groups, predict match scores, and compete on leaderboards with fixed or odds-based scoring.

## Proprietary SaaS Model
**CRITICAL:** This project is **proprietary software** offered as a **SaaS application**. The source code is publicly visible on GitHub for transparency, but all rights are reserved. No permission is granted to copy, modify, or distribute.

### Principles
- **License:** All Rights Reserved (no open source license)
- **Transparency:** Source code visible on public GitHub repository
- **Documentation:** Comprehensive README, setup guides, architecture docs
- **Issues & Roadmap:** All feature requests, bugs, and planning in GitHub Issues/Projects
- **Changelog:** Maintain CHANGELOG.md following Keep a Changelog format

### GitHub-Centric Workflow
- **Issues:** All bugs, features, and tasks tracked as GitHub Issues with labels
- **Projects:** Use GitHub Projects for sprint planning and roadmap visibility
- **Pull Requests:** All code changes via PRs with required reviews and CI checks
- **Discussions:** Use GitHub Discussions for ideas, Q&A, and community feedback
- **Releases:** Semantic versioning with GitHub Releases and release notes
- **CI/CD:** Exclusively GitHub Actions (no external CI tools)
- **Security:** GitHub Security Advisories for vulnerability disclosure

### Legal & Compliance Considerations
- **Dependencies:** Only use OSS-compatible dependencies (check licenses)
- **Privacy Policy & Terms:** Required for SaaS, link in footer
- **GDPR/Data Protection:** Document data handling, user rights, data retention
- **Attribution:** Properly credit all dependencies and third-party assets

### Developer Guidelines
- Write code knowing it will be public — no shortcuts
- TODOs are tracked in the backlog system (`docs/backlog/`), not in code comments
- If you must add a TODO comment, run `/backlog-manager scan` to create a ticket
- Document architectural decisions (ADRs) for understanding
- Security-first: assume all code is auditable by security researchers
- Accessibility: WCAG 2.1 AA compliance minimum
- i18n-ready: English + Hebrew now, more languages later

## Tech Stack
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes + Supabase (PostgreSQL, Auth, Realtime, Edge Functions)
- **Auth:** Google Sign-In only (via Supabase Auth)
- **Hosting:** Vercel (frontend + API routes), Supabase (database + auth + realtime)
- **External APIs:** the-odds-api.com (betting odds for dynamic scoring)
- **Testing:** Vitest (unit), Playwright (E2E), React Testing Library (components)
- **CI/CD:** GitHub Actions → Vercel Preview/Production

## Architecture Principles
- Server Components by default; Client Components only when interactivity is needed
- All database queries go through Supabase client with RLS policies — never bypass RLS
- API keys and secrets live in environment variables, never client-side
- Every API route validates input with Zod schemas
- Optimistic UI updates for predictions, with server reconciliation
- Hebrew RTL support from day one (use `dir="rtl"` on root layout)

## Coding Conventions
- TypeScript strict mode, no `any` types
- File naming: kebab-case for files, PascalCase for components
- Imports: absolute paths via `@/` alias
- Components: functional components with named exports
- State: React hooks + Supabase Realtime subscriptions, no external state library unless needed
- Error handling: try/catch in API routes, Error Boundaries in UI, toast notifications for user feedback
- Commits: conventional commits (feat:, fix:, chore:, docs:)

## Developer Onboarding & Workflow

### Getting Started
New contributors should follow the comprehensive onboarding guide in [CONTRIBUTING.md](./CONTRIBUTING.md). The guide covers:
- Prerequisites and local development setup
- Environment configuration (`.env.local`, `.mcp.json`)
- Understanding the agent/skill ecosystem
- Git workflow and code review process
- Your first contribution walkthrough

**Quick Start for New Developers:**
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Run the onboarding skill: `/onboarding` for setup help
3. Browse the backlog: `docs/backlog/todo/`
4. Pick a ticket and get started!

### Backlog System
All development work is tracked in `docs/backlog/` as markdown files. This allows:
- Full version control of all tasks
- Programmatic access by Claude Code agents
- Offline access to the backlog
- Integration with Git workflows

**Key Concepts:**
- Tickets use the format `GI-{number}-{slug}.md` (GI = GuessIt)
- Organized by status: `todo/`, `in-progress/`, `done/`
- Each ticket specifies priority and assigned agent
- Use `/backlog-manager` skill to create, move, and manage tickets

**For detailed documentation, see [docs/backlog/README.md](./docs/backlog/README.md)**

## Agent Delegation Model
This project uses specialized agents and skills for different concerns. Invoke them with slash commands (e.g., `/backend-lead`) in Claude Code.

| Domain | Agent/Skill | When to Use |
|--------|-------------|-------------|
| Strategy & Prioritization | `ceo-strategist` | Feature prioritization, go-to-market, monetization, pivot decisions |
| System Design | `cto-architect` | Database schema, API design, scalability, tech debt decisions |
| Planning & Specs | `product-manager` | User stories, acceptance criteria, sprint planning, roadmap |
| Infrastructure | `devops-engineer` | CI/CD, deployment, monitoring, environment setup, Terraform |
| UI Implementation | `frontend-lead` | React components, pages, responsive design, animations |
| API & Data | `backend-lead` | API routes, Supabase queries, business logic, data migrations |
| Security | `security-engineer` | Auth flows, RLS policies, input validation, OWASP checks |
| Testing | `qa-engineer` | Test strategy, test writing, bug reproduction, coverage analysis |
| Design & UX | `ux-designer` | User flows, wireframes, accessibility, UI/UX review |
| Documentation | `tech-writer` | README, API docs, user guides, inline documentation |
| Analytics | `data-analyst` | Metrics, dashboards, user behavior, A/B test analysis |
| Backlog Management | `backlog-manager` | Create tickets, scan TODOs, reports, sprint planning |
| Onboarding | `onboarding` | Help new developers get started, troubleshoot setup issues |

## Key Business Rules
- Groups can be public, private (code/link), or default (auto-joined)
- Predictions lock at match kickoff time
- Odds refresh every 6 hours, cached in Supabase
- Odds-based scoring: points = round(decimal_odds * 10)
- Fixed scoring: configurable per group (default: 3 pts correct winner, 5 pts exact score)
- Virtual pot: no real payments — calculator for external settlement
- No limit on group members
- Users can join unlimited groups simultaneously

## File Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth-related pages (login, callback)
│   ├── (dashboard)/       # Protected pages (groups, predictions, leaderboard)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout with RTL support
├── components/
│   ├── ui/                # shadcn/ui components
│   └── features/          # Feature-specific components
├── lib/
│   ├── supabase/          # Supabase client, types, helpers
│   ├── odds/              # Odds API integration and caching
│   ├── scoring/           # Scoring engine (fixed + odds-based)
│   └── utils/             # Shared utilities
├── types/                 # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## Database Tables (Overview)
- `profiles` — extends Supabase auth.users with display info
- `groups` — contest rooms with type, settings, scoring config
- `group_memberships` — user-group relationships with roles
- `tournaments` — event definitions (World Cup 2026, etc.)
- `matches` — individual games with teams, times, results
- `predictions` — user predictions per match per group
- `scores` — calculated scores per prediction
- `odds_cache` — cached betting odds per match

## Security Checklist (Pre-Launch)
- [ ] All tables have RLS policies
- [ ] API routes validate input with Zod
- [ ] No secrets in client-side code
- [ ] Rate limiting on API routes
- [ ] CORS configured correctly
- [ ] SQL injection prevention verified
- [ ] XSS prevention in user-generated content (group names, etc.)
