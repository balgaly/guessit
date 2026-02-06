# GuessIt Backlog System

This directory contains all development tickets for the GuessIt project, organized by status and managed as markdown files in Git.

## Overview

The backlog system uses **markdown files as tickets**, organized into folders by status. This approach:
- ✅ Keeps all project context in the repository
- ✅ Allows Claude Code agents to read, create, and update tickets programmatically
- ✅ Provides full version control history of all tasks
- ✅ Enables offline access to the backlog
- ✅ Integrates seamlessly with Git workflows

## Directory Structure

```
docs/backlog/
├── README.md           # This file
├── todo/               # Tickets ready to be worked on
├── in-progress/        # Tickets currently being implemented
└── done/               # Completed tickets (for reference)
```

## Ticket Format

Each ticket is a markdown file named with the pattern:

```
GI-{number}-{short-slug}.md
```

**Examples:**
- `GI-001-setup-auth.md`
- `GI-042-predictions-form.md`
- `GI-123-odds-caching.md`

**GI** stands for **GuessIt** — our project identifier.

### Ticket Template

```markdown
# [GI-XXX] Ticket Title

**Priority:** `critical` | `high` | `medium` | `low`
**Assigned Agent:** `agent-name`
**Status:** `todo` | `in-progress` | `done`
**Created:** YYYY-MM-DD

## Description
Clear description of what needs to be done and why it matters.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Related Files
- `src/path/to/file.ts`
- `docs/related-doc.md`

## Technical Notes (Optional)
Any implementation details, constraints, or considerations.

## Dependencies (Optional)
- Blocked by: GI-XXX
- Blocks: GI-YYY

## Resolution (Filled when completed)
**Completed:** YYYY-MM-DD
**PR:** #123
**Notes:** Brief summary of what was done.
```

## Status Workflow

Tickets move through three states:

