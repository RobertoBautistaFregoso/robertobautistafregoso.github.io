// Vercel serverless function — the "ask" gatekeeper (ADR-0007).
//
// The browser (/ask page on GitHub Pages) POSTs { question } here.
// This function holds the secret, applies a basic input cap, and proxies to
// the DataStax-hosted Langflow flow. It returns { answer }.
//
// Why a gatekeeper: the LLM/flow API key must NEVER reach the browser, and a
// public endpoint needs rate/abuse limits we control. (AMA-01 / AMA-08.)

export const config = { runtime: "nodejs" };

const MAX_QUESTION_CHARS = 500;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

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

  // --- input guard (cost/abuse — full rate-limiting lands in AMA-08) ---
  const question = (req.body?.question ?? "").toString().trim();
  if (!question) return res.status(400).json({ error: "Missing question" });
  if (question.length > MAX_QUESTION_CHARS) {
    return res.status(413).json({ error: "Question too long" });
  }

  const runUrl = process.env.LANGFLOW_RUN_URL; // full DataStax flow run URL
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
// TODO(AMA-01): confirm this path against the real DataStax flow response and trim.
function extractAnswer(data: any): string {
  return (
    data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ??
    data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ??
    data?.message ??
    "Sorry — I couldn't parse the agent response."
  );
}
