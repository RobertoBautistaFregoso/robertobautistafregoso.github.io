# Design Reference: "Ask Me Anything" home-page agent

**Date:** 2026-06-17
**Related:** [`01-problem-statement.md`](01-problem-statement.md) · [`02-success-definition.md`](02-success-definition.md)
**Source:** Roberto's wireframes (4 frames: home idle, home typing, conversation answering, conversation + CTA).
**Covers:** surfaces, flow, components, UX states, the contextual-CTA mechanic, a11y. **Defers:** requirements/AC (Define), tech/runtime (Decide).

---

## Surfaces (two)
1. **Home entry module** *(frames 1–2)* — lives on the Home page. A badge **"● Roberto's AI · ask it anything"**, headline **"What would you like to know about me?"**, a list of **suggested-prompt rows** (icon + label + chevron), and a persistent input **"Ask anything about Roberto…"** with a send button. This is the *land + engage* surface.
2. **Conversation view** *(frames 3–4, shown at `roberto.ai`)* — header **"Ask Roberto · ● live"** + **"new chat ↻"**, user message bubble (top-right, dark), assistant answer area (streaming), **follow-up suggestion chips**, and the same persistent input. This is the *answer + convert* surface.

**🔑 Open decision — how the two connect.** The URL changes (home → `roberto.ai`) between frames 2 and 3. Options: (a) **route** to a dedicated `/ask` page, (b) **inline-expand** the home module into the conversation, (c) **modal/overlay**. Tradeoffs touch SSR, the React-island boundary, shareable URLs, and the runtime ADR — so this is a **Decide-stage input**, flagged here.

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
**🔑 Open question:** how is the CTA chosen — fixed rules per detected intent (recruiter → availability+book; client → relevant case+book; peer → content links), or the agent proposes it? Maps to the P0 personas in discovery.

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
Success metrics call for a **one-tap "did this help?"** answer-quality signal — it's **not in the wireframes**. Propose: a subtle 👍/👎 under each assistant answer. Flag for Define.

## Accessibility (DoD)
- Suggested prompts + chips are real `<button>`s, keyboard-reachable, visible focus.
- Streaming answer in an ARIA **live region** so screen readers announce it.
- Input properly labeled; send has an accessible name.
- "live" dot is decorative — don't rely on color alone for the live state.

## Open design questions (carry into Define / Decide)
1. Surface connection: route vs inline-expand vs modal (also a Decide input).
2. CTA selection logic (rules vs agent-proposed) + the per-persona CTA set.
3. Where "did this help?" lives + whether feedback is stored.
4. No-data / error / rate-limited copy + behavior.
5. Streaming vs full-response; latency budget (p50/p95).
6. Mobile layout for both surfaces.

## Next
→ Define (PRD + stories with eval/guardrail AC). The 🔑 surface + CTA questions also feed the Decide-stage ADRs.
