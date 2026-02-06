# [GI-041] Privacy Policy and Terms of Service

**Priority:** high (for SaaS launch)
**Assigned Agent:** product-manager
**Status:** todo
**Created:** 2026-02-06

## Description
Create Privacy Policy and Terms of Service documents required for SaaS launch and legal compliance.

## Acceptance Criteria
- [ ] Privacy Policy document created (`docs/legal/privacy-policy.md`)
- [ ] Terms of Service document created (`docs/legal/terms-of-service.md`)
- [ ] GDPR compliance documentation
- [ ] Data retention policy defined
- [ ] User rights documentation (access, delete, export)
- [ ] Links in footer of app
- [ ] Public pages: `/privacy` and `/terms`

## Related Files
- `docs/legal/privacy-policy.md` — Privacy policy
- `docs/legal/terms-of-service.md` — Terms of service
- `src/app/(public)/privacy/page.tsx` — Privacy policy page
- `src/app/(public)/terms/page.tsx` — Terms of service page
- `src/components/layout/footer.tsx` — Add links to footer

## Technical Notes
- Use legal templates as starting point (Termly, iubenda, etc.)
- Customize for GuessIt's specific data handling
- Include: what data we collect, how we use it, who we share with, user rights
- GDPR requirements: right to access, right to delete, right to export
- Consult with a lawyer before launch (not a blocker for MVP)

## Dependencies
- None (can be done anytime, but required before public SaaS launch)
