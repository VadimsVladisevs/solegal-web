# 02 — Design discussion

**Status:** ✅ Done
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

- [x] Collect brand input from the user: colors, fonts, logo, references (`docs/images/logo.jpg`, `docs/images/main-color.jpg`)
- [x] Propose a token set: colors, type scale, spacing, radii, shadows
- [x] Check color contrast (WCAG AA)
- [x] Sketch layouts for the header, footer and home page ([preview artifact](https://claude.ai/artifact/Vff4ZYdpChpUMyqu9GBFWT), 3 variants)
- [x] Recreate the logo as SVG (`docs/images/logo.svg`, `logo-white.svg`, `logo-green.svg`)
- [x] Write `docs/design.md`
- [x] Fill the "Styling and design tokens" section in `docs/architecture.md`
- [x] User approves `docs/design.md` (2026-10-25)

## Done when

- `docs/design.md` exists and the user has approved it
- All text/background color pairs meet WCAG AA

The customer's choice between the three design variants is **not** part of this step. It is tracked in [11-final-design-variant](11-final-design-variant.md).

## Open questions for discussion

_All resolved; see the Decisions log._

## Decisions log

- **2026-10-25 — Brand input.** The logo is a black geometric sans-serif wordmark ("SO", a rule, "L E G A L"). The brand color is `#2D5703`, sampled from `main-color.jpg`. No brand font exists, and no vector logo.
- **Structure.** A one-page scrolling site per locale: Hero/Main → About → Team → Contact → Footer, with anchor navigation. This replaces the earlier multi-page plan (Home/About/Services/Contacts).
- **Services** are dropped for now.
- **Tone.** Modern minimal: white/off-white, whitespace, thin rules echoing the logo, green as the accent, sharp corners, no shadows.
- **Light theme only.**
- **Font.** Montserrat (it matches the logo; covers Latvian and Cyrillic), self-hosted via `@fontsource` for GDPR and host independence.
- **Logo.** Recreated as SVG from Montserrat outlines (SemiBold "SO", Bold "LEGAL"), fitted to the JPG. To be replaced if official vectors turn up.
- **Contact.** Email and phone only. No address, hours or form for now.
- **Team.** 3 members, with placeholder photos.
- **Content.** Lorem ipsum / dummy data in all locales. A CMS (Sanity) manages it later.
- **Design variants.** The user liked all three preview options (A · Quiet white, B · Green hero, C · Split). All three will be built on separate URLs (`/{lang}/`, `/{lang}/b`, `/{lang}/c`) with a floating design switcher, so the customer can choose. The other two are removed afterwards (step 11).
