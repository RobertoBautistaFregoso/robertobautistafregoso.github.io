# Story Prioritization — Home Screen (MoSCoW)

**Date:** 2026-05-25
**Scope:** Home-screen slice (S01–S07). Resume page is the next slice.
**Lens:** the success definition — *live + shared + proud of it + moves someone to reach out.* What's the thinnest version that does that job?

---

## Must have — the thinnest shippable portfolio (v0.0)

| Story | Rationale (one line) |
|---|---|
| **S01 Walking skeleton + deploy** | Nothing ships without the pipeline; it's the foundation everything else lands on. |
| **S02 Hero / identity** | The 20-second "who is this" judgment — without it there's no first impression. |
| **S04 Featured projects** | At least *some* real work on screen; a portfolio with zero proof is just a business card. |
| **S06 Reach out / CTA** | The conversion path — the entire goal is "they reach out." |

> **v0.0 = S01 + S02 + S04 + S06.** A live site that says who you are, shows a little proof, and lets someone contact you. Genuinely shippable on its own.

---

## Should have — completes a credible home screen (v0)

| Story | Rationale |
|---|---|
| **S03 Credibility signals** | Industries / clients / project-types add breadth of credibility — strong, but the site stands for a day without it. |
| **S07 Path to depth (resume link)** | Sets up the next slice; can ship as a stub link initially. |

---

## Could have — valuable but deferrable

| Story | Rationale |
|---|---|
| **S05 Social proof / testimonials** | Gated on content you don't have yet. Per its AC it omits gracefully until testimonials exist — so it's a content task, not a build blocker. |

---

## Won't have (this release) — explicitly deferred

- Repo links + "built via agentic SDLC" narrative → **V2** (surface once multiple projects demonstrate the workflow)
- POV / writing / blog → **V2** (grows via iteration)
- The **Resume page content** → the next slice after the home screen
- Server-side contact form → out of scope for static v0

---

## Decision log

- **S04 (featured projects) = Must** — confirmed 2026-05-25. Rationale: a portfolio needs proof of work on screen, or it's just a business card. So **v0.0 = S01 + S02 + S04 + S06.**
