# ADR-0003: Hosting & Deploy — GitHub Pages + GitHub Actions

**Status:** Accepted · **Date:** 2026-05-25 · **Owner:** Roberto (solo)

---

## Context

The static site (built by Astro, ADR-0001) needs a reliable, $0/month, public host that deploys automatically on merge to `main` (required by story S01's acceptance criteria). The repo-as-showcase and GitHub-native-workflow story favor staying inside the GitHub ecosystem.

## Decision

Host on **GitHub Pages**; build and deploy via a **GitHub Actions** workflow triggered on push to `main`.

## Rationale

- **$0/month**, reliable, supports a custom domain later.
- **On-theme** — GitHub-native hosting reinforces the GitHub-native workflow showcase (the medium is the message).
- **GitHub Actions** provides the automated build/deploy pipeline S01 requires, and the workflow runs are themselves part of the visible workflow trail.
- **Astro has first-class GitHub Pages support** (official deploy guide/action) — low-friction setup.

## Alternatives considered

- **Vercel** — Rejected for v0: its server features go unused on a static site (per ADR-0001), and it pulls hosting off the GitHub-native story. **Revisit when:** migrating to Next.js + Vercel for dynamic features (tied to ADR-0001's revisit trigger).
- **Netlify** — Similar capabilities to Vercel; fine, but off-theme and unnecessary for a static site.
- **Cloudflare Pages** — Fast and capable, but again off the GitHub-native story with no advantage for this use case.

## Consequences

- **Positive:** free, on-theme, automated deploy, the pipeline is part of the showcase, custom-domain-ready.
- **Accepted tradeoffs:** static-only (no server runtime) — consistent with ADR-0001's accepted cap. Public repo required for free GitHub Pages on a personal account (fine — public is the goal anyway).
- **Revisit when:** dynamic/server features are needed → migrate to Vercel alongside the ADR-0001 framework revisit.

## Open question

- **Custom domain?** GitHub Pages defaults to `<user>.github.io`. A custom domain (e.g., a personal `.com`) is a stronger portfolio signal. Decision deferred — can be added anytime without re-architecting. Roberto to decide whether to register one before or after launch.
