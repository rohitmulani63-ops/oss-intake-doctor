# Community Growth and OpenAI OSS Plan - 2026-06-18

## Decision

The best path is to build OSS Intake Doctor as a practical maintainer tool first, then apply for the OpenAI OSS program with evidence.

The project should earn attention through usefulness:

- Help maintainers improve issue intake without cost.
- Keep the first run local and reviewable.
- Show proof with examples, benchmarks, and pilot feedback.
- Make contribution easy through clear docs and small starter issues.

Stars should be treated as a signal of trust, not the main goal. The main goal is a tool maintainers can try quickly and understand without sales language.

## What Strong GitHub Projects Do

| Project | Main repo language | README style | What to borrow |
|---|---|---|---|
| `vitejs/vite` | TypeScript | Short headline, direct value, fast feature bullets, docs link | Keep the first screen concise and link deeper docs instead of overloading README. |
| `astral-sh/uv` | Rust | Strong one-line promise, highlights, benchmark proof, install path | Add proof quickly: sample count, tests, template audit score, benchmark size. |
| `biomejs/biome` | Rust | Product definition first, then capabilities and supported ecosystems | Say exactly who it helps and what workflow it improves. |
| `prettier/prettier` | JavaScript | Simple definition, before/after example, docs/install links | Keep examples visual and concrete. A maintainer should see the before/after immediately. |
| `eslint/eslint` | JavaScript | Mature docs links, configuration, filing issues, support routes | Make community operations visible: contributing, support, security, releases, roadmap. |
| `actions/stale` | TypeScript | GitHub Action focused README with permissions and options | For any Action workflow, state permissions and dry-run behavior clearly. |

Pattern:

```text
One-line value -> proof -> quick start -> concrete example -> docs links -> contribution path.
```

## Nearby Issue-Intake Tools

| Project | What it does | Positioning lesson for OSS Intake Doctor |
|---|---|---|
| `github/issue-parser` | Parses GitHub issue-form responses into JSON. | Parsing is infrastructure. Our value is the maintainer-facing quality layer around intake. |
| `issue-ops/validator` | Validates issue-form submissions with rules and optional custom logic. | Similar space, but mostly after an issue exists. Our wedge is preflight audit plus dry-run maintainer summaries. |
| `github/ai-assessment-comment-labeler` | Uses an AI model to assess issues, comment, and label. | We should not compete as another AI bot. Our no-cost local approach is the safer first step. |
| `actions/stale` | Manages inactive issues and PRs. | Mature Actions docs explain permissions, options, and default behavior carefully. |

Best positioning:

```text
OSS Intake Doctor is a local maintainer-intake toolkit for GitHub issues.
It audits issue forms, checks issue quality in dry-run mode, and gives maintainers readable summaries before they adopt heavier automation.
```

## What The README Should Keep Doing

- Lead with the maintainer problem.
- Show what the tool does in plain English.
- Keep no-cost and local-first language visible.
- Show one good output example.
- Link to benchmark, pilot guide, trust and safety, and this plan.
- Keep future roadmap short.

Avoid:

- Claims that it is the first or only tool.
- Long defensive lists.
- Marketing language that sounds bigger than the current proof.
- Applying to the OSS program as if a public repo alone is enough.

## 30-Day Community Plan

### Week 1 - Make The Repo Trustworthy

Status: mostly complete.

- Public README with quick start.
- MIT license, contributing guide, code of conduct, security policy.
- Issue templates and dry-run workflow example.
- Verification log with tests, demo, report, action dry run, and template audit.
- Public benchmark across 20 repositories.
- Add GitHub topics: `github-actions`, `issue-triage`, `issue-templates`, `open-source`, `maintainers`, `developer-tools`, `no-api`, `local-first`.
- Create first release draft: `v0.1.0`.

Success signal:

- A maintainer can understand the project in under two minutes and run the local commands in under five minutes.

### Week 2 - Add Proof People Can See

- Markdown output for the issue-template audit. Completed locally.
- JSON output for CI and future dashboards. Completed locally.
- Issue-form gallery with common and better patterns. Completed locally.
- Maintainer proof cards for screenshots and release notes. Completed locally.
- Good first issue drafts for docs, fixtures, and tests. Completed locally.

Success signal:

- Visitors can see before/after value without reading implementation details.

### Week 3 - Invite Maintainer Pilots

Do this with Sir present before any public outreach.

