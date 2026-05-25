# ADR-0002: Content Model — Astro Content Collections

**Status:** Accepted · **Date:** 2026-05-25 · **Owner:** Roberto (solo)

---

## Context

The site needs a way to store and structure its content (projects, testimonials, and later resume entries) so that adding/editing content is cheap (the living-site requirement) and decoupled from layout. Framework is Astro (ADR-0001). No backend in v0.

## Decision

Use **Astro content collections** — one collection per content type, each entry a markdown/MDX file with a typed frontmatter schema (validated via Astro's content config).

## Rationale

- **Native to Astro** (the chosen framework) — no extra dependencies or services.
- **Typed frontmatter schemas** catch malformed content at build time — guardrails that keep the living site from breaking as content grows.
- **Adding content = dropping a markdown file** in a collection; no layout edits. Directly serves the living-site requirement and resolves S04's forward-compat note (a project card can gain a repo link later by adding a frontmatter field).
- **Content stays in version control** (markdown in the repo) — so the agentic-workflow trail covers content changes too, reinforcing the showcase story.

## Alternatives considered

- **Headless CMS (Contentful, Sanity, etc.)** — Rejected: overkill for solo content; adds a paid service + external dependency + a point of failure, and pulls content out of git (breaking the "everything in the repo" story). **Revisit when:** a non-technical collaborator needs to edit content without touching the repo.
- **Hardcoded content in components** — Rejected: couples content to layout; every content change becomes a markup edit, violating the living-site requirement.
- **Plain JSON data files** — Workable, but loses markdown's rich-text ergonomics and Astro's first-class collection tooling/validation.

## Consequences

- **Positive:** cheap iteration, type-safe content, content versioned in git, zero extra services/cost.
- **Accepted tradeoffs:** content edits require touching the repo (fine for a solo owner — see revisit trigger).
- **Revisit when:** a non-technical person needs to edit content independently → consider a lightweight CMS layer.

## Initial schemas (home-screen content)

- **projects:** `title`, `summary`, `role`, `year`, `tags[]`, `order`, `repoLink?` (optional — reserved for V2 per ADR-0001).
- **testimonials:** `quote`, `author`, `role`, `company`, `order`.
- **resume:** schema defined with the Resume slice (next slice), not now.
