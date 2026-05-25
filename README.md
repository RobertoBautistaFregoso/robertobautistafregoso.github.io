# robertobautistafregoso.github.io

Personal portfolio site — built with [Astro](https://astro.build), deployed to GitHub Pages via GitHub Actions. Built end-to-end through the agentic SDLC (see `docs/` for the PRD, user stories, and architecture decisions).

## Develop

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages — no manual steps.

## Structure

- `src/pages/` — site pages (Astro)
- `astro.config.mjs` — site config (`site`, `base`)
- `.github/workflows/deploy.yml` — build + deploy pipeline
- `docs/` — the SDLC artifacts (PRD, stories, ADRs) this site was built from
- `CONTRIBUTING.md` — branch/commit/PR conventions + the per-story build loop
