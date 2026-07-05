# ADR-0009: AMA agent — revised runtime & data (Langflow OSS on Railway · Supabase pgvector)

**Status:** Accepted · **Date:** 2026-06-18 · **Owner:** Roberto (solo)
**Supersedes (in part):** the *hosting* choice in [ADR-0007](adr-0007-ama-runtime-hosting.md) and the *vector store / Supabase-deferral* in [ADR-0008](adr-0008-ama-stack-observability-data.md).

---

## Context
ADR-0007/0008 chose **managed Langflow on DataStax** to host the flow. On checking (post-PTO), **DataStax Langflow was deprecated March 9, 2026 and removed April 9, 2026** — it no longer exists. So the flow needs a new home, and the flow's vector store (currently **local Chroma** on Roberto's laptop, per the exported flow) needs a hosted home too. This is exactly the availability revisit-trigger 0007/0008 named.

## Decision
- **Host Langflow OSS on Railway** — a container, always-on host for the flow.
- **Vector store = Supabase (`pgvector`)** — replaces local Chroma; swap the Chroma component for the Supabase/pgvector component. This **pulls Supabase from "v2" into MVP** as the vector store.
- **Keep ADR-0007's seam unchanged:** static site (GitHub Pages) → **Vercel gatekeeper function** (holds key, rate-limit, cost cap) → Langflow run API.
- **Unchanged from 0008:** OpenAI model/embeddings (per flow); Arize observability + eval gate; 👍/👎 → Arize trace feedback for MVP (may also land in Supabase later, now that it's in the stack).

## Rationale
- DataStax host is gone → self-host **Langflow OSS**; Railway is the least-friction always-on container for a solo builder (stays warm — matters for the ≤30s latency goal; cheap).
- **Supabase pgvector** works with Langflow *and* **consolidates to one backend**: vectors now + the votes/product DB later — instead of running two DBs (Astra for vectors + Supabase for votes).
- The gatekeeper seam already proved out in AMA-01 scaffolding; only the upstream host/URL changes.

## Alternatives considered
- **Render / Fly** for Langflow — fine; Railway chosen for warmth + DX. **Revisit if** Railway cost/ops bites.
- **Astra DB** for vectors — purpose-built + native Langflow tie-in, but that's *two* DBs; Supabase consolidates. **Revisit if** vector scale/perf demands a dedicated vector DB.
- **Vercel to host Langflow** — *Rejected:* Vercel runs stateless serverless functions, not an always-on stateful server; Langflow needs a container host. (Vercel stays as the gatekeeper only.)

## Consequences
- **Positive:** unblocks Build; one database to learn/run; the proven gatekeeper seam is untouched.
- **Accepted tradeoffs:** Railway is a small always-on cost; self-hosting Langflow OSS means Roberto owns updates/uptime (vs. managed); Supabase now enters MVP (updates ADR-0008's deferral).
- **Revisit when:** Railway cost/ops outweighs value → Render/Fly/managed; or vector scale needs a dedicated store → reconsider Astra/Pinecone/etc.
