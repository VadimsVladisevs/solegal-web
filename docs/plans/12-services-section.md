# 12 — Services section

**Status:** ✅ Done
**Depends on:** 05
**Milestone:** M2

## Goal

Add a Services section to the one-page site that lists the firm's services in all 3 locales, with dummy content for now.

## Scope

- A `Service` content type through the content layer (title, description)
- A Services section on the home page, between About and Team
- A navigation entry
- Responsive per [Mobile & responsive](../design.md#mobile--responsive)

## Tasks

- [x] `Service` content type + `getServices` in the content layer
- [x] 6 demo services in 3 locales
- [x] Dictionary strings (nav link, section label and title)
- [x] `ServicesSection` component, wired into the home page
- [x] Navigation entry
- [x] Tests (unit + e2e)

## Done when

- The Services section renders in all 3 locales and all design variants with 6 demo services
- The header and mobile menu link to `#services`
- Lint, typecheck, unit and e2e tests pass

## Open questions for discussion

_None; see the Decisions log._

## Decisions log

Discussed 2026-10-28:

- **Placement:** after About: Hero → About → Services → Team → Contact.
- **Item shape:** a title and a short description. No icons.
- **Count:** 6 demo services per locale (3 columns × 2 rows on desktop). Titles are realistic placeholders; descriptions are lorem ipsum.
- **Look:** a white (`surface`) band with a top border in every design variant, so the section needs no per-variant treatment.
