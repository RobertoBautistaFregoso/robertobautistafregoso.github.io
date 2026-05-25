# Story S05: Social proof (testimonials)
As a visitor, I want to read testimonials from people who have worked with Roberto, so that I can trust third-party validation of his abilities.

## Acceptance Criteria
- Given the home page, when I reach the testimonials section, then I see at least one testimonial showing the quote, an attributed name, and the person's role/company.
- Given a testimonial, when it is displayed, then it is attributed to a real person (not anonymous) unless that source explicitly requires anonymity.
- Given no testimonials are available yet, when the page renders, then the section is omitted gracefully — no empty placeholder or "coming soon" stub ships.

## Non-goals
- Testimonial submission form or backend
- Rotating carousel / auto-advancing slider (static list is fine for v0)

## Definition of Done
See `_DEFINITION-OF-DONE.md` (shared — applies to all stories).

## Note
Content dependency: real, attributable testimonials. Roberto to provide. If not ready at build time, this story ships with the section omitted (per AC) and testimonials are added via iteration.
