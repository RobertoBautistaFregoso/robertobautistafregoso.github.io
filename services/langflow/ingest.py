"""
One-shot ingestion: AMA corpus  ->  Supabase pgvector (`documents` table).

Reads the Phase-1 corpus markdown, chunks it, embeds with OpenAI
text-embedding-3-small (1536 dims — MUST match the documents.embedding column
and the Langflow retrieval component), and writes rows via LangChain's
SupabaseVectorStore — the SAME class the Langflow `Supabase` component wraps, so
the schema (content / metadata / embedding + match_documents) matches exactly.

Why a script instead of a Langflow flow: it's reproducible, lives in git (a flow
lives only inside the Railway container, whose storage is ephemeral), and it
sidesteps the missing File loader + browser-upload fragility. Langflow is then
only responsible for retrieval.

Run:
    cd services/langflow
    cp .env.example .env      # fill in the three values
    pip install -r requirements.txt
    python ingest.py          # full refresh: clears the table, then re-ingests

Env (see .env.example):
    OPENAI_API_KEY        OpenAI key
    SUPABASE_URL          https://<project>.supabase.co
    SUPABASE_SERVICE_KEY  service_role key (bypasses RLS; server-side only)
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from supabase import create_client

EMBED_MODEL = "text-embedding-3-small"  # 1536 dims — must match column + retrieval flow
TABLE = "documents"
QUERY_NAME = "match_documents"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_KEY")
if not url or not key:
    raise SystemExit("Set SUPABASE_URL and SUPABASE_SERVICE_KEY (see .env.example).")
if not os.environ.get("OPENAI_API_KEY"):
    raise SystemExit("Set OPENAI_API_KEY (see .env.example).")

client = create_client(url, key)

# --- full refresh: clear existing rows so re-runs don't duplicate ---
before = client.table(TABLE).select("id", count="exact").execute().count or 0
if before:
    client.table(TABLE).delete().neq("id", 0).execute()  # no row has id 0 -> deletes all
    print(f"Cleared {before} existing row(s).")

# --- load + chunk the corpus (numbered files only; skips README) ---
corpus_dir = Path(__file__).parent / "corpus"
files = sorted(corpus_dir.glob("[0-9]*.md"))
if not files:
    raise SystemExit(f"No corpus files found in {corpus_dir}")

splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
docs: list[Document] = []
for path in files:
    text = path.read_text(encoding="utf-8")
    for chunk in splitter.split_text(text):
        docs.append(Document(page_content=chunk, metadata={"source": path.name}))

print(f"Loaded {len(docs)} chunk(s) from {len(files)} file(s).")

# --- embed + insert (same LangChain class the Langflow Supabase component uses) ---
embeddings = OpenAIEmbeddings(model=EMBED_MODEL)
SupabaseVectorStore.from_documents(
    docs,
    embeddings,
    client=client,
    table_name=TABLE,
    query_name=QUERY_NAME,
)

after = client.table(TABLE).select("id", count="exact").execute().count or 0
print(f"Done. `{TABLE}` now has {after} row(s).")
