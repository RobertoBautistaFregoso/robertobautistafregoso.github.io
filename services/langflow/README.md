# Langflow backend — AMA agent

The "Ask Me Anything" agent's flow and knowledge base. The retrieval flow runs on
**Langflow OSS on Railway** (ADR-0009); the Vercel gatekeeper (`../ask-api`) proxies to it.

```
browser (/ask) → Vercel gatekeeper → Langflow (Railway) → OpenAI
                                          │
                                          └── retrieves from → Supabase `documents` (pgvector)
```

## Contents
- `corpus/` — the knowledge base (Phase 1 = public site content only). Ingested into Supabase.
- `supabase-schema.sql` — verify/create the `documents` table + `match_documents` function.
- `flows/` — exported flow JSON (source of truth; the Railway container's storage may be
  ephemeral, so the repo is the backup). **Export with API keys OFF; never commit secrets.**

## The one invariant that will silently break retrieval
The **embedding model + dimension must be identical** in the ingestion flow and the
retrieval flow, and must match the pgvector column. We standardize on OpenAI
**`text-embedding-3-small` (1536 dims)** everywhere → column `vector(1536)`. A mismatch does
not error; it just returns irrelevant chunks and answers read as "I don't have that."

---

## Runbook: swap Chroma → Supabase + ingest (grounded answers)

### 1. Corpus — done
`corpus/` holds the Phase-1 docs (public content only). Re-run ingestion whenever it changes.

### 2. Supabase schema
Open the Supabase project → SQL editor. Run **STEP A** of `supabase-schema.sql` to see what
exists, then run only the missing parts of **STEP B**. Goal state: a `documents` table with
`content text`, `metadata jsonb`, `embedding vector(1536)`, and a `match_documents` function.

You'll need, from Supabase → Project Settings → API:
- **Project URL** (e.g. `https://xxxx.supabase.co`)
- **service_role key** (secret — server-side only)

### 3. Ingest (run the script from your laptop → cloud Supabase)
Ingestion is a **script**, not a Langflow flow — reproducible, in git, and it dodges the
missing File loader + Railway's ephemeral storage. It writes via LangChain's
`SupabaseVectorStore`, the exact class the Langflow `Supabase` component wraps, so the
schema matches what retrieval reads.

```bash
cd services/langflow
cp .env.example .env          # fill OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY
pip install -r requirements.txt
python ingest.py              # full refresh: clears the table, then re-ingests
```

Re-run any time the corpus changes (it clears + re-loads, so no duplicates). Verify:
`select count(*) from documents;` → ~10–16. Spot check: `select content from documents limit 3;`

### 4. Swap retrieval on Railway
Open the **Railway** Langflow → the `ask-me-anything-workflow` flow. Use the **`Supabase`**
component — **not `PGVector`** (PGVector uses its own `langchain_pg_*` schema and would ignore
our `documents` table). In the retrieve path:

1. Add a **`Supabase`** component: **Supabase URL** + **service_role key**, **Query Name** =
   `match_documents`. (No table field is shown — it defaults to `documents`, which is what we
   want.)
2. Feed it the **same** `text-embedding-3-small` OpenAI Embeddings node already in the flow.
3. Wire **Chat/question → `Search Query`**, and **`Search Results` → the prompt/context** input
   of the generate step — i.e. wherever the old **Chroma DB** `Search Results` fed.
4. **Leave `Ingest Data` unconnected.** Ingestion is the script's job; connecting it here would
   re-embed on every query (duplicate rows, cost, latency).
5. Delete the **Chroma DB** node (and the `Directory` + its `/app/chroma_db` shim).
6. **Save.** Keep the **same flow ID** — the gatekeeper's `LANGFLOW_RUN_URL` (Vercel env)
   points at it. A brand-new flow gets a new ID and you'd have to update `LANGFLOW_RUN_URL`.

### 5. Verify grounded
- On-corpus (should answer with specifics): *"What did Roberto do at Crabi?"* →
  instant-claims MVP cutting claim time up to 5×, 4.8/5 CSAT, revenue 5×, etc.
- Off-corpus (should refuse, not fabricate): *"What's Roberto's favorite programming
  language?"* → "I don't have that." (Groundedness guardrail — success definition §guardrails.)
- Test via the live `/ask` page, or curl the gatekeeper:
  `curl -X POST "$GATEKEEPER_URL/api/ask" -H 'content-type: application/json' -d '{"question":"What did Roberto do at Crabi?"}'`

### 6. Version the flows + clean up
- Export both flows (Railway retrieval + local ingestion) → `flows/*.json`. **API keys OFF.**
  Grep the JSON for your keys before committing.
- Scrub the stale "DataStax" comments in `../ask-api/api/ask.ts` (host is Railway now, ADR-0009).
