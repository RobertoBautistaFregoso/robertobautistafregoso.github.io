# ask-roberto-api — the AMA agent gatekeeper

A single Vercel serverless function (`api/ask.ts`) that the static site's `/ask`
page calls. It holds the secret, applies a basic input cap, and proxies to the
DataStax-hosted Langflow flow. The browser never sees the key. (See ADR-0007.)

**Deployed separately from the site** — the Astro site stays on GitHub Pages;
this folder is its own Vercel project. They talk over one HTTP contract:

```
POST {function}/api/ask   body: { "question": "..." }   →   { "answer": "..." }
```

## Setup (one-time)
1. **DataStax** — publish the `ask-me-anything-workflow` flow; copy its **run URL** (includes the flow id) and an **application token**.
2. **Vercel** — new project, **Root Directory = `services/ask-api`**. Set env vars (see `.env.example`):
   - `LANGFLOW_RUN_URL`, `LANGFLOW_API_KEY` (secret), `ALLOWED_ORIGINS`.
3. Deploy → copy the function URL (e.g. `https://ask-roberto-xyz.vercel.app/api/ask`).
4. Set **`PUBLIC_ASK_API_URL`** to that URL in the site build env, so `/ask` calls it.

## Notes
- `.env` is gitignored — never commit real keys.
- Response parsing in `extractAnswer()` is defensive; confirm the path against the real flow response during AMA-01 testing.
- Rate-limiting + spend cap get hardened in AMA-08; this has only a length cap for now.
