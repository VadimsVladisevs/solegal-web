# 07 — CI/CD → GitHub Pages

**Status:** 📝 Draft
**Depends on:** 01 (pipeline can start early), 05 (for a meaningful live site)
**Milestone:** M2

## Goal

Every push to `main` is checked and deployed to GitHub Pages automatically. Pull requests are checked but not deployed.

## Scope

- A GitHub Actions workflow: install → lint → typecheck → test → build → Playwright smoke → deploy
- `BASE_PATH=/solegal-web/` for the Pages build
- Generated `404.html`
- Dependency caching
- Drafted `public/_redirects` and `public/_headers` for future Cloudflare use (no effect on GitHub Pages)

**Out of scope:** Cloudflare deployment (step 09).

## Tasks

- [ ] CI workflow for PRs and pushes
- [ ] Deploy job using `actions/deploy-pages`
- [ ] Enable GitHub Pages (source: GitHub Actions) in the repo settings
- [ ] `404.html` in the build output
- [ ] Draft `_redirects` (`/` → `/en/`) and `_headers` (security headers)
- [ ] Add a status badge and the site URL to the README

## Done when

- A push to `main` deploys a working site at `https://<user>.github.io/solegal-web/`
- A failing lint/test check blocks the deploy
- All routes and assets work under the `/solegal-web/` sub-path

## Open questions for discussion

- Branch protection on `main` (require PR + green CI)?
- Dependabot / Renovate for dependency updates?

## Decisions log

_Empty — fill in during discussion._
