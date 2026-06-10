# Story S16: Lab — side projects
As a visitor curious about how Roberto works hands-on, I want a Lab section with his side projects written up concretely, so that I can see his builder side in practice beyond the job history on /work.

## Acceptance Criteria
- Given the `/lab` page, when it loads, then it lists a card for each side project (portfolio, genai-system-design) showing title, skills, a one-line description, and a thumbnail — with no "coming soon" stub text.
- Given a Lab card, when I click it, then I navigate to `/lab/<slug>` and see a full write-up structured as problem → what Roberto did → outcome (or current status for in-progress work).
- Given any project detail page, when it renders, then it contains no placeholder copy (e.g. "Content placeholder", "lands in S13").
- Given the old project URLs, when I request `/work/<slug>`, then they no longer exist, and no internal link on the site points to them.
- Given each Lab thumbnail, when displayed, then it has descriptive `alt` text naming the project.
- Given the `/lab` detail pages, when rendered, then back-navigation links point to `/lab` (not `/work`).

## Non-goals
- Interactive / live-demo experiments (future format per ADR-0006; cards can coexist with them later).
- Writing / Community (out of scope per ADR-0005).
- The career timeline (lives on `/work`, S13).
- Testimonials / "Kind Words" (separate, content-gated).
- Real photographic/designed thumbnails — distinct generated SVG thumbnails are acceptable until Roberto supplies real images.

## Definition of Done
See `_DEFINITION-OF-DONE.md` (shared — applies to all stories).

## Notes (build constraints — not acceptance criteria)
- Write-ups drafted from known facts (this repo's own history; Roberto's stated coursework) — **Roberto reviews/edits before merge**; no invented outcomes.
- Reuse the `projects` content collection + `ProjectCard` + `ProjectLayout`; route moves from `/work/[...slug]` to `/lab/[...slug]`.
- Clean any residual Pat strings if upstream lab code gets re-pulled (none expected for card style).
