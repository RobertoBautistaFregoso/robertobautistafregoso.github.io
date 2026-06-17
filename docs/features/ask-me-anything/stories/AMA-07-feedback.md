# Story AMA-07: 👍/👎 answer feedback
As Roberto, I want a one-tap quality signal under each answer, so that I can measure answer quality (a success metric) and spot weak spots.

## Acceptance Criteria
- Given an assistant answer, when it renders, then a 👍/👎 control appears beneath it.
- Given I tap 👍 or 👎, when I do, then the vote is recorded for that answer and the control reflects my choice (and doesn't double-count).
- Given the feedback control, when rendered, then it is keyboard-accessible with clear labels (not icon-only).

## Non-goals
- An analytics dashboard (v2).
- Free-text feedback; collecting any PII.
- Where exactly votes are stored — a Decide-stage detail (AC only requires "recorded").

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared).
