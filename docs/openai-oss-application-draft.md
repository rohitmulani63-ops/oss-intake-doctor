# OpenAI OSS Application Draft

## Project

OSS Intake Doctor

## Short Description

OSS Intake Doctor is a no-cost, no-external-API maintainer intake quality toolkit for GitHub issues. It helps open-source maintainers improve issue forms, reduce incomplete reports, surface duplicate risk, route support questions, and protect security-sensitive reports before maintainer time is wasted.

## Public Repository

https://github.com/rohitmulani63-ops/oss-intake-doctor

## Public Release

https://github.com/rohitmulani63-ops/oss-intake-doctor/releases/tag/v0.1.0

## Submission Packet

https://github.com/rohitmulani63-ops/oss-intake-doctor/blob/main/docs/openai-oss-submission-packet-2026-06-18.md

## Why This Project Matters

Open-source maintainers lose time to incomplete bug reports, duplicate issues, support questions filed as bugs, and security-sensitive details posted publicly.

Many AI-powered triage tools already exist, but cautious maintainers may not want to send issue content to external AI APIs, manage paid keys, or let bots write comments before seeing evidence.

OSS Intake Doctor starts with the safer layer:

- Local issue-template audit.
- Dry-run issue analysis.
- No external APIs.
- No paid services.
- No write actions by default.
- No contributor code execution.
- Explainable maintainer summaries.

The goal is not to replace maintainers. The goal is to give maintainers cleaner intake and useful signal before they trust stronger automation.

## Community Duty Framing

This project is built from the belief that early AI adopters should use these tools to improve shared infrastructure, not only private productivity.

The maintainer burden problem is large, practical, and close to where Codex can help: issue triage, review preparation, workflow quality, and safer automation.

Codex support would help us execute faster while keeping the project free and useful for the open-source community.

## What Exists Now

Local MVP:

- Tested core analyzer.
- Local sample issue bank with 30 issues.
- Dry-run GitHub Action wrapper.
- Local issue-template audit command.
- Markdown and JSON audit report output.
- Configuration validation.
- Conservative duplicate detection.
- Issue form gallery.
- Maintainer proof cards.
- Good first issue drafts.
- GitHub public action checklist.
- Public launch results.
- OpenAI OSS submission packet.
- Pilot feedback kit.
- Trust and safety docs.
- No-cost policy.
- Pilot guide.
- Repro Pack roadmap.
- Public-repo benchmark report across 20 repositories.

Commands:

```text
npm test
npm run demo
npm run report
npm run audit:templates
npm run audit:templates:markdown
npm run audit:templates:json
```

Current mode:

- Local.
- Dry-run first.
- No dependencies.
- No API calls.
- No posting comments.
- No applying labels.
- No auto-close.

## Evidence Prepared

- 30 local sample issues analyzed.
- 20 public repositories benchmarked for issue-template intake signals.
- Public `v0.1.0` release published.
- Three starter contributor issues published.
- Repo topics, labels, and Discussions configured.
- Local repo template audit scores 100/100 on current templates.
- Text, Markdown, and JSON audit reports.
- Maintainer proof cards and issue-form gallery prepared for pilots.
- Good first issue drafts prepared for first contributors.
- Pilot feedback templates prepared for public evidence collection.
- Tests pass locally.
- Product positioning avoids claiming uniqueness in crowded AI triage.
- Clear safety boundary documented.

## Why OpenAI OSS Support Fits

The OpenAI Codex for OSS page mentions triage, review, and maintainer workflows as relevant areas. OSS Intake Doctor is directly in that category.

Support would help us:

- Build and review the Repro Pack CLI.
- Expand the benchmark pack.
- Improve dry-run analysis quality.
- Prepare maintainer pilot materials.
- Keep the core tool free and no-cost for maintainers.
- Avoid rushing into paid APIs or hosted infrastructure.

## Operating Principles

- Free core workflow for maintainers.
- Local-first analysis.
- Dry-run review before write automation.
- Maintainer-readable summaries.
- Minimal GitHub permissions.
- Clear support and security routing.
- Explicit maintainer control over any public comments, labels, or closing behavior.

## Roadmap

Phase 1:

- Public repo is live.
- Release v0.1.0 is live.
- Publish benchmark report.
- Prepare the OSS application with public proof.

Phase 2:

- Improve Issue Form Doctor scoring and suggested fixes.
- Add benchmark markdown output.
- Improve confidence scoring for dry-run summaries.

Phase 3:

- Build Repro Pack alpha.
- Add maintainer pilot kit.
- Collect feedback from friendly maintainers after explicit approval.

Phase 4:

- Consider optional AI bridge only if the no-cost core has traction.

Application timing:

- Apply after the public repo, release, verification logs, and pilot evidence are ready.
- If pilot evidence is not available yet, apply with the strongest available public proof and explain the community role clearly.

## Application Answer Draft

```text
OSS Intake Doctor is a no-cost, no-external-API maintainer intake quality toolkit for GitHub issues.

Maintainers are overloaded by incomplete bug reports, duplicates, support questions filed as bugs, and security-sensitive details posted publicly. Many AI triage tools exist, but they often require API keys, paid model usage, external issue-content sharing, or public bot comments before a maintainer has evidence that the tool is useful.

OSS Intake Doctor starts safer. It audits GitHub issue forms before submission, dry-run analyzes new issues after submission, surfaces missing information and duplicate risk, and routes support/security-sensitive reports without posting or applying labels by default. It uses transparent local rules, has no dependencies, and does not call external APIs.

We are building this because early AI adopters should use these tools to help shared open-source infrastructure, not only private productivity. Codex support would help us execute faster while keeping the core project free for the community.

Current proof includes a tested local MVP, public v0.1.0 release, a 30-item sample issue bank, three starter contributor issues, a dry-run GitHub Action wrapper, issue-template audit command, trust-and-safety docs, no-cost policy, Repro Pack roadmap, and a 20-repository public benchmark showing real variation in OSS issue-intake setup.

We are not asking Codex to make a private workflow cheaper. We are building a public OSS maintainer workflow tool and want to use Codex to serve maintainers better.
```
