# Master Plan — solegal-web

## Goal

Build a static, multilingual (`en`, `lv`, `ru`) one-page law-firm website, responsive and mobile-first, that presents the company, its team and its contacts, with a Partners section later. Deploy it as a demo on GitHub Pages, and keep it ready to move to Cloudflare Pages and Sanity CMS.

## Scope

**In scope (now):** project setup, design system, i18n, content layer with local content, core pages, SEO, CI/CD to GitHub Pages.

**Prepared for, but not integrated now:** Cloudflare Pages hosting, Sanity CMS.

**Cross-cutting requirement:** mobile compatibility. Every step that touches UI must work on phones, tablets and desktops; see [design.md](../design.md#mobile--responsive).

**Out of scope:** database, authentication, user accounts, server-side logic.

See [architecture.md](../architecture.md) for the stack and design decisions.

## Status

Legend: 📝 Draft (needs discussion) · 🔵 Ready · 🟡 In progress · ✅ Done

| # | Step | Status | Depends on | Milestone |
|---|---|---|---|---|
| 01 | [Project setup](01-project-setup.md) | ✅ Done | — | M1 |
| 02 | [Design discussion](02-design-discussion.md) | ✅ Done | — (parallel with 01) | M1 |
| 03 | [i18n & content layer](03-i18n-content-layer.md) | ✅ Done | 01 | M1 |
| 04 | [Layout & design system](04-layout-design-system.md) | 🔵 Ready | 02, 03 | M2 |
| 05 | [Core pages](05-core-pages.md) | 📝 Draft | 04 | M2 |
| 06 | [SEO & metadata](06-seo-metadata.md) | 📝 Draft | 05 | M2 |
| 07 | [CI/CD → GitHub Pages](07-ci-cd-github-pages.md) | 📝 Draft | 01 (pipeline), 05 (live site) | M2 |
| 11 | [Final design variant](11-final-design-variant.md) | 📝 Draft · blocked on customer | 05 + customer choice | M2 |
| 08 | [Partners section](08-partners-section.md) | 📝 Draft · backlog | 05 | M3 |
| 09 | [Cloudflare Pages](09-cloudflare-pages.md) | 📝 Draft · backlog | 07 | M4 |
| 10 | [Sanity CMS](10-sanity-cms.md) | 📝 Draft · backlog | 03, 09 | M4 |

## Milestones

- **M1 — Foundation & design** (01–03): a working project skeleton, an approved design, and i18n + content layer in place.
- **M2 — Demo site live** (04–07): all core pages in 3 locales, SEO-ready, auto-deployed to GitHub Pages.
- **M3 — Partners** (08): Partners section added.
- **M4 — Production** (09–10): running on Cloudflare Pages with content from Sanity.

## How to use this plan

1. Pick the next step whose dependencies are ✅ Done.
2. If it is 📝 Draft, discuss it with the user first and record the decisions in its *Decisions log*, then set it to 🔵 Ready.
3. Set it to 🟡 In progress while you implement it, and tick the task checkboxes as you go.
4. When every *Done when* criterion is verified, set it to ✅ Done, both here and in the sub-plan file.
5. Track new work as a new numbered sub-plan with its own row in this table.
