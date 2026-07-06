# LEARNINGS

> **A build-in-public log.** This is the honest, unvarnished record of building this site — and learning the agentic SDLC — end to end. It deliberately includes the pivots, course-corrections, and things I got wrong the first time. That's the point: the value is in showing *how* the thinking evolved and self-corrected, not in pretending it was linear. If you're reading this as a hiring manager, client, or fellow builder — the visible self-correction *is* the signal.

Append-only log. One entry per playbook phase. Written by Roberto in his own voice — Claude critiques, doesn't draft.

Format per entry:
- **Date:** absolute date (not "today")
- **What I did:** the actions, in order, terse
- **What I learned:** insights I want my future self to remember — *not* a recap of what happened, but the lesson extracted from it
- **Skills / hooks / MCPs built this phase:** name + one-line purpose + path
- **Open questions:** things I still don't fully understand, flagged so I notice if they keep coming up
- **Resumption note:** what tomorrow-me needs to know to pick up cold

---

## Phase 0 — Foundation

**Date:** 2026-04-25
**Status:** ⚠ **PAUSED with reflection debt** (option c at phase-close decision). Substantive work done; synthesis deferred.

### What I did

- Wrote `CLAUDE.md` at repo root (copy-pasted Claude's template verbatim — see debt below)
- Installed `skill-creator` plugin from `claude-plugins-official` marketplace at user scope
- Built first custom skill `env-audit` — filesystem-only inventory of Claude Code config
  - SKILL.md drafted, redaction rules added, output template specified
  - Eval harness via subagents failed (sandboxing limitation)
  - Three real bugs surfaced via in-session manual eval: wrong plugin config path (`installed_plugins.json`, not `config.json`), MCP source assumption (`claude mcp list` is primary, not `~/.claude.json`), CLI built-ins invisible to filesystem inspection
  - v1 honesty rescope: category headers renamed to `(filesystem)` to acknowledge what's NOT enumerated
  - Description optimizer (`run_loop.py`) ran 5 iterations: best score = original description, 50% pass rate confirmed as harness artifact (not real failure)
  - Validated in real interactive session 2026-04-25: triggered correctly, output matches spec
- `git init -b main` + first commit (`78223d7 chore: bootstrap sdlc-demo-v2 with playbook and Phase 0 scaffolding`)

### What I learned

⚠ **REFLECTION DEBT — not yet written.**

The bullets that belong here are *insights*, not actions, and they're synthesis work I haven't done yet. The raw material is hot from this session — capture it in the next session before texture is gone.

Topics with material to extract from (use these as prompts when paying down the debt):
- The verbatim CLAUDE.md copy-paste (the cost of outsourcing synthesis to AI)
- The skills consultant framework — 4 signals / 4-tier match / 3 layers
- "Eval set IS the spec" — eval queries are acceptance criteria, not test data
- Subagent sandboxing — skills that read `~/.claude/` are structurally hard to subagent-test
- v1 honesty rescope — why renaming category headers beat adding a warnings note
- "Eval against your actual machine ≠ eval against documentation"
- The 4× skip pattern in this very phase — what does that say about the gap between my stated process (CLAUDE.md rules) and my actual pace?

This debt MUST be paid before Phase 9 (Skills Review) and Phase 10 (Debrief) — those phases are hollow without this synthesis. Recommend paying it down at start of Phase 1 or end of Phase 1 at the latest.

### Skills / hooks / MCPs built this phase

- `env-audit` — filesystem-only inventory of Claude Code config (plugins/skills/MCP/hooks/permissions/slash commands) at global + project scope, with secret redaction. Path: `~/.claude/skills/env-audit/SKILL.md`. Validated in real session 2026-04-25.

### Open questions

⚠ Reflection debt — also not yet written. Likely candidates from this session worth flagging:
- Why does `claude -p` (non-interactive mode) not load skills the same as interactive? Is that documented or a discovery?
- Is there a memory-consolidation skill installed, or do I need to build one for Phase 9?
- The 4× skip pattern: is the issue my pace, or the playbook's pacing? Phase 1 will tell.

### Resumption note

**Where I stopped:** Closed Phase 0 with reflection debt (option c). Moving to Phase 1.

**Phase 0 still owes:**
1. Synthesis bullets in "What I learned" above
2. 4 definitions in my own words: skill / MCP / hook / slash command (PLAYBOOK Phase 0 Stop & reflect Q2)
3. PLAYBOOK Phase 0 Stop & reflect Q1: "Which three skills do I expect to lean on hardest? Which three do I expect to create?"

**State of repo:** branch `main`, 1 commit (`78223d7`). Clean working tree at time of phase close (this LEARNINGS update creates a new uncommitted change). No GitHub remote yet — that's Phase 4.

**Open background work:** None. `run_loop.py` finished. Skill-creator workspace at `~/.claude/skills/env-audit-workspace/` should be cleaned up before Phase 1 work: `rm -rf ~/.claude/skills/env-audit-workspace/` (also tell skill-creator "done, validated, harness was artifact" so it can close out gracefully).

**Next session pickup:** Phase 1 — Idea Selection & Problem Framing. Setup gap to address first: the PLAYBOOK references `/product-management:brainstorm` and `/sales:competitive-intelligence` but neither plugin is installed. Decide whether to install them or skip the brainstorm-via-skill step.

---

## Phase 1 — Idea Selection & Problem Framing

**Date started:** 2026-04-28
**Status:** 🔄 **IN PROGRESS — direction pivoted.** First attempt deprioritized; restarting step 1 with a new problem.

### Where I am in the phase

PLAYBOOK Phase 1 has a 5-step Do list. I am restarting **step 1 (brainstorm)** with a new problem framing. Steps 2-5 + Build-a-skill moment still ahead.

### Key decisions made so far

1. **Setup gap discovered:** PLAYBOOK references `/product-management:brainstorm`, but the `product-management` plugin does NOT exist in `claude-plugins-official` marketplace (verified via `/plugin` discovery search). PLAYBOOK has a bug here. **Logged for Phase 9 revision:** *"Don't reference plugins by exact slash-command name unless install path is verified."*
2. **Decision:** proceed with **freeform brainstorm in chat** instead of structured plugin. Step 2 onward uses `/problem-framing-canvas:problem-framing-canvas` which IS installed.
3. **MCP newly connected since Phase 0:** `claude.ai Granola` (meeting transcripts). Available data source for any meeting-related framing.

### First attempt — deprioritized

Initial pain point #1 was written: *"Lots of client meetings I multitask through; watch recordings post-hoc to extract action items, findings, discussion, participants."* Sharpening Qs were never answered and pain #2 / #3 never written. Direction abandoned in favor of a new problem (TBD as of this entry). Keeping this note for history in case the meeting-extraction problem resurfaces in brainstorming.

### Reflection debt status

Phase 0 reflection debt remains on the books (unchanged from Phase 0 resumption note). Implicit choice from earlier: **option B — pay Phase 0 + Phase 1 debt at end of Phase 1.** Both will owe synthesis when Phase 1 closes.

### State of repo (at time this entry was written)

- Branch `main`, building toward Phase 1 discovery
- No GitHub remote — Phase 4 territory

---

## Phase 1 — FINAL PIVOT to Portfolio Site (2026-05-25)

**Decision:** Committing to building my **first portfolio site** (reference: itspatmorgan.com) as THE project to ride all the way through Phase 10. This is the last pivot.

### The pivot history (a lesson in itself)

Three problem directions explored before committing:
1. **Meeting-recording extraction** — pain point only, no docs, deprioritized
2. **Personal finance tracker** — full discovery arc completed + committed (commit `3d1c7d8`), then abandoned. Archived to `docs/archive/finance-tracker/` (not deleted — recoverable).
3. **Portfolio site** — committed direction. ✅

**The honest lesson (for reflection debt):** I did Phase 1 three times and Phase 2 zero times. The risk was never picking the "wrong" idea — it was perpetual idea-selection that never reached the actual learning (PRD → stories → build → ship → iterate, Phases 2-10). What does my 3× pivoting say about how I commit to projects? → flagged for reflection synthesis.

**Why the portfolio is the right vehicle:** genuinely shippable in a realistic timeframe (finance app's categorization engine was real, weekend-eating engineering); I'll actually use it (AI PM consultant needs one); high motivation ("finally one I really want"); fits scope guardrail (one visitor-user, ≤3 screens, no auth); exercises design skills the finance app wouldn't have.

**Watch-out:** a portfolio can be *too* simple (drop a template on Vercel in an hour = no real SDLC practice). Scope must keep it a genuine exercise: content/projects data model, working contact form with validation, deploy pipeline, real accessibility passes. Plus the harder, PM-flavored part: scoping discipline (what to show/cut) + visitor-first UX.

### What carries forward

- **Finance discovery is NOT wasted** — the *process* practice transferred (ran the full canvas → problem statement → success def arc, caught my own solution-first bias, killed a fabricated "5 hrs/week" metric, recovered a lost research doc). The artifact is shelved; the muscle is mine.
- **Reflection debt now spans:** Phase 0 (4 definitions, "3 skills I'll lean on/build") + the 3× pivot lesson. Still owed.

### Next

Lightweight Phase 1 for the portfolio (problem is well-understood → quick problem statement + success definition, skip the heavy MITRE canvas). New discovery docs land fresh in `docs/01-discovery/`.

---

## Phase 2 — PRD & User Stories (in progress, 2026-05-25)

### Skills built
- `story-writer` — emits user stories in house format (Mike Cohn + Gherkin AC + Non-goals + shared DoD reference). Path: `~/.claude/skills/story-writer/SKILL.md`. Built **lightweight** (direct SKILL.md, no skill-creator eval harness) and validated by real use on stories S02–S07.
- `ac-linter` — checks story files against the same AC-quality rules story-writer enforces (testable Gherkin "then", specific role, value-bearing "so that", non-goals present, DoD referenced, right-sized). Path: `~/.claude/skills/ac-linter/SKILL.md`. **Caught 2 real issues on first run** (an untestable "distinguishing angle" AC, and a build constraint masquerading as a visitor AC) — proof the lint-then-commit gate works. story-writer + ac-linter are a deliberate emitter/checker pair sharing one rule set.

### Build-a-skill judgment notes (worth keeping)
- **Skipped `pm-discovery-kickoff`** (playbook's Phase 1 build-a-skill): discovery happens once per project → ~zero in-project reuse. Its value is external (client work), so building it now would be speculative. Build skills where the pattern *repeats*.
- **Built `story-writer`** instead, because it DOES repeat (6 stories now + every story in Phase 5) and it fills a real gap over the generic `user-story` plugin (auto-enforces my DoD + non-goals + house format).
- **Right-sized the build:** no heavy eval/run_loop. That rigor fit env-audit (reads private config, redaction, edge cases, real risk); it's overkill for a template-emitter. Effort should match complexity + risk. Over-engineering a simple skill is its own anti-pattern.
- Lesson: the playbook's "build a skill every phase" is a prompt, not a mandate. The PM muscle is deciding *which* skills earn their keep and *how much* rigor each deserves.

### Pending in Phase 2
- MoSCoW prioritization → `priority.md`
- One-pager → `one-pager.md`

---

## Phase 3 — Architecture (in progress, 2026-05-25)

### Decisions (ADRs)
- **ADR-0001: Astro** (framework) — chose the right-sized static-content tool over Next.js. Probed the Next.js case first (asked which portfolio use cases favor Next: live AI demos, server forms, auth, live GitHub-activity data) before deciding. Documented the **revisit trigger**: if live demos / live data become real near-term needs → migrate to Next.js + Vercel.
- **ADR-0002: Astro content collections** (content model) — typed markdown collections, content in git, serves living-site iteration. Revisit if a non-technical collaborator needs to edit content.
- **ADR-0003: GitHub Pages + GitHub Actions** (hosting/deploy) — $0, on-theme, automated deploy = the S01 pipeline + part of the showcase. Open question: custom domain (deferred).
- **ADR-0004: Machine/agent readability** — JSON-LD (schema.org), `llms.txt`, AI-permissive robots.txt, sitemap, JSON Resume. Adopted day 1. Insight: optimizing for AI agents is (a) reinforced-not-undermined by Astro's static/zero-JS output, (b) *on-brand* for an AI PM — a parseable, structured site *demonstrates* AI-native thinking (offensive positioning, not just SEO), and (c) NOT premature optimization — it's a cheap markup discipline, not a speculative feature. First real reuse of `adr-new`. DoD updated to carry agent-readability per page.

### Skills built
- `adr-new` — scaffolds ADRs in house format (Context / Decision / Rationale / Alternatives-with-reasons / Consequences + **revisit trigger**). Path: `~/.claude/skills/adr-new/SKILL.md`. **Marginal-ROI build** (only 2 more ADRs this phase) — built anyway because ADRs recur across phases + future projects and it keeps the format consistent. The "revisit trigger" convention is the key craft: an ADR names the condition that would reverse it, turning it into a tripwire, not a tombstone.

### Insight worth keeping
- The framework decision was the clearest "understand tradeoffs" PM rep so far: the right call wasn't "the better framework" in the abstract — it was right-tool-for-context (static content site + GitHub Pages + living iteration) with a documented condition for reversal. The **hosting choice gated the framework's value** (GitHub Pages = static-only neutralizes Next.js's server advantages) — a reminder that architecture decisions are coupled, not independent.
- Reflection debt still outstanding (Phase 0 + Phase 2 + now Phase 3 Stop-&-reflect). Compounding.

### Pending in Phase 3
- (Optional) "smallest working skeleton" plan — bleeds into Phase 5 (it's story S01)

---

## Phase 4 — GitHub Setup & Sprint Plan (in progress, 2026-05-25)

### Done
- **Private GitHub repo created + pushed** (`RobertoBautistaFregoso/sdlc-demo-v2`) — 10 commits finally off the laptop. Public flip deferred to Phase 5 (forced by free GitHub Pages anyway, and that's when there's a real site + a conscious LEARNINGS-curation decision).
- **Labels** (`mvp`/`v2`/`chore`/`docs`/`spike` + GitHub defaults) + **milestone `v0.1.0`**.
- **7 stories → 7 GitHub Issues** (#1–#7), labeled `mvp`, milestoned, AC as checklists.
- **Sprint 1 plan**: the 4 Musts (S01/S02/S04/S06 = issues #1/#2/#4/#6).
- **CONTRIBUTING.md**: branch/commit/PR conventions + the Phase 5 per-story loop.

### Skills built
- `story-to-issue` — story file → `gh issue create` (title, AC checklist, label, milestone). Path: `~/.claude/skills/story-to-issue/SKILL.md`. Used immediately on all 7 stories (7 uses → clears the ROI bar on first run).

### Pending in Phase 4
- Project board (Backlog/Next/In Progress/In Review/Done) — *optional* for solo; mostly a showcase signal for when the repo goes public
- **First hook: commit → LEARNINGS** (via `update-config`) — the first *hook*, distinct from a skill (and the skill-vs-hook distinction is literally one of the Phase 0 reflection-debt items)

---

## Phase 5 — Build Loop (in progress, 2026-05-25)

**Branch discipline now active:** code goes on per-story feature branches + PRs, no direct `main` commits (per CONTRIBUTING).

### S01 — Walking skeleton + deploy ✅ DONE — LIVE at https://robertobautistafregoso.github.io/

- Astro 6.3 scaffolded; GitHub Actions → GitHub Pages deploy workflow; README; minimal placeholder page (name + one line — real hero is S02)
- Repo renamed → `robertobautistafregoso.github.io` (D2=b); repo flipped **public** (D1 resolved as **(b)**: public + a build-in-public framing intro on LEARNINGS so the candor reads as intentional self-correction; the two-repo split was judged not worth it)
- All 4 AC met; issue #1 closed; PR #8 merged
- **Deploy bug + fix (PR #9):** first deploy *failed* — the CI runner used Node 20 (withastro/action default) but Astro 6 requires Node ≥22.12. It built fine locally on Node 25 → classic **local ≠ CI** gotcha. Fix: pin `node-version: 22` in the workflow. Recurring theme: verify against the *real* runtime, not just your machine — same shape as env-audit's "eval against your actual machine ≠ documentation," and the run_loop harness lesson. Three times now this pattern has bitten; it's the durable Phase-0-through-5 meta-lesson.
- Benign: GitHub's own actions (checkout/setup-node/upload-artifact @v4) run on Node 20, deprecated → forced to Node 24 by June 2026. Non-blocking; bump versions when convenient.

### Resumption — next session, in order:
0. **🎉 ALL 4 Sprint-1 MUSTS SHIPPED & LIVE: S01 ✅ S02 ✅ S04 ✅ S06 ✅.** The v0.0 "thinnest shippable portfolio" (priority.md) is live: hero + positioning + Selected work (3 projects) + LinkedIn contact CTA, all responsive/a11y/agent-readable. Foundation: `Layout.astro` + `global.css` + projects content collection (`src/content.config.ts` + `src/content/projects/*.md`).
   - ⚠ **Project content is true-but-thin** (general statements, no specifics/outcomes). Refine `src/content/projects/*.md` with concrete results to make the cards compelling.
   - Note: S04 finished on a fresh branch off main (not the original parked branch, which was deleted) to avoid the index.astro merge conflict with S06. Lesson: parallel feature branches editing the same file diverge — branch from latest main, or rebase.
   - **Design pass ✅ (issue #13, LIVE):** editorial serif (Fraunces) headings + Inter body, warm-stone palette + blue accent, **light/dark mode** (`prefers-color-scheme`), polished cards + tag pills. All design lives as CSS custom-property **tokens** in `src/styles/global.css` → refining the accent/font/spacing/radius is a one-to-few-line edit (cheap iteration). Inspired by itspatmorgan.com's editorial qualities, not a clone. Minor accepted CLS from web fonts (mitigate later with font metric-overrides if wanted). Roberto approved "good for now."
1. Remaining Sprint 1: **S03 (credibility — content-gated: NDA-cleared client names/logos), S07 (resume link), S05 (testimonials — content-gated).** All Should/Could.
2. **Resume page** = next *screen* slice (its own set of stories).
3. **Content homework:** refine the 3 project blurbs with specifics; gather testimonials; decide which client names are public.
4. Per-story loop: branch from latest `main` → re-read AC → plan → build → verify → PR → review → merge → auto-deploy → verify live → close issue. Reuse `Layout.astro`; add a section to `index.astro`.

### ▶ FRESH-SESSION ENTRY — start here
- **State:** v0.0 portfolio LIVE + healthy (robertobautistafregoso.github.io); design pass shipped (#13); workflow map in `docs/workflow/index.html`. Open issues: **#7 S07** (resume link, NOT content-gated), **#3 S03** (credibility, needs client names), **#5 S05** (testimonials, needs testimonials).
- **Best next move if no new content gathered:** build **S07** (resume link) — smallest unit of progress — OR pay the reflection debt (Phase 0/2/3, overdue; the `docs/workflow/` map is a good prompt for it).
- **If content gathered:** refine `src/content/projects/*.md` (true→specific), or finish S03 / S05.
- **First action on resume:** `git status` (confirm clean), then read this note, then `git checkout -b feat/<story>` from latest `main`.
- **Why this session ended:** context window hit ~80% — started fresh deliberately (state is all in git + this file, not the chat).

### Outstanding reflection debt (compounding): Phase 0 + Phase 2 + Phase 3 Stop-&-reflect, still unpaid.

---

<!-- New phase entries get appended below. Don't edit prior entries — if you want to revise an insight, write the revision as a new entry that references the old one. Append-only is what makes this useful in Phase 10 debrief. -->

## PIVOT — v0.1.0: rebuild on adapted Pat Morgan scaffold (S10 foundation)

**Decision (ADR-0005):** lift-and-adapt the Astro 5 + React 19 + Tailwind 4 + shadcn scaffold from [itspatmorgan.github.io](https://github.com/itspatmorgan/itspatmorgan.github.io) and replace all content with Roberto's. This **supersedes the v0.0 Fraunces/Inter design pass** (still in git history). Scope **excludes Writing + Community**. Agentic-SDLC intent = "both": run it through the playbook AND adopt his `.claude`/`AGENTS.md` patterns.

**S10 (this session) — shipped on `feat/s10-foundation-scaffold`:**
- Lifted scaffold (layouts, components, ui, lab engine, styles, scripts); switched **npm → pnpm** (lockfile committed; pnpm installed locally via `npm i -g pnpm@10`, corepack not on PATH under Node 25).
- Stripped Writing + Community (content, pages, data, components, scripts, `writing` collection).
- Neutralized all Pat identity in shipped output: `site-config`, hero, nav (Home/About/Work/Lab), sidebar identity + LinkedIn/GitHub only, local-time (dropped "LA"/America/Los_Angeles), migrated 3 projects to the new schema with a `placeholder.svg` thumbnail, emptied `commendations`, placeholder `experience`.
- **Stubbed** About/Resume/Lab/Style-guide pages + adapted Colophon (with **attribution to Pat** = IP mitigation); real builds deferred to their stories (S14/S15/S16/S17). Stubbing also removed the known `style-guide.astro` build-blocking syntax error.
- `pnpm build` green (10 pages); browser-verified home + work + project detail are Pat-free.

**Residual Pat strings in UNUSED lab code** (`src/lab/editorial-art/ArtCanvas.tsx` "@itspatmorgan", `src/lab/pixel-mark/MarkStates.tsx` "Patrick Morgan", a `global.css` comment, `LogoCarousel.astro` company logos) — not imported by any built page, so not shipped. Clean up during S16 (Lab) / S15 (Resume).

## S10 shipped + backlog/board set up + IA pivot (ADR-0006) + S13

- **S10 merged & live** (PR #15/#16). All Pat references + dead code removed (scrubbed including the colophon attribution, at Roberto's request — ADR-0005 IP posture now = non-commercial use only). Site live at robertobautistafregoso.github.io.
- **Backlog reconciled:** old #3/#5/#7 closed; **S11–S17 filed** (#17–#23) under the `v0.1.0` milestone. **Project board** (#1 "Portfolio v0") linked to the repo + populated (Done = S01–S07, Todo = S11–S17). Duplicate board #2 still exists — recommend deleting.
- **IA pivot (ADR-0006):** `/work` = **career timeline** · `/lab` = **side projects** (card/write-up style) · `/resume` **dropped** · SoftServe folded into the timeline. Supersedes the inherited "projects drive /work" model + ADR-0002.
- **S13 (this session) — `feat/s13-work-content`:** built `/work` as a real career timeline from Roberto's LinkedIn (fetched via the Claude-in-Chrome extension — WebFetch is blocked by LinkedIn's HTTP 999). Populated `experience.ts` (SoftServe ×2, Crabi ×2, Beliveo progression, earlier roles — with real metrics), rewrote `work/index.astro` (timeline + skills, no project cards), deleted `softserve-ai-pm.md` + `resume.astro`. Build green (8 pages); `/work` browser-verified.

### ▶ FRESH-SESSION ENTRY — start here (updated EOD day 2)
- **State:** site coherent end-to-end and LIVE. **Shipped + merged + deployed:** S10 (foundation), S13 (`/work` real career timeline from LinkedIn), S14 (`/about` real bio), S12 (`/home` hero + career-highlights, stale project-card teaser removed). `main` clean. 4 PRs merged (#15/#16, #24, #25, #26).
- **IA (ADR-0006) in effect:** `/work` = career timeline · `/lab` = side projects (card/write-up, not yet built) · `/resume` dropped · SoftServe folded into timeline.
- **Open `v0.1.0` queue:** **S16 Lab (#23)** — relocate `portfolio` + `genai-system-design` from the `projects` collection to `/lab/<slug>` as card/write-ups; clean any residual Pat strings in re-pulled lab code · **S11 chrome polish (#17)** (theming/site-config; recommended LAST — tune against real content) · **S17 Colophon + Style-guide (#22)** (verify stack list accurate; low content). *(S15 Résumé closed — superseded by ADR-0006; testimonials remain a separate content-gated item.)*
- **Content Roberto still owes:** per-side-project blurb + thumbnail for S16 (portfolio + genai) · optional profile photo (home/about) · testimonials ("Kind Words").
- **Known non-blocker (mildly time-sensitive):** GitHub Actions forces Node 24 ~**June 16, 2026**; deploy actions currently run on Node 20 → bump action versions (small infra chore) before then.
- **Optional cleanup:** duplicate GitHub Project board **#2** ("Portfolio v0") still exists — `gh project delete 2 --owner RobertoBautistaFregoso`.
- **First action on resume:** `git status` (confirm clean) → pick a story → `git checkout -b feat/<story>` from latest `main`. `pnpm install` if fresh machine (pnpm required).

---

## NEW FEATURE: "Ask Me Anything" agent (v0.2.0) — full mini-cycle + AMA-01 shipped

A live AI copilot on the home page. Ran the whole SDLC as a **feature mini-cycle**; **living spine = `docs/features/ask-me-anything/README.md`** (read that first — it's current).

- **Done + merged:** Discovery (#29) · Design (#30) · Define — PRD + 9 stories AMA-01…09 + priority (#31) · Decide — ADR-0007 runtime, 0008 stack/data, **0009** (supersedes: DataStax Langflow was sunset → **Langflow OSS on Railway** + **Supabase pgvector**) · **AMA-01 walking skeleton LIVE** (#33/#35).
- **Live stack:** `/ask` (GitHub Pages) → **Vercel gatekeeper** `https://robertobautistafregoso-github-io.vercel.app/api/ask` (holds LLM key) → **Langflow on Railway** (Hobby, auth on, ≥2 GB) → OpenAI. Vectors = **Supabase** `documents` table (pgvector), but **NOT yet wired into the flow** (flow on a temp `/app/chroma_db` Chroma shim → answers ungrounded / "I don't have that").
- **⏭ NEXT (highest value):** in the Railway Langflow, **swap Chroma → Supabase** + **ingest Roberto's docs** (run ingestion from *local* Langflow → cloud Supabase) → grounded answers. Then: real CTA booking link (replaces `[your booking link]`), then AMA-02 (home launcher), AMA-03 (streaming — cut the ~15–27s latency).
- **Gotchas learned:** Langflow OOMs under ~1 GB (needs ≥2 GB replica limit on Railway); DataStax Langflow is dead (Apr 2026); Langflow credential vars need a valid **Fernet** `LANGFLOW_SECRET_KEY` (44-char base64); Vercel caches the repo tree on import (services/ folder must be on `main`).
- **💵 Now costs money** (Railway Hobby + OpenAI tokens) — unlike the $0 static site. Watch dashboards.

---

## AMA — Supabase swap + ingest: prep staged (session 2026-07-06)

**Goal:** swap Chroma → Supabase in the Langflow flow + ingest docs → grounded answers. Landed the prep this session; the actual ingest run + flow swap is tomorrow. All new files are **uncommitted** on branch `claude/objective-benz-5b69b9`, under `services/langflow/`.

### Done
- **Corpus scope decided:** Phase 1 = **public site content only** (zero NDA risk). Phase 2 (later) = broader work/personal notes — deferred deliberately so the NDA redaction + never-reveal boundary work happens exactly when it's needed, not before.
- **Corpus assembled** — `services/langflow/corpus/`: 8 topical markdown files (`01-profile` … `08-skills`) derived from `experience.ts` / `site-config.ts` / `about.astro` / `content/projects/*`, plus a provenance `README.md`. Written as prose, not TS/HTML (embeds cleaner; each file self-contained so a retrieved chunk stands alone).
- **Supabase schema verified** via SQL editor: pgvector 0.8.2, `documents` table with `content text` / `metadata jsonb` / `embedding vector(1536)`, and `match_documents(query_embedding vector, match_count int, filter jsonb)` — all present + correct. It's the canonical LangChain/Supabase schema; **nothing to create**. `supabase-schema.sql` saved for reference/future repair.
- **Ingestion built as a script, not a Langflow flow** — `ingest.py` + `requirements.txt` + `.env.example`. corpus → chunk (1000/200) → OpenAI `text-embedding-3-small` → Supabase via LangChain `SupabaseVectorStore` (full-refresh: clears then re-inserts). Runbook in `services/langflow/README.md`.

### Gotchas / decisions logged this session
- **"Run ingestion locally" was a stale instruction** — it dated from when the vector store was local Chroma on the laptop. With vectors now in cloud Supabase, ingest can run from anywhere; a laptop script is cleanest — reproducible, in git, and it sidesteps Railway's ephemeral storage + the missing File loader.
- **Use the Langflow `Supabase` component, NOT `PGVector`** — both exist, but PGVector uses its own `langchain_pg_*` schema and would ignore the verified `documents`/`match_documents` table. `Supabase` is the matched pair for our schema.
- **Chroma Cloud considered and rejected** — no ADR-0009 revisit trigger fired (Langflow *can* reach Supabase; corpus is ~12 chunks, nowhere near "scale demands a dedicated store"). Didn't re-litigate a settled, working decision mid-build.
- **Langflow-this-version quirks:** no plain `File` loader (split/renamed; `Directory` is now "Legacy"); the `Knowledge` component's DB-provider list shows Postgres pgvector as "Coming soon", so that route can't reach Supabase at all — dead end.

### ▶ FRESH-SESSION ENTRY — start here (tomorrow)
- **State:** AMA-01 still LIVE but **ungrounded** — the Railway flow is still on the `/app/chroma_db` shim. Nothing changed yet in Railway / Supabase / Vercel. All swap prep is staged + uncommitted in `services/langflow/`.
- **First action:** `git status` → decide whether to commit the `services/langflow/` scaffolding (corpus + script + runbook + schema SQL). It's complete and standalone — safe to commit even before the swap lands.
- **Then, in order:**
  1. **Ingest:** `cd services/langflow` → `python3 -m venv .venv && source .venv/bin/activate` → `cp .env.example .env` (fill OpenAI key + Supabase URL + service_role key) → `pip install -r requirements.txt` → `python ingest.py`. Verify `select count(*) from documents;` ≈ 12.
  2. **Swap retrieval** in Railway `ask-me-anything-workflow`: add `Supabase` component (URL + service_role key stored as a Langflow **global var** + Query Name `match_documents`), feed the existing `text-embedding-3-small` embeddings, wire question → `Search Query` and `Search Results` → prompt, **leave `Ingest Data` unconnected**, delete Chroma DB + Directory, Save (keep the same flow ID so the gatekeeper URL stays valid).
  3. **Verify grounded:** on-corpus Q ("What did Roberto do at Crabi?") answers with specifics; off-corpus Q ("favorite programming language?") says "I don't have that."
  4. **Then:** export both flows' JSON → `services/langflow/flows/` (export with API keys OFF; grep for secrets before commit); scrub stale "DataStax" comments in `services/ask-api/api/ask.ts` (host is Railway now); replace the CTA `[your booking link]` placeholder.
- **Credentials needed tomorrow:** OpenAI key, Supabase Project URL + service_role key (Supabase → Settings → API).
- **Reminder:** this path costs money (Railway + OpenAI) — glance at the dashboards.
