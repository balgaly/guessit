# [GI-036] Push Notifications System (Phase 2)

**Priority:** low
**Assigned Agent:** backend-lead, frontend-lead
**Status:** todo
**Created:** 2026-02-06

## Description
Implement push notifications for match reminders and results to re-engage users.

## Acceptance Criteria
- [ ] Web Push API integration (service worker)
- [ ] Notification preferences page (user can enable/disable)
- [ ] Match reminder notifications (1 hour before kickoff)
- [ ] Score update notifications (when match ends)
- [ ] Leaderboard position change notifications
- [ ] Service worker setup for background notifications
- [ ] Push subscription stored in database
- [ ] Backend cron job to send notifications

## Related Files
- `public/sw.js` — Service worker
- `src/app/(dashboard)/settings/notifications/page.tsx` — Notification preferences
- `src/app/api/admin/send-notifications/route.ts` — Cron job for sending
- `src/lib/notifications/push.ts` — Push notification utilities

## Technical Notes
- Use Web Push API (browser-native)
- Store push subscriptions in a new `push_subscriptions` table
- Use Vercel Cron to check for upcoming matches and send reminders
- Test on multiple browsers (Chrome, Firefox, Safari)
- Handle permission prompts gracefully
- Include notification icons and badges

## Dependencies
- Blocked by: GI-013 (score calculation)
