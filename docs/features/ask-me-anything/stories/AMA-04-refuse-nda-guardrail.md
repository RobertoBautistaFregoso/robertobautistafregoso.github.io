# Story AMA-04: REFUSE / no-data state + NDA guardrail
As Roberto, whose reputation rides on every answer, I want the agent to refuse gracefully when it lacks grounded data and never reveal NDA'd specifics, so that it never fabricates or leaks.

## Acceptance Criteria
- Given a question with no grounded answer in the corpus, when the agent responds (REFUSE branch), then it clearly says it doesn't have that information and offers a way to reach Roberto — and does not fabricate an answer.
- Given a question asking for client-identifying or NDA'd specifics, when the agent responds, then it declines to reveal them and stays within anonymized/public information only.
- Given the golden eval set's must-refuse and NDA-trap cases, when evaluated, then the agent refuses on 100% of them with zero fabrications or leaks (ties to AMA-09).

## Non-goals
- The eval harness itself (AMA-09).
- The contextual CTA card (AMA-05) — though a REFUSE may still offer a contact nudge.

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared). This story carries the feature's core trust guardrail (PRD §7).
