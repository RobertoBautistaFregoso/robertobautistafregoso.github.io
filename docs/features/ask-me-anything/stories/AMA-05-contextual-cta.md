# Story AMA-05: Contextual CTA (Contact-capture)
As a visitor who's ready to act, I want a relevant contact prompt at the right moment, so that I can reach Roberto without hunting for how.

## Acceptance Criteria
- Given the agent's Contact-capture branch returns a CTA, when the answer renders, then a CTA card displays the agent-provided headline plus actions (e.g. Book intro / Résumé / LinkedIn).
- Given the CTA card, when rendered, then its copy and actions come from the agent's response — not hard-coded in the front-end.
- Given a CTA action, when I click it, then it initiates that contact (opens booking / résumé / LinkedIn).

## Non-goals
- Persona-adaptive logic beyond what the agent returns (v2).
- Conversion analytics (Measure / v2).

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared). This is the north-star interaction (conversation → contact).
