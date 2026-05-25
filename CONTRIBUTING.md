# Contributing

This is a solo learning project built through the agentic SDLC, but it follows real team conventions — both as practice and because the workflow itself is part of what the repo demonstrates.

## Branches

- `feat/<story-id>-<slug>` — a feature/story (e.g. `feat/S02-hero`)
- `fix/<issue>-<slug>` — a bug fix
- `chore/<slug>` — housekeeping (deps, config, docs tooling)
- Never commit directly to `main`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org): `type: short imperative summary`.
Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.

## Pull requests

- One PR per story/issue.
- **Squash-merge**, then delete the branch.
- PR body: **summary** + **test plan** + **linked issue** (`Closes #N`).
- Self-review with `/review` and `/security-review` before merging.

## Issues

- One issue per user story, linked to a milestone (`v0.1.0`, …).
- Acceptance criteria live as `- [ ]` checkboxes in the issue.

## The per-story build loop (Phase 5)

1. `git checkout -b feat/<story-id>-<slug>`
2. Re-read the story's acceptance criteria
3. Plan the implementation (Plan Mode) — files, tests, risks — before writing code
4. Write failing test(s) first where it makes sense
5. Implement until tests + lint + typecheck are green
6. Manually verify the acceptance criteria in the browser
7. Conventional commit(s) → open PR (`gh pr create`)
8. `/review` + `/security-review` → act on findings
9. Squash-merge, delete branch, close issue
10. Note what Claude did well / what you corrected in `LEARNINGS.md`

## Definition of Done

Every story meets `docs/02-product/stories/_DEFINITION-OF-DONE.md` before it's "done": responsive, accessible (WCAG AA basics), agent-readable (static HTML + JSON-LD), deploys clean, PR-reviewed, no console errors, no broken links.
