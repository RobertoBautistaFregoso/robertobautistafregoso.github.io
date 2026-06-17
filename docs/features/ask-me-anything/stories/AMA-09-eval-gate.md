# Story AMA-09: Eval gate (golden set + groundedness)
As Roberto, I want a golden Q&A set with a groundedness gate, so that I never ship — or keep live — an agent that fabricates or leaks.

## Acceptance Criteria
- Given the golden Q&A set (P0 questions + must-refuse / NDA-trap cases), when evaluated via Arize, then groundedness shows zero fabrications and all must-refuse cases refuse.
- Given a change to the Langflow flow or the corpus, when promoting to live, then the eval gate is re-run and must pass first.
- Given an eval run, when complete, then results are recorded as an eval-report artifact (date, pass/fail, notable misses).

## Non-goals
- Continuous online monitoring beyond the release gate (Measure / v2).
- Fully automated CI integration of evals (could be a later improvement).

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared). Groundedness is a **release gate**, not a trend (PRD §7).
