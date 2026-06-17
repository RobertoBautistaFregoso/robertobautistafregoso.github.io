# Success Definition: "Ask Me Anything" home-page agent

**Date:** 2026-06-17
**Related:** [`01-problem-statement.md`](01-problem-statement.md)

> Numeric targets are candidates (TBD — lock in Define / set baselines after launch). What matters now is the *shape*: one north star, a few supporting metrics, hard guardrails, and clear non-goals.

---

## The definition
This feature is a success if, a few weeks after shipping:

1. **It converts (north star)** — a meaningful share of conversations end in a **contact action** (book a call · email · resume view · LinkedIn).
2. **It activates** — a meaningful share of Home visitors **send ≥ 1 message** (they trust it enough to engage).
3. **It's trusted** — answers are **grounded**: it passes a golden-question eval set with **zero fabrications**, and says "I don't have that" when data is missing.
4. **It's fast** — answers arrive within **~30s** (target to be made precise — p50/p95 — in Define).
5. **It's proof** — it functions as a **proof-of-capability artifact**: someone references it, or it changes a decision-maker's impression of Roberto.

---

## Metric tree
| Tier | Metric | Why |
|---|---|---|
| ★ North star | conversation → **contact action** rate | the whole point: move a visitor to reach out |
| Supporting | **activation** — % visitors who send ≥1 message | no engagement → no conversion |
| Supporting | **answer quality** — one-tap "did this help?" positive rate | leading signal the answers land |
| Guardrail | **groundedness** — 0 fabrications on the eval set | trust; reputational + NDA risk if violated |
| Guardrail | **latency** — response ≤ ~30s | "live" is part of the value |
| Guardrail | **cost** — spend ceiling honored | public LLM endpoint = abuse/cost exposure |

---

## Product principles (the agent's character — from discovery)
1. **Clear & relevant** — answers the visitor's actual question, concisely.
2. **Industry-standard vocabulary** — speaks fluent product-management + AI terms (it's selling an AI PM).
3. **Grounded, never invents** — only states what's backed by Roberto's real content; gracefully admits gaps; never reveals NDA'd specifics.

---

## Deliberately NOT the metric
- **Traffic / message volume for its own sake** — 5 *right* visitors (a recruiter, a buyer) beat 5,000 random ones; conversion and quality matter, not raw counts.
- **"It's cool / it's an AI chatbot"** — novelty isn't success; *moving a decision-maker* is.
- **Answer-anything coverage** — breadth of trivia it can field is not the goal; reliable, grounded answers to *fit* questions are.

## Proposed non-goals (confirm in Define)
- Not a general-purpose chatbot — scoped to Roberto, his work, and fit questions.
- No accounts / auth / persistent user identity.
- No live calendar/availability integration in MVP — the CTA links out (LinkedIn / email / resume).
- **Agent-readability surface** (`llms.txt` / structured data / a public "ask-roberto" endpoint for *other* agents) — likely a **separable v2**, not MVP. Flagged for an explicit Define decision.
- Multi-language — English first; Spanish TBD.
- Does not replace existing pages (Home/Work/About/Lab) — it's an additive island on Home.

---

## For Measure (stage 9)
The north star + activation + answer-quality thumbs + groundedness eval are the inputs to the Measure stage and the ongoing eval loop (Arize). Set real baselines from the first weeks of traffic; treat groundedness as a release gate, not a trend.
