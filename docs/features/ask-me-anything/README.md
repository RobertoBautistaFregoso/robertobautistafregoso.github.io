# Feature: "Ask Me Anything" home-page agent — one-pager (living spine)

**Status:** 📝 Define · **Owner:** Roberto · **Started:** 2026-06-17
**Milestone (planned):** `v0.2.0` · **Knowledge model:** mini-cycle on a live product (see process map)

> The always-current entry point for this feature. Decisions live in **ADRs**; moving work lives in **issues**; this page links everything and states the current truth. Keep it current; don't duplicate detail here.

---

## In one line
A live "ask-me-anything" AI copilot on the **Home page** that answers a visitor's questions about Roberto — **grounded in real facts** — and turns the conversation into a **contact action**.

## Why (problem → opportunity)
- **Visitor's problem:** recruiters and prospective clients arrive with *specific, time-pressured* questions about fit; a static site (and LinkedIn) answers everyone the same way and can't respond to *their* question on demand.
- **Roberto's goal:** turn that moment into differentiation — an agent that (a) answers grounded in fact, (b) **is itself proof** Roberto can build AI products, and (c) converts to contact.

## Who (target users)
- **P0 · Recruiter / hiring manager** — *"Is he legit & a fit — fast? Worth reaching out? Does he know X, led Y, available?"*
- **P0 · Prospective client / buyer** — *"Can he help with my AI-product problem? Done LLM evals / agentic SDLC in [domain]?"*
- **P1 · Curious peer / PM community.**

## North star + metrics
- ★ **North star:** conversation → **contact action** (book call · email · resume view · LinkedIn).
- **Activation:** % of home visitors who send ≥ 1 message.
- **Answer quality:** one-tap "did this help?" positive rate.
- **Guardrails (trust):** groundedness — never fabricate; says "I don't have that" when data is missing · response ≤ ~30s.

## Funnel (target state)
`land → engage (ask) → answer (loop) → convert (contextual CTA)` — convert is the north star.

## Scope status
- **MVP vs v2 cut:** drafted in [PRD §5](04-prd.md) — **pending Roberto's sign-off** (also the knowledge & NDA policy, PRD §4).
- **Surface:** static home stays on GitHub Pages; the chat lives on a dedicated **`/ask` route** (home module is a launcher).
- **Backend:** Roberto's `ask-me-anything-workflow` Langflow flow — RAG (Chroma + OpenAI embeddings over his content) + a **Multi-Conditional Router** (ANSWER / CONTACT / REFUSE).
- **Likely runtime (not yet decided):** static shell + **one serverless endpoint** → the Langflow flow → LLM. Confirmed in an ADR at Decide stage.

## Artifact index
| Stage | Artifact | Status |
|---|---|---|
| Discovery | [01 · problem statement](01-problem-statement.md) · [02 · success definition](02-success-definition.md) | ✅ this pass |
| Design | [03 · design reference](03-design.md) — 2 surfaces, states, contextual-CTA mechanic | ✅ this pass |
| Define | [04 · PRD](04-prd.md) ✅ (draft) · stories + AC · priority | 🔶 PRD drafted; stories next |
| Decide | ADRs 0007+ (runtime, agent framework, evals, model, retrieval) · system-map | ⏳ stage 5 |
| Build/Ship | endpoint, Langflow flow export, knowledge base, golden eval-set, live URL | ⏳ stages 6–8 |

## Open questions (resolve downstream — do not pre-decide here)
- **Knowledge source + NDA boundary** — what may the agent draw on, and what must it *never* reveal (NDA'd client specifics)? Ties directly to the groundedness guardrail. **Highest-priority unknown.**
- ✅ *Resolved (Design):* surface → **route to `/ask`** (home = launcher) · CTA → **agent-proposed** (Langflow CONTACT branch) · **👍/👎** feedback per answer. See [`03-design.md`](03-design.md).
- Persona handling — does it adapt to recruiter vs. client, or one voice for all?
- Cost ceiling + abuse controls on a public endpoint.
- **Agent-readability sub-capability** (structured data · `llms.txt` · a tiny "ask-roberto" endpoint for *other people's* agents) — in MVP, or a separable v2? (It's a different surface from the on-page chat.)
- Langflow hosting + Arize eval setup specifics.
- Latency target precision (p50/p95) and whether answers stream.
