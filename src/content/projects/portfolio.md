---
title: "This portfolio — built via the agentic SDLC"
type: "experiment"
description: "This site, shipped end to end through a spec-driven agentic workflow: discovery, PRD, user stories, ADRs, GitHub issues and PRs, and CI deploy — with Claude Code as the build partner."
skills: ["Agentic SDLC", "Claude Code", "Astro", "GitHub Actions"]
thumbnail: "/images/projects/portfolio/thumbnail.svg"
sortOrder: 1
draft: false
---

**The problem.** As an AI product manager, I advise teams on AI-assisted delivery — but advice you haven't lived is thin. I wanted first-hand, end-to-end experience of the agentic SDLC: not "vibe-coding" a demo, but running a real product process where an AI agent does the building and I do the product work.

**What I did.** I treated this site as a real product and myself as its PM. The repo carries the full paper trail: a written playbook for the process, a problem statement and PRD, user stories with Gherkin acceptance criteria and a shared definition of done, six architecture decision records (framework, content model, hosting, agent-readability, a scaffold adoption, and an information-architecture pivot), and one GitHub issue → branch → PR → review → squash-merge → CI deploy loop per story. Claude Code wrote the code; I framed problems, made the calls, reviewed the diffs, and kept scope honest. Custom skills enforce my story format and AC quality.

**Where it landed.** The site you're reading is the outcome — live on GitHub Pages, deployed automatically on every merge. Less visibly: a repeatable per-story loop, a learnings log I resume cold from across sessions, and a much sharper sense of where the agentic SDLC genuinely saves time (building, refactoring, verification) versus where the human still earns their keep (problem framing, scope, taste, and saying no).

The repo itself — playbook, stories, ADRs, and all — is on [GitHub](https://github.com/RobertoBautistaFregoso/robertobautistafregoso.github.io).
