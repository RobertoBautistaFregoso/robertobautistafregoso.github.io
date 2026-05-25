# Problem Framing Canvas: Household Spending Visibility (v0)

**Date:** 2026-05-20
**Method:** MITRE Problem Framing Canvas (v3), facilitated via `/problem-framing-canvas`
**Related:** `00-space-research.md` (competitive/market scan — Look-Outward input that fed this framing)

> This canvas is the **problem-framing** layer (Look Inward + Reframe). For the **competitive landscape** (value chain, player archetypes, AI-reality assessment, v0/v0.1/v0.2 sequencing), see `00-space-research.md`. They're complementary, not duplicative.

---

## Phase 1: Look Inward

### What is the problem? (Symptoms)

Managing household money is a manual, fragmented process. Transactions live in CSV exports from multiple banks, each in a different format. Categorization is inconsistent and done by hand. There is no single, trustworthy view of where money went this month vs. last.

- **Primary symptom (validated):** wasted time.
- **Cadence:** the desire is continuous ("never know where I stand"), but the chosen mechanism (CSV import) is inherently batch — so v0 delivers visibility *as of last import*. Because importing is currently slow/manual, it happens rarely, so visibility is effectively stale. Killing the friction → checking often → *approximates* continuous.

### Why haven't we solved it?

- **It's hard / no tool fits the specific need (under-validated):** the tools tried (Copilot, plain spreadsheet) fail because **categorization isn't stable** — categories shift between imports, making month-over-month comparison untrustworthy.
- **No trigger to build my own until now:** this learning project is the trigger. Not ordinary deprioritization — there was simply never a reason to build a custom tool before.
- *Honest caveat:* "no tool fits" is under-validated — only 2 of 5 candidate tools tried; **Actual Budget** (free, local-first, CSV, privacy-respecting — the closest reference architecture) has not been evaluated.

### How are we part of the problem? (Assumptions & biases)

All four biases owned:

1. **Confirmation bias** — single user (me); assuming my needs generalize, untested even against my wife.
2. **Internal bias** — risk of optimizing for what's *interesting* to build (AI categorization) over what's *valuable*.
3. **Survivorship bias** — designing for my specific banks/formats/workflow; ignoring messier real-world cases.
4. **Premature convergence (most acute)** — walked in with a solution (CSV app + auto-categorization + delta + bulk-correct + >95%) before validating the problem. *Fairness note: this convergence was partly research-backed — `00-space-research.md` recommended this exact wedge. But the problem-framing layer (this canvas) was genuinely missing until now.*

**Which to challenge / hold loosely:** the solution decisions (CSV-first, AI categorization, delta, bulk-correct) are acknowledged as pre-made. The *real requirement* — categorization stability — was discovered through this framing, not assumed up front. Hold the mechanism loosely; hold the requirement (stability) firmly.

---

## Phase 2: Look Outward

### Who experiences the problem?

- **Who:** Me, single user in v0. Eventual user #2: my wife (couple-mode is post-v0).
- **When/Where:** At my computer, whenever I want to know where money stands — but because it requires manual reconciliation, the real "when" is *rarely, and never confidently.*
- **Consequences (validated):** time wasted on manual categorization → done rarely → operate with stale/no visibility. The cost is **time and friction, NOT financial harm** — no concrete bad outcome has occurred (no overdraft, missed bill, month-end surprise, or money disagreement). This sets the success metric: measure *time/effort saved and check-in frequency*, NOT "better financial decisions."

### Who else has this problem?

- **Who else:** people with multiple non-integrating bank accounts; privacy-conscious users who won't hand financial data to a SaaS; international users; credit-union members; spreadsheet budgeters. *(Possible under-served slice: people with irregular/lumpy income — most PFM apps assume salaried W-2. See `00-space-research.md` §4.)*
- **How they deal with it:** Tiller (spreadsheet/CSV), Actual Budget (open-source, local-first, free), Copilot (manual import + AI), YNAB/Monarch (manual CSV + feeds), plain spreadsheets.

### Who doesn't have it?

People whose banks all integrate cleanly with Plaid and who trust a SaaS to auto-categorize — they get stable-enough categorization without manual effort, or don't care about month-over-month stability.

### Who's been left out?

- **My wife** — eventual user #2. Designing single-user risks foreclosing couple-mode. Avoid decisions that make her impossible to add later (don't hardcode "my categories"; keep a data model that *could* know "whose transaction").
- **Future-maintainer-me** — every per-bank CSV adapter is a maintenance burden when banks change formats.

### Who benefits?

- **When the problem exists:** almost no one — except incumbent subscriptions I'd keep paying. Low political resistance (my own household).
- **When the problem is solved:** me (time + trust in my numbers), eventually my wife, household clarity.

---

## Phase 3: Reframe

### Stated another way, the problem is:

> I manage household finances from CSV exports across several banks, and I struggle to get a month-over-month view of my spending that I can actually trust — because the tools I've tried re-categorize transactions inconsistently (categories shift between imports, so the comparison is meaningless), and doing it by hand is slow enough that I rarely do it at all. The result is wasted time and operating with little real visibility into where the money goes. The real requirement — which I missed at first — is *stable, user-controlled categorization that doesn't change underneath me*, since a this-month-vs-last delta is only as trustworthy as the consistency of its categories. I overlooked this because I converged on a solution (a CSV app with auto-categorization) before realizing the actual problem was categorization *stability*, not data import.

### How Might We...

> **How might we** make transaction categorization stable and low-effort enough to trust a month-over-month view of spending — **as we aim to** turn "I rarely know where my money went" into "I can check in minutes, anytime, and believe the numbers"?

---

## Next Steps

1. **Formalize** with `/problem-statement:problem-statement` → `02-problem-statement.md`. Pull forward: irregular-income awareness, "assistant not advisor" language (legal/ethical), the stability requirement.
2. **Success definition** → `03-success-definition.md`. Must measure *time/effort saved + check-in frequency + trust in numbers* — NOT financial outcomes.
3. **Phase 2:** PRD + user stories. The categorization-stability requirement becomes a first-class acceptance criterion. Per-bank CSV adapter pattern from story #1 (see `00-space-research.md` §6).

---

## Real reason for building (the honest frame)

Not "no tool fits" (under-validated). The honest reason: **to learn the agentic SDLC end-to-end, with a personal-finance tracker chosen because I'll genuinely use it and want one I fully understand and control.** The genuine, specific gap in tools tried: *categorization stability for trustworthy deltas.* That's the differentiator framing — not "CSV-first."
