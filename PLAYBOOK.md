# Agentic SDLC Playbook — Zero to Shipped

> **Purpose.** Take yourself from idea → shipped app using Claude Code + GitHub, practicing every PM muscle and every Claude Code capability along the way. The *process* is the product. The app is the excuse.
>
> **How to use this doc.** Work through phases in order. Check items off as you go. Each phase has:
> - **PM muscle** — the product-thinking skill you're practicing
> - **Claude Code muscle** — the tool-craft you're practicing
> - **Do list** — what you execute
> - **Build-a-skill moment 🛠** — the custom skill/hook you create *in this phase* because the need just appeared
> - **Artifact** — what gets committed
> - **Stop & reflect** — 2 questions to consolidate learning
>
> Do not skip reflection — that's where learning consolidates.
>
> **Rule for Claude (you).** Guide, not driver. If I ask you to do work a phase assigns to me, push back and coach me through it instead. If I skip a Build-a-skill moment, call it out — those are the durable muscle.

---

## Ground rules before you start

- [ ] Read this whole file once end-to-end before Phase 0. Don't start building yet.
- [ ] Keep a running `LEARNINGS.md` in this repo. After each phase, add 3–5 bullets: what surprised you, what you'd do differently, what skill you want to build next.
- [ ] Every artifact (PRD, stories, ADR, etc.) gets committed to git. The repo *is* the portfolio.
- [ ] Default to **Plan Mode** (Shift+Tab twice) before any non-trivial edit. Approve the plan, then let Claude execute.
- [ ] Use **Conventional Commits** from commit #1.
- [ ] When a skill exists for the task, use it. When you feel the "I'm doing this thing again" itch, **stop and build a skill in that phase**. Don't defer.

---

## Phase 0 — Foundation & Mental Model  *(≈ 60–90 min)*

**PM muscle.** Environment hygiene, tool selection.
**Claude Code muscle.** Settings, skills, MCP servers, hooks, plan mode.

### Do
- [ ] Open this repo in VS Code with Claude Code attached. Confirm `/status` shows `sdlc-demo-v2`.
- [ ] Run `/help` and skim slash commands. Note which ones you don't recognize.
- [ ] Inspect current **permissions, hooks, env**. Ask Claude: *"walk me through my current settings.json and flag anything I should tune for an SDLC project."*
- [ ] List installed **skills**. Ask Claude: *"what skills do I have that map to PM, engineering, and design?"* Capture the map in `LEARNINGS.md`.
- [ ] List installed **MCP servers** with `/mcp`. Pick one you haven't used (e.g., `Claude_in_Chrome`, `Claude_Preview`) and note a scenario where it'd help later.
- [ ] Create a `CLAUDE.md` at the repo root: project purpose, tech stack (placeholder), conventions, and "how I want Claude to behave here."
- [ ] `git init`, first commit: `chore: initialize sdlc-demo-v2 with playbook and CLAUDE.md`.

### Build-a-skill moment 🛠
**Skill: `env-audit`** — a small meta-skill that inspects your current skills, MCPs, hooks, and permissions and produces a one-page summary you can re-run any time you start a new project. It's a low-risk first skill that forces you through `/skill-creator:skill-creator` with a simple use case.
- [ ] Scaffold with `/skill-creator:skill-creator`. Run it. Fix it. Commit.

### Artifact
- `CLAUDE.md`
- `LEARNINGS.md` (first entry — skills map + env notes)
- `env-audit` skill
- Initial git history

### Stop & reflect
1. Which three skills do you expect to lean on hardest? Which three do you expect to create?
2. What's the difference between a **skill**, an **MCP server**, a **hook**, and a **slash command**? Write a one-sentence definition of each in `LEARNINGS.md`.

---

## Phase 1 — Idea Selection & Problem Framing  *(≈ 90 min)*

**PM muscle.** Problem-first thinking. Resist the urge to pick a solution.
**Claude Code muscle.** Using PM skills as thinking partners, not ghostwriters.

> **Scope guardrail.** Pick an app with **one core user, one primary job, ≤ 3 screens, no auth on day one** (fake it). Examples: a "meeting-note → action-items" tool, a "reading list with spaced review" app, a "client-standup generator" from markdown notes. Something *you* would use this week.

