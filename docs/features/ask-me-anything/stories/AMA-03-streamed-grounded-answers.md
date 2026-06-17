# Story AMA-03: Streamed, grounded answers + working memory
As a visitor, I want answers that stream in, are grounded in real facts about Roberto, and let me ask follow-ups in the same session, so that I get fast, trustworthy, conversational answers.

## Acceptance Criteria
- Given I ask a question on `/ask`, when the agent responds, then the answer streams token-by-token, with a visible "thinking" state until the first token.
- Given an answer, when it renders, then its content is grounded in the maintained corpus (Retrieve→Generate) and does not assert facts absent from the corpus.
- Given I ask a follow-up in the same session, when I do, then the agent uses the in-session conversation history (working memory) as context.
- Given a streamed answer, when it renders, then it is inside an ARIA live region so screen readers announce it.

## Non-goals
- REFUSE / no-data behavior (AMA-04); contextual CTA (AMA-05).
- Persistent / cross-session memory (v2).

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared).
