# ADR-0005: Rebuild on an adapted Astro 5 + shadcn scaffold (Pat Morgan homage)

**Status:** Accepted · **Date:** 2026-06-01 · **Owner:** Roberto (solo)

**Supersedes:** much of the v0.0 hand-built design (ADR-0001 framework choice still holds — still Astro).

---

## Context

The v0.0 portfolio shipped a lean, hand-built Astro site (single `index.astro`, one `Layout`, three project markdown files) with a Fraunces + Inter editorial design pass (#13/#14). Roberto found Patrick Morgan's personal site ([itspatmorgan.github.io](https://github.com/itspatmorgan/itspatmorgan.github.io)) — a far richer Astro 5 + React 19 + Tailwind 4 + shadcn build with a sidebar shell, OKLCH theming, light/dark, a generative-art "Lab," and a full agentic-SDLC tooling setup (`.claude/plans/`, `AGENTS.md`). Roberto decided to adopt that scaffold and replace all content with his own.

Constraints / decisions feeding this ADR:

- Scope **excludes** Pat's Writing + Community sections.
- Sections in scope: Home, Work, About, Resume, Lab, Colophon/Style-guide.
- Pat's repo has **no LICENSE** → "all rights reserved" by default.
- This is a **personal, non-commercial learning project**.

Need to record: the stack jump, the package-manager switch, and the IP posture.

## Decision

1. **Adopt Pat's front-end scaffold** (Astro 5, React 19 islands, Tailwind 4 via Vite plugin, shadcn base-nova, Geist fonts, OKLCH tokens, sidebar app-shell, generative-art Lab engine) and **replace all content** with Roberto's.
2. **Switch package manager to pnpm** (matches Pat's lockfile; avoids resolution drift).
3. **Strip Writing + Community** entirely (content, pages, data, components, scripts, collection).
4. **IP posture:** keep visible **attribution to Pat** in the Colophon; do **not** republish any of his written content; treat his code as inspiration adapted for personal use. Revisit if the site ever goes commercial.

## Rationale

- The scaffold is a large, coherent design system that would take many sprints to build from scratch; lifting it lets Roberto focus the playbook practice on content, structure, and the agentic workflow rather than re-deriving a design system.
- Pat built it via the same agentic SDLC Roberto is learning — adopting it (including `.claude/plans/` + `AGENTS.md` patterns) doubles as study material.
- pnpm matches the upstream lockfile, so the lifted dependency tree resolves identically.
- Attribution + non-commercial use is the cheapest reasonable mitigation for the no-license reality.

## Alternatives considered

- **Inspiration-only rebuild** (build our own components through the playbook, no code lifted) — cleanest on IP and best for the learning goal, but slowest; **rejected** because Roberto explicitly chose the lift-and-adapt path for speed and to study the real implementation.
- **Hybrid** (adopt IA + tokens as a spec, hand-rebuild components) — middle ground; **rejected** for the same speed reason.
- **Keep the v0.0 hand-built site and extend it** — preserves the Fraunces design pass, but forgoes the richer scaffold and the study value.

## Consequences

- **Positive:** rich multi-section site with theming, a design system, and a generative-art Lab arrives fast; agentic-SDLC tooling patterns come along for free; content work is the main remaining effort.
- **Accepted tradeoffs:**
  - Discards the v0.0 Fraunces + Inter editorial look (preserved in git history).
  - Adopts unlicensed code → mitigated by attribution + non-commercial use, but not eliminated. **Revisit trigger:** any commercial use, or if Pat objects → re-derive or seek explicit permission.
  - Heavier dependency tree (React, motion, shadcn) and a new package manager (pnpm) vs. the prior Astro-only build.
  - Many content slots ship as placeholders until real content is supplied (profile photo, project thumbnails, About bio, resume data, testimonials, NDA-cleared client names).
- **Revisit when:** the site goes commercial, Pat objects, or the lifted scaffold proves heavier to maintain than its value.
