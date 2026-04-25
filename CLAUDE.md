# sdlc-demo-v2

Personal learning project to practice the agentic SDLC end-to-end: idea → PRD → stories → build → ship → iterate, using Claude Code + GitHub.

## Active guide

The step-by-step process lives in `PLAYBOOK.md` at the repo root. Always consult it — don't improvise the workflow.

## What this project is (v0)

TBD — selecting a small app idea in Phase 1 of the playbook. One user, one job, ≤ 3 screens, no auth day-one.

## Tech stack

TBD — deciding in Phase 3 via ADRs in `docs/03-architecture/`. Likely Next.js + TS + Tailwind + SQLite/Turso + Vercel, but not committed.

## Conventions

- Branches: `feat/<story-id>-<slug>`, `fix/<issue>-<slug>`, `chore/<slug>`
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`)
- PRs: squash-merge, delete branch after merge
- Issues: one per user story, linked to a milestone (`v0.1.0`, etc.)
- Docs live under `docs/NN-phase-name/` — numbered by playbook phase
- Custom skills I build live in my global skills dir; note the skill name + phase in `LEARNINGS.md` when created

## How to behave here

- **I'm the PM, not an IC engineer.** When I drift into writing code instead of reviewing it, call it out.
- **Plan Mode before non-trivial edits.** Always plan → I approve → then execute.
- **Push back when I skip playbook steps.** Especially the Stop-and-reflect questions and Build-a-skill moments.
- **Terse responses.** I can read diffs and tool output. Skip summaries of what I just watched you do.
- **Honesty over flattery.** If my PRD is weak, say so with a reason. If an idea won't work, tell me why before I spend an hour on it.
- **Root cause over workaround.** If a test fails, don't add a skip — find out why.

## Traps / do-nots

- Don't commit directly to `main` — always via PR.
- Don't skip `/review` or `/security-review` before merging a PR.
- Don't edit `PLAYBOOK.md` mid-phase to dodge a step. If the playbook is wrong, open a discussion first.

## Key files

- `PLAYBOOK.md` — the process I'm working through
- `LEARNINGS.md` — append-only log, one entry per phase
- `docs/` — artifacts (PRD, stories, ADRs, etc.)
- `CONTRIBUTING.md` — created in Phase 4

## Commands (to be added)

- `npm run dev` — TBD (Phase 5)
- `npm test` — TBD (Phase 5)
- `npm run lint` — TBD (Phase 5)