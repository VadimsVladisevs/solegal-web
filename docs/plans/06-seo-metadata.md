# 06 — SEO & metadata

**Status:** 🔵 Ready
**Depends on:** 05
**Milestone:** M2

## Goal

Every page in every locale has correct metadata for search engines and link previews.

## Scope

- Per-route, per-locale `<title>` and meta description (from content or dictionaries)
- `hreflang` alternates (including `x-default`) and canonical URLs
- Open Graph and Twitter card tags, default OG image
- `sitemap.xml` (all routes × locales) and `robots.txt`, generated at build time and respecting `BASE_PATH`
- Favicon set, `apple-touch-icon`, `theme-color` meta and web manifest
- Structured data (JSON-LD `LegalService` / `Organization`)

**Out of scope:** analytics (to be discussed).

## Tasks

- [ ] `SITE_URL` and `SITE_INDEXABLE` resolved from env (`site.ts`)
- [ ] Optional `metaTitle` / `metaDescription` in `SiteSettings`, filled for every locale
- [ ] Meta helper used by route `meta` exports
- [ ] hreflang + canonical; variant pages noindex with canonical to the locale home
- [ ] Open Graph + Twitter tags + default image
- [ ] Sitemap, robots and web manifest as prerendered resource routes
- [ ] Placeholder favicon set + `theme-color`
- [ ] JSON-LD `LegalService`
- [ ] Tests: built HTML contains the expected tags per locale; sitemap and robots are correct

## Done when

- Every built page has a title, description, canonical, hreflang (all locales + `x-default`) and OG tags
- The sitemap lists every indexable route × locale with correct absolute URLs
- With the default env every page is `noindex`; with `SITE_INDEXABLE=true` it is not
- Lint, typecheck, unit and e2e tests pass

The link-preview check (e.g. opengraph.xyz) moved to step 07: it needs a public URL.

## Open questions for discussion

_None; see the Decisions log._

## Decisions log

Discussed 2026-10-26:

- **Absolute URLs.** A `SITE_URL` env var holds the origin only, default `https://vadimsvladisevs.github.io`. Full URL = `SITE_URL` + `BASE_PATH` + path. Resolved in `site.ts` next to `base-path.ts`; never hardcoded in app code.
- **The demo is not indexed.** `SITE_INDEXABLE` defaults to false, which adds `<meta name="robots" content="noindex">` to every page. Production sets it to `true` (step 09).
- **`robots.txt` never uses `Disallow`.** It would hide the `noindex` tag from crawlers and block link-preview bots. Crawlers ignore a `robots.txt` under `/solegal-web/` anyway.
- **Non-content pages.** Design variants `/b/`, `/c/`: `noindex`, canonical to the locale home, not in the sitemap. `/` and `404.html`: `noindex`, not in the sitemap. `x-default` → `/en/`.
- **Titles and descriptions come from content**, so editors can change them in Sanity: optional `metaTitle` / `metaDescription` in `SiteSettings`, falling back to `firmName` / `heroLead`.
- **Placeholder assets.** A monogram favicon set and one shared 1200×630 OG image, made from the design tokens. No mockup round; step 11 replaces them with the customer's brand.
- **JSON-LD `LegalService`** with name, URL, email, phone, logo and language. No address, opening hours or registration number yet; add optional fields when the customer provides them.
- **No analytics** in the demo. Decided in step 09 (Cloudflare Web Analytics is the candidate: no cookies, no consent banner).
- **Verification:** Playwright checks the built HTML, sitemap and robots. The link-preview check moved to step 07.