- Pick 5 to 10 small or mid-sized OSS repositories with active issues and visible issue templates.
- Open friendly issues or discussions only where welcome.
- Offer a read-only intake audit, not a sales pitch.
- Ask maintainers what would make the report useful enough to run in CI.
- Track feedback in `docs/pilot-feedback/`.

Success signal:

- At least 2 maintainers respond or try the audit.

### Week 4 - Prepare OpenAI OSS Application Evidence

- Publish `v0.1.0`.
- Update the application draft with the release link.
- Add maintainer feedback if available.
- Add exact proof: tests, sample issue count, benchmark count, no-cost design, and dry-run workflow.
- Apply only when the story is evidence-backed.

Success signal:

- The application can show public code, public docs, a release, and a real maintainer workflow.

## OpenAI OSS Readiness

Official OpenAI page checked on 2026-06-18:

- Open-source maintainers can apply for API credits, six months of ChatGPT Pro with Codex, and Codex Security.
- The program mentions coding, triage, review, and maintainer workflows.
- It says core maintainers or widely used public projects should apply, and projects that play an important ecosystem role can explain why.

Our fit:

- The project is directly about maintainer issue triage and workflow quality.
- It is public and free to use.
- It is designed to help maintainers before they trust stronger automation.
- Codex would help build, review, test, document, and pilot the tool faster.

Application should happen after:

- `v0.1.0` release exists.
- README and docs are polished.
- Verification logs are current.
- At least one public pilot request, issue, or feedback note exists if we can get it.

## Star Growth Plan

Healthy stars come from repeated useful signals:

- Clear repo topics so GitHub can classify the project.
- One-liner that makes the maintainer pain obvious.
- Screenshots or copied terminal output showing the audit result.
- Before/after examples.
- `good first issue` labels for small contribution paths.
- A release with concise notes.
- Useful posts in relevant places only after the repo is ready.

Recommended launch copy:

```text
I built OSS Intake Doctor, a no-cost local toolkit for maintainers who want cleaner GitHub issue intake before enabling heavier automation.

It audits issue forms, checks sample issues in dry-run mode, suggests labels, and routes support/security-sensitive reports without requiring an API key.

Looking for feedback from maintainers who handle bug reports and issue templates.
```

## What Can Be Done Autonomously

Jarvis can do these without additional cost:

- Improve README and docs.
- Add local commands, fixtures, and tests.
- Create release notes draft.
- Add more sample issue cases.
- Add benchmark docs.
- Prepare issue templates and contribution tasks.
- Run verification locally.
- Commit and push code/docs to the existing GitHub repo.

## What Needs Sir Present

These are public or account-level actions:

- Editing GitHub repo topics/settings through the browser.
- Publishing a GitHub release.
- Applying to the OpenAI OSS program.
- Posting public outreach to maintainers, Reddit, Hacker News, X, LinkedIn, or communities.
- Granting any browser/account permission.

## No-Cost Rule

Use:

- Public GitHub repo features.
- Local Node.js commands.
- Markdown docs.
- GitHub issues and releases.
- Free community discussion and outreach.

Avoid:

- Paid APIs.
- Hosted dashboards.
- Paid databases.
- Paid design tools.
- Paid automations.
- Any tool that requires billing details.

## Compact Continuation Checklist

- Current repo: `https://github.com/rohitmulani63-ops/oss-intake-doctor`
- Current positioning: local, no-cost maintainer-intake quality toolkit.
- Next product feature: publish two or three `good first issue` tasks with Sir present.
- Next proof feature: first release notes and public release.
- Next community feature: publish prepared `good first issue` drafts.
- Next public action with Sir present: follow [github-public-action-checklist.md](github-public-action-checklist.md), add GitHub topics, create starter issues, and publish `v0.1.0`.
- Next feedback action: collect public-safe maintainer notes with [pilot-feedback/README.md](pilot-feedback/README.md).
- OpenAI OSS application timing: after release plus at least early pilot evidence if possible.

## Sources Checked

- https://developers.openai.com/community/codex-for-oss
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics
- https://opensource.guide/starting-a-project/
- https://opensource.guide/building-community/
- https://github.blog/open-source/new-to-open-source-heres-everything-you-need-to-get-started/
- https://github.com/vitejs/vite
- https://github.com/astral-sh/uv
- https://github.com/biomejs/biome
- https://github.com/prettier/prettier
- https://github.com/eslint/eslint
- https://github.com/actions/stale
- https://github.com/github/issue-parser
- https://github.com/issue-ops/validator
- https://github.com/github/ai-assessment-comment-labeler
