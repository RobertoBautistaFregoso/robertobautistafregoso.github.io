# Story AMA-01: Walking skeleton (ask → endpoint → agent → answer)
As a visitor, I want to type a question on `/ask` and get a real answer back from the agent, so that the core ask→answer loop works end-to-end before any feature is layered on.

## Acceptance Criteria
- Given the deployed site, when I visit `/ask`, then a minimal chat page (input + send) renders alongside the existing static site.
- Given I submit a question on `/ask`, when the request completes, then a serverless endpoint has called Roberto's Langflow flow and the page displays the flow's answer text.
- Given the endpoint, when inspected, then the LLM/flow API key is server-side only — never present in client code or the static bundle.
- Given a deploy, when the site builds, then the existing static pages still build and deploy unchanged (the agent addition doesn't break the current pipeline).

## Non-goals
- Streaming, answer-quality/grounding polish, contextual CTA, suggested prompts, styling — all later stories.

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared). Plus: the runtime/secret approach is set by the Decide-stage ADR.
