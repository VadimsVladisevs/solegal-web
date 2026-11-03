# 13 — Modern redesign: variants D and E

**Status:** ✅ Done
**Depends on:** 05
**Milestone:** M2

## Goal

Find a more modern look for the site that keeps the existing color palette ([design.md](../design.md#color-tokens)) and adds neutral imagery. Explore it in mockups, then build the chosen directions as design variants D and E, next to A–C, for the customer to compare.

## Scope

- Mockups as private HTML artifacts
- Variants D (Classic) and E (Motion) at `/{lang}/d` and `/{lang}/e` in all three locales, in the design switcher, `noindex` like B and C
- Neutral demo photos in `public/images/`; translated variant-only text in the dictionaries
- Responsive per [Mobile & responsive](../design.md#mobile--responsive); animation respects reduced motion

**Out of scope:** choosing the final variant (step 11); moving the D/E marketing text into the content layer (only if one of them is chosen).

## Mockups

**Current: [SO Legal Reference Styles](https://claude.ai/artifact/9aamiK7Jq83ZjopTTrg3AM)** (private). These two directions follow the user's reference sites:

- **Classic**, after [rutan.com](https://www.rutan.com/): a full-width photo hero with a green overlay and a centered serif tagline; the logo on a white chevron plate flanked by diagonal green bands, and a solid header once you scroll; a full-screen menu; three hero buttons; bordered service cards with line icons that turn dark green on hover; a "Why clients choose us" band with 4 icon columns and diagonal shapes; a photo band, the team and contact cards.
- **Motion**, after [nossaman.com](https://www.nossaman.com/): a full-screen photo slideshow with a slow Ken Burns zoom and crossfade, behind a large translucent disc. The disc changes color on each slide, and the text animates in. Dot navigation has a progress ring, plus a pause button. Below the hero: scroll-reveal sections, a parallax round photo, count-up numbers, service rows that fill green on hover, and a contact band with a large circle.

Rejected first round (2026-11-03, "not what I want"): [SO Legal Modern](https://claude.ai/artifact/1ByesuU6rUf1okXuZfckJ3) (private artifact). A floating switcher toggles between the styles and the imagery options.

| Style | Typography | Character |
|---|---|---|
| Editorial | EB Garamond display + Montserrat | Arched images (an echo of columns), a full-width Riga panorama, a hairline service list, a dark-green contact band |
| Soft | Manrope | Rounded 20–28px corners, soft shadows, a hero card with a floating panel, a bento About grid, service cards with line icons |
| Bold | Montserrat 800, uppercase | A green/image split hero, a moving ticker of services, a black services grid, ink borders, an image strip |

All three fonts support Latin Extended (Latvian) and Cyrillic (Russian).

### Photos (demo)

Neutral architecture and library images from Wikimedia Commons. Only public domain, CC0 and CC BY were used (no ShareAlike). Team photos stay as placeholders.

| Key | File | Author | License |
|---|---|---|---|
| columns | Courtroom columns, U.S. Courthouse, Tallahassee, Florida | Carol M. Highsmith | Public domain |
| detail | Courtroom columns, detail, U.S. Courthouse, Tallahassee, Florida | Carol M. Highsmith | Public domain |
| riga | Riga center 2020-03.jpg | Svetlov Artem | CC0 |
| stairs | Escalier monumental Neue Burg Vienne.jpg | Jebulon | CC0 |
| books | Indiana Supreme Court Law Library rare books shelf.jpg | Dominic | CC0 |
| colup | Stately columns — Tampa Classic Federal Courthouse | 83DegreesMedia | CC BY 2.0 (attribution required; mockups only) |
| arcs | Simei MRT curvature and concrete | Thomas Timlen | CC BY 4.0 (attribution required; mockups only) |

The site (`public/images/`) uses only the five public-domain / CC0 photos, at 1600px, as JPEGs at quality 70 (130–290 KB each), so no attribution is needed. Sources are on Wikimedia Commons under the file names above.

## Tasks

- [x] Build the first mockup (3 styles × 2 imagery options), rejected
- [x] Build the reference mockup (Classic / Motion)
- [x] Routes `d` / `e`, prerender entries, design switcher A–E
- [x] Variant D components (header with plate and full-screen menu, page, footer)
- [x] Variant E components (header, slideshow hero, scroll reveal, parallax, count-up, footer)
- [x] Tokens (serif font, sizes, animations), demo photos, dictionary strings in en/lv/ru
- [x] Tests: switcher unit test; e2e sections, smoke, axe and 320px checks include D and E
- [x] Docs: design.md, architecture.md, step 11

## Done when

- `/{lang}/d/` and `/{lang}/e/` are prerendered in all 3 locales and show every section
- No horizontal scroll at 320px, and no serious axe violations
- Lint, typecheck, unit and e2e tests pass

## Open questions for discussion

- Are the photos used as they are, or replaced later by the customer's own photos (for example of the office or of Riga)?
- E's slides replace video: should the final version use short stock video clips instead?

## Decisions log

2026-11-03:

- The user experiments independently while the customer's references are still pending.
- The color palette stays. Fonts, radius, shadows and layout are open.
- Two imagery options: free stock photos and geometric shapes.
- No Figma; mockups are artifacts only.
- The first round (Editorial / Soft / Bold) was rejected. The user gave rutan.com and nossaman.com (which has animation) as references, and the second round follows them.
- The user approved the second round: "Add both options as D and E". Both are built as variants next to A–C, and the final choice stays in step 11.
- D and E get their own components instead of more `variant` branches in the shared sections: their header, sections and footer differ too much.
- The site uses only public-domain / CC0 photos; the CC BY ones stay in the mockups.
- Variant-only text lives in the dictionaries for now, as demo copy.

Verified 2026-11-03: `lint` (ESLint clean; Prettier clean for project files, though it also flags the untracked third-party skill in `.claude/`), `typecheck`, `test` (48 passed), `test:e2e` (130 passed, 4 skipped). Checked visually at 1280/1440px and on a Pixel 7.
