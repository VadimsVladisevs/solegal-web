# 11 — Final design variant

**Status:** 📝 Draft · blocked on customer choice
**Depends on:** 05, and the customer's approval of one design variant
**Milestone:** M2

## Goal

Keep only the design variant the customer approves (A, B or C; see [design.md](../design.md#design-variants-pending-customer-choice)) and remove everything that exists only to compare the variants.

## Scope

- The chosen treatment is rendered at `/{lang}/` for every locale
- Delete the `/{lang}/b` and `/{lang}/c` routes and their prerender entries
- Remove the `variant` prop and the unused styling branches from section components
- Remove the floating design switcher and the variant handling in the language switcher
- Update `docs/design.md` (drop the variants section, describe the final look) and `docs/architecture.md`
- Update tests that cover variants

**Out of scope:** further design changes the customer may request; track them as a new sub-plan.

## Tasks

- [ ] Record the customer's choice in the Decisions log
- [ ] Make the chosen variant the only treatment
- [ ] Delete the extra routes, the switcher and the `variant` prop
- [ ] Update docs and tests

## Done when

- Only `/{lang}/` exists per locale, and it renders the chosen variant
- No code references `variant`, `/b` or `/c`
- Lint, typecheck, unit and e2e tests pass

## Open questions for discussion

- Which variant did the customer choose? Any adjustments with it?

## Decisions log

_Empty — fill in during discussion._
