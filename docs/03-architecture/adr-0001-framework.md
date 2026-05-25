# ADR-0001: Site Framework — Astro

**Status:** Accepted · **Date:** 2026-05-25 · **Owner:** Roberto (solo)

---

## Context

Building a static, content-driven personal portfolio (v0: Home + Resume screens). Constraints:

- Solo dev, learning project, built via the agentic SDLC
- **The repo is part of the product** — the framework choice is a visible signal
- **Living site** — must be cheap to add a project/section via iteration
- Hosting leans toward **GitHub Pages** (on-theme; formally decided in ADR-0003)
- No backend / no auth in v0

Need to choose a site framework / generation approach.

## Decision

Use **Astro**.

## Rationale

- **Content collections** (markdown → pages) directly serve the living-site requirement — adding a project or testimonial is dropping a markdown file, no redesign (resolves S04's forward-compat note).
- **Best technical fit** for a static content site: zero-JS-by-default, fast output, "islands" for the occasional interactive piece.
- **Right-sized signal** for an AI PM — "chose the right tool, didn't over-engineer," vs. bringing an app framework to a content-site job.
- **Deploys cleanly to GitHub Pages**, preserving the GitHub-native workflow-as-showcase story.
- **Approachable** for a non-professional engineer building with Claude.

## Alternatives considered

- **Next.js (+ Vercel)** — more transferable/recognized skill (React/Next dominance); unlocks dynamic features (server-side contact form, auth, ISR live data, embedded interactive AI demos). **Rejected for v0** because: (a) overkill for a static content site; (b) its advantages only materialize on a server-capable host (Vercel), which trades away the GitHub Pages story; (c) choosing it now would be premature optimization for speculative V2 features. **Revisit trigger:** if live AI demos or live GitHub-activity data become *real near-term* needs — that would justify migrating to Next.js + Vercel via a superseding ADR.
- **Eleventy (11ty)** — solid simple SSG, but a less modern signal and more config than Astro.
- **Plain HTML/CSS** — no content model, unwieldy as a living site, misses the modern-tooling signal.
- **Jekyll** — GitHub Pages native, but Ruby-based and fading in momentum.

## Consequences

- **Positive:** clean static output, cheap content iteration, on-theme GH Pages deploy, good showcase signal, low maintenance.
- **Accepted tradeoffs:** capped at static + light islands on GitHub Pages — no server-side features (forms, auth, live data) without changing host/framework. Astro is more niche than Next.js as a raw resume skill.
- **Revisit when:** interactive AI demos or live dynamic data become real requirements → re-evaluate Next.js + Vercel (would supersede this ADR).
