# LEARNINGS

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

<!-- New phase entries get appended below. Don't edit prior entries — if you want to revise an insight, write the revision as a new entry that references the old one. Append-only is what makes this useful in Phase 10 debrief. -->
