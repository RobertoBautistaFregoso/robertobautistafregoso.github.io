# Story S14: About page
As a prospective client or hiring manager, I want a short, human About page for Roberto, so that I get a sense of who he is and how he works beyond the résumé before deciding to reach out.

## Acceptance Criteria
- Given the `/about` page, when it loads, then it displays a bio of more than one paragraph (no "coming soon" / stub placeholder text).
- Given the bio, when read, then it states Roberto's current focus (AI Product Manager) and conveys his career arc (operations/growth → product → AI product).
- Given the About page, when it renders, then it includes lightweight context — based in Guadalajara/Zapopan, México and educated at ITESO — without duplicating the full `/work` career timeline.
- Given the About page, when it renders, then it offers a way to connect (link to LinkedIn or the contact path), so the visitor can act.
- Given the page `<title>` and meta description, when inspected, then they describe Roberto's About page (not the default site description).

## Non-goals
- Photo / photo gallery (optional, a later polish).
- Testimonials / "Kind Words" (separate, content-gated).
- The career timeline itself (that lives on `/work`, S13).
- Writing / Community (out of scope per ADR-0005).

## Definition of Done
See `_DEFINITION-OF-DONE.md` (shared — applies to all stories).

## Notes (build constraints — not acceptance criteria)
- Bio copy is **Roberto's voice** — drafted from real facts (career arc, location, ITESO, current learning in GenAI system design + the agentic SDLC); Roberto edits/approves the wording and any personal details before merge. No invented personal anecdotes.
- Reuse `PageLayout` + `.prose`; no new components.
