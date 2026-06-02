# AGENTS.md

Cross-agent technical conventions for this repository. For **process**, defer to `PLAYBOOK.md`; for **how to behave here**, defer to `CLAUDE.md`. This file is the durable map of the codebase and its conventions.

## Project Overview

Roberto Bautista's personal portfolio — an AI Product Manager's site, and a hands-on practice project for the agentic SDLC (idea → PRD → stories → build → ship → iterate with Claude Code + GitHub). The site should feel warm, minimal, editorial, and professional.

## Tech Stack

- Framework: Astro v5, static output
- Styling: Tailwind CSS v4 via `@tailwindcss/vite` (not PostCSS)
- Components: shadcn/ui, base-nova style (`components.json`)
- React: islands only, where interactivity requires it
- Content: Astro content collections with Zod schemas (`src/content.config.ts`)
- Fonts: Geist Sans (body), Geist Mono (labels/code)
- Package manager: **pnpm 10+** (committed `pnpm-lock.yaml`)
- Deployment: GitHub Pages via GitHub Actions on push to `main` (`withastro/action@v3`, auto-detects pnpm)

## Commands

```bash
pnpm install
pnpm dev      # localhost:4321
pnpm build    # → dist/
pnpm preview
```

## Workflow

Follow `PLAYBOOK.md`. In short: one user story → branch `feat/<story>-<slug>` → plan → build → verify (`pnpm build` + browser) → PR → `/review` + `/security-review` → squash-merge → auto-deploy → verify live → close issue. Never commit to `main` directly.

Issue labels (Where × What), borrowed from upstream: Where = `home`, `work`, `about`, `resume`, `lab`; What = `design`, `content`, `infrastructure`, `documentation`.

## Repository Map

| Path | Purpose |
| --- | --- |
| `PLAYBOOK.md` | The SDLC process (authoritative for workflow) |
| `LEARNINGS.md` | Append-only log, one entry per phase + resumption notes |
| `CLAUDE.md` | How agents should behave in this repo |
| `docs/NN-phase/` | Artifacts: discovery, PRD, stories, ADRs, sprint plans |
| `.github/workflows/deploy.yml` | GitHub Pages deploy |
| `public/images/` | Static image assets (`placeholder.svg` until real assets land) |
| `src/components/` | Astro + React components (`ui/` = shadcn primitives, `layout/` = shell) |
| `src/content/` | `projects/` and `lab/` collections |
| `src/content.config.ts` | Collection schemas |
| `src/data/` | `site-config.ts`, `experience.ts`, `commendations.ts` |
| `src/layouts/` | `BaseLayout`, `PageLayout`, `ProjectLayout` |
| `src/lab/` | Generative-art Lab engine (unused until S16) |
| `src/pages/` | Routes |
| `src/styles/global.css` | Tailwind import, OKLCH tokens, prose styles |

Do not edit `dist/` as source.

## Conventions

- Use `@/` imports (alias → `./src/*`).
- Prefer `.astro`; use React only for stateful/interactive UI.
- Query content with `getCollection()`; filter `draft` before rendering public listings.
- Semantic Tailwind tokens (`text-muted-foreground`, `bg-card`, `border-border`, `hover:text-accent`). Dark mode is class-based (`.dark` on `<html>`).
- Markdown prose uses custom `.prose` styles in `global.css`.

### Project frontmatter

```yaml
title: "Project Title"
type: "professional" | "experiment"
description: "Short description"
skills: ["Skill 1", "Skill 2"]
thumbnail: "/images/..."   # /images/placeholder.svg until real art
sortOrder: 1
draft: false
```

### Out of scope

Writing and Community sections were intentionally removed (ADR-0005). Do not re-add them without a superseding decision.

## Verification

- `pnpm build` for most code, schema, route, and layout changes.
- `pnpm dev` + browser for visual/interactive changes.

## Multi-Agent Coordination

- Check `git status --short` before editing.
- Do not overwrite or revert user changes unless asked.
- Keep edits scoped to the request; avoid broad refactors.
- Prefer existing local patterns over new libraries.
- Update this file when durable repository conventions change.
