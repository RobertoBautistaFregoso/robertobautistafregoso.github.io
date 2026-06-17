# ADR-0007: AMA agent — runtime & hosting (static shell + Vercel function → managed Langflow)

**Status:** Accepted · **Date:** 2026-06-17 · **Owner:** Roberto (solo)
**Feature:** [Ask Me Anything agent](../features/ask-me-anything/README.md) · **Triggered by:** the revisit clause in ADR-0001 & ADR-0003 ("live AI features → reconsider").

---

## Context
The site is static (Astro → GitHub Pages, ADR-0001/0003): no server runtime, no place to hold a secret. The AMA agent is *live* — it needs server-side compute, an LLM/flow call, a **secret API key that can never sit in a public static bundle**, plus rate-limiting and a cost cap (PRD §7; AMA-01/08). The agent itself is Roberto's `ask-me-anything-workflow` **Langflow** flow, currently dev-only at `localhost:7861`. So two things must be decided: the **seam** the browser calls, and **where Langflow runs** in production.

## Decision
1. **Keep the static site on GitHub Pages, unchanged.**
2. Add **one Vercel serverless function** as a **gatekeeper**: it holds the API key (Vercel env), enforces **rate-limit + input/output caps + spend ceiling**, and **proxies** the `/ask` request to the agent. The browser talks *only* to this function.
3. Run the Langflow flow on **managed Langflow (DataStax)**; the function calls its flow API.
4. The browser → function → Langflow seam is a **single HTTP contract**, keeping the backend swappable.

## Rationale
- **Smallest change that meets the guardrail/cost AC** — secrets + limits live in *our* code, not the browser.
- **Preserves everything built** — the GitHub-Pages-native static site and its story stay intact; only `/ask` is dynamic.
- **Swappable** — the function decouples the front-end from Langflow specifics.
- **Cheap + transferable** — serverless scales to zero (free tier); the gatekept-proxy pattern is directly reusable on client work. Managed Langflow avoids server ops for a solo builder.

## Alternatives considered
- **Browser → Langflow API directly** — *Rejected:* can't hide keys or rate-limit in a browser → abuse, runaway cost, exposed Langflow, CORS. Violates AMA-01/08.
- **Migrate the whole site to Next.js + Vercel** (the ADR-0001 "anticipated" path) — *Rejected (for now):* rewrites a working static site and discards the GitHub-native story to make *one* endpoint dynamic. Overkill. **Revisit if** much more of the site goes dynamic.
- **Self-host Langflow** (VPS / Render / Railway / Fly) — *Rejected vs managed:* more ops for a solo learning project; DataStax managed chosen. **Revisit if** managed cost/limits bite.

## Consequences
- **Positive:** clean dynamic seam; secrets/limits under our control; site stays static + free; pattern is transferable.
- **Accepted tradeoffs:**
  - **Two runtimes now** (Vercel function + DataStax Langflow) vs. one static site.
  - **Real running cost** — LLM tokens + DataStax + Vercel beyond free tiers. Unlike the $0 static site, this feature is no longer free (mitigated by the cost cap, AMA-08).
  - **New secret-management surface** (Vercel env vars) — never in the repo.
  - A cross-origin call (function ↔ GitHub Pages) needing CORS config.
- **Relation to ADR-0001/0003:** those still hold for the *site* (static, GH Pages). This ADR is the documented exception: the agent is an external dynamic island, not a migration.
- **Revisit when:** the site needs broad dynamic features (→ reconsider full Next.js migration), or DataStax+Vercel cost/ops outweighs the value (→ self-host or collapse the function into the Langflow host).

## Unblocks
AMA-01 (walking skeleton) can now start: `/ask` page → Vercel function → DataStax Langflow → rendered answer.
