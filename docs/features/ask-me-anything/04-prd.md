# PRD: "Ask Me Anything" home-page agent

**Date:** 2026-06-17 · **Status:** Define (draft for Roberto's review)
**Related:** [`01-problem-statement.md`](01-problem-statement.md) · [`02-success-definition.md`](02-success-definition.md) · [`03-design.md`](03-design.md)

> Claude drafted; **Roberto edits**. Two things especially need your sign-off: the **knowledge & NDA policy (§4)** and the **MVP cut (§5)**.

---

## 1. Summary
A live AI agent on a dedicated `/ask` route (launched from a Home module) that answers visitors' questions about Roberto — **grounded in a curated corpus, never fabricated** — and converts the conversation into a contact action. Backend is Roberto's `ask-me-anything-workflow` Langflow flow: **triage (`query_classifier`)** routes each question to **Refuse** · **Contact-capture** · **Retrieve → Generate**, over a RAG pipeline (Docs → chunk → embed → index → Vector DB), with **working memory** (in-session history) and a **CTA tool**. The site stays static with one serverless endpoint as the seam. Observability is already wired (Langflow → **Arize**).

## 2. Problem & users
See discovery. **P0:** recruiter/hiring manager · prospective client/buyer. **P1:** curious peer. The job: judge fit fast and decide whether to reach out.

## 3. Goals / non-goals
- **Goals:** north star = conversation → contact action; activation (% send ≥1 msg); grounded, trustworthy answers; be a proof-of-capability artifact.
- **Non-goals (MVP):** general-purpose chatbot; accounts/auth; calendar integration; multi-language; the agent-readability surface; replacing existing pages. (From `02-success-definition.md`.)

## 4. Knowledge & NDA policy — **proposed default (confirm/adjust)**
- **Corpus:** a **curated set of documents Roberto maintains**, ingested through the RAG pipeline (Docs → chunk → embed → index → Vector DB). Roberto controls exactly what goes in — which is also the **primary NDA control**: the agent can only know what's in the docs, so the NDA line is enforced *at the source* by what Roberto chooses to include.
- **NDA line:** the agent may describe client work only in **generic/anonymized** terms already public on the site (industry, problem-type, outcome) — **never** name or identify a specific client or reveal non-public specifics.
- **Grounding rule:** answer **only** from the corpus; if the answer isn't there, **REFUSE** (the "I don't know — here's how to reach Roberto" state); never invent, never infer beyond the corpus.
- *This is the single highest-risk policy — a hallucinated claim or an NDA leak is reputational. The eval golden-set (§7) tests exactly this.*

## 5. Scope — MVP vs v2 (brutal cut)
**MVP `[M]`:**
- `[M]` `/ask` route + Home launcher module (badge, headline, suggested prompts, input)
- `[M]` Send → **streamed grounded answer** (ANSWER branch)
- `[M]` Follow-up suggestion chips
- `[M]` **Agent-proposed contextual CTA** (CONTACT) → Book intro · Résumé · LinkedIn
- `[M]` **REFUSE / no-data** state + NDA guardrail
- `[M]` **👍/👎** feedback under each answer
- `[M]` **Working memory** — in-session chat history (already in the Langflow flow; no persistence)
- `[M]` Error + rate-limited states; **mobile**; a11y (live region, keyboard)
- `[M]` Serverless **endpoint** (holds the API key, rate-limits) → Langflow flow
- `[M]` **Golden eval-set + groundedness gate** before ship

**v2 `[2]`:** agent-readability surface — public **ask-roberto endpoint** + **`llms.txt`** (both v2; MVP stays focused on the human chat surface) · **persistent / cross-session memory** (MVP has working memory only) · persona-adaptive UX beyond the CTA · analytics dashboard · **multi-language** (Spanish) · **calendar / availability** integration · "share this conversation."

## 6. Functional requirements
- `[M]` Visitor can ask via free text **or** a suggested prompt; both land on `/ask` and begin answering.
- `[M]` Answers **stream** token-by-token; a visible "thinking" state until first token.
- `[M]` Each answer may render follow-up chips and/or a contextual CTA, as the router returns.
- `[M]` The CTA's copy + actions come from the agent (CONTACT response), not hard-coded.
- `[M]` REFUSE answers offer a graceful next step (contact CTA), never a fabricated answer.
- `[M]` "new chat" resets the conversation.
- `[M]` 👍/👎 recorded per answer (storage minimal; see open questions).

## 7. AI-specific requirements (the new gates)
- **Evals:** observability is **already wired (Langflow → Arize)**; what we add is a **golden Q&A set** (P0 questions + must-refuse/NDA traps) with a **groundedness pass bar = 0 fabrications**, run before ship and on flow changes. *Eval pass is a release gate, not a nice-to-have.*
- **Guardrails:** no fabrication; NDA REFUSE; basic **prompt-injection** resistance (visitor input can't override the system instructions or exfiltrate the corpus policy).
- **Cost/abuse:** endpoint **rate-limits** (per IP/session), caps input + output length, enforces a **spend ceiling**; cheap-enough model for the volume.
- **Latency:** target response within **~30s** (precise p50/p95 in Decide); stream to mask it.
- **Privacy:** decide what's logged (questions yes? IP no?); no PII collection in MVP.

## 8. Success metrics
See [`02-success-definition.md`](02-success-definition.md): ★ conversation→contact · activation · 👍/👎 quality · groundedness (gate) · latency · cost.

## 9. Dependencies & risks
- **Runtime ADR** (Decide): static shell + serverless endpoint vs. migrate — biggest dependency; trips ADR-0001/0003.
- **Langflow hosting** + **Arize** eval setup + **model choice** + **secret management** — each an ADR or PRD-noted decision.
- **Top risk:** hallucination / NDA leak → mitigated by the grounding rule + eval gate. **Second:** public-endpoint cost/abuse → rate-limit + cap.

## 10. Open questions → Decide
Latency precision · feedback storage · Langflow hosting specifics · model · retrieval/corpus indexing details.

## Next
→ User stories with eval/guardrail AC (Define), then ADRs 0007+ (Decide).