### Do
- [ ] Brainstorm with `/product-management:brainstorm` OR `/product-management:product-brainstorming`. Feed it 3 pain points from your own week. Come out with ≥ 5 candidates.
- [ ] Pressure-test the top 2 with `/problem-framing-canvas:problem-framing-canvas`. Save both canvases.
- [ ] Pick one. Run `/problem-statement:problem-statement`. Do not let Claude write it for you — answer its prompts yourself.
- [ ] Write a one-paragraph **success definition**: *"This app is a success if, 2 weeks after shipping, [measurable user behavior]."*
- [ ] Optional: `/sales:competitive-intelligence` OR `/product-management:competitive-brief` for a 30-min scan of adjacent tools.

### Build-a-skill moment 🛠
**Skill: `pm-discovery-kickoff`** — chains brainstorm → framing → problem-statement with your house format (audience, problem, metric, non-goals). This is the discovery skill a PM starting a new initiative should be able to reach for on day one.
- [ ] Scaffold. Inputs: pain points. Output: filled canvas + problem statement + success def. Run it once more on a throwaway idea to test.

### Artifact
- `docs/01-discovery/problem-framing.md`
- `docs/01-discovery/problem-statement.md`
- `docs/01-discovery/success-definition.md`
- `docs/01-discovery/competitive-notes.md` (optional)
- `pm-discovery-kickoff` skill

### Stop & reflect
1. If a stakeholder said *"skip this — just build"*, what would you lose? Answer in your own words.
2. Did your custom skill produce something *better* than raw skill-chaining, or just *faster*? Both are wins — name which you got.

---

## Phase 2 — PRD & User Stories  *(≈ 2 hours)*

**PM muscle.** Scope discipline, acceptance criteria, prioritization.
**Claude Code muscle.** Chaining skills, keeping artifacts aligned.

