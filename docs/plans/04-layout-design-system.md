# 04 — Layout & design system

**Status:** ✅ Done
**Depends on:** 02, 03
**Milestone:** M2

## Goal

Implement the approved design as Tailwind theme tokens and a small set of reusable layout and UI components.

## Scope

- Theme tokens from `docs/design.md` in `app/styles/app.css`
- Fonts loaded with Latvian and Cyrillic subsets
- Layout: header with anchor navigation, mobile menu (dropdown panel), footer, page container
- Language switcher UI (keeps the current design variant)
- `variant: "a" | "b" | "c"` support in header and section styling, as described in `docs/design.md`
- Logo component from `docs/images/logo*.svg`
- Base components: Container, Section, Label, Heading, Rule, Button/ButtonLink, SkipLink
- Icons from `lucide-react`
- Anchor offset under the sticky header (`scroll-padding-top`)
- Temporary layout preview on the home route (placeholder sections until step 05)
- Responsive (mobile-first) and accessible (keyboard navigation, focus states, skip link, WCAG AA contrast), following [Mobile & responsive](../design.md#mobile--responsive): 320px minimum width, touch targets ≥ 44px, safe-area insets for the sticky header and mobile menu
- Playwright mobile project (`devices["Pixel 7"]`) next to the desktop one

**Out of scope:** page content and `TeamMemberCard` (step 05), the floating design switcher (step 05).

## Tasks

- [x] Add theme tokens (reset Tailwind's default palette)
- [x] Set up fonts
- [x] Add `lucide-react`
- [x] Logo component
- [x] Base components
- [x] Header, navigation and mobile menu
- [x] Footer
- [x] Language switcher
- [x] Variant from route `handle`, passed to Header
- [x] Sticky header offset + reduced-motion smooth scroll
- [x] Temporary layout preview on the home route
- [x] Component tests (nav, switcher, mobile menu)
- [x] Playwright mobile project (`Pixel 7`); smoke and axe checks run on desktop and mobile
- [x] Axe checks in Playwright (`@axe-core/playwright`) on the built pages; keyboard check

## Done when

- The layout matches the approved design on mobile, tablet and desktop
- No horizontal scroll at 320px; touch targets are at least 44 × 44px
- No hardcoded colors or fonts outside the theme
- Component tests pass; axe reports no serious or critical issues

## Open questions for discussion

_All resolved; see the Decisions log._

## Decisions log

Discussed 2026-10-25:

- **Components:** Container, Section, Label (eyebrow), Heading, Rule, Button/ButtonLink, Logo, SkipLink, plus Header, MobileMenu, Footer and LanguageSwitcher. No generic Card: the team member card is built in step 05 as `TeamMemberCard`.
- **Icons:** `lucide-react` with tree-shaken named imports. The first uses are `Menu` and `X` in the mobile menu button.
- **Mobile menu (≤ 720px):** a dropdown panel under the sticky header. It was chosen over a full-screen overlay; see the [mockup](https://claude.ai/artifact/CpoiQReesnEbKJYJmb5XL8) (private artifact). The panel holds the nav links (uppercase, tracked) and the `EN · LV · RU` switcher, and the page behind it is dimmed. It closes on a link click, Escape, the toggle, or when the viewport grows past the breakpoint. The button has `aria-expanded`/`aria-controls`. In variant B the panel is `brand` with white text.
- **Menu button:** a lucide icon plus a visible "Menu"/"Close" label (dictionary strings), in the tracked uppercase nav style.
- **Scroll-spy:** not now.
- **Tokens:** every color from design.md, the font and the type scale go in `@theme` in `app/styles/app.css`. H1, H2 and contact values use fluid `clamp()` sizes. Tailwind's default palette is reset (`--color-*: initial`), so non-token colors can't be used.
- **Fonts:** `@fontsource-variable/montserrat` covers latin, latin-ext and cyrillic; `unicode-range` loads only the subsets a page needs.
- **Logo:** one inline `<Logo>` component with `fill="currentColor"`; its color comes from token classes (`text-ink`, `text-on-brand`, `text-brand`).
- **Variant plumbing:** each route declares `handle: { variant }`. The `:lang` layout reads the matched variant and passes it to Header. Sections take a `variant` prop. The design switcher comes in step 05.
- **Language switcher:** links to the same path in each locale, keeping the variant and the trailing slash. The current locale gets `aria-current="page"`, and each link has `lang` and `hreflang`.
- **Anchors:** `scroll-padding-top` equals the header height. Smooth scrolling applies only under `prefers-reduced-motion: no-preference`.
- **Accessibility testing:** `@axe-core/playwright` runs on the built pages, because jsdom can't check contrast. Component tests for the nav, switcher and mobile menu use Vitest + RTL.
- **Preview:** until step 05, the home route renders the header and footer around placeholder sections.

Added 2026-10-25:

- **Mobile compatibility** is a project-wide requirement. This step follows [Mobile & responsive](../design.md#mobile--responsive): 320px minimum, 44px touch targets, safe-area insets, and a Playwright mobile project (`Pixel 7`, Chromium emulation) alongside desktop.

Found while building (2026-10-25):

- **Variant routes:** `home-b.tsx` and `home-c.tsx` re-export the home page and declare their own `handle`, because a shared route module can only have one `handle`.
- **Breakpoints:** `sm` > 560px, `md` > 720px, `lg` > 900px (mobile-first `min-width`), matching the design's collapse points. Tailwind's default breakpoints, font sizes and fonts are reset like the palette.
- **Font family name:** the variable package registers `"Montserrat Variable"`, which heads the font stack.
- **Focus ring on green:** on `brand` backgrounds (variant B header, white button) the outline is `on-brand`, because `brand-soft` has too little contrast there.
- **Page title:** the `:lang` layout sets `<title>` to the firm name so axe's `document-title` check passes. Step 06 replaces it with per-page titles.
- **Section tones:** `Section` takes a `tone` (`surface`, `surface-alt`, `tint`, `brand`, `brand-strong`); the home preview maps each variant to tones. Typography components take `onBrand` for green backgrounds.
