# Project — This portfolio, built via the agentic SDLC

This is a hands-on experiment in which Roberto built his portfolio site end to end through
a spec-driven agentic software workflow: discovery, PRD, user stories, ADRs, GitHub issues
and PRs, and CI deploy — with Claude Code as the build partner.

**The problem.** As an AI product manager, Roberto advises teams on AI-assisted delivery —
but advice you haven't lived is thin. He wanted first-hand, end-to-end experience of the
agentic SDLC: not "vibe-coding" a demo, but running a real product process where an AI
agent does the building and he does the product work.

**What he did.** He treated the site as a real product and himself as its PM. The repo
carries the full paper trail: a written playbook for the process, a problem statement and
PRD, user stories with Gherkin acceptance criteria and a shared definition of done, six
architecture decision records (framework, content model, hosting, agent-readability, a
scaffold adoption, and an information-architecture pivot), and one GitHub issue → branch →
PR → review → squash-merge → CI deploy loop per story. Claude Code wrote the code; Roberto
framed problems, made the calls, reviewed the diffs, and kept scope honest. Custom skills
enforce his story format and acceptance-criteria quality.

**Where it landed.** The site is live on GitHub Pages, deployed automatically on every
merge. Less visibly, the project produced a repeatable per-story loop, a learnings log he
can resume cold across sessions, and a sharper sense of where the agentic SDLC genuinely
saves time (building, refactoring, verification) versus where the human still earns their
keep (problem framing, scope, taste, and saying no).

Skills and tools exercised: agentic SDLC, Claude Code, Astro, GitHub Actions. The repo —
playbook, stories, ADRs and all — is on GitHub at
https://github.com/RobertoBautistaFregoso/robertobautistafregoso.github.io
