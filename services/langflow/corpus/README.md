# AMA corpus — Phase 1 (public site content only)

This folder is the knowledge base the "Ask Me Anything" agent retrieves from. It is
ingested (chunked → embedded → written to the Supabase `documents` table) and then
searched at query time by the Langflow flow.

## Provenance & boundary
- **Phase 1 (this content):** derived **only from content already public on the site**
  (`src/data/experience.ts`, `src/data/site-config.ts`, `src/pages/about.astro`,
  `src/content/projects/*`). Zero NDA risk — nothing here isn't already visible to any
  visitor. The agent can only ground answers in facts the site already states.
- **Phase 2 (later):** broader work/personal notes. That phase **requires** an explicit
  redaction pass and a never-reveal NDA boundary before anything is added here. Do not
  drop client-confidential material into this folder without that pass.

## Rules
- Plain-language prose, no code/markup — it embeds better and reads back cleanly.
- Every file is self-contained: state names, dates, and context inline so a single
  retrieved chunk makes sense without its neighbors.
- Only assert what the source content supports. No invented metrics or claims.

## Regenerate
When the site's public content changes, update these files to match. This corpus is the
source of truth for what the agent knows — keep it in sync, then re-run ingestion.
