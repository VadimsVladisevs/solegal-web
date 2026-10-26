# 07 — CI/CD → GitHub Pages

**Status:** 🟡 In progress
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
- Drafted `public/_headers` for future Cloudflare use (no effect on GitHub Pages)

**Out of scope:** Cloudflare deployment (step 09).

## Tasks

- [x] Make the repo public (confirm with the user right before doing it)
- [x] CI workflow for PRs and pushes
- [x] Deploy job using `actions/deploy-pages`
- [x] Enable GitHub Pages (source: GitHub Actions) in the repo settings
- [x] Check that an unknown URL under `/solegal-web/` shows the step-05 404 page in the right locale
- [ ] Check the live site on a real phone (iOS Safari and Android Chrome)
- [ ] Check the link preview (e.g. opengraph.xyz) for each locale
- [x] Draft `_headers` (security headers)
- [x] Create `README.md` with a status badge and the site URL

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

Implementation (2026-10-26):

- No `_redirects` file. A Cloudflare `/` → `/en/` rule would run before the prerendered `/` page and bypass its browser-language redirect, which [architecture.md](../architecture.md#routing-and-i18n) says is the same on both hosts. Step 09 can add redirects if it needs them.
- `_headers` has no Content-Security-Policy yet: React Router and the `/` redirect page use inline scripts, so a CSP needs hashes or nonces. Left for step 09.
- Real-phone check (Chrome on Android, Safari on iPhone) found that the language switcher changed the URL but kept the previous locale's page content until a reload. Cause: with `ssr: false`, React Router reloads prerendered data only when a route's own path params change, and the home index route has none. Fixed with `shouldRevalidate` on the home routes. An e2e test now checks the page text after switching.
