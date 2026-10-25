# 01 — Project setup

**Status:** 📝 Draft
**Depends on:** —
**Milestone:** M1

## Goal

A working React Router v7 + Vite + TypeScript project with styling, linting, testing and an env-driven base path, ready for feature work.

## Scope

- Scaffold React Router v7 (framework mode, `ssr: false`, `prerender`) with TypeScript strict
- Tailwind CSS v4 via `@tailwindcss/vite`
- ESLint + Prettier
- Vitest + React Testing Library
- Playwright (configured to run against the built static site)
- `BASE_PATH` env wired into Vite `base` and the router `basename`

**Out of scope:** real pages, i18n, design tokens, CI.

## Tasks

- [ ] Choose the Node version (`.nvmrc` / `engines`) and package manager
- [ ] Scaffold the React Router v7 project and remove the template demo content
- [ ] Enable TS strict mode and path aliases
- [ ] Add Tailwind v4
- [ ] Add ESLint + Prettier configs
- [ ] Add Vitest + RTL with one sample test
- [ ] Add Playwright with one smoke test against the built site
- [ ] Add npm scripts: `dev`, `build`, `preview`, `test`, `test:e2e`, `lint`, `typecheck`, `format`
- [ ] Add `.gitignore`, `.env.example`, `.editorconfig`
- [ ] Wire `BASE_PATH` (default `/solegal-web/`)
- [ ] Update the Commands section in AGENTS.md if anything changed

## Done when

- `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build` all pass
- The build works with both `BASE_PATH=/solegal-web/` and `BASE_PATH=/`, and assets load in both
- `npm run test:e2e` passes against the built site

## Open questions for discussion

- npm, pnpm or bun?
- Node version (LTS)?
- Pre-commit hooks (husky + lint-staged), yes or no?

## Decisions log

_Empty — fill in during discussion._
