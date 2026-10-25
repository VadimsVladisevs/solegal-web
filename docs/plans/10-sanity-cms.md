# 10 — Sanity CMS

**Status:** 📝 Draft · backlog
**Depends on:** 03, 09
**Milestone:** M4

## Goal

Content editors manage all site content in Sanity. Publishing content triggers a rebuild, and the deployed site stays fully static.

## Already prepared (by earlier steps)

- Content access layer with a `ContentSource` interface (step 03)
- Content types designed to map 1:1 to Sanity schemas
- Loaders run at build time (prerender), so Sanity is queried only during the build

## Scope

- Sanity project + dataset; Sanity Studio setup
- Schemas mirroring `SiteSettings`, `TeamMember`, `ContactInfo`, `Partner`, with localization for `en` / `lv` / `ru`
- `sanitySource` implementing `ContentSource` (GROQ, build-time fetch)
- Source selection via `CONTENT_SOURCE` env
- Migrate the demo content into Sanity
- Webhook on publish → Cloudflare deploy hook
- Images via the Sanity image CDN (or downloaded at build time)

## Tasks

- [ ] Create the Sanity project and dataset
- [ ] Set up Studio (location to be decided)
- [ ] Define schemas with localization
- [ ] Implement `sanitySource` with typed GROQ queries
- [ ] Wire env-based source selection and add Sanity variables to `.env.example`
- [ ] Content migration script
- [ ] Publish webhook → deploy hook
- [ ] Tests: content source contract tests run against both sources
- [ ] Update docs

## Done when

- A production build with `CONTENT_SOURCE=sanity` renders identically to the local content
- Publishing in Sanity triggers a rebuild, and the change is live
- No Sanity token is exposed in the client bundle

## Open questions for discussion

- Localization: document-level or field-level?
- Studio: a folder in this repo, a separate repo, or Sanity-hosted?
- Who are the editors, and what roles do they need?
- Image handling: Sanity CDN or local copies?

## Decisions log

_Empty — fill in during discussion._
