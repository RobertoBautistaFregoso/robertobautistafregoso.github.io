# ADR-0006: Information architecture — Work = career, Lab = side projects

**Status:** Accepted · **Date:** 2026-06-02 · **Owner:** Roberto (solo)

**Supersedes:** the content-model framing in ADR-0002 (and the inherited "projects collection drives /work" model from the S10 scaffold).

---

## Context

After S10 shipped the rebuilt scaffold, the inherited model conflated two different things on `/work`: a **career timeline** (from `experience.ts`) *and* a **projects collection** (cards + `/work/<slug>` detail pages). Roberto's actual material splits cleanly:

- **Career / job history** — SoftServe, Crabi, Beliveo, etc. (real roles, dates, outcomes).
- **Side projects** — this portfolio, GenAI system-design coursework — built for learning, *not* part of his job history.

He also had an orphan `/resume` page (not in nav) that duplicated the career data, and a standalone "SoftServe AI PM" project card that duplicated his current job.

## Decision

1. **`/work` = career timeline.** Driven by `experience.ts`; shows roles, dates, and outcome bullets. No project cards.
2. **`/lab` = side projects.** This portfolio + GenAI system design live here as **card / write-up** items (title, skills, problem→action→outcome, optional thumbnail, detail page) — *not* interactive generative-art demos.
3. **Drop `/resume`.** `/work` is the single canonical career page. (A printable/PDF résumé can come later if needed.)
4. **Fold "SoftServe AI PM"** into the SoftServe entries on the `/work` timeline; remove the standalone project.

## Rationale

- Matches how the content actually divides (career vs. personal projects) — clearer for a hiring manager or client.
- Removes duplication (`/resume` ↔ `/work`; SoftServe project ↔ SoftServe role).
- Card/write-up Lab items reuse the existing `ProjectCard` + detail pattern (low effort) and fit narratives better than the interactive-demo format; an interactive item can be added later without reworking this.

## Alternatives considered

- **Keep `/work` = projects + a separate `/resume` = career** (the inherited model) — rejected: duplicates career data and buries the strongest credibility signal (real outcomes) on a non-nav page.
- **Lab as interactive experiments only** (Pat's original model) — rejected for now: Roberto's side projects are write-ups, not live tools; the heavier React-island format isn't justified yet.

## Consequences

- **Positive:** clean IA (Work = career, Lab = projects), no duplication, strong real-metric career page live now.
- **Content model:** `experience.ts` is the source for `/work`; the `projects` content collection now represents **Lab side-projects** (to be relocated to `/lab/<slug>` in S16; they temporarily still render at `/work/<slug>` + the home teaser until S12/S16).
- **Re-scoped stories:** S13 = Work career timeline (this change) · S15 (Résumé page) is **superseded** (folds into `/work`); testimonials/"Kind Words" remain a separate content-gated backlog item · S16 = Lab side-projects.
- **Revisit when:** Roberto builds a genuinely interactive experiment (then add the interactive Lab format alongside the cards), or wants a downloadable résumé.
