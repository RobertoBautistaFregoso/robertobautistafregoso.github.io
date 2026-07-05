# ADR-0008: AMA agent — stack, observability & data (Langflow · Arize · feedback; Supabase deferred)

**Status:** Accepted — ⚠️ *host + vector store superseded by [ADR-0009](adr-0009-ama-revised-runtime-supabase-railway.md)* (DataStax→Railway; Chroma→Supabase pgvector, now MVP not v2). Model/Arize/feedback here still stand. · **Date:** 2026-06-17 · **Owner:** Roberto (solo)
**Feature:** [Ask Me Anything agent](../features/ask-me-anything/README.md) · **Companion to:** [ADR-0007](adr-0007-ama-runtime-hosting.md).

---

## Context
ADR-0007 set the runtime. This records the rest of the agent stack and — importantly — **where messages and 👍/👎 feedback land**, given Supabase is deferred to v2.

## Decision
- **Agent framework:** **Langflow** — `ask-me-anything-workflow`: triage (`query_classifier`) → **Refuse · Contact-capture · Retrieve→Generate**, RAG over a maintained corpus (Docs → chunk → embed → index → Vector DB), working memory (in-session), CTA tool.
- **Model / embeddings:** per the Langflow flow config (**OpenAI** — embeddings + chat model). Model tuning is a flow-config detail, not a front-end concern; adjustable without touching the site.
- **Observability & evals:** **Arize** (already wired to Langflow) — traces, latency, and the golden-set **groundedness release gate** (AMA-09).
- **Messages:** captured in **Arize** (observability). **No separate message store.**
- **👍/👎 feedback (MVP):** recorded as **Arize trace feedback/annotation**, forwarded by the Vercel function — so the vote sits next to the answer/trace it rates. Satisfies AMA-07's "vote recorded" without a database. *(Exact Arize feedback API to confirm at build.)*
- **Supabase (queryable product DB): deferred to v2.**

## Rationale
- **Reuse what's wired** (Arize) → minimal new infra for MVP; no database to run.
- **Votes-as-trace-feedback** keeps the quality signal attached to the exact trace, which is also where eval analysis happens.
- **Privacy-light** — messages live in the observability layer (PRD §7); we don't build a transcript store.
- **Defer the DB until there's a real querying need** — avoid premature infrastructure (and matches the "build it when the need appears" habit).

## Alternatives considered
- **Supabase in MVP for votes/messages** — *Rejected (now):* Arize already holds messages, and a DB is premature for just thumbs. **Revisit (v2)** when product-analytics querying/aggregation of votes or usage is wanted.
- **Store full transcripts in a DB** — *Rejected:* privacy weight for little added value; Arize has the traces.

## Consequences
- **Positive:** lean MVP — no DB to operate; privacy-light; reuses the existing Arize wiring.
- **Accepted tradeoffs:** votes live in Arize (good for quality analysis) but **not** in a queryable product DB — ad-hoc product analytics on feedback waits for v2 Supabase. Depends on Arize's feedback/annotation capability (confirm at build).
- **Revisit when:** you want to query/aggregate votes or usage as product data → add **Supabase (v2)**; or model/eval needs change → adjust the flow.
