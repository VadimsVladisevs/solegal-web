# 05 — Core pages

**Status:** ✅ Done
**Depends on:** 04
**Milestone:** M2

## Goal

The one-page site implemented in 3 locales and 3 design variants, using demo content from the content layer.

## Scope

See [design.md](../design.md) for sections, content fields and variants.

- **One page** per locale, with sections Hero/Main → About → Team (3 members) → Contact (email + phone)
- **Design variants** A / B / C at `/{lang}/`, `/{lang}/b`, `/{lang}/c`, plus the floating design switcher
- **404 page**, emitted as `404.html` in the build
- Demo content (lorem ipsum / dummy data) in `en`, `lv`, `ru`

**Out of scope:** Partners (step 08), SEO tags (step 06), removing the losing variants (step 11), the real-phone check (moved to step 07).

## Tasks

- [x] Review the existing demo content for all 3 locales (written in step 03)
- [x] Hero section, including B's "SO" watermark and C's logo panel
- [x] About section
- [x] Team section with `TeamMemberCard` and an inline SVG placeholder photo
- [x] Contact section (`mailto:` / `tel:` links)
- [x] Design switcher
- [x] 404 page (`404.html`, locale from the URL)
- [x] Playwright: every page × locale × variant renders, in the desktop and mobile projects; 404 renders in each locale

## Done when

- Every page renders in `en`, `lv` and `ru` in the built site
- All text comes from dictionaries or the content layer
- Every section works at the mobile reference viewport (Playwright mobile project)
- Lint, typecheck, unit and e2e tests pass

## Open questions for discussion

_All resolved; see the Decisions log._

## Decisions log

From step 02 (2026-10-25):

- Single scrolling page instead of separate Home/About/Services/Contacts pages; Services dropped for now.
- About includes a Team section with 3 members (placeholder photos).
- Contact shows email and phone only (`mailto:` / `tel:` links); no form, map, address or hours.
- Placeholder (lorem ipsum / dummy) content for the demo.
- Three design variants are built for customer review; see [11](11-final-design-variant.md) for removal.

From step 04 (2026-10-25):

- The anchor offset under the sticky header is handled in step 04 (`scroll-padding-top`).

Discussed 2026-10-26 (see the [mockup](https://claude.ai/artifact/WjcGMd3KV4YVZMh3fi3Gp6), private artifact):

- **Demo content** already exists from step 03; this step only reviews it.
- **Design switcher:** the "light pill", fixed bottom-right with safe-area insets and always visible. It is white with a `line` border and a small `muted` "Design" label (from the dictionaries), followed by three 44 × 44px links A · B · C to the same locale. The current one is filled `brand` with `on-brand` text and has `aria-current="page"`.
- **404 page:** the "quiet" layout, like hero A: label "Error 404", H1, rule, short text, and a "Back to home" button to `/{lang}/`. It uses the normal header and footer (variant A). One `404.html` serves every unknown URL; the locale comes from the URL prefix (`/lv/…` → lv, `/ru/…` → ru, otherwise en). The locale is picked client-side, so without JS the page is English. All its text comes from the dictionaries.
- **Real-phone check** (iOS Safari and Android Chrome) moves to step 07, on the deployed GitHub Pages URL. This step relies on the Playwright mobile project.
- **Team card** follows the approved step-02 mockup; the placeholder photo is an inline, decorative SVG silhouette (`photo-bg` / `photo-fg`).

Found while building (2026-10-26):

- **Sections** are components in `app/components/` (`HeroSection`, `AboutSection`, `TeamSection`, `TeamMemberCard`, `ContactSection`); each takes `variant` and picks its own section tone. `home.tsx` loads site settings, team and contact info through the content layer.
- **Trailing slashes:** the variant pages are prerendered as `/{lang}/b/` and `/{lang}/c/`. A client-side navigation to a canonical URL loads `b/_.data`; before this fix, the design and language switchers landed on the 404 page.
- **404 mechanism:** `404.html` is React Router's SPA fallback (`scripts/write-404.ts` copies it). The root `ErrorBoundary` and `HydrateFallback` render `NotFoundPage`. The root `loader` bakes in every locale's dictionary at build time. The page hydrates in English and switches to the URL's locale. React doesn't patch `<html lang>` during hydration, so the page sets it in an effect.
- **Known gap:** on a URL whose first segment is not a locale (`/xyz/`), React Router first tries to load `:lang` data. It logs one console error, then shows the English 404.
- **Preview server:** `vite preview` answers unknown page URLs with `404.html` and status 404 (a plugin in `vite.config.ts`), like GitHub Pages and Cloudflare.
- **B watermark** is CSS generated content (`after:content-['SO']`), because axe checks the contrast of hidden text too.
- **Switcher spacing:** a spacer after the footer keeps the end of the page clear of the floating pill.
