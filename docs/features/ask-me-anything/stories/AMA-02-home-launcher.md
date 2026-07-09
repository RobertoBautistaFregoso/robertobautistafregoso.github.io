# Story AMA-02: Home ask module (inline)

> **Decision update (2026-07-08):** home hosts the ask experience **inline** — it is no longer a launcher that routes to `/ask`. Design chosen: grouped-list suggested prompts with icons (**C**) + a carded inline answer with a spinner "thinking" state (**E**), left-aligned, in the site design system. This supersedes the "route to `/ask`" behavior in the original AC/non-goals. `/ask` remains as a standalone, deep-linkable surface sharing the same engine (`src/lib/ask-agent.ts`).

As a visitor on the home page, I want to ask a question and get the answer right there, with example prompts to start, so that I can engage immediately — without hunting for how, and without leaving the page.

## Acceptance Criteria
- Given the home page, when it loads, then it shows a compact identity (name + positioning), the headline "What would you like to know about me?", suggested prompts, and an input.
- Given I type a question and submit, when I do, then the answer renders **inline on the home page**, grounded (via the shared engine).
- Given a suggested prompt, when I tap it, then it is submitted and the answer renders inline.
- Given the suggested prompts, when rendered, then they are real `<button>`s — keyboard-reachable with visible focus.
- Given a request is in flight, when I wait, then a "thinking" state shows until the answer renders.

## Non-goals
- Streaming, working memory, follow-up chips (AMA-03 / AMA-06).
- Persona-adaptive UX (v2).

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared).
