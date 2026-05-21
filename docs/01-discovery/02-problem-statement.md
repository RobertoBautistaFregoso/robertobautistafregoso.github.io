# Problem Statement: Household Spending Visibility (v0)

**Date:** 2026-05-20
**Method:** Problem Framing Narrative (Jobs-to-be-Done + empathy mapping), via `/problem-statement`
**Related:** `01-problem-framing.md` (MITRE canvas this builds on), `00-competitive-notes.md` (market scan)

---

## Problem Framing Narrative

**I am:**
Roberto — an AI Product Manager and consultant juggling 4-5 clients, managing household money alongside my wife.
- My finances live in CSV exports across several banks, each with a different format
- My income is irregular (consulting), which breaks the salaried-W-2 assumptions baked into most money apps
- Money admin always loses to client work, so it rarely gets done

*(Single user for v0; couple-mode deferred.)*

**Trying to:**
See where my money went this month vs. last — in a view I can actually trust — without spending real time on it.

**But:**
- The tools I've tried re-categorize transactions inconsistently, so month-over-month comparison is untrustworthy
- Doing it by hand across multiple bank CSV formats is slow
- Because it's slow, I do it rarely — so I'm usually flying blind

**Because:**
No tool I've tried gives *stable, user-controlled categorization that stays put across imports* — and a delta is only as trustworthy as the consistency of its categories.

**Which makes me feel:**
Lost in my own finances.

---

## Context & Constraints

- Single user, no auth (v0)
- ≤ 3 screens
- CSV import + manual entry only — no Plaid / bank API integration
- Multiple bank formats → per-bank CSV adapters needed
- Irregular income — don't assume a monthly salary
- Treat transaction data as PII from day one (shareable later)
- Framed as a "money tracker with AI **assistant**" — NOT a "financial **advisor**" (US fiduciary/licensing language)
- Personal learning-project timeline (~2 focused weekends)

---

## Final Problem Statement

> I need a way to see where my household money goes month-over-month that I can actually trust, because the tools I've tried categorize transactions inconsistently and manual tracking across multiple bank formats is too slow to keep up — which leaves me feeling **lost in my own finances** and redoing the same work every time.

---

## Validated boundaries (carried from the framing canvas)

- **The pain is time/friction + low visibility, NOT financial harm.** No concrete bad outcome has occurred (no overdraft, missed bill, surprise, or money fight). → Success must measure *time/effort saved, check-in frequency, and trust in the numbers* — NOT "better financial decisions."
- **The real differentiator is categorization *stability*,** not "CSV-first."
- **Real reason for building:** learning the agentic SDLC end-to-end + wanting a tool I fully control. Not "no tool exists" (that claim is under-validated — Actual Budget unexamined).

---

## Next step

`03-success-definition.md` — one paragraph, measurable, personal. Must operationalize: time saved, check-in frequency, trust in the numbers.
