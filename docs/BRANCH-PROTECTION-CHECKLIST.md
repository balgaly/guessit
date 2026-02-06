# Branch Protection Configuration Checklist

Since API access is restricted, configure branch protection manually via GitHub web UI.

## Quick Verification

Visit: https://github.com/balgaly/guessit/settings/branches

**Is there a rule for `master`?**
- ✅ Yes → Skip to "Verify Configuration" section below
- ❌ No → Follow "Setup Instructions" section below

---

## Setup Instructions (if no rule exists)

1. Go to: https://github.com/balgaly/guessit/settings/branches
2. Click **"Add branch protection rule"**
3. Enter branch name pattern: `master`
4. Configure the following settings:

### Required Settings

**✅ Check: "Require a pull request before merging"**
- Set "Required approvals" to: **1**
- ✅ Check: "Dismiss stale pull request approvals when new commits are pushed"
- ✅ Check: "Require conversation resolution before merging"

**✅ Check: "Require status checks to pass before merging"**
- ✅ Check: "Require branches to be up to date before merging"
- **Add these status checks** (type each and press Enter):
  - `lint`
  - `typecheck`
  - `test`
  - `security-scan`
  - `dependency-review`

  **Note:** If status checks don't appear in the search, you need to:
  1. Create a test PR first (any small change)
  2. Wait for workflows to run
  3. Come back and add the status checks

**❌ UNCHECK: "Do not allow bypassing the above settings"**
- Then add `balgaly` to bypass list

**❌ UNCHECK: "Allow force pushes"**
**❌ UNCHECK: "Allow deletions"**

5. Click **"Create"** at the bottom

---

## Verify Configuration

Go to: https://github.com/balgaly/guessit/settings/branches

You should see a rule for `master` with:

### Protection Settings
- [x] Require pull request reviews before merging (1 approval)
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Status checks: `lint`, `typecheck`, `test`, `security-scan`, `dependency-review`
- [x] Require conversation resolution before merging
- [ ] Do not allow bypassing (with @balgaly in bypass list)
- [x] Block force pushes
- [x] Block branch deletions

### Additional Settings

Also verify in **Settings → Actions → General**:
- "Fork pull request workflows from outside collaborators"
  - Should be: **"Require approval for first-time contributors"**

---

## Manual Test

1. Create a test branch:
   ```bash
   git checkout -b test/branch-protection
   echo "Test" >> README.md
   git add README.md
   git commit -m "test: verify branch protection"
   git push origin test/branch-protection
   ```

2. Try to push directly to master (should fail):
   ```bash
   git checkout master
   echo "Test" >> README.md
   git add README.md
   git commit -m "test: this should fail"
   git push origin master
   ```

   **Expected result:**
   ```
   remote: error: GH006: Protected branch update failed
   ```

3. Create a PR instead:
   ```bash
   gh pr create --title "test: branch protection" --body "Testing"
   ```

4. Try to merge without approvals (should be blocked by GitHub UI)

5. Clean up:
   ```bash
   gh pr close --delete-branch
   git checkout master
   ```

---

## Status Check Configuration Timing

**Important:** Status checks (`lint`, `typecheck`, etc.) will only appear in the branch protection UI **after** you've run at least one workflow.

**To enable status checks:**
1. Complete branch protection setup WITHOUT status checks first
2. Create a test PR (triggers workflows)
3. Wait for workflows to complete
4. Go back to branch protection settings
5. Edit the rule and add status checks (they'll now appear in search)

---

## Verification Command

After configuration, run:
```bash
curl -H "Authorization: token $(gh auth token)" \
  https://api.github.com/repos/balgaly/guessit/branches/master/protection \
  2>/dev/null | grep -q "required_pull_request_reviews" && echo "✅ Configured" || echo "❌ Not configured"
```

---

## Week 1 Complete

Once branch protection is configured, Week 1 is **100% complete**!

Ready to proceed to Week 2: Ticket Migration 🚀
