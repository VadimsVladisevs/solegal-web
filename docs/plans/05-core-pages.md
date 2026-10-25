# 05 — Core pages

**Status:** 📝 Draft
**Depends on:** 04
**Milestone:** M2

## Goal

All core pages implemented in 3 locales, using demo content from the content layer.

## Scope

- **Home:** hero, short company intro, highlighted services, call to action to contact
- **About:** company info, values, (team?)
- **Services:** list page + detail page per service
- **Contacts:** address, phone, email, working hours, map link; optional contact form
- **404 page**
- Demo content in `en`, `lv`, `ru`

**Out of scope:** Partners (step 08), SEO tags (step 06).

## Tasks

- [ ] Define page sections and the content fields each needs
- [ ] Write demo content for all 3 locales
- [ ] Home page
- [ ] About page
- [ ] Services list + detail pages
- [ ] Contacts page
- [ ] 404 page
- [ ] Playwright: every page × locale renders

## Done when

- Every page renders in `en`, `lv` and `ru` in the built site
- All text comes from dictionaries or the content layer
- Lint, typecheck, unit and e2e tests pass

## Open questions for discussion

- Final page list and sections per page
- Should About include a team/lawyers section?
- Contact form: none, a third-party service, or a `mailto:` link?
- Map: an embedded map, or a link to Google Maps?
- Real content or placeholder text for the demo?

## Decisions log

_Empty — fill in during discussion._
