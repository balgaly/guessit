# GuessIt — Step-by-Step Setup Guide

Follow these steps in order. Each step builds on the previous one.

---

## PHASE 1: PROJECT FOUNDATION (15 minutes)

### Step 1 — Create the project folder and unzip the setup

Open your terminal (or VSCode terminal) and run:

```bash
mkdir ~/projects/guessit
cd ~/projects/guessit
```

Unzip the downloaded `guessit-setup.zip` into this folder.
After unzipping, you should see:

```
guessit/
├── CLAUDE.md
├── SETUP_GUIDE.md
├── .mcp.json
└── .claude/
    ├── hooks.json
    ├── agents/      (11 agent files)
    └── skills/      (14 skill folders)
```

### Step 2 — Initialize Git

```bash
cd ~/projects/guessit
git init
git add .
git commit -m "chore: initial project setup with agents and skills"
```

### Step 3 — Create a GitHub repository

```bash
# Using GitHub CLI (if installed):
gh repo create guessit --private --source=. --push

# Or manually: go to github.com → New Repository → "guessit" → Private
# Then:
git remote add origin https://github.com/YOUR_USERNAME/guessit.git
git push -u origin main
```

---

## PHASE 2: EXTERNAL SERVICES SETUP (20 minutes)

### Step 4 — Create your Supabase project

Go to https://supabase.com and sign in (free account).

Click "New Project" and fill in:
- **Name:** guessit
- **Database Password:** generate a strong one and save it somewhere safe
- **Region:** choose the closest to Israel (eu-central-1 Frankfurt is good)

Once created, go to **Settings → API** and copy these values:
- **Project URL** (looks like: `https://xxxxx.supabase.co`)
- **anon public key** (starts with `eyJ...`)
- **service_role key** (starts with `eyJ...`) — keep this SECRET

Then go to **Authentication → Providers → Google** and enable it:
- You'll need a Google OAuth Client ID and Secret
- Go to https://console.cloud.google.com → APIs & Services → Credentials → Create OAuth Client ID
- Application type: Web application
- Authorized redirect URI: `https://xxxxx.supabase.co/auth/v1/callback`
- Copy the Client ID and Client Secret back into Supabase

### Step 5 — Get your Odds API key

Go to https://the-odds-api.com and sign up for a free account.
Copy your API key from the dashboard. Free tier gives you 500 requests/month.

### Step 6 — Fill in your MCP configuration

