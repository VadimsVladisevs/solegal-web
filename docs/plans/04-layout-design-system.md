# 04 — Layout & design system

**Status:** 🔵 Ready
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
- Responsive (mobile-first) and accessible (keyboard navigation, focus states, skip link, WCAG AA contrast)

**Out of scope:** page content and `TeamMemberCard` (step 05), the floating design switcher (step 05).

## Tasks

- [ ] Add theme tokens (reset Tailwind's default palette)
- [ ] Set up fonts
- [ ] Add `lucide-react`
- [ ] Logo component
- [ ] Base components
- [ ] Header, navigation and mobile menu
- [ ] Footer
- [ ] Language switcher
- [ ] Variant from route `handle`, passed to Header
- [ ] Sticky header offset + reduced-motion smooth scroll
- [ ] Temporary layout preview on the home route
- [ ] Component tests (nav, switcher, mobile menu)
- [ ] Axe checks in Playwright (`@axe-core/playwright`) on the built pages; keyboard check

## Done when

- The layout matches the approved design on mobile, tablet and desktop
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
