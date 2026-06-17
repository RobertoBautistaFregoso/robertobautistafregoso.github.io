# Problem Statement: "Ask Me Anything" home-page agent

**Date:** 2026-06-17
**Feature:** A live AI copilot on the Home page that answers visitors' questions about Roberto and routes them to contact.
**Method:** Problem Framing Narrative (visitor lens) + business-goal lens + filled Opportunity Statement. Source: Roberto's discovery boards (problem / insight / opportunity / target user / success metrics / target-state workflow).

> Two lenses, deliberately separated: the **visitor's job-to-be-done** (the user problem) and **Roberto's goal** (the business reason to build it). Good discovery keeps these apart so we don't optimize one and forget the other.

---

## Lens 1 — the visitor's problem (Problem Framing Narrative)

**I am:**
A recruiter / hiring manager, or a prospective consulting client, on Roberto's Home page with little time and a *specific* question in mind.

**Trying to:**
Quickly judge whether Roberto is a fit — for a role, or for an AI-product engagement — and decide whether to reach out.

**But:**
My questions are specific ("does he know X, led Y, is he available?" / "can he solve my AI-product problem? has he done LLM evals / agentic SDLC in my domain?") and a static site answers everyone the same way. To get *my* answer I'd have to dig through pages, or message and wait.

**Because:**
The site presents fixed content, not answers to *my* question; there's no fast, interactive, trustworthy way to interrogate his fit on demand.

**Which makes me feel:**
Uncertain — and likely to move on without reaching out.

### Final problem statement
> Recruiters and prospective clients arrive at Roberto's site with specific, time-pressured questions about his fit, but a static site answers everyone the same way and can't respond to *their* question on demand — so they leave without the confidence, or the nudge, to reach out.

---

## Lens 2 — Roberto's goal (why build it)
The same moment is an opportunity. An on-page agent that:
1. **Answers visitors' real questions, grounded in fact** — does the visitor's job for them;
2. **Is itself living proof** Roberto can build AI products (the medium is the message — same bet as the site overall); and
3. **Converts the conversation into a contact action** — the north star.

**Insight (from discovery):** personal sites lack differentiation. This feature both *solves* the visitor's job and *is* the differentiation.

---

## Opportunity Statement (filled)
> Roberto operates in **AI product management / consulting** and creates value by **turning enterprise AI pilots into shipped, adopted products**. To stand out, his personal site offers an **"ask-me-anything" agent copilot on the Home page** that meets the needs of **recruiters, hiring managers, and prospective clients**. These visitors **arrive with specific, time-pressured questions about his fit** as they try to **decide whether to interview, hire, or engage him**. To address this, we propose an **AI agent, grounded in Roberto's real work, that answers their questions and routes them to a contact action** — delivering value to **both the visitor (fast, credible answers) and Roberto (differentiation + a proof-of-capability artifact + inbound contact)**.

---

## Context & constraints
- **Builds on a static site** (Astro → GitHub Pages, ADR-0001/0003). A *live* agent needs server-side compute + a secret key → trips those ADRs' revisit trigger; runtime decided at Decide stage.
- **Grounded, never fabricated** — it makes claims about a real person to decision-makers; hallucination is reputational risk.
- **NDA boundary** — Roberto's client work is partly under NDA. The agent must never reveal NDA'd client specifics. This is the same guardrail as "never make up facts," seen from the privacy side, and it is the highest-priority unknown for Design/Decide.
- **Public endpoint** — cost/abuse controls required.
- **"Live"** — implies latency target + likely streaming.
- **Learning intent** — Roberto is doing this to gain AI-feature-building reps (UI + integration + evals + SDLC), continuing the Langflow/Arize tooling from his course. Heavier tooling is acceptable *as a learning vehicle* (see goal fork, captured for the Decide-stage ADRs).

---

## Next
→ [`02-success-definition.md`](02-success-definition.md), then Design (stage 3).
