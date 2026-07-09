// Shared client-side engine for the "Ask Roberto" agent.
// Used by both the home ask module and the /ask page so they never diverge.
// Does the gatekeeper fetch and returns answer HTML already sanitized — callers
// only handle DOM (loading state, insert html/error). Never innerHTML the raw
// model output: marked → DOMPurify.sanitize → then the caller assigns innerHTML.

import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({ breaks: true }); // soft line breaks, like the agent writes

export interface AskResult {
  ok: boolean;
  /** Sanitized HTML, safe to assign to innerHTML. Present when ok. */
  html?: string;
  /** Human-readable error, safe as textContent. Present when !ok. */
  error?: string;
}

export async function askAgent(apiUrl: string, question: string): Promise<AskResult> {
  if (!apiUrl) return { ok: false, error: "Agent endpoint not configured yet." };
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: `Error: ${data.error ?? res.status}` };
    const answer = data.answer ?? "(no answer returned)";
    return { ok: true, html: DOMPurify.sanitize(await marked.parse(answer)) };
  } catch {
    return { ok: false, error: "Couldn't reach the agent. Try again, or reach Roberto directly." };
  }
}

/** Show the "thinking" state (spinner + label) in the answer element. */
export function renderThinking(el: HTMLElement): void {
  el.innerHTML = '<div class="ask-thinking"><span class="ask-spinner" aria-hidden="true"></span>Thinking…</div>';
}

/** Render a result: a carded answer (already sanitized) or a plain error line. */
export function renderResult(el: HTMLElement, result: AskResult): void {
  if (result.ok) el.innerHTML = `<div class="ask-card">${result.html}</div>`;
  else el.textContent = result.error ?? "Something went wrong.";
}
