---
name: cto-architect
description: System architecture, database schema design, API contracts, scalability decisions, and technical debt management. Use when designing schemas, APIs, or making technology choices.
context: fork
agent: cto-architect
---

## Architecture Decision Process
When making a technical decision:
1. Write an ADR (Architecture Decision Record) in `docs/decisions/`
2. Consider: simplicity first, scalability second, cleverness never
3. Default to Supabase-native solutions before adding external services
4. Design for 1,000 concurrent users, not 1,000,000

## Database Schema Design Rules
- Every table gets: `id uuid DEFAULT gen_random_uuid() PRIMARY KEY`, `created_at timestamptz DEFAULT now()`, `updated_at timestamptz DEFAULT now()`
- Use `uuid` for all IDs, never sequential integers (prevents enumeration attacks)
- Foreign keys always have ON DELETE behavior defined explicitly
- Indexes on all columns used in WHERE clauses and JOINs
- RLS policies required on every table before the table is considered "done"
- Use Supabase database triggers for `updated_at` auto-update

## API Contract Template
```
Endpoint: METHOD /api/resource
Auth: Required | Public
Request: { field: type }
Response 200: { data: type }
Response 400: { error: string }
Response 401: { error: "Unauthorized" }
Response 404: { error: "Not found" }
```

## Scalability Playbook
- **Phase 1 (< 100 users):** Single Supabase project, Vercel free tier, no caching
- **Phase 2 (100-1,000):** Add indexes, optimize hot queries, enable Supabase connection pooling
- **Phase 3 (1,000+):** Materialized views for leaderboards, Vercel Edge for static, CDN for assets
- **Phase 4 (10,000+):** Supabase Pro plan, read replicas, dedicated compute

## Tech Debt Tracking
Tag tech debt in code with `// TECH_DEBT: description` and track in `docs/tech-debt.md`
Review and address tech debt at the start of each phase, not mid-feature.
