# ADR-0004: Machine / Agent Readability

**Status:** Accepted · **Date:** 2026-05-25 · **Owner:** Roberto (solo)

---

## Context

The portfolio's audiences increasingly include **AI agents** — recruiter/sourcing agents, AI search (Perplexity, ChatGPT/Claude browsing), and candidates' own research agents — alongside humans. For an AI PM specifically, being demonstrably agent-readable is both a discoverability requirement *and* an on-brand positioning signal ("I think AI-native"). The stack is already favorable: Astro (ADR-0001) serves static HTML with zero JS, on GitHub Pages (ADR-0003) — content is fully present for any crawler/agent without JS execution. Need to decide which machine-readability standards to adopt, from day 1.

## Decision

Adopt, from v0:

- **JSON-LD structured data (schema.org):** a `Person` on the home/identity, `CreativeWork` (or similar) per featured project — generated from content-collection frontmatter so it stays in sync.
- **`llms.txt`** at the site root — a plain-text summary for LLMs.
- **AI-crawler-permissive `robots.txt`** (explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) + an XML **sitemap**.
- **Semantic HTML** throughout (already required via the accessibility DoD).
- **Machine-readable resume** in [JSON Resume](https://jsonresume.org) format, exposed alongside the human resume page (when the Resume slice ships).

## Rationale

- Astro's static/zero-JS output is already maximally crawlable; structured data + `llms.txt` add **explicit, typed facts** on top of readable prose.
- **Low-cost, low-regret:** the same moves serve today's SEO + AI search *and* the emerging agent-sourcing world.
- **On-brand:** a parseable, structured, agent-optimized site *demonstrates* AI-native thinking — offensive positioning, not just defensive SEO. Strong "real deal" signal for an AI-lab hiring manager.
- These are **design disciplines in the markup, not speculative features** — cheap day 1, costly to retrofit later.

## Alternatives considered

- **Human-only optimization (do nothing special)** — Rejected: misses a growing, strategically on-brand audience, and retrofitting structured data later is more work than baking it in.
- **RDFa / microdata instead of JSON-LD** — Rejected: JSON-LD is the recommended, lowest-maintenance format (a decoupled `<script>` block, not entangled in markup).
- **Block AI crawlers** (the privacy-conscious default many sites adopt) — Rejected: the entire goal is to be found and evaluated; blocking is counter-strategy here.

## Consequences

- **Positive:** discoverable + parseable by humans, search engines, and AI agents; on-brand AI-native signal; low maintenance (structured data generated from the same content collections).
- **Accepted tradeoffs:** modest extra build-time work (generate JSON-LD, maintain `llms.txt`); structured data must stay in sync with content — mitigated by generating it from content collections (ADR-0002).
- **Revisit when:** agent-interaction standards mature (e.g., MCP endpoints for sites, agent-specific manifests) → consider exposing a richer machine interface beyond static structured data.
