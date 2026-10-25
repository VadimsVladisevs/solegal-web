# 09 — Cloudflare Pages

**Status:** 📝 Draft · backlog
**Depends on:** 07
**Milestone:** M4

## Goal

Run the production site on Cloudflare Pages with a custom domain.

## Already prepared (by earlier steps)

- Static build output (`build/client`), deployable as-is
- The base path is configurable via `BASE_PATH` (`/` on Cloudflare)
- Drafted `public/_redirects` and `public/_headers`

## Scope

- Create the Cloudflare Pages project connected to the production repo
- Build settings: build command, output directory, Node version, `BASE_PATH=/`
- Activate and verify `_redirects` (real 302 for `/` → `/en/`) and `_headers`
- Custom domain + DNS, HTTPS
- Preview deployments per PR
- Deploy hook URL, for Sanity in step 10

## Tasks

- [ ] Create the Cloudflare Pages project
- [ ] Configure build settings and env variables
- [ ] Verify redirects and headers
- [ ] Set up the custom domain and DNS
- [ ] Enable preview deploys
- [ ] Create a deploy hook
- [ ] Update `docs/architecture.md` and AGENTS.md

## Done when

- The production domain serves the site over HTTPS
- `/` returns a 302 to `/en/`; security headers are present
- PRs get preview URLs

## Open questions for discussion

- Production repo: this repo, or a new one?
- Keep the GitHub Pages demo running, or retire it?
- Cloudflare Web Analytics?

## Decisions log

_Empty — fill in during discussion._
