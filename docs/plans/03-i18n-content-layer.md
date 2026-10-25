# 03 — i18n & content layer

**Status:** 📝 Draft
**Depends on:** 01
**Milestone:** M1

## Goal

Locale-prefixed routing for `en` / `lv` / `ru`, typed UI dictionaries, and a content access layer, so pages are locale-aware and independent of where content comes from (local files now, Sanity later).

## Scope

- `:lang` route segment, locale config, default locale `en`
- `/` → `/en/` redirect; 404 for unknown locales
- `<html lang>` from the route locale
- Typed UI dictionaries + `useT()` helper
- Language switcher logic (same page, other locale); the UI comes in step 04
- Content types: `SiteSettings`, `TeamMember`, `ContactInfo`, `Partner` (fields in `docs/design.md`)
- `ContentSource` interface + `localSource` implementation
- Route loaders read content only through the content layer
- Prerender list generated for every route × locale

**Out of scope:** visual design, real page content (step 05), Sanity (step 10).

## Tasks

- [ ] Locale config and helpers
- [ ] Route structure with the `:lang` segment
- [ ] Root redirect page
- [ ] Dictionaries for en/lv/ru + `useT()`
- [ ] Dictionary completeness test
- [ ] Content types in `app/content/types.ts`
- [ ] `ContentSource` + `localSource` + selector
- [ ] Content completeness test (every locale has every item)
- [ ] Generate the prerender path list from locales × routes (incl. design variants `b`, `c` until step 11)

## Done when

- Every route renders in all 3 locales in the built output
- Tests fail when a dictionary key or a locale content item is missing
- No route or component imports from `app/content/` directly (enforced by a lint rule or test)

## Open questions for discussion

- URL slugs: mostly moot now (one-page site, see step 02); still relevant for future sections such as Partners
- Language switcher behavior when a page doesn't exist in a locale
- Should `/` detect the browser language, or always go to `/en/`?

## Decisions log

_Empty — fill in during discussion._
