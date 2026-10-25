# 06 — SEO & metadata

**Status:** 📝 Draft
**Depends on:** 05
**Milestone:** M2

## Goal

Every page in every locale has correct metadata for search engines and link previews.

## Scope

- Per-route, per-locale `<title>` and meta description (from content or dictionaries)
- `hreflang` alternates (including `x-default`) and canonical URLs
- Open Graph and Twitter card tags, default OG image
- `sitemap.xml` (all routes × locales) and `robots.txt`, generated at build time and respecting `BASE_PATH`
- Favicon set and web manifest
- Structured data (JSON-LD `LegalService` / `Organization`)

**Out of scope:** analytics (to be discussed).

## Tasks

- [ ] Meta helper used by route `meta` exports
- [ ] hreflang + canonical
- [ ] Open Graph tags + default image
- [ ] Sitemap + robots generation
- [ ] Favicon + manifest
- [ ] JSON-LD
- [ ] Tests: built HTML contains the expected tags per locale

## Done when

- Every built page has a title, description, canonical, hreflang (all locales + `x-default`) and OG tags
- The sitemap lists every route × locale with correct absolute URLs
- A link-preview check (e.g. opengraph.xyz) shows the correct card

## Open questions for discussion

- Site URL / domain for absolute URLs (demo vs production)
- Analytics: none, Plausible, or Cloudflare Web Analytics?

## Decisions log

_Empty — fill in during discussion._
