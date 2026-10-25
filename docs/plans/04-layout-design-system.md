# 04 — Layout & design system

**Status:** 📝 Draft
**Depends on:** 02, 03
**Milestone:** M2

## Goal

Implement the approved design as Tailwind theme tokens and a small set of reusable layout and UI components.

## Scope

- Theme tokens from `docs/design.md` in `app/styles/app.css`
- Fonts loaded with Latvian and Cyrillic subsets
- Layout: header with anchor navigation, mobile menu, footer, page container
- Language switcher UI (keeps the current design variant)
- `variant: "a" | "b" | "c"` support in header and section styling, as described in `docs/design.md`
- Logo component from `docs/images/logo*.svg`
- Base components: Button/Link, Section, Card, Heading, Container
- Responsive (mobile-first) and accessible (keyboard navigation, focus states, skip link, WCAG AA contrast)

**Out of scope:** page content (step 05).

## Tasks

- [ ] Add theme tokens
- [ ] Set up fonts
- [ ] Header, navigation and mobile menu
- [ ] Footer
- [ ] Language switcher
- [ ] Base components
- [ ] Component tests (nav, switcher, mobile menu)
- [ ] Accessibility check (keyboard, axe)

## Done when

- The layout matches the approved design on mobile, tablet and desktop
- No hardcoded colors or fonts outside the theme
- Component tests pass; axe reports no serious or critical issues

## Open questions for discussion

- Component list: anything beyond the base set?
- Use an icon set? Which one?

## Decisions log

_Empty — fill in during discussion._
