// Vercel serverless function — the "ask" gatekeeper (ADR-0007 / ADR-0009).
//
// The browser (/ask page + home ask module on GitHub Pages) POSTs { question }
// here. This function holds the secret, caps input, rate-limits, and proxies to
// the Langflow flow (self-hosted on Railway). It returns { answer }.
//
// Why a gatekeeper: the LLM/flow API key must NEVER reach the browser, and a
// public, paid endpoint needs rate/abuse limits we control (AMA-08 / #38).
// NOTE: the hard spend ceiling is the OpenAI monthly budget cap (see README);
// the limiter below is best-effort per-instance protection layered on top.

import { createState, rateCheck } from "./_rate-limit.mjs";

export const config = { runtime: "nodejs" };

const MAX_QUESTION_CHARS = 500;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Rate limits: per-IP burst + per-IP day + a coarse global day cap. Env-overridable.
const LIMITS = {
  ipPerMin: Number(process.env.RATE_IP_PER_MIN ?? 6),
  ipPerDay: Number(process.env.RATE_IP_PER_DAY ?? 40),
  globalPerDay: Number(process.env.RATE_GLOBAL_PER_DAY ?? 500),
};
const rateState = createState(); // module-level — persists per warm instance
const RATE_MESSAGE: Record<string, string> = {
  rate: "You're asking a bit fast — give it a few seconds and try again.",
  daily: "You've reached today's question limit. Try again tomorrow, or reach out via the links on the site.",
  global: "The assistant is at capacity right now. Please try again later, or reach out via the links on the site.",
};

export default async function handler(req: any, res: any) {
  // --- CORS: the /ask page is served from a different origin (GitHub Pages) ---
  const origin = req.headers?.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // --- input guard ---
  const question = (req.body?.question ?? "").toString().trim();
  if (!question) return res.status(400).json({ error: "Missing question" });
  if (question.length > MAX_QUESTION_CHARS) {
    return res.status(413).json({ error: "Question too long" });
  }

  // --- rate limit (best-effort; reject fast, before any upstream LLM call) ---
  const ip = (req.headers?.["x-forwarded-for"] ?? "").toString().split(",")[0].trim() || "unknown";
  const verdict = rateCheck(rateState, ip, Date.now(), LIMITS);
  if (!verdict.allowed) {
    if (verdict.retryAfterSecs) res.setHeader("Retry-After", String(verdict.retryAfterSecs));
    return res.status(429).json({ error: RATE_MESSAGE[verdict.scope] ?? RATE_MESSAGE.rate });
  }

  const runUrl = process.env.LANGFLOW_RUN_URL; // full Langflow (Railway) run URL
  const apiKey = process.env.LANGFLOW_API_KEY; // secret — server-side only
  if (!runUrl || !apiKey) {
    return res.status(500).json({ error: "Agent not configured" });
  }

  try {
    const upstream = await fetch(runUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        input_value: question,
        output_type: "chat",
        input_type: "chat",
      }),
    });

    if (!upstream.ok) {
      return res.status(502).json({ error: "Agent upstream error", status: upstream.status });
    }

    const data = await upstream.json();
    return res.status(200).json({ answer: extractAnswer(data) });
  } catch {
    return res.status(502).json({ error: "Agent unreachable" });
  }
}

// Langflow's run response is deeply nested; pull the message text defensively.
// (Path confirmed against the live Railway flow — AMA-01.)
function extractAnswer(data: any): string {
  return (
    data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ??
    data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ??
    data?.message ??
    "Sorry — I couldn't parse the agent response."
  );
}
