# Story S13: Work — career timeline
As a prospective client or hiring manager evaluating Roberto, I want `/work` to show his real career history with concrete outcomes, so that I can judge the depth and trajectory of his product experience before deciding to reach out.

(Re-scoped per ADR-0006: `/work` is now a career timeline, not a projects gallery. Side projects move to `/lab` in S16; the separate `/resume` page is dropped.)

## Acceptance Criteria
- Given the `/work` page, when it loads, then it displays a chronological career timeline of real roles, each with company, role title, date range, and outcome bullets.
- Given the SoftServe entries, when displayed, then both the AI Product Manager and Product Manager roles appear (the standalone "SoftServe AI PM" project card no longer exists).
- Given the timeline, when read, then it contains no placeholder roles (e.g. "Current" with no detail) and no `Patrick`/Pat content.
- Given the page, when it renders, then a Skills section appears after the timeline.
- Given the site, when I navigate to `/resume`, then it no longer exists (dropped — `/work` is canonical), and no internal link points to it.
- Given any company with an external URL, when its name is shown, then it links to the company site (new tab, `rel=noopener`).

## Non-goals
- Side projects (this portfolio, GenAI system design) — they move to `/lab` (S16); they temporarily still render at `/work/<slug>` and on the home teaser until S12/S16.
- Home page reorganization (S12).
- Company logos, downloadable/PDF résumé, and testimonials/"Kind Words" (later / content-gated).
- Writing/Community (out of scope per ADR-0005).

## Definition of Done
See `_DEFINITION-OF-DONE.md` (shared — applies to all stories).

## Notes (build constraints — not acceptance criteria)
- Career data sourced from Roberto's LinkedIn, translated to English, in `src/data/experience.ts` — **Roberto to verify accuracy and public-OK before merge**; no fabricated metrics.
- The `projects` content collection (now portfolio + genai) is left in place for S16 to relocate to `/lab`.
