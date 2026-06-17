# Story AMA-02: Home launcher module
As a visitor on the home page, I want an "ask anything" entry with example prompts, so that I can start a question immediately without hunting for how to engage.

## Acceptance Criteria
- Given the home page, when it loads, then it shows the ask module: badge ("Roberto's AI · ask it anything"), headline "What would you like to know about me?", a list of suggested prompts, and an input.
- Given I type a question and submit, when I do, then I land on `/ask` with that question already submitted and answering.
- Given a suggested prompt, when I tap it, then I land on `/ask` with that prompt submitted.
- Given the suggested prompts, when rendered, then they are real `<button>`s — keyboard-reachable with visible focus.

## Non-goals
- The answer rendering / conversation internals (AMA-03).
- Inline-expand or modal behavior (decided: route to `/ask`).

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared).
