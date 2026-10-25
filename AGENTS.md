# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, etc.) working in this repository.

## Project

**solegal-web** is a static, multilingual website for a law firm. It presents:

- company information (About)
- services provided
- contacts
- a **Partners** section (planned for later)

This repository is currently a **demo**. It is deployed to GitHub Pages and keeps its content in the repo. The production project will run on **Cloudflare Pages** with **Sanity CMS**. Those integrations are out of scope for now, but the code must stay ready for them (see [architecture](docs/architecture.md)).

## Stack (summary)

- React 19 + TypeScript (strict)
- React Router v7 (framework mode) on Vite, prerendered to static HTML (`ssr: false` + `prerender`)
- Tailwind CSS v4
- i18n: `en` (default), `lv`, `ru`; all routes are locale-prefixed (`/en/...`)
- Vitest + React Testing Library, Playwright
- ESLint + Prettier

Full details and rationale: [docs/architecture.md](docs/architecture.md).

## Repository layout (planned)

```
app/
  routes/            # route modules, under the :lang segment
  components/        # shared UI components
  content/{en,lv,ru}/  # local typed content (demo content source)
  lib/content/       # content access layer (ContentSource interface + implementations)
  lib/i18n/          # locale config, dictionaries, useT()
public/              # static assets, _redirects/_headers (Cloudflare)
e2e/                 # Playwright tests
docs/
  architecture.md    # stack and architecture
  design.md          # design tokens and look & feel (created in step 02)
  plans/             # master plan + numbered sub-plans
```

## Commands

> Available after sub-plan [01-project-setup](docs/plans/01-project-setup.md) is done.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build the prerendered static site |
| `npm run test` | Unit/component tests (Vitest) |
| `npm run test:e2e` | E2E smoke tests (Playwright) |
| `npm run lint` | ESLint + Prettier check |
| `npm run typecheck` | `tsc --noEmit` |

## Planning workflow

All work is driven by plans in [docs/plans/](docs/plans/).

1. **Start from [docs/plans/00-master-plan.md](docs/plans/00-master-plan.md).** It lists every step and its status.
2. **Work on one sub-plan at a time**, in order, unless the master plan says steps can run in parallel.
3. **Discuss before you build.** A sub-plan with status 📝 Draft must be discussed with the user and refined first. Record decisions in its *Decisions log*, then set it to 🔵 Ready. Do not implement a Draft sub-plan.
4. **Keep the status current while working.**
   - When you start a sub-plan, set it to 🟡 In progress, both in the sub-plan file and in the master table.
   - Tick task checkboxes as you finish them.
5. **Finish only after verifying.** When every *Done when* criterion is verified (commands run, output checked), set ✅ Done in the sub-plan and in the master table.
6. **Track new work as a sub-plan.** Add a new numbered file in `docs/plans/` and a row to the master table. Do not grow an existing sub-plan beyond its goal.

Status legend: 📝 Draft (needs discussion) · 🔵 Ready · 🟡 In progress · ✅ Done

## Conventions

- **No hardcoded user-visible strings.** All text goes through i18n dictionaries or localized content.
- **Every page exists in all three locales** (`en`, `lv`, `ru`).
- **Pages get content only through the content access layer** (`app/lib/content/`). Never import content files directly from routes or components, so Sanity can replace the local source later.
- **Colors, fonts and spacing come only from design tokens** (Tailwind theme), never as ad-hoc values.
- **The base path is never hardcoded.** It comes from `BASE_PATH`, because the site is served under `/solegal-web/` on GitHub Pages and at `/` on Cloudflare.
- TypeScript strict mode; avoid `any`.
- Make small, surgical changes; match the existing style.
- Before claiming work is done, run `lint`, `typecheck` and `test` (and `test:e2e` when routes or layout changed).
