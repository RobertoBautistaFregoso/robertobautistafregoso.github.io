---
title: "My skill library — built vs. adopted"
type: "experiment"
description: "The working library of Claude Code skills I use to run the agentic SDLC — the ones I built to enforce my own house format and quality, and the ones I adopt from others. The taste is knowing which is which."
skills: ["Claude Code skills", "Agentic SDLC", "Reusable tooling", "Skill design", "Prompt engineering"]
thumbnail: "/images/projects/skill-library/thumbnail.svg"
sortOrder: 0.5
draft: false
---

An operator is only as good as their toolkit. This is the working library of Claude Code **skills** — small, reusable capabilities — that I use to run a spec-driven agentic software workflow end to end. Two kinds live here, and the split is the point: the ones I **built**, and the ones I **adopt**.

## Skills I built

Wherever a pattern repeated in my workflow, I built a skill for it — each one encoding my house format so quality doesn't depend on me remembering it:

- **story-writer + ac-linter** — a deliberate *emitter / checker* pair. One writes user stories in my format (Mike Cohn + Gherkin acceptance criteria + non-goals + a shared definition of done); the other lints them for *testable* criteria. The linter caught real issues on its first run — an untestable AC and a build constraint masquerading as a user requirement.
- **adr-new** — scaffolds architecture decision records with a **revisit trigger**: the named condition that would reverse the decision. That one convention turns an ADR from a tombstone into a tripwire.
- **story-to-issue** — turns a story file into a tracked GitHub issue: structured title, acceptance criteria as a checklist, label, milestone.
- **env-audit** — inventories my Claude Code environment (plugins, skills, MCP servers, hooks, permissions) with secret redaction.

Several of these were built **in the open**, in the build log of this very site — you can watch them appear, bugs and course-corrections included, in the [`LEARNINGS.md`](https://github.com/RobertoBautistaFregoso/robertobautistafregoso.github.io/blob/main/LEARNINGS.md).

## Skills I adopt

The other half of good tooling is taste: knowing when *not* to build. I curate and use skills that belong to other people — a fixed PM-skills marketplace and the official product- and engineering plugins — wherever a strong one already exists. Reinventing them would be ego, not leverage.

## Why the split matters

The meta-skill isn't any single skill — it's the repeated **build vs. adopt vs. skip** call, and right-sizing the rigor to each: a template-emitter doesn't need the eval harness that a config-reading skill earns. Made deliberately, over and over, that judgment is what turns AI-assisted work from a party trick into a repeatable practice.

*The library itself stays private for now — several skills read my local machine config. A curated, scrubbed public showcase of just the built skills is the next step.*
