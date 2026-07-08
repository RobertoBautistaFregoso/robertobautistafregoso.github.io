# ask-roberto-api — the AMA agent gatekeeper

A single Vercel serverless function (`api/ask.ts`) that the static site's home
ask module and `/ask` page call. It holds the secret, caps input, rate-limits,
and proxies to the Langflow flow on Railway. The browser never sees the key.
(See ADR-0007 / ADR-0009.)

**Deployed separately from the site** — the Astro site stays on GitHub Pages;
this folder is its own Vercel project. They talk over one HTTP contract:

```
POST {function}/api/ask   body: { "question": "..." }   →   { "answer": "..." }
```

## Setup (one-time)
1. **Langflow (Railway)** — the `ask-me-anything-workflow` flow; copy its **run URL** (includes the flow id) and the **API key**.
2. **Vercel** — new project, **Root Directory = `services/ask-api`**. Set env vars (see `.env.example`):
   - `LANGFLOW_RUN_URL`, `LANGFLOW_API_KEY` (secret), `ALLOWED_ORIGINS`, and optionally the `RATE_*` overrides.
3. Deploy → copy the function URL (e.g. `https://ask-roberto-xyz.vercel.app/api/ask`).
4. Set **`PUBLIC_ASK_API_URL`** to that URL in the site build env, so the site calls it.

## Abuse & cost controls (#38)
Layered, because this is a public, *paid* endpoint:

1. **Hard spend ceiling = OpenAI monthly budget cap.** Set it in the OpenAI dashboard (Settings → Limits → monthly budget). This is the real "never an unbounded bill" guarantee — provider-enforced, and no gatekeeper code can exceed it. **Do this before promoting the agent to the home page.**
2. **Gatekeeper rate limit** (`api/_rate-limit.mjs`): per-IP burst + per-IP/day + a coarse global/day cap → returns `429` *before* any LLM call. Tunable via the `RATE_*` env vars. **Best-effort**: state is in-memory per serverless instance, so a distributed or cold-start-spread flood can slip past — the OpenAI cap (1) is the backstop. **Revisit** → a shared-state limiter (Supabase/Upstash) if real abuse shows up.
3. **Input length cap** (`MAX_QUESTION_CHARS`).

Test the limiter: `node api/_rate-limit.test.mjs`.

## Notes
- `.env` is gitignored — never commit real keys.
- `extractAnswer()` parsing is defensive; the path is confirmed against the live Railway flow (AMA-01).
