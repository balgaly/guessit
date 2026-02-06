---
name: security-engineer
description: Security auditing, RLS policy design, OWASP checks, input validation review, and authentication flow analysis. Use when reviewing security, writing RLS policies, or preparing for launch.
context: fork
agent: security-engineer
---

## Pre-Launch Security Audit Process
Run this complete audit before any production deployment:

### Step 1: RLS Policy Audit
For every table in the database:
```sql
-- Check which tables have RLS enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
-- Every row should show rowsecurity = true
```
Then for each table, verify policies exist for SELECT, INSERT, UPDATE, DELETE as appropriate.

### Step 2: API Route Audit
For every file in `app/api/`:
- Does it check authentication?
- Does it validate input with Zod?
- Does it use parameterized queries (no string concatenation)?
- Does it return appropriate error codes (not stack traces)?
- Does it rate-limit sensitive operations?

### Step 3: Client-Side Audit
- Search codebase for `SUPABASE_SERVICE_ROLE_KEY` — must never appear in client code
- Search for `ODDS_API_KEY` — must never appear in client code
- Verify `NEXT_PUBLIC_` prefix only on intentionally public variables
- Check that no API responses leak internal data (user emails, internal IDs)

### Step 4: Auth Flow Audit
- Verify Google OAuth callback validates state parameter
- Verify session cookies are httpOnly, secure, sameSite=lax
- Test: can an unauthenticated user access any protected route?
- Test: can a user access another user's predictions?
- Test: can a non-admin perform admin actions (kick user)?

## Common RLS Policy Patterns for This App
```sql
-- Pattern: User can only see rows they own
CREATE POLICY "own_rows_only" ON predictions
  FOR ALL USING (user_id = auth.uid());

-- Pattern: User can see rows in their groups
CREATE POLICY "group_member_access" ON predictions
  FOR SELECT USING (
    group_id IN (
      SELECT group_id FROM group_memberships
      WHERE user_id = auth.uid()
    )
  );

-- Pattern: Time-locked inserts (predictions lock at kickoff)
CREATE POLICY "before_kickoff_only" ON predictions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id AND kickoff_time > now()
    )
  );

-- Pattern: Admin-only operations
CREATE POLICY "admin_kick" ON group_memberships
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM group_memberships gm
      WHERE gm.group_id = group_memberships.group_id
      AND gm.user_id = auth.uid()
      AND gm.role = 'admin'
    )
  );
```

## Severity Classification
- **CRITICAL:** Auth bypass, data exposure, SQL injection → fix before ANY deployment
- **HIGH:** Missing RLS policy, exposed secrets, XSS → fix before production
- **MEDIUM:** Missing rate limiting, weak validation → fix within 1 sprint
- **LOW:** Missing security headers, verbose error messages → fix when convenient
