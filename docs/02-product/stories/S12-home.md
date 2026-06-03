# Story S12: Home / hero
As a recruiter or prospective client landing on the home page, I want to immediately understand who Roberto is and what he does and have a clear path to his work, so that I can decide within seconds whether to dig deeper.

## Acceptance Criteria
- Given the home page, when it loads, then the hero displays Roberto's name, his AI Product Manager positioning, and a supporting line.
- Given the hero, when it renders, then it shows primary calls-to-action linking to `/work` and `/about`.
- Given the home page, when it loads, then it shows a career-highlights strip of real, curated highlights (e.g. current SoftServe role, the ops→growth→product→AI arc, and at least one concrete metric).
- Given the home page, when it renders, then it no longer shows the side-project cards (portfolio, genai) under a "Work" heading; any "view more" link in that section points to `/work`.
- Given the home page, when it renders, then the Person JSON-LD remains present and valid in the static HTML.

## Non-goals
- Profile photo (deferrable polish).
- A Lab teaser (deferred to S16 — `/lab` is still a stub; no link to an empty page).
- The full career timeline (lives on `/work`, S13).
- Writing / Community (out of scope per ADR-0005).

## Definition of Done
See `_DEFINITION-OF-DONE.md` (shared — applies to all stories).

## Notes (build constraints — not acceptance criteria)
- Highlights are curated from real data (`experience.ts` / known facts) — no invented metrics.
- Reuse `PageLayout`; no new components required.
