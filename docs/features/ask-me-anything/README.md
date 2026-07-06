# Feature: "Ask Me Anything" home-page agent — one-pager (living spine)

**Status:** 🔧 Build — AMA-01 ✅ walking skeleton LIVE end-to-end · **Owner:** Roberto · **Started:** 2026-06-17
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
- **Backend:** Roberto's `ask-me-anything-workflow` Langflow flow — **triage (`query_classifier`)** → **Refuse · Contact-capture · Retrieve→Generate**, over a RAG pipeline (Docs → chunk → embed → index → Vector DB), with **working memory** (in-session) + a **CTA tool**. Observability wired via **Arize**.
- **Runtime (ADR-0007 seam + ADR-0009 host):** static site on GitHub Pages + a **Vercel serverless function** (gatekeeper: secrets, rate-limit, cost cap) → **Langflow OSS on Railway**.
- **Vector store (ADR-0009):** **Supabase (`pgvector`)** — replaces local Chroma; one backend for vectors now + product data later.
- **Observability & feedback (ADR-0008):** Arize (traces, eval gate); 👍/👎 → Arize trace feedback.

## Artifact index
| Stage | Artifact | Status |
|---|---|---|
| Discovery | [01 · problem statement](01-problem-statement.md) · [02 · success definition](02-success-definition.md) | ✅ this pass |
| Design | [03 · design reference](03-design.md) — 2 surfaces, states, contextual-CTA mechanic | ✅ this pass |
| Define | [04 · PRD](04-prd.md) · [stories](stories/) (AMA-01…09) · [priority](priority.md) | ✅ this pass |
| Decide | [ADR-0007 runtime](../../03-architecture/adr-0007-ama-runtime-hosting.md) · [ADR-0008 stack/observability/data](../../03-architecture/adr-0008-ama-stack-observability-data.md) | ✅ this pass |
| Build/Ship | **AMA-01 ✅** — `/ask` → Vercel gatekeeper (`…vercel.app/api/ask`) → Langflow on Railway → OpenAI, verified end-to-end (warm ~15s). Vector store on a temp Chroma shim. | 🔧 in progress |

### Live infra (AMA-01)
- **Front-end:** `/ask` on GitHub Pages; endpoint via `PUBLIC_ASK_API_URL` (set in `deploy.yml`).
- **Gatekeeper:** Vercel project (root `services/ask-api`) → `https://robertobautistafregoso-github-io.vercel.app/api/ask`.
- **Agent:** Langflow OSS on Railway (Hobby, 8 GB limit); auth on.
- **Vectors:** Supabase `documents` table (pgvector, RLS) — **not yet wired into the flow** (flow still on a temp `/app/chroma_db` Chroma shim → answers ungrounded).

### Immediate follow-ups (before AMA-02+)
1. **Swap Chroma → Supabase in the flow** + **ingest Roberto's docs** (from local Langflow → cloud Supabase) → grounded answers. *(This is what makes it actually useful.)*
2. Replace the CTA's `[your booking link]` placeholder with a real link.
3. Latency (~15–27s) → AMA-03 streaming.

## Open questions (resolve downstream — do not pre-decide here)
- **Knowledge source + NDA boundary** — what may the agent draw on, and what must it *never* reveal (NDA'd client specifics)? Ties directly to the groundedness guardrail. **Highest-priority unknown.**
- ✅ *Resolved (Design):* surface → **route to `/ask`** (home = launcher) · CTA → **agent-proposed** (Langflow CONTACT branch) · **👍/👎** feedback per answer. See [`03-design.md`](03-design.md).
- Persona handling — does it adapt to recruiter vs. client, or one voice for all?
- Cost ceiling + abuse controls on a public endpoint.
- **Agent-readability sub-capability** (structured data · `llms.txt` · a tiny "ask-roberto" endpoint for *other people's* agents) — in MVP, or a separable v2? (It's a different surface from the on-page chat.)
- ✅ *Decided:* stack = static site → Vercel gatekeeper → **Langflow OSS on Railway** + **Supabase pgvector** vectors (ADR-0009, supersedes the sunset DataStax host in 0007/0008) · Arize observability. Remaining = build-time tuning (rate-limit thresholds, cost ceiling, latency p50/p95) + the corpus contents Roberto maintains.
- Latency target precision (p50/p95) and whether answers stream.
