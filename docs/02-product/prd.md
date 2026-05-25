# Portfolio Site — PRD (v0)

**Date:** 2026-05-25
**Status:** Draft (Phase 2) — adapted to personal-portfolio scale (no TAM/SAM/SOM, no OKRs)
**Related:** `../01-discovery/01-problem-statement.md`, `../01-discovery/02-success-definition.md`

---

## 1. Executive Summary

We're building a personal portfolio site for Roberto — an AI Product Manager — so that decision-makers in AI and product (hiring managers, prospective consulting clients, peers) can quickly judge that he's an exceptional AI product builder with a distinct POV and clear trajectory, and reach out. **v0 is a 2-screen site (Home + Resume)**, built and shipped through the agentic SDLC, designed to grow via continuous iteration.

---

## 2. Problem Statement

*(Full version: `01-problem-statement.md`.)* Decision-makers in AI/product need a fast, credible way to judge whether Roberto is an exceptional AI product builder — with a distinct POV and clear trajectory — but a generic LinkedIn shows none of that, so he stays undifferentiated and the people who'd engage him move on without reaching out.

---

## 3. Target Users

- **Primary:** Decision-makers who could engage Roberto — hiring managers (incl. frontier AI labs) and prospective consulting clients. Land with ~20s of attention; deciding "is this person worth my time / a reach-out?"
- **Secondary:** Peers in the AI/product community (credibility, amplification, referrals).
- **Special — the iterator:** Roberto himself. The site is a *living* artifact he maintains and grows; ease-of-iteration is a first-class requirement.

**Positioning (v0): open** — optimize for "Roberto is an exceptional AI product builder"; let the path (full-time vs. consulting) follow from who shows up.

---

## 4. Why this project (lightweight context)

Two intertwined goals: **(a)** establish a credible professional presence that converts the right visitors; **(b)** learn the agentic SDLC end-to-end (this project's meta-purpose). Personal learning project — no business OKRs or market sizing.

---

## 5. Solution Overview

**v0 = 2 screens.** Reference vibe: itspatmorgan.com.

### Screen 1 — Home / Landing (single scroll)
- **Hero:** one-sentence "who I am" + positioning
- **About (brief):** identity + where I'm going (trajectory teaser)
- **Major projects:** 2-4 highlighted, short descriptions
- **Industries / domains** of experience
- **Clients / brands** worked with (names or logos — *see Dependencies re: NDA*)
- **Types of projects** I've participated in
- **Testimonials / "kind words"** (*see Dependencies re: availability*)
- **Contact / CTA** — how to reach me

### Screen 2 — Resume
- Work experience (chronological), trajectory, skills, education — standard resume content. Reference: itspatmorgan.com/resume/.
- (Downloadable PDF — nice-to-have, decide in build.)

*Design/visual direction decided in design + Phase 3; PRD stays high-level (no pixel specs).*

---

## 6. Success Metrics

*(Full version: `02-success-definition.md`. Metric #2 REFRAMED below — flagged for reconciliation.)*

This portfolio is a success if, **2 weeks after first shipping:**

1. **Live + shared** — real public URL, on my LinkedIn, sent to ≥5 people.
2. **Process genuinely followed (REFRAMED for v0)** — the repo is public and genuinely built via the agentic GitHub-native workflow (branches, PRs, issues, board), discoverable by anyone who checks my GitHub. *On-site surfacing of the workflow (repo links + "how I built this" narrative across multiple projects) is deferred to V2.*
3. **Living, not static** — ≥1 post-launch iteration shipped via a PR.
4. **It moves someone** — ≥1 viewer says, unprompted, it changed their impression, OR a concrete inbound (interview, intro, consult inquiry).

> ⚠ **Reconcile:** `02-success-definition.md` still has the original metric #2 ("process visible" on-site). Update that file to match this reframe, since on-site repo visibility is deliberately deferred to V2.

---

## 7. Scope — MVP vs V2

### [MVP] — v0 ships
- **Home screen** (all blocks in §5)
- **Resume page**
- **Public repo** built via the agentic workflow (NOT yet linked/narrated on-site)

### [V2] — grows via iteration
- **Agentic-SDLC credibility showcase** — repo links + "how I built this" narrative, surfaced *once multiple projects* demonstrate the workflow (see Open Questions — Roberto's discovery item)
- **POV / writing / expertise library** (the scope-balloon risk; deliberately grown over time)
- **3rd screen** for POV content when it exists
- Testimonials/client logos *if* not ready at launch

---

## 8. Out of Scope (v0)

- Auth, accounts, backend, database, CMS — **static site**
- Blog / writing platform
- Server-side contact form (v0 likely `mailto:` or external link — decide in Phase 3)
- Analytics dashboards, multi-language, dark-mode toggle (unless trivial), CMS admin

---

## 9. Dependencies & Risks

- **Content — testimonials/"kind words":** Do real, attributable ones exist? If not → gather, or defer block to V2. *(Risk: portfolio stalls when content isn't ready.)*
- **Content — client names/logos:** NDA check — which clients are publicly showable? Some may need to be anonymized ("a Fortune-500 fintech") or omitted.
- **Content — resume:** Exists (Roberto's career history). Low risk.
- **Design direction:** Reference itspatmorgan.com vibe; specifics decided in design/Phase 3.
- **Scope-balloon risk:** POV/blog/expertise tempting to add early → mitigated by the living-site model (grow via iteration, not crammed into v0).

---

## 10. Open Questions

1. **Best way to demonstrate agentic-SDLC credibility across multiple projects** (Roberto's V2 discovery item — what's the strongest format: per-project repo links, a case-study page, a "build log," etc.?)
2. **Contact mechanism:** `mailto:` vs. form vs. social links — Phase 3 architecture.
3. **Hosting:** GitHub Pages (on-theme) vs. Vercel — Phase 3 ADR.
4. **Testimonials:** have them now, gather, or defer to V2?
5. **Resume PDF download:** include in v0 or skip?

---

## 11. Epic Hypothesis & Next Step

**Epic hypothesis:** We believe a 2-screen portfolio (Home + Resume), built and shipped through the agentic SDLC, will let decision-makers in AI/product quickly judge Roberto as an exceptional AI product builder and reach out — because today there's no fast, credible signal beyond a generic LinkedIn. We'll know it works via the §6 success metrics.

**Next step:** Decompose the MVP into 5-10 user stories with acceptance criteria via `/user-story:user-story` → `docs/02-product/stories/`. (Detailed stories intentionally NOT in this PRD — that's the next playbook step.)