1. **todo/** — Ready to be worked on
2. **in-progress/** — Currently being implemented
3. **done/** — Completed and merged

### Moving Tickets

**Manual:**
```bash
# Move ticket to in-progress when you start working
mv docs/backlog/todo/GI-042-predictions-form.md docs/backlog/in-progress/

# Move ticket to done when merged
mv docs/backlog/in-progress/GI-042-predictions-form.md docs/backlog/done/
```

**Using the backlog-manager skill:**
```bash
/backlog-manager move GI-042 in-progress
/backlog-manager move GI-042 done
```

## Priority Labels

Tickets use priority labels to indicate urgency:

- **`priority:critical`** — Blocking release, security issue, or data loss risk
- **`priority:high`** — Important feature or bug affecting core functionality
- **`priority:medium`** — Standard feature or improvement
- **`priority:low`** — Nice-to-have, refactoring, or minor enhancement

## Agent Assignment

Each ticket specifies which agent should handle it:

| Agent | Responsibility |
|-------|---------------|
| `backend-lead` | API routes, database queries, business logic |
| `frontend-lead` | React components, pages, UI implementation |
| `devops-engineer` | CI/CD, deployment, infrastructure |
| `security-engineer` | Auth, RLS policies, vulnerability fixes |
| `qa-engineer` | Test writing, test strategy |
| `product-manager` | Feature specs, user stories |
| `cto-architect` | Database schema, system design |
| `data-analyst` | Analytics, metrics, dashboards |

## Creating Tickets

### Manual Creation

1. Copy the ticket template above
2. Choose the next available ticket number (check highest existing number)
3. Write a descriptive slug (short-description-with-hyphens)
4. Fill in all required fields
5. Save as `docs/backlog/todo/GI-{number}-{slug}.md`

### Using the backlog-manager skill

```bash
# Create a ticket from a description
/backlog-manager create ticket: "Add group invite link generation"

# Scan codebase for TODOs and create tickets
/backlog-manager scan

# Generate a backlog report
/backlog-manager report
```

## Backlog Manager Commands

The `/backlog-manager` skill provides these commands:

### 1. Create Ticket
```bash
/backlog-manager create ticket: "Description of the task"
```
Creates a new ticket in `todo/` with auto-generated ID and defaults.

### 2. Move Ticket
```bash
/backlog-manager move GI-042 in-progress
/backlog-manager move GI-042 done
```
Moves a ticket between status folders.

### 3. Scan for TODOs
```bash
/backlog-manager scan
```
Searches the codebase for `// TODO:`, `// FIXME:`, `// TECH_DEBT:`, and `// HACK:` comments and generates tickets for them.

### 4. Generate Report
```bash
/backlog-manager report
```
Produces a summary of all tickets by priority and status.

### 5. Sprint Planning
```bash
/backlog-manager plan sprint
```
Selects tickets from the backlog for the next sprint based on priority and dependencies.

### 6. Close Ticket
```bash
/backlog-manager close GI-042 --pr 123
```
Marks a ticket as done, adds resolution notes, and moves it to `done/`.

## Best Practices

### For Contributors

1. **Always pick from `todo/`** — Don't create your own tickets unless you've found a bug or gap
2. **Move tickets immediately** — When you start working, move to `in-progress/` right away
3. **Update acceptance criteria** — Check off items as you complete them
4. **Link PRs** — When you create a PR, reference the ticket: "Closes GI-042"
5. **Add resolution notes** — When done, briefly summarize what was implemented

### For Agents

1. **Create tickets for gaps** — When you identify missing features or tech debt, create a ticket
2. **Use descriptive slugs** — The filename should be readable and meaningful
3. **Be specific in acceptance criteria** — Make it clear what "done" means
4. **Assign to the right agent** — Consider who is best suited to implement
5. **Check for duplicates** — Search existing tickets before creating a new one

### For Maintainers

1. **Review `in-progress/` regularly** — Check for stale tickets that might be blocked
2. **Archive old `done/` tickets** — Periodically move very old done tickets to an archive
3. **Update priorities** — Adjust priorities as business needs change
4. **Refine tickets** — Add context or clarify requirements when contributors ask questions

## Searching Tickets

**Find all high-priority tickets:**
```bash
grep -r "priority:high" docs/backlog/todo/
```

**Find tickets assigned to frontend-lead:**
```bash
grep -r "Assigned Agent: frontend-lead" docs/backlog/todo/
```

**Find tickets mentioning "auth":**
```bash
grep -ri "auth" docs/backlog/todo/
```

**Or use Claude Code:**
```bash
/backlog-manager list --priority high
/backlog-manager list --agent frontend-lead
```

## Integration with GitHub Issues

**Note:** We use GitHub Issues for **external bug reports** and **feature requests** from the community, but **internal development tracking** happens in this backlog system.

When a GitHub Issue is approved for development:
1. Create a corresponding ticket in `docs/backlog/todo/`
2. Reference the GitHub Issue number in the ticket description
3. Close the GitHub Issue with a comment linking to the backlog ticket

## FAQ

**Q: Why not use GitHub Issues for everything?**
A: GitHub Issues are great for community interaction, but this backlog system:
- Integrates better with Claude Code agents (they can read/write markdown easily)
- Keeps all context in the repo (works offline)
- Allows fine-grained agent assignment and workflow customization
- Provides full version control history

**Q: Can I still use GitHub Projects?**
A: Yes! You can create a GitHub Project that syncs with this backlog for visualization. The backlog files are the source of truth.

**Q: What if I find a bug while working?**
A: Create a new ticket with `priority:high`, add a `bug` label in the description, and decide if it's blocking your current work.

**Q: Should I delete done tickets?**
A: No, keep them in `done/` for reference. We'll periodically archive very old tickets (>6 months) to a separate folder.

**Q: How do I see what everyone is working on?**
A: Check `docs/backlog/in-progress/` or run `/backlog-manager report`.

---

**Ready to contribute?** Pick a ticket from [`todo/`](./todo/) and get started! 🚀