Open `.mcp.json` in your project root and replace the placeholders:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://xxxxx.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJ..."
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}
```

For the GitHub token: go to https://github.com/settings/tokens → Generate new token (classic) → select `repo` scope.

**Important:** Add `.mcp.json` to your `.gitignore` to avoid pushing secrets.

---

## PHASE 3: SCAFFOLD THE APP WITH CLAUDE CODE (30 minutes)

### Step 7 — Open Claude Code

```bash
cd ~/projects/guessit
claude
```

Claude Code will start, read your `CLAUDE.md`, discover all your skills and agents,
and be ready to work as your full virtual team.

### Step 8 — Scaffold the Next.js project

Type this as your first prompt in Claude Code:

```
Scaffold the Next.js 15 project with TypeScript, Tailwind CSS, and shadcn/ui.
Use pnpm as package manager. Set up the folder structure as defined in CLAUDE.md.
Create the Supabase client utilities (server + browser clients).
Add the .env.example file with all required variables.
Do NOT set up auth yet — just the project skeleton.
```

Claude will create the full Next.js project. When done, verify it works:

```bash
# In a separate terminal (not Claude Code):
cd ~/projects/guessit
cp .env.example .env.local
# Fill in your actual Supabase keys and Odds API key in .env.local
pnpm dev
```

Open http://localhost:3000 — you should see a basic Next.js page.

### Step 9 — Set up the database schema

Back in Claude Code, type:

```
/cto-architect Design and create the complete database schema for GuessIt.
Include all tables from CLAUDE.md: profiles, groups, group_memberships,
tournaments, matches, predictions, scores, odds_cache, and analytics_events.
Use the Supabase MCP server to create the tables directly.
Include all indexes, foreign keys, and RLS policies.
```

Claude will use the CTO Architect agent and the Supabase MCP server to create
everything directly in your Supabase project. Review the output carefully.

### Step 10 — Set up Google Authentication

```
/backend-lead Set up Google OAuth using Supabase Auth.
Create the auth callback route, the login page with Google Sign-In button,
and the auth middleware that protects all dashboard routes.
Use the profiles table to store display_name and avatar_url from Google.
```

Test it by going to http://localhost:3000 and signing in with Google.

---

## PHASE 4: BUILD MVP FEATURES (use one prompt per feature)

### Step 11 — Plan Sprint 1

```
/product-manager Write the sprint 1 plan for the MVP.
Include: group creation (private with code), group joining,
match listing from a seed file, prediction submission, fixed scoring,
and basic leaderboard. Break each feature into tasks.
```

Review the sprint plan. Then build each feature one at a time:

### Step 12 — Groups feature

```
Build the complete groups feature:
1. Create Group page (name, type, scoring config)
2. Group detail page with member list
3. Join Group page (enter code or arrive via invite link)
4. Generate random 6-character invite code on group creation
5. Copy invite link button that copies the URL to clipboard
Follow the frontend-lead and backend-lead skill patterns.
```

### Step 13 — Matches feature

```
Build the matches feature:
1. Create a seed script that populates World Cup 2026 group stage matches
   (use placeholder teams for now, we'll update with real data later)
2. Match listing page showing upcoming matches for next 4 days
3. All matches page with all tournament matches grouped by date
4. Match card component showing teams, time, and prediction status
```

### Step 14 — Predictions feature

```
Build the prediction submission feature:
1. Prediction form with home/away score inputs (number steppers, not keyboard)
2. Submit prediction (locked to group + match + user)
3. Update prediction (allowed until kickoff only)
4. Show "locked" state after kickoff
5. RLS policy: users can only predict in groups they belong to
6. RLS policy: predictions lock at kickoff_time
```

### Step 15 — Scoring & Leaderboard

```
Build the scoring engine and leaderboard:
1. Implement calculateFixedScore as defined in the scoring-engine skill
2. Create the score calculation cron endpoint (/api/admin/calculate-scores)
3. Build the leaderboard page with rankings, points, correct predictions count
4. Use Supabase Realtime to make the leaderboard update live
5. Handle tie-breaking (same rank for equal points)
Follow the scoring-engine skill patterns exactly.
```

### Step 16 — Run tests

```
/qa-engineer Write comprehensive tests for:
1. Scoring engine (unit tests — this must be 100% coverage)
2. Prediction API route (integration tests)
3. Auth flow (E2E test)
4. Group create and join (E2E test)
Run the tests and fix any failures.
```

### Step 17 — Security review

```
/security-engineer Run the full pre-deployment security audit.
Check all RLS policies, API routes, env variables, and auth flow
against your security checklist. Report findings by severity.
```

Fix any CRITICAL or HIGH findings before proceeding.

---

## PHASE 5: DEPLOY (15 minutes)

### Step 18 — Set up Vercel

```bash
# Install Vercel CLI if not installed
pnpm add -g vercel

# Link your project
cd ~/projects/guessit
vercel link
```

Or go to https://vercel.com → Import Git Repository → select your guessit repo.

Set environment variables in the Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ODDS_API_KEY`
- `NEXT_PUBLIC_APP_URL` → your Vercel URL

### Step 19 — Deploy to staging

```
/deploy Deploy to staging and run the full deployment checklist.
```

Or manually:

```bash
git add .
git commit -m "feat: MVP ready for staging"
git push origin main
# Vercel auto-deploys on push to main
```

### Step 20 — Verify staging

Open your Vercel preview URL and test everything:
- Sign in with Google
- Create a group
- Share the invite link (open in incognito, sign in as different user, join)
- Submit predictions for a match
- Verify leaderboard shows both users ranked correctly

---

## PHASE 6: PHASE 2 FEATURES (after MVP is stable)

Once the MVP is running and you've tested it with a few friends, continue:

```
Build the odds-based scoring feature:
1. Implement the odds API integration as defined in the odds-api skill
2. Create the odds_cache refresh cron job (every 6 hours)
3. Implement calculateOddsScore as defined in the scoring-engine skill
4. Add scoring mode selector to group creation (fixed vs odds-based)
5. Display current odds on the prediction form
6. Show points breakdown on the leaderboard (how many points per match)
```

Then: public groups, virtual pot calculator, social sharing, push notifications.

---

## CHEAT SHEET: Agent Slash Commands

Use these anytime inside Claude Code:

| Command | What it does |
|---------|-------------|
| `/ceo-strategist` | Prioritize features, business decisions |
| `/cto-architect` | Database schema, API design, tech decisions |
| `/product-manager` | Write specs, plan sprints, define user stories |
| `/devops-engineer` | CI/CD, deployment, monitoring setup |
| `/frontend-lead` | Build React components and pages |
| `/backend-lead` | Build API routes and business logic |
| `/security-engineer` | Security audit, RLS review |
| `/qa-engineer` | Write and run tests |
| `/ux-designer` | User flows, accessibility review |
| `/deploy` | Run deployment checklist |
| `/data-analyst` | Define metrics, write analytics queries |

---

## TIPS FOR SUCCESS

**Commit often.** After each feature, commit with a descriptive message.
Claude Code can do this for you: "Commit all changes with a descriptive message."

**Test as you go.** After every feature, ask `/qa-engineer` to write tests.
Don't save all testing for the end.

**Security is not optional.** Run `/security-engineer` after each feature
that touches auth, data, or API routes.

**Keep CLAUDE.md updated.** As you make decisions (change a library,
add a pattern), update CLAUDE.md so Claude stays in sync.

**Use subagents for parallel work.** While coding a feature, you can spawn
a subagent to research, plan the next feature, or review previous work.

---

Good luck, Snir. Build something your friends will love. ⚽🏆
