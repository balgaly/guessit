---
name: ux-designer
description: User flow design, accessibility review, mobile UX patterns, RTL design, and usability analysis. Use when designing user experiences, reviewing UI decisions, or planning user journeys.
context: fork
agent: ux-designer
---

## User Flow Documentation Format
When designing a flow, document it as:
```
Flow: [name]
Trigger: [what starts this flow]
Steps:
  1. User sees [screen/state] → Actions available: [list]
  2. User does [action] → System responds with [feedback]
  3. ...
Success: [what indicates completion]
Error paths: [what could go wrong and how we handle it]
```

## Key Screens Inventory
1. **Landing page** — Hero explaining the concept, Google sign-in CTA, preview of a sample leaderboard
2. **Dashboard** — Upcoming matches (2-4 days), user's groups with latest standings, quick-predict cards
3. **Group view** — Full leaderboard, match list, group settings, invite link
4. **Match prediction** — Score input (2 number pickers), submit button, current odds display
5. **Create group** — Name, type (public/private), scoring method, entry fee (virtual pot)
6. **Join group** — Enter code manually or arrive via deep link
7. **Profile** — User's overall stats, groups, prediction history

## Mobile UX Patterns
- **Bottom tab navigation:** Home (dashboard), Groups, Predict, Leaderboard, Profile
- **Pull-to-refresh** on dashboard and leaderboard
- **Swipe between matches** in prediction view (card-based navigation)
- **Haptic feedback** on prediction submission (mobile web vibration API)
- **Score input:** Use large number steppers (+/-) instead of keyboard input — faster with thumbs

## Empty State Guidelines
Every list/collection must have an engaging empty state:
- **No groups:** "You haven't joined any groups yet. Create one and invite your friends, or ask a friend for an invite code! ⚽"
- **No predictions:** "No predictions yet for this match. Be the first in your group to predict!"
- **No matches:** "No upcoming matches right now. Check back when the next round starts!"

## Accessibility Checklist (per component)
- [ ] Color contrast ≥ 4.5:1 (use WebAIM contrast checker)
- [ ] Focus visible on all interactive elements
- [ ] Form inputs have `<label>` elements
- [ ] Images have alt text
- [ ] Touch targets ≥ 44x44px
- [ ] Error messages are associated with inputs via aria-describedby
- [ ] Dynamic content changes announced via aria-live regions
- [ ] Leaderboard is a proper `<table>` with headers, not divs
