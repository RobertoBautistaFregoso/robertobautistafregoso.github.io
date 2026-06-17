# AMA Agent — Story Priority (MoSCoW + build order)

**Date:** 2026-06-17 · **Related:** [`04-prd.md`](04-prd.md)

All stories below are the **MVP** (PRD §5). MoSCoW here prioritizes *within* the MVP.

| Order | Story | MoSCoW | Why |
|---|---|---|---|
| 1 | AMA-01 Walking skeleton | **Must** | riskiest integration (static→endpoint→Langflow seam); prove it before layering |
| 2 | AMA-02 Home launcher | **Must** | the entry point; `land → engage` |
| 3 | AMA-03 Streamed grounded answers + memory | **Must** | the core value: fast, grounded, conversational answers |
| 4 | AMA-04 REFUSE / NDA guardrail | **Must** | trust; a fabrication or NDA leak is reputational — non-negotiable |
| 5 | AMA-05 Contextual CTA | **Must** | the north star (conversation → contact) |
| 6 | AMA-07 👍/👎 feedback | **Must** | answer-quality success metric (upgraded from Should) |
| 7 | AMA-06 Follow-up chips | **Should** | nice engagement lift; launchable without it |
| 8 | AMA-08 Resilience & limits | **Must** | reliability + cost/abuse control on a public endpoint |
| 9 | AMA-09 Eval gate | **Must** | the release gate — don't ship a fabricating agent |

**Won't (this release) → v2:** agent-readability (`llms.txt` + ask-roberto endpoint), persistent memory, persona-adaptive UX, analytics dashboard, multi-language, calendar integration.

**Build note:** AMA-01 first (walking skeleton). The only *Should* is AMA-06 — everything else is *Must* for a trustworthy, converting launch. Mobile + a11y are baked into each story's Definition of Done, not separate stories.
