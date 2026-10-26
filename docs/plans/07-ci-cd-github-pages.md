# 07 — CI/CD → GitHub Pages

**Status:** 🔵 Ready
**Depends on:** 01 (pipeline can start early), 05 (for a meaningful live site)
**Milestone:** M2

## Goal

Every push to `main` is checked and deployed to GitHub Pages automatically. Pull requests are checked but not deployed.

## Scope

- A GitHub Actions workflow: install → lint → typecheck → test → Playwright smoke (builds the site) → deploy
- `BASE_PATH=/solegal-web/` for the Pages build
- `404.html` (built in step 05) served by GitHub Pages under the sub-path
- Real-phone check of the live site (moved here from step 05)
- Dependency caching (npm and Playwright browsers)
- Drafted `public/_redirects` and `public/_headers` for future Cloudflare use (no effect on GitHub Pages)

**Out of scope:** Cloudflare deployment (step 09).

## Tasks

- [ ] Make the repo public (confirm with the user right before doing it)
- [ ] CI workflow for PRs and pushes
- [ ] Deploy job using `actions/deploy-pages`
- [ ] Enable GitHub Pages (source: GitHub Actions) in the repo settings
- [ ] Check that an unknown URL under `/solegal-web/` shows the step-05 404 page in the right locale
- [ ] Check the live site on a real phone (iOS Safari and Android Chrome)
- [ ] Check the link preview (e.g. opengraph.xyz) for each locale
- [ ] Draft `_redirects` (`/` → `/en/`) and `_headers` (security headers)
- [ ] Create `README.md` with a status badge and the site URL

## Done when

- A push to `main` deploys a working site at `https://<user>.github.io/solegal-web/`
- A failing lint/test check blocks the deploy
- All routes and assets work under the `/solegal-web/` sub-path
- The live site has been checked once on a real phone (iOS Safari and Android Chrome)
- A link-preview check shows the correct card

## Decisions log

From step 05 (2026-10-26):

- The real-phone check moved here from step 05, because the site is first reachable from a phone once it is deployed.
- Step 05 builds `404.html`; this step only checks that GitHub Pages serves it under `/solegal-web/`.

From step 06 (2026-10-26):

- The link-preview check moved here from step 06, because it needs a public URL.
- The demo build keeps the defaults `SITE_URL=https://vadimsvladisevs.github.io` and `SITE_INDEXABLE=false` (not indexed).

Discussion (2026-10-26):

- The repo is private, and GitHub Pages on a free plan needs a public repo, so the repo will be made public.
- No branch protection on `main`: work is committed directly to `main`, and the deploy job already needs a green check job.
- No Dependabot or Renovate: dependencies are updated by hand.
- One workflow with two jobs. The `check` job runs on PRs and pushes to `main`: `npm ci` → `lint` → `typecheck` → `test` → `test:e2e`. It then uploads `build/client` as the Pages artifact. `test:e2e` already builds the site with the default `BASE_PATH=/solegal-web/`, so the site is built once and the tested build is the one deployed. The `deploy` job runs only on pushes to `main`, needs `check`, and uses a concurrency group.
- Node version comes from `.nvmrc`. npm and Playwright browsers are cached.
- There is no `README.md` yet, so this step creates one.
