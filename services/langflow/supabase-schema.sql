-- Supabase schema for the AMA vector store (Langflow Supabase / LangChain-compatible).
-- Run in the Supabase SQL editor. Standardized embedding model: OpenAI
-- text-embedding-3-small  ->  1536 dimensions. The vector(1536) column, the
-- match_documents function, and BOTH Langflow OpenAI-Embeddings components
-- (ingestion + retrieval) must all agree on 1536, or retrieval silently returns junk.

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP A — VERIFY what already exists (read-only; run these first)
-- ─────────────────────────────────────────────────────────────────────────────

-- pgvector installed?
select extname, extversion from pg_extension where extname = 'vector';

-- documents table columns + types (want: id, content text, metadata jsonb, embedding)
select column_name, data_type, udt_name
from information_schema.columns
where table_name = 'documents'
order by ordinal_position;

-- embedding column's actual dimension (want: vector(1536))
select a.attname, format_type(a.atttypid, a.atttypmod) as type
from pg_attribute a
join pg_class c on c.oid = a.attrelid
where c.relname = 'documents' and a.attname = 'embedding';

-- does the match_documents function exist, and with what args?
select proname, pg_get_function_identity_arguments(oid) as args
from pg_proc where proname = 'match_documents';

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP B — CREATE / REPAIR (run only what STEP A shows is missing)
-- If STEP A shows an existing `documents` table with a DIFFERENT embedding
-- dimension (e.g. vector(3072)) or wrong column names, and it holds no data you
-- need, drop it first:  drop table documents cascade;  then run the block below.
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists vector;

create table if not exists documents (
  id        uuid primary key default gen_random_uuid(),
  content   text,
  metadata  jsonb,
  embedding vector(1536)
);

-- Similarity search function used by the Langflow Supabase component
-- (component field "query_name" = match_documents).
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default null,
  filter jsonb default '{}'
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Optional: an index speeds up search once the row count grows. Not needed for
-- a corpus of ~15 chunks, but harmless to add now.
-- create index on documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ─────────────────────────────────────────────────────────────────────────────
-- Notes
-- • RLS: Langflow connects with the Supabase SERVICE_ROLE key, which bypasses
--   RLS — so ingestion writes and retrieval reads both work regardless of
--   policies. Keep that key server-side only (Langflow global var); it must
--   never reach the browser. The Vercel gatekeeper already isolates the browser
--   from all of this.
-- • After ingestion, confirm rows landed:  select count(*) from documents;
-- ─────────────────────────────────────────────────────────────────────────────
