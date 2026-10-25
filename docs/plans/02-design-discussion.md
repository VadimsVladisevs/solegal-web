# 02 — Design discussion

**Status:** 📝 Draft
**Depends on:** — (can run in parallel with 01)
**Milestone:** M1

## Goal

Agree on the visual identity of the site with the user and document it as design tokens and look-and-feel guidelines that step 04 can implement directly.

## Scope

The user provides brand style input. Together we define:

- the color palette (primary, secondary, neutrals, semantic colors) and contrast checks
- typography (font families, scale, weights) and font licensing/hosting
- logo usage (variants, sizes, clear space)
- tone (formal, modern, warm, …) and reference sites
- imagery style (photos, illustrations, icons)
- light-only or light + dark mode
- page structure sketches (header, footer, home sections)

**Out of scope:** implementing components (step 04).

## Tasks

- [ ] Collect brand input from the user: colors, fonts, logo, references
- [ ] Propose a token set: colors, type scale, spacing, radii, shadows
- [ ] Check color contrast (WCAG AA)
- [ ] Sketch layouts for the header, footer and home page
- [ ] Write `docs/design.md`
- [ ] Fill the "Styling and design tokens" section in `docs/architecture.md`

## Done when

- `docs/design.md` exists and the user has approved it
- All text/background color pairs meet WCAG AA

## Open questions for discussion

- Brand colors and fonts: do they already exist, or do we create them?
- Logo files available (SVG)?
- Dark mode needed?
- Fonts: self-hosted or Google Fonts? Must support Latvian and Cyrillic characters.

## Decisions log

_Empty — fill in during discussion._
