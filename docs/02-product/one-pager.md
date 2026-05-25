# Portfolio Site — One-Pager (build brief)

**Date:** 2026-05-25 · **Status:** v0 build brief
**Full detail:** PRD (`prd.md`) · stories (`stories/`) · priority (`priority.md`)

> The 5-minute read a builder (or future-me in Phase 5) can start from without reading everything else.

---

## What we're building

A personal portfolio site for Roberto (AI Product Manager), **built and shipped through the agentic SDLC**. v0 covers 2 screens: **Home** (this slice), then **Resume** (next slice).

## Who it's for + the job

Decision-makers in AI/product — hiring managers (incl. frontier AI labs) and prospective consulting clients; peers secondary — land with ~20 seconds of attention and decide: *is Roberto an exceptional AI product builder worth reaching out to?* The site's job: make the right ones conclude **yes** and contact him. Positioning kept open (job vs. consulting).

## v0.0 — thinnest shippable (Must)

1. **S01** — Walking skeleton + auto-deploy to a live URL
2. **S02** — Hero: name + one-line positioning (role + ≥1 concrete specific)
3. **S04** — Featured projects: 2–4, each title + brief description
4. **S06** — Contact CTA: clear, reachable, initiates contact

Then layer: **S03** credibility signals + **S07** resume link (Should) → **S05** testimonials (Could, content-gated).

## Hard constraints

- **Static site — no auth, no backend** (v0)
- **≤ 3 screens**
- Every story meets the shared **Definition of Done**: responsive, WCAG-AA basics, deploys clean, PR-reviewed, no console errors, no broken links
- **Hosting lean: GitHub Pages** (on-theme with the GitHub-native story) — confirmed in Phase 3 ADR
- **NDA:** only publicly-showable client/brand names; others anonymized or omitted
- **Living site:** must be cheap to add a project/section via iteration

## Success (measured 2 weeks after first ship)

1. Live + shared (on LinkedIn, sent to ≥5 people)
2. Repo public + genuinely follows the agentic workflow (on-site surfacing of it = V2)
3. ≥1 post-launch iteration shipped via PR (living, not static)
4. ≥1 viewer says, unprompted, it changed their impression — OR a concrete inbound

## Explicitly OUT (this release)

Repo links + "how I built this" narrative (V2) · POV / writing / blog (V2) · the Resume *page content* (next slice) · server-side contact form.

## Build order

`S01 → S02 → S04 → S06` (Must) → `S03, S07` (Should) → `S05` (Could). One PR per story (Phase 5 loop).
