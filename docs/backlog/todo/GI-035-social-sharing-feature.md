# [GI-035] Social Sharing Feature (Phase 2)

**Priority:** low
**Assigned Agent:** frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Allow users to share predictions and leaderboard standings on social media to increase engagement and virality.

## Acceptance Criteria
- [ ] Share buttons on leaderboard page
- [ ] Share to Twitter, Facebook, WhatsApp
- [ ] Generate shareable images (leaderboard standings, personal stats)
- [ ] Copy link to clipboard functionality
- [ ] Open Graph meta tags for rich previews
- [ ] Twitter Card meta tags
- [ ] Share text templates (pre-filled messages)

## Related Files
- `src/components/features/sharing/share-button.tsx` — Share button component
- `src/app/(dashboard)/groups/[groupId]/share/route.ts` — Generate shareable images (optional)
- `src/app/layout.tsx` — Add Open Graph meta tags

## Technical Notes
- Use Web Share API for native sharing on mobile
- Fallback to custom share modal on desktop
- Generate shareable images with canvas or libraries like `html-to-image`
- Share text example: "I'm #1 in my World Cup prediction group! 🏆 Join us: [link]"
- Include UTM parameters for analytics

## Dependencies
- Blocked by: GI-015 (leaderboard)