### Do
- [ ] Run `/prd-development:prd-development`. Feed it your problem statement + success definition. Write the PRD yourself; Claude drafts sections, you edit.
- [ ] Identify **MVP cut** vs **v2**. Tag every requirement `[MVP]` or `[v2]`. Be brutal.
- [ ] Run `/user-story:user-story` to decompose MVP requirements into 5–10 stories, each with clear **acceptance criteria**.
- [ ] Prioritize stories using **MoSCoW** (Must / Should / Could / Won't). Put the ordering in `docs/02-product/priority.md` with a one-line rationale per story.
- [ ] Write a **one-page spec** (`/product-management:write-spec`) that a new engineer could read in 5 minutes and start coding.

### Build-a-skill moment 🛠 *(two skills here — PM-craft heart of the playbook)*
- [ ] **Skill: `story-writer`** — takes a PRD requirement + your acceptance-criteria template and emits a compliant story file. AC template enforces: user role, action, outcome, Given/When/Then, non-goals, out-of-scope notes.
- [ ] **Skill: `ac-linter`** — reads a story file and checks: testable AC? specific user? measurable outcome? non-goals declared? Run it on all your stories; fix what it flags.

### Artifact
- `docs/02-product/prd.md`
- `docs/02-product/stories/` (one file per story, numbered)
- `docs/02-product/priority.md`
- `docs/02-product/one-pager.md`
- `story-writer` and `ac-linter` skills

### Stop & reflect
1. Show the PRD to Claude and ask: *"poke holes in this as if you were a skeptical engineering lead."* Capture the 3 best critiques.
2. Did any story feel too big? That's your cue to split before coding — write down the heuristic you used.

---

## Phase 3 — Architecture & Tech Planning  *(≈ 90 min)*

**PM muscle.** Understanding tradeoffs enough to ask good questions.
**Claude Code muscle.** Using engineering skills to scaffold decisions you can defend.

### Do
- [ ] Run `/engineering:system-design`. Constraints: solo dev, learning project, ship to the web, ≤ $0/month infra.
- [ ] Run `/engineering:architecture` to produce an **ADR** for: (a) framework, (b) data store, (c) hosting. One ADR per decision.
- [ ] Decide tech stack. Starter suggestion: **Next.js + TS + Tailwind + SQLite/Turso + Vercel**. But *your* decision, with ADRs to justify.
- [ ] Ask Claude: *"given these ADRs, what's the smallest working skeleton I can scaffold?"* — review the plan in Plan Mode before executing.

### Build-a-skill moment 🛠
- [ ] **Skill: `adr-new`** — scaffolds an ADR with your preferred template (context, decision, consequences, alternatives, stakeholders). Use it for all three ADRs in this phase — you'll feel the ROI immediately.

### Artifact
- `docs/03-architecture/adr-0001-framework.md`
- `docs/03-architecture/adr-0002-datastore.md`
- `docs/03-architecture/adr-0003-hosting.md`
- `docs/03-architecture/system-design.md`
- `adr-new` skill

### Stop & reflect
1. For each ADR, could you explain the decision to a non-technical stakeholder in 30 seconds? Try it aloud.
2. Which decision are you least confident in? Flag it as a **risk** in your PRD.

---

## Phase 4 — GitHub Setup & Sprint Plan  *(≈ 60 min)*

**PM muscle.** Turning stories into trackable work.
**Claude Code muscle.** `gh` CLI fluency, project boards, first hook.

### Do
- [ ] `gh repo create sdlc-demo-v2 --public --source=. --remote=origin --push`.
- [ ] Convert each MVP story into a GitHub Issue (use skill below).
- [ ] Create labels: `mvp`, `v2`, `bug`, `chore`, `docs`, `spike`.
- [ ] Create a **GitHub Project (v2)** board: `Backlog / Next / In Progress / In Review / Done`. Add all issues.
- [ ] Run `/product-management:sprint-planning` to scope **Sprint 1** (a 1–2 day slice). Put 2–4 Must-have stories in.
- [ ] Create a `v0.1.0` milestone. Tag Sprint 1 issues to it.
- [ ] Write `CONTRIBUTING.md`: branch naming (`feat/<story-id>-slug`), commit style, PR template expectations.

### Build-a-skill moment 🛠
- [ ] **Skill: `story-to-issue`** — reads a story file and runs `gh issue create` with body, labels, milestone. One command per story, no copy-paste.
- [ ] **Hook: commit-to-learnings** — via the `update-config` skill, append each commit subject + timestamp to `LEARNINGS.md`. Your learning log now writes itself. This is your first hook.

### Artifact
- Live GitHub repo, issues, project board, milestone
- `CONTRIBUTING.md`
- `docs/04-sprint/sprint-01-plan.md`
- `story-to-issue` skill + commit hook in `settings.json`

### Stop & reflect
1. If you got hit by a bus, could a teammate open this repo cold and know what to do next? If not, fix it now.

---

## Phase 5 — Build Loop  *(the bulk of your time — 6–12 hrs)*

**PM muscle.** Staying in PM mode while code is being written: reviewing, not typing; verifying acceptance criteria, not implementation details.
**Claude Code muscle.** Plan Mode, TodoWrite, test-first, sub-agents, tight PRs.

### The loop (repeat per story)

1. [ ] `git checkout -b feat/<story-id>-<slug>`.
2. [ ] Re-read the story's acceptance criteria out loud.
3. [ ] Ask Claude (in Plan Mode): *"here's story #N and its AC. Plan the implementation: files to touch, tests to add, risks. Do not write code yet."*
4. [ ] Review the plan. Push back on scope creep. Approve.
5. [ ] Before code: `/engineering:testing-strategy` for this story → write failing test(s) first.
6. [ ] Let Claude implement. Use `TodoWrite` to track sub-tasks.
7. [ ] Run tests, lint, typecheck. Fix with Claude until green.
8. [ ] **You** manually exercise the feature in the browser (`Claude_Preview` or your dev server). Confirm AC hand-on-heart.
9. [ ] Conventional commit(s). Open PR with `gh pr create`. Body = summary + test plan + linked issue.
10. [ ] Run `/review` and `/security-review` on your own PR before merging. Act on findings.
11. [ ] Squash-merge, delete branch, close issue, move card to Done.
12. [ ] Append to `LEARNINGS.md`: what Claude did well, what you had to correct.

### Build-a-skill moments 🛠 *(create as each need first appears — don't front-load)*
- [ ] **First PR you write**: build **`pr-body-from-story`** — given a story file + branch, draft summary + test plan + risks + linked issue. You will use this every story after.
- [ ] **After story 2**: build **`story-implementation-plan`** — takes a story file, outputs a Plan-Mode plan in your house format. Kills the cold-start every time.
- [ ] **After story 3**: run `/simplify` across changed code. Act on one suggestion. Then run `/less-permission-prompts` to tighten your allowlist.
- [ ] **Any time** a step in the loop feels manual 3 times in a row: stop, name the pattern, build a skill.

### Try a new MCP
- [ ] Use `Claude_Preview` or `Claude_in_Chrome` to verify a screen-level story instead of clicking by hand. Note the ergonomic difference in `LEARNINGS.md`.

### Artifact
- Working MVP on `main`, all Sprint 1 issues closed
- `pr-body-from-story`, `story-implementation-plan` skills
- Growing `LEARNINGS.md` (auto-fed by your Phase 4 hook)

### Stop & reflect *(after every 2 stories)*
1. Are you still in PM mode, or have you drifted into IC coder mode? If drifted, what pulled you there?
2. Which loop step is slowest? That's your next skill.

---

## Phase 6 — Hardening: Review, Test, Secure  *(≈ 90 min)*

**PM muscle.** Quality gates, risk triage.
**Claude Code muscle.** Review skills, test coverage analysis.

### Do
- [ ] `/engineering:code-review` over the whole repo. Triage findings into: fix-now / backlog / won't-fix (with reason).
- [ ] `/security-review` — take every finding seriously, even the "low" ones. File issues for deferred.
- [ ] `/engineering:testing-strategy` — identify gaps. Add tests for the 2 highest-risk paths.
- [ ] `/design:accessibility-review` on your primary screen. Fix at least the top 3 issues.
- [ ] `/engineering:deploy-checklist` — resolve blockers.

### Build-a-skill moment 🛠
- [ ] **Skill: `quality-gate`** — chains code-review + security-review + a11y-review and produces a single triaged table (finding / severity / decision / owner). Single command before every release from now on.

### Artifact
- Tightened codebase, new test coverage, issues filed for deferred work
- `docs/06-quality/review-notes.md` summarizing what you found and what you chose to defer (and why)
- `quality-gate` skill

### Stop & reflect
1. What's the one risk you're *knowingly* shipping with? Write it down. Good PMs ship with known risks; great PMs write them down first.

---

## Phase 7 — Ship It  *(≈ 45 min)*

**PM muscle.** Launch discipline.
**Claude Code muscle.** Deploy pipeline, observability.

### Do
- [ ] Deploy to Vercel (or your choice). Connect the GitHub repo so pushes to `main` auto-deploy.
- [ ] Add basic observability: at minimum, console error capture + one key user-action log line. PostHog / Plausible optional.
- [ ] Tag `v0.1.0`. Write release notes with `gh release create v0.1.0`.
- [ ] Send the live URL to one real person. Ask for one piece of feedback.

### Build-a-skill moment 🛠
- [ ] **Skill: `release-notes`** — reads merged PRs since the last tag and drafts user-facing release notes (not changelog — *user-facing*, a different muscle).

### Artifact
- Live, public URL
- `v0.1.0` GitHub release with notes
- At least one piece of real external feedback captured in `docs/07-launch/feedback-log.md`
- `release-notes` skill

### Stop & reflect
1. What was easier than you expected? What was harder? Both are signal.

---

## Phase 8 — Iterate & Measure  *(≈ 60 min, ongoing)*

**PM muscle.** Closing the loop — where PM work *actually* lives.
**Claude Code muscle.** Metrics analysis, roadmap updates.

### Do
- [ ] Run `/product-management:metrics-review` against whatever signal you have (even 3 data points from 3 users).
- [ ] Translate feedback into GitHub Issues. Prioritize with `/product-management:roadmap-update`.
- [ ] Plan Sprint 2. **At least one ticket must come from real usage**, not your original PRD.
- [ ] Write a `/product-management:stakeholder-update` for future-you-in-3-months.

### Build-a-skill moment 🛠
- [ ] **Skill: `client-standup`** — given a week of commits + closed issues + open risks, drafts a PM-style standup. The highest personal-ROI skill in the playbook — you will use it next week on real client work.

### Artifact
- `docs/08-iterate/metrics-review.md`
- `docs/08-iterate/roadmap-v2.md`
- `docs/08-iterate/stakeholder-update.md`
- `client-standup` skill

### Stop & reflect
1. Did your MVP success definition (Phase 1) turn out to be the right metric? If not, update it.

---

## Phase 9 — Skills Review & Refinement  *(≈ 90 min)*

**PM muscle.** Meta — noticing repeatable patterns and sharpening the tools that encode them.
**Claude Code muscle.** Skill authoring hygiene, generalization, memory consolidation.

By now you've built ~10 skills in the heat of momentum. This phase is the cleanup pass that turns in-the-moment scrappy skills into durable, reusable ones.

### Do
- [ ] List every custom skill you created. For each: note when it was built, how often you used it, whether you'd reuse it on a client project.
- [ ] Pick the top 3 by personal ROI. For each:
  - [ ] Generalize hard-coded assumptions (project names, paths, your specific formatting).
  - [ ] Tighten the skill description so future-you knows when to trigger it.
  - [ ] Add a short usage example in the skill file itself.
- [ ] Delete or archive skills you haven't used since creating them. A bad skill in the index costs you every time you search.
- [ ] Run `/consolidate-memory` (or similar memory-consolidation skill, install if needed) to tidy what you've accumulated.
- [ ] Document the full skill inventory in `docs/09-skills/inventory.md` — which skill, what phase born in, when to use, input/output.

### Build-a-skill moment 🛠 *(optional bonus)*
- [ ] **Skill: `sprint-retro`** — runs a structured retro on `LEARNINGS.md` + closed issues and proposes 2 process changes. Meta-skill that makes future Phase 10s easier.

### Artifact
- Cleaned-up skills directory
- `docs/09-skills/inventory.md`
- Consolidated memory

### Stop & reflect
1. Which of your skills will you reach for *next week* on non-sdlc-demo work? If none, redesign.
2. Which skill was a miss? What pattern did you misread as a reusable one?

---

## Phase 10 — Debrief & Next Project  *(≈ 45 min)*

### Do
- [ ] Write a long-form `RETRO.md` in the repo root. Structure: what I built, what I learned about the agentic SDLC, what I learned about myself as a PM, what I'd change next cycle.
- [ ] Update your master `~/.claude/CLAUDE.md` with 1–3 durable preferences this project revealed.
- [ ] Pick the next project (v3) with scope 2× harder — e.g., add auth, add a second user role, add an integration.

---

## Skills you'll build along the way

Rough inventory of skills created in context throughout the playbook (built in the phase where the need first appears — never batched at the end):

| # | Skill | Phase | Purpose |
|---|---|---|---|
| 1 | `env-audit` | 0 | Inspect skills/MCPs/hooks/perms for any new project |
| 2 | `pm-discovery-kickoff` | 1 | Chain brainstorm → framing → problem statement |
| 3 | `story-writer` | 2 | Emit stories in house AC format |
| 4 | `ac-linter` | 2 | Lint stories for testable AC |
| 5 | `adr-new` | 3 | Scaffold ADRs in house format |
| 6 | `story-to-issue` | 4 | Story file → GitHub issue |
| 7 | `pr-body-from-story` | 5 | Draft PR body from story + branch |
| 8 | `story-implementation-plan` | 5 | Plan-Mode plan in house format |
| 9 | `quality-gate` | 6 | Chain reviews → single triaged table |
| 10 | `release-notes` | 7 | User-facing release notes from merged PRs |
| 11 | `client-standup` | 8 | Weekly standup from repo activity — **the one you'll actually use at work** |
| 12 | `sprint-retro` | 9 | (bonus) structured retro from learnings + issues |

Plus: at least 1 hook (commit → LEARNINGS.md), at least 1 new MCP used meaningfully.

---

## Existing skills you'll exercise

Target: touch every category at least once.

| Category | Skills | Phase |
|---|---|---|
| Discovery | problem-framing-canvas, problem-statement, product-brainstorming | 1 |
| Definition | prd-development, user-story, write-spec | 2 |
| Architecture | system-design, architecture | 3 |
| Planning | sprint-planning, roadmap-update | 4, 8 |
| Build | testing-strategy, debug | 5 |
| Quality | code-review, security-review, accessibility-review | 6 |
| Launch | deploy-checklist | 6 → 7 |
| Iterate | metrics-review, stakeholder-update | 8 |
| Meta | skill-creator, consolidate-memory | every phase / 9 |
| Harness | update-config, less-permission-prompts, simplify | 0, 4, 5 |

---

## Time budget (rough)

| Phase | Target | Notes |
|---|---|---|
| 0. Foundation | 60–90 min | Mostly reading + tuning |
| 1. Framing | 90 min | Don't rush this |
| 2. PRD + Stories | 2 hrs | Biggest PM-muscle payoff |
| 3. Architecture | 90 min |   |
| 4. GitHub + Sprint | 60 min |   |
| 5. Build loop | 6–12 hrs | Variable by app |
| 6. Hardening | 90 min |   |
| 7. Ship | 45 min |   |
| 8. Iterate | 60 min | Plus ongoing |
| 9. Skills review | 90 min | Cleanup pass |
| 10. Debrief | 45 min |   |

Total realistic commitment: **~2 focused weekends** or **~5 evenings**.

---

## How to start *right now*

1. Read this file end-to-end once (you may be doing that now).
2. Open Phase 0, check off the first box, and go.
3. When you finish each phase, commit the artifacts before moving on.
4. Every time you say *"I keep doing this"*, stop and build a skill.

Good luck. Message Claude when you're stuck — but only after you've tried.
