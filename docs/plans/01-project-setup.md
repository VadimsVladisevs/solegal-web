# 01 — Project setup

**Status:** ✅ Done
**Depends on:** —
**Milestone:** M1

## Goal

A working React Router v8 + Vite + TypeScript project with styling, linting, testing and an env-driven base path, ready for feature work.

## Scope

- Scaffold React Router v8 (framework mode, `ssr: false`, `prerender`) with TypeScript strict
- Tailwind CSS v4 via `@tailwindcss/vite`
- ESLint + Prettier
- Vitest + React Testing Library
- Playwright (configured to run against the built static site)
- `BASE_PATH` env wired into Vite `base` and the router `basename`

**Out of scope:** real pages, i18n, design tokens, CI.

## Tasks

- [x] Choose the Node version (`.nvmrc` / `engines`) and package manager
- [x] Scaffold the React Router v8 project and remove the template demo content
- [x] Enable TS strict mode and path aliases
- [x] Add Tailwind v4
- [x] Add ESLint + Prettier configs
- [x] Add Vitest + RTL with one sample test
- [x] Add Playwright (Chromium only) with one smoke test against the built site
- [x] Add npm scripts: `dev`, `build`, `preview`, `test`, `test:e2e`, `lint`, `typecheck`, `format`
- [x] Add `.gitignore`, `.env.example`, `.editorconfig`
- [x] Add husky + lint-staged pre-commit hook (Prettier + ESLint on staged files)
- [x] Wire `BASE_PATH` (default `/solegal-web/`)
- [x] Update the Commands section in AGENTS.md if anything changed

## Done when

- `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build` all pass
- The build works with both `BASE_PATH=/solegal-web/` and `BASE_PATH=/`, and assets load in both
- `npm run test:e2e` passes against the built site

## Decisions log

- **2026-10-25 — Package manager: npm.** Already installed; no extra setup on GitHub Actions or Cloudflare Pages.
- **2026-10-25 — Node: 24 LTS**, pinned via `.nvmrc` and `engines` (`>=24`). Matches local v24.14.1; supported by both hosts.
- **2026-10-25 — Pre-commit hooks: husky + lint-staged**, running Prettier and ESLint `--fix` on staged files only. CI still runs the full checks.
- **2026-10-25 — Playwright: Chromium only** for smoke tests, to keep CI fast.
- **2026-10-25 — React Router v8** (not v7): the current template ships v8.5 + Vite 8. Same framework mode and prerender model; docs updated.
- **2026-10-25 — Prerender output is flattened after build.** With a basename, React Router writes pages to `build/client/<basename>/…` while Vite assets stay in `build/client/assets`. `scripts/flatten-base-path.ts` moves the pages up so `build/client` deploys as-is under `BASE_PATH`; React Router's SPA fallback is kept as `__spa-fallback.html`. The smoke test asserts the served HTML is prerendered.
- **2026-10-25 — Markdown is excluded from Prettier.** Docs stay hand-formatted with compact tables.
- **2026-10-25 — `.gitattributes` forces LF**, matching `.editorconfig` and Prettier (this machine has `core.autocrlf=true`).
