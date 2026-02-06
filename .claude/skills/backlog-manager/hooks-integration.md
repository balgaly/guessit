# Backlog Manager Hooks Integration

This document describes how Claude Code hooks can be integrated with the backlog manager system to automatically remind developers to maintain the backlog.

## Overview

Claude Code supports [hooks](https://docs.anthropic.com/claude/docs/claude-code-hooks) — shell commands that run in response to events like file saves or tool calls. The backlog manager can leverage hooks to:
- Remind developers to scan for TODOs after writing code
- Automatically create tickets when TODO comments are added
- Update ticket status when PRs are created or merged

## Proposed Hooks

### 1. Post-Edit Hook (Scan for TODOs)

**Trigger:** After a developer edits a file
**Action:** Remind them to check for new TODOs

**Hook Configuration (`.claude/hooks/post-edit.sh`):**
```bash
#!/bin/bash

# Check if the edited file contains new TODO comments
if grep -q "// TODO:" "$EDITED_FILE" || grep -q "// FIXME:" "$EDITED_FILE"; then
  echo "⚠️  Detected TODO comment in $EDITED_FILE"
  echo "💡 Run '/backlog-manager scan' to create tickets for TODOs"
fi
```

**Note:** This hook runs locally and is optional. Developers can enable it if they want automated reminders.

### 2. Post-Commit Hook (Scan for TODOs)

**Trigger:** After a git commit
**Action:** Scan the codebase and suggest creating tickets

**Hook Configuration (`.git/hooks/post-commit`):**
```bash
#!/bin/bash

# Run the backlog manager scan automatically
echo "🔍 Scanning for TODOs..."
claude-code run "/backlog-manager scan"

# Alternatively, just remind the developer
echo "💡 Remember to run '/backlog-manager scan' to update the backlog"
```

### 3. Pre-PR Hook (Backlog Status Check)

**Trigger:** Before creating a pull request
**Action:** Remind the developer to update their ticket status

**Hook Configuration (`.claude/hooks/pre-pr.sh`):**
```bash
#!/bin/bash

# Parse the PR title or branch name to extract ticket ID
BRANCH=$(git branch --show-current)
TICKET_ID=$(echo "$BRANCH" | grep -oP 'GI-\d+')

if [ -n "$TICKET_ID" ]; then
  echo "🎫 Detected ticket: $TICKET_ID"
  echo "💡 Don't forget to move it to 'done' after merging:"
  echo "   /backlog-manager close $TICKET_ID --pr <PR_NUMBER>"
else
  echo "⚠️  No ticket ID found in branch name"
  echo "💡 Consider referencing a ticket (e.g., GI-042) in your PR description"
fi
```

## Future Enhancements

### Automatic Ticket Creation

Instead of just reminding developers, hooks could automatically create tickets:

```bash
#!/bin/bash

# Extract TODO comments from staged files
git diff --cached | grep "// TODO:" | while read -r line; do
  echo "Creating ticket for: $line"
  claude-code run "/backlog-manager create ticket: $line"
done
```

**Trade-offs:**
- **Pros:** Zero-friction backlog maintenance
- **Cons:** May create too many low-priority tickets; developers lose control

**Recommendation:** Start with reminders, not automation. Let developers decide when to create tickets.

### Integration with GitHub Issues

When a GitHub Issue is created, automatically generate a backlog ticket:

```bash
#!/bin/bash

# Listen for new GitHub Issues (via webhook or GitHub Actions)
# Parse the issue and create a ticket
claude-code run "/backlog-manager create ticket: [Issue #$ISSUE_NUMBER] $ISSUE_TITLE"
```

### Slack Notifications

Send a Slack message when a ticket is moved to "done":

```bash
#!/bin/bash

# After closing a ticket
TICKET_ID=$1
curl -X POST https://hooks.slack.com/services/YOUR_WEBHOOK \
  -d "{\"text\": \"✅ $TICKET_ID completed by $USER\"}"
```

## Configuration

### Enable Hooks (Optional)

Hooks are opt-in. Developers can enable them by:

1. Create a hooks directory: `mkdir -p .claude/hooks`
2. Add hook scripts (e.g., `post-edit.sh`, `pre-pr.sh`)
3. Make them executable: `chmod +x .claude/hooks/*.sh`
4. Configure Claude Code to run hooks (see [docs](https://docs.anthropic.com/claude/docs/claude-code-hooks))

### Team Guidelines

For teams using the backlog system:
- **Recommended:** Enable the post-commit reminder hook (non-intrusive)
- **Optional:** Enable automatic TODO scanning (some developers prefer manual control)
- **Not recommended:** Fully automated ticket creation (can spam the backlog)

## Example Workflow

**Scenario:** A developer is working on a feature and writes a TODO comment.

1. **Developer writes code:**
   ```typescript
   // TODO: Add input validation for email format
   const email = req.body.email;
   ```

2. **Saves the file** → Post-edit hook detects the TODO:
   ```
   ⚠️  Detected TODO comment in src/app/api/auth/route.ts
   💡 Run '/backlog-manager scan' to create tickets for TODOs
   ```

3. **Developer finishes work and commits** → Post-commit hook runs:
   ```
   🔍 Scanning for TODOs...
   Found 1 new TODO:
   - src/app/api/auth/route.ts:42: Add input validation for email format

   Created GI-043: TODO - Add input validation for email format
   Assigned to: backend-lead
   ```

4. **Developer creates a PR** → Pre-PR hook reminds:
   ```
   🎫 Detected ticket: GI-042
   💡 Don't forget to move it to 'done' after merging:
      /backlog-manager close GI-042 --pr 123
   ```

5. **PR is merged** → Developer runs:
   ```
   /backlog-manager close GI-042 --pr 123
   ```

## Implementation Notes

- Hooks are **local** by default (each developer configures their own)
- To share hooks across the team, commit them to `.claude/hooks/` and document in CONTRIBUTING.md
- Claude Code hooks run in the same environment as the CLI (access to tools, agents, etc.)
- Hooks can invoke agents directly: `claude-code run "/backlog-manager scan"`

## Status

**Current:** Hooks are not yet implemented (documentation only).
**Next Steps:**
1. Discuss with team: which hooks would be most valuable?
2. Implement a post-commit reminder hook (low-risk, high-value)
3. Test with a small group of developers
4. Iterate based on feedback

## References

- [Claude Code Hooks Documentation](https://docs.anthropic.com/claude/docs/claude-code-hooks)
- [Git Hooks Guide](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Backlog Manager Skill](./SKILL.md)
