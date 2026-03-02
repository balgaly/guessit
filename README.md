# GuessIt

[![CI](https://github.com/balgaly/guessit/actions/workflows/ci.yml/badge.svg)](https://github.com/balgaly/guessit/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](./LICENSE)

A social prediction platform for competing with friends on sports events. Create or join groups, predict match scores, and climb the leaderboard with fixed or odds-based scoring.

The initial launch targets the **2026 FIFA World Cup**, but the architecture supports any event — Eurovision, Premier League, and beyond.

## Features

- **Groups** — Create public or private prediction groups and invite friends
- **Predictions** — Submit score predictions before kickoff, with automatic locking
- **Scoring** — Fixed-point scoring or dynamic odds-based scoring via betting odds
- **Leaderboards** — Real-time standings with Supabase Realtime
- **Virtual Pot** — Track who owes what without real payments
- **RTL Support** — Full Hebrew and English support from day one

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes + Supabase (PostgreSQL, Auth, Realtime)
- **Auth:** Google Sign-In via Supabase Auth
- **Hosting:** Vercel + Supabase
- **Testing:** Vitest, Playwright, React Testing Library
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 8
- A [Supabase](https://supabase.com) project
- A Google OAuth client (for authentication)

### Installation

```bash
git clone https://github.com/balgaly/guessit.git
cd guessit
pnpm install
```

### Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run tests |

## License

Copyright (c) 2026 balgaly. All rights reserved. See [LICENSE](LICENSE) for details.
