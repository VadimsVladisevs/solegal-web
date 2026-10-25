# 03 — i18n & content layer

**Status:** ✅ Done
**Depends on:** 01
**Milestone:** M1

## Goal

Locale-prefixed routing for `en` / `lv` / `ru`, typed UI dictionaries, and a content access layer, so pages are locale-aware and independent of where content comes from (local files now, Sanity later).

## Scope

- `:lang` route segment, locale config, default locale `en`
- `/` → browser-language redirect page (fallback `/en/`); 404 for unknown locales
- `<html lang>` from the route locale
- Typed UI dictionaries, loaded through the content layer (`getDictionary`), + `useT()` helper
- Language switcher logic (same page, other locale); the UI comes in step 04
- Content types: `SiteSettings`, `TeamMember`, `ContactInfo`, `Partner` (fields in `docs/design.md`)
- `ContentSource` interface + `localSource` implementation
- Route loaders read content only through the content layer
- Prerender list generated for every route × locale

**Out of scope:** visual design, real page content (step 05), Sanity (step 10).

## Tasks

- [x] Locale config and helpers
- [x] Route structure with the `:lang` segment
- [x] Root redirect page (`navigator.languages` → `/lv/`, `/ru/` or `/en/`; meta-refresh to `/en/` without JS; `noindex`)
- [x] Dictionaries for en/lv/ru, `getDictionary` in the `:lang` layout loader, `useT()` reading it from loader data
- [x] Dictionary completeness test
- [x] Content types in `app/content/types.ts`
- [x] `ContentSource` + `localSource` + selector
- [x] Content completeness test (every locale has every item)
- [x] ESLint `no-restricted-imports`: no `app/content/**` imports from `app/routes/**` or `app/components/**`
- [x] Generate the prerender path list from locales × routes (incl. design variants `b`, `c` until step 11)

## Done when

- Every route renders in all 3 locales in the built output
- Tests fail when a dictionary key or a locale content item is missing
- No route or component imports from `app/content/` directly (enforced by an ESLint rule)

## Decisions log

- **Root `/`:** a prerendered redirect page. JS reads `navigator.languages`: `lv*` → `/lv/`, `ru*` → `/ru/`, anything else → `/en/`. A `<meta http-equiv="refresh">` to `/en/` covers no-JS visitors and crawlers. The page is `noindex`. Cloudflare (step 09) uses the same page instead of a `_redirects` 302.
- **Slugs and anchors:** shared English slugs in every locale (`/lv/partners`); section anchors are locale-independent (`#about`, `#team`, `#contact`).
- **Language switcher:** always links to the same path in the other locale, with no fallback. Completeness tests and the prerender list guarantee that every page exists in every locale.
- **Import enforcement:** ESLint `no-restricted-imports` bans `app/content/**` in `app/routes/**` and `app/components/**`; only `app/lib/content/` imports content.
- **UI strings behind the content layer:** `ContentSource.getDictionary(locale): Promise<Dictionary>`. `localSource` returns `app/lib/i18n/dictionaries/{en,lv,ru}.ts`. The `:lang` layout loader loads it and `useT()` reads it from that loader's data, so step 10 can move UI strings to Sanity without touching pages or components.
- **Dictionary typing:** `en.ts` is the source of truth, `Dictionary = typeof en`; `lv.ts`/`ru.ts` are typed `Dictionary`, so a missing key fails `tsc`. A Vitest test checks the same.
- **Routing:** explicit config in `app/routes.ts`: an `index` route for `/`, and `route(":lang", …)` as a layout wrapping the page routes (variants `b`, `c` as children until step 11).
- **Unknown locale:** the `:lang` loader throws a 404 response; unknown locales are not prerendered, so GitHub Pages serves `404.html`.
- **Content source:** `localSource` methods return `Promise`s, matching the future `sanitySource`.
- **Trailing slashes (found while building):** pages are prerendered as `<path>/index.html`, and static hosts redirect `/en/b` to `/en/b/`. Internal links (nav, language and design switchers in step 04) use the trailing-slash form.
- **`useT()` API (found while building):** returns the typed dictionary object (`t.nav.about`), provided via `I18nContext` by the `:lang` layout; `useLocale()` returns the route locale.
- **Unknown locales on GitHub Pages:** not prerendered, so the host serves its 404 page; a custom `404.html` is part of step 07.

### File layout

```
app/content/types.ts, app/content/{en,lv,ru}/   editorial content
app/lib/i18n/config.ts                           locales, defaultLocale
app/lib/i18n/dictionaries/{en,lv,ru}.ts          UI strings; Dictionary = typeof en
app/lib/i18n/use-t.ts                            reads dictionary from :lang loader data
app/lib/content/{source,local-source,index}.ts   ContentSource incl. getDictionary
```
