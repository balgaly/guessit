# Week 1 Setup Instructions

This guide will help you complete the final steps of Week 1: configuring branch protection rules and running the labels setup script.

## Step 1: Run the Labels Setup Script

This script creates all necessary labels for the project.

### Prerequisites
1. Install GitHub CLI: https://cli.github.com/
2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

### Run the script
```bash
node scripts/setup-github-labels.js
```

**Expected output:**
```
🚀 Setting up GitHub labels for GuessIt...

✅ Created: priority:critical
✅ Created: priority:high
✅ Created: priority:medium
...
📊 Summary:
   Created: 26
   Skipped: 0 (already exist)
   Errors:  0
✅ All labels set up successfully!
```

---

## Step 2: Configure Branch Protection Rules

Branch protection rules must be configured via GitHub's web interface.

### Option A: Via GitHub Web UI (Recommended)

1. Go to your repository: https://github.com/balgaly/guessit
2. Click **Settings** (top right)
3. Click **Branches** (left sidebar, under "Code and automation")
4. Click **Add branch protection rule**
5. Configure as follows:

#### Branch name pattern
```
master
```

#### Protect matching branches

**✅ Require a pull request before merging**
- ✅ Require approvals: **1**
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ⬜ Require review from Code Owners (optional)
- ⬜ Require approval of the most recent reviewable push
- ⬜ Require conversation resolution before merging

**✅ Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging
- **Add the following status checks:**
  - `lint`
  - `typecheck`
  - `test`
  - `security-scan`
  - `dependency-review`

**Note:** These checks will only appear after running at least one CI workflow. You may need to create a test PR first, then come back to add these status checks.

**✅ Require conversation resolution before merging**

**⬜ Require signed commits** (optional, but recommended for security)

**⬜ Require linear history** (optional)

**❌ Do not allow bypassing the above settings** (keep unchecked)
- **Exception:** Add `balgaly` to the list of people who can bypass

**❌ Do not allow force pushes**

**❌ Do not allow deletions**

6. Click **Create** (bottom of page)

### Option B: Via GitHub CLI

Alternatively, use the GitHub CLI to configure branch protection:

```bash
gh api -X PUT /repos/balgaly/guessit/branches/master/protection \
  --input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "lint",
      "typecheck",
      "test",
      "security-scan",
      "dependency-review"
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1,
    "require_last_push_approval": false,
    "bypass_pull_request_allowances": {
      "users": ["balgaly"]
    }
  },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
EOF
```

---

## Step 3: Additional Repository Settings

### Enable required features

1. Go to **Settings** → **General**
2. Scroll to **Features**:
   - ✅ **Issues** (should already be enabled)
   - ✅ **Projects** (enable for kanban board)
   - ✅ **Discussions** (enable for community Q&A)
   - ⬜ **Wikis** (optional)

3. Scroll to **Pull Requests**:
   - ✅ **Allow squash merging** (recommended)
   - ✅ **Allow merge commits**
   - ⬜ **Allow rebase merging** (optional)
   - ✅ **Automatically delete head branches**

4. Scroll to **Pushes**:
   - ⬜ **Limit how many branches and tags can be updated in a single push** (optional)

### Configure Actions permissions

1. Go to **Settings** → **Actions** → **General**
2. Under "Fork pull request workflows from outside collaborators":
   - Select: **Require approval for first-time contributors**
   - This prevents supply chain attacks from untrusted contributors

---

## Step 4: Verification

### Check that everything is configured

1. **Labels created:**
   ```bash
   gh label list
   ```
   Should show 26+ labels

2. **Branch protection active:**
   ```bash
   gh api /repos/balgaly/guessit/branches/master/protection
   ```
   Should return protection rules JSON

3. **Workflows are present:**
   ```bash
   ls .github/workflows/
   ```
   Should show: `ci.yml`, `codeql.yml`, `dependency-review.yml`, `pr-labeler.yml`, `license-compliance.yml`

4. **Templates are present:**
   ```bash
   ls .github/ISSUE_TEMPLATE/
   ls .github/PULL_REQUEST_TEMPLATE.md
   ```

---

## Step 5: Test the Setup

### Create a test PR

1. Create a test branch:
   ```bash
   git checkout -b test/week1-verification
   ```

2. Make a small change (e.g., update README.md)

3. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify Week 1 CI/CD setup"
   git push origin test/week1-verification
   ```

4. Create a PR:
   ```bash
   gh pr create --title "test: Week 1 CI/CD verification" --body "Testing Week 1 setup"
   ```

5. **Verify:**
   - PR template auto-filled ✅
   - CI workflows triggered ✅
   - Status checks appear in PR ✅
   - Labels can be added manually ✅

6. Close the test PR (don't merge):
   ```bash
   gh pr close <PR number>
   git checkout master
   git branch -D test/week1-verification
   ```

---

## Week 1 Complete! 🎉

You've successfully set up:
- ✅ 5 GitHub Actions workflows (CI, CodeQL, dependency review, PR labeler, license compliance)
- ✅ Dependabot configuration
- ✅ Issue templates (feature, bug)
- ✅ PR template with comprehensive checklist
- ✅ CODEOWNERS file
- ✅ 26 GitHub labels
- ✅ Branch protection rules

**Next:** Proceed to Week 2 - Ticket Migration to GitHub Issues

---

## Troubleshooting

### Labels script fails
- **Error:** `gh: command not found`
  - **Solution:** Install GitHub CLI: https://cli.github.com/
- **Error:** `gh auth status` fails
  - **Solution:** Run `gh auth login` and follow prompts

### Branch protection can't be enabled
- **Error:** "Status checks not found"
  - **Solution:** Run at least one CI workflow first (create a test PR), then add status checks

### Workflows don't trigger
- **Error:** Workflows don't run on PR
  - **Solution:** Check **Settings** → **Actions** → **General** → Ensure "Allow all actions" is selected

---

For more help, see:
- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
