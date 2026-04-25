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

<!-- New phase entries get appended below. Don't edit prior entries — if you want to revise an insight, write the revision as a new entry that references the old one. Append-only is what makes this useful in Phase 10 debrief. -->
