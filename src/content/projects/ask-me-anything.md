---
title: "Ask Me Anything — a grounded AI copilot"
type: "experiment"
description: "A live AI agent on my home page that answers questions about my work — grounded in real facts, never fabricated — and turns the conversation into a contact. Built end to end through the agentic SDLC."
skills: ["Agentic SDLC", "RAG", "LLM evals", "Langflow", "Supabase pgvector", "Vercel"]
thumbnail: "/images/projects/ask-me-anything/thumbnail.svg"
sortOrder: 0
draft: false
---

The home page of this site isn't a pitch — it's an agent. Ask it anything about my work and it answers in real time, grounded in facts about me, and points you to the best next step. It's also the point: an AI product manager's most honest credential is an AI product they actually shipped.

**The problem.** A static portfolio answers everyone the same way. A recruiter and a prospective client arrive with *different, time-pressured* questions — "is he a fit, fast?", "has he done evals in my domain?" — and a page of prose makes them hunt. I wanted the site to answer *their* question, on demand, without ever overstating what's true.

## How it works

A visitor's question travels through a deliberately boring, secure path:

- **Static site (GitHub Pages)** → a **Vercel gatekeeper** function that holds the API key, caps input, and rate-limits, so no secret or unbounded cost is ever exposed to the browser.
- → **Langflow (self-hosted on Railway)** orchestrates a retrieval-augmented pipeline: embed the question, **retrieve** the most relevant chunks from a curated corpus stored in **Supabase (pgvector)**, then **generate** a grounded answer.
- The answer renders inline, with a contact call-to-action when the moment fits.

The non-negotiable is the **groundedness guardrail**: the agent answers only from the corpus and says "I don't have that" rather than inventing — because a confident fabrication about a person is worse than a gap. Traces and answer quality are wired to **Arize** for observability.

## Built via the agentic SDLC

I ran this as a real product mini-cycle, not a weekend demo: discovery, a PRD, user stories with acceptance criteria, architecture decision records, and one GitHub issue → branch → PR → review → **security review** → squash-merge → deploy loop per slice. A few decisions I'm proud of because they're the *PM* calls, not the code:

- **Right-sized the model with evidence, not vibes.** I first proved (via traces) that retrieval was sub-second and the LLM was the entire latency budget — then dropped from a heavy reasoning tier to the *smallest* model and validated it on the hard, multi-fact questions. Accuracy held; latency dropped by more than half and cost by roughly an order of magnitude. The retrieval does the thinking; the model just has to phrase what it's handed.
- **Layered the cost controls.** The real "never an unbounded bill" guarantee is a provider-level budget cap; the gatekeeper's rate limit is a fast, best-effort layer on top — sequenced to land *before* the agent went prominent on the home page.
- **Treated model output as untrusted** — sanitized before rendering, secrets kept strictly server-side.

## Where it landed, and what's next

It's live: a grounded, cost-guarded copilot that *is* the hero of the home page. The honest edges are the interesting ones — next up are streamed answers (for perceived speed), a golden-set **eval gate** so a regression can't ship, and one-tap answer feedback. The whole paper trail — playbook, PRD, ADRs, and this write-up — lives in the [repo](https://github.com/RobertoBautistaFregoso/robertobautistafregoso.github.io).
