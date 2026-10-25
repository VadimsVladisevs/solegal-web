# 05 — Core pages

**Status:** 📝 Draft
**Depends on:** 04
**Milestone:** M2

## Goal

The one-page site implemented in 3 locales and 3 design variants, using demo content from the content layer.

## Scope

See [design.md](../design.md) for sections, content fields and variants.

- **One page** per locale, with sections Hero/Main → About → Team (3 members) → Contact (email + phone)
- **Design variants** A / B / C at `/{lang}/`, `/{lang}/b`, `/{lang}/c`, plus the floating design switcher
- **404 page**
- Demo content (lorem ipsum / dummy data) in `en`, `lv`, `ru`

**Out of scope:** Partners (step 08), SEO tags (step 06), removing the losing variants (step 11).

## Tasks

- [ ] Write demo content for all 3 locales (site settings, 3 team members, contact info)
- [ ] Hero section
- [ ] About section
- [ ] Team section
- [ ] Contact section
- [ ] Variant routes `b` and `c` + design switcher
- [ ] 404 page
- [ ] Playwright: every page × locale × variant renders

## Done when

- Every page renders in `en`, `lv` and `ru` in the built site
- All text comes from dictionaries or the content layer
- Lint, typecheck, unit and e2e tests pass

## Open questions for discussion

- Anything else to settle before implementation (e.g. anchor offsets under the sticky header)?

## Decisions log

From step 02 (2026-10-25):

- Single scrolling page instead of separate Home/About/Services/Contacts pages; Services dropped for now.
- About includes a Team section with 3 members (placeholder photos).
- Contact shows email and phone only (`mailto:` / `tel:` links); no form, map, address or hours.
- Placeholder (lorem ipsum / dummy) content for the demo.
- Three design variants are built for customer review; see [11](11-final-design-variant.md) for removal.

From step 04 (2026-10-25):

- The anchor offset under the sticky header is handled in step 04 (`scroll-padding-top`).
