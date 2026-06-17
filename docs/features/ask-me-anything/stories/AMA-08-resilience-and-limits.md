# Story AMA-08: Resilience & limits (error, rate-limit, cost cap)
As Roberto, who pays for a public LLM endpoint, I want graceful error/limit handling and abuse protection, so that the feature stays reliable and never runs up an unbounded bill.

## Acceptance Criteria
- Given the agent/endpoint is unavailable or times out, when I ask, then the UI shows a graceful error with a direct way to reach Roberto — never a blank or broken state.
- Given a visitor exceeds the rate limit, when they send another message, then the endpoint responds with a clear "try again later" message and does not crash.
- Given the endpoint, when it processes a request, then it caps input and output length and enforces a spend ceiling (cost guardrail, PRD §7).

## Non-goals
- Full observability dashboards (Arize is already wired).
- DDoS-grade infrastructure protection.

## Definition of Done
See `../../../02-product/stories/_DEFINITION-OF-DONE.md` (shared).
