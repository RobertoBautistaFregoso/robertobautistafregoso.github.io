# Design Reference: "Ask Me Anything" home-page agent

**Date:** 2026-06-17
**Related:** [`01-problem-statement.md`](01-problem-statement.md) · [`02-success-definition.md`](02-success-definition.md)
**Source:** Roberto's wireframes (4 frames: home idle, home typing, conversation answering, conversation + CTA).
**Covers:** surfaces, flow, components, UX states, the contextual-CTA mechanic, a11y. **Defers:** requirements/AC (Define), tech/runtime (Decide).

---

## Surfaces (two)
1. **Home entry module** *(frames 1–2)* — lives on the Home page. A badge **"● Roberto's AI · ask it anything"**, headline **"What would you like to know about me?"**, a list of **suggested-prompt rows** (icon + label + chevron), and a persistent input **"Ask anything about Roberto…"** with a send button. This is the *land + engage* surface.
2. **Conversation view** *(frames 3–4, shown at `roberto.ai`)* — header **"Ask Roberto · ● live"** + **"new chat ↻"**, user message bubble (top-right, dark), assistant answer area (streaming), **follow-up suggestion chips**, and the same persistent input. This is the *answer + convert* surface.

**✅ Decided — route to a dedicated `/ask` page (option a).** The home module is a **launcher**: it hands the typed question to `/ask`, which starts streaming the answer immediately so the navigation beat is invisible. Chosen for a shareable "Ask Roberto" URL, the strongest mobile story, and keeping the static home page clean (the dynamic chat island + endpoint live on `/ask`). Rejected: inline-expand and modal (no shareable URL; both push the chat island onto the static home). (`roberto.ai` in the mockups is cosmetic — the route lives on Roberto's real domain.) This also feeds the runtime ADR (Decide).

## Flow (mapped to the funnel)
`land` (home module, frame 1) → `engage` (type or tap a suggested prompt, frame 2) → `answer` (conversation view streams a grounded answer + offers follow-up chips, frame 3; loops) → **`convert`** (contextual CTA card, frame 4 — the north star).

## Component inventory
- **Live badge** — "Roberto's AI · ask it anything" + green "live" dot (signals it's a real agent, not canned).
- **Headline** — "What would you like to know about me?" (editorial, matches site type).
- **Suggested-prompt list** — 4 rows, icon + label, chevron; tappable. Seeds engagement + steers toward answerable, on-strategy questions.
- **Input + send** — placeholder "Ask anything about Roberto…"; frame 2 shows typed state with the matching suggested row highlighted.
- **Message bubble** (user) · **answer area** (assistant, streaming skeleton in frame 3).
- **Follow-up chips** — e.g. "His AI experience", "See the claims case", "What's he like to work with?" — keep the conversation going.
- **Contextual CTA card** *(frame 4)* — e.g. "● Open to senior AI PM roles" + **Book 20-min intro** (primary) · **Résumé** · **LinkedIn**. The convert mechanic.
- **"new chat ↻"** — reset.

## The contextual-CTA mechanic (the north-star UX)
The CTA **adapts to the visitor's intent**. Frame 4 example: question *"Is he open to a senior AI PM role?"* → card *"Open to senior AI PM roles"* + Book intro / Résumé / LinkedIn. This is the single most important interaction — it's where a conversation becomes a contact.
**✅ Decided — the agent proposes the CTA.** It's produced by the **CONTACT branch of the Langflow Multi-Conditional Router** (not hard-coded front-end rules), so the CTA's headline + actions are chosen by the agent from the conversation. The front-end just renders whatever the CONTACT response specifies. Maps to the P0 personas (recruiter → availability + book; client → relevant case + book).

## UX states (wireframes show 4; we need more)
| State | In wireframes? | Notes |
|---|---|---|
| Idle (suggested prompts) | ✅ frame 1 | |
| Focused / typing | ✅ frame 2 | matching suggestion highlights |
| Submitting / thinking / streaming | ✅ frame 3 | "live" + skeleton; needs a latency story (≤30s target) |
| Answered + follow-up chips | ✅ frame 3 | |
| Contextual CTA | ✅ frame 4 | |
| **No-data / "I don't know"** | ❌ | **Required** — the groundedness guardrail made visible; the agent must gracefully say it lacks the answer (and never fabricate / leak NDA'd specifics) |
| **Error / agent unavailable** | ❌ | endpoint down, timeout — graceful fallback (e.g. "reach me directly" CTA) |
| **Rate-limited / long input** | ❌ | public endpoint abuse/cost control surfaced in UX |
| **Mobile** | ❌ | wireframes are desktop; the home module + conversation need a mobile layout |

## "Did this help?" feedback
**✅ Decided — a one-tap 👍/👎 under each assistant answer** (answer-quality signal from the success metrics; not in the wireframes). Whether/where the vote is stored is a Define/Decide detail.

## Backend mapping (Langflow)
The agent is Roberto's `ask-me-anything-workflow` Langflow flow: a RAG pipeline (Directory → Split → Chroma vector store + OpenAI embeddings over Roberto's content) feeding a **Multi-Conditional Router** whose branches map 1:1 to the UX:
- **ANSWER** → grounded answer + follow-up chips
- **CONTACT** → the agent-proposed contextual CTA card
- **REFUSE** → the "I don't know" / no-data state *and* the NDA/groundedness guardrail

The front-end is a thin renderer over this; the router decides which UX state to show. (Exact request/response contract = Decide-stage ADR.)

## UI component source
Compose from **official shadcn/ui primitives** (`shadcn add`) — free, owned, already themed to base-nova: input, button, card (bubble + CTA card), badge, scroll-area, skeleton; chips/follow-ups are `<button>`s. **shadcnuikit.com** is optional *reference* for its AI-Chat layout — its full templates are Next.js/Pro and don't port to Astro, so harvest patterns/components, don't lift the template; retheme anything to our tokens.

## Accessibility (DoD)
- Suggested prompts + chips are real `<button>`s, keyboard-reachable, visible focus.
- Streaming answer in an ARIA **live region** so screen readers announce it.
- Input properly labeled; send has an accessible name.
- "live" dot is decorative — don't rely on color alone for the live state.

## Resolved this pass
- ✅ Surface connection → **route to `/ask`** (home module is a launcher).
- ✅ CTA → **agent-proposed** via the Langflow CONTACT branch.
- ✅ **👍/👎** feedback under each answer.
- ✅ Extra states required: no-data/REFUSE, error, rate-limited, mobile.

## Still open (carry into Define / Decide)
1. No-data / error / rate-limited **copy + behavior** (states confirmed; wording TBD).
2. Streaming vs full-response; latency budget (p50/p95).
3. Mobile layout for both surfaces.
4. Whether 👍/👎 votes are stored (and where).

## Next
→ Define (PRD + stories with eval/guardrail AC). The `/ask` route + Langflow request/response contract also feed the Decide-stage ADRs.
