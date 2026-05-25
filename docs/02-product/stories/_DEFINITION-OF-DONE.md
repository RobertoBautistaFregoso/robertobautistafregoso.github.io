# Definition of Done (shared — applies to every story)

A story is **not done** until all of these are true. Referenced by every story file; not re-listed per story.

- **Responsive** — works and reads well on mobile + desktop (no horizontal scroll, legible without zoom).
- **Accessible (WCAG AA basics)** — sufficient color contrast, full keyboard navigation, semantic HTML, alt text on meaningful images, visible focus states.
- **Agent-readable (per ADR-0004)** — content present in static/server-rendered HTML (no JS required to read it); relevant JSON-LD structured data present and valid for the page's content. *(Site-level agent items — `llms.txt`, AI-permissive `robots.txt`, sitemap, JSON Resume — are verified once at the site level, not per story.)*
- **Deploys clean** — builds with no errors, CI is green, change is live on the production URL.
- **Version control hygiene** — built on a feature branch, merged via PR, conventional-commit messages.
- **No console errors** — browser console is clean on the affected pages.
- **No broken links** — internal links resolve (stub intentional placeholders, never ship a 404).

> The focused accessibility audit happens in Phase 6 (`design:accessibility-review`) against the built site. This DoD is the baseline every story carries as it's built — bake it in, don't bolt it on.
