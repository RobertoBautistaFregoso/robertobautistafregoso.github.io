# Story S01: Walking skeleton + deploy pipeline
As the site owner, I want a minimal site deployed to a live public URL with the build/deploy pipeline working end-to-end, so that I can ship and iterate from day one instead of integrating everything at the end.

## Acceptance Criteria
- Given a fresh clone of the repo, when I run the documented build command, then the site builds locally with no errors.
- Given a merge to `main`, when the deploy pipeline runs, then the site is published to a live public URL automatically (no manual upload).
- Given the live URL, when I visit it, then I see a minimal placeholder page (name + one line) confirming the pipeline works end-to-end.
- Given the repo, when a newcomer opens it, then the README documents how to run, build, and deploy.

## Non-goals
- Real content, styling, or any home-screen sections (those are S02–S07)
- Choice of host/framework (that's the Phase 3 ADR — this story only requires that whatever is chosen deploys automatically)

## Definition of Done
See `_DEFINITION-OF-DONE.md` (shared — applies to all stories).
