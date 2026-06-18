# OSS Intake Doctor One-Page Proof

## The Problem

Open-source maintainers spend time on incomplete issues, duplicate reports, support questions in the bug queue, and public security-sensitive reports.

Every unclear issue creates human follow-up work.

## The Opportunity

AI-powered issue triage already exists, including GitHub's own AI issue intake workflow and many Marketplace actions.

It focuses on the safer gap:

```text
No-cost intake quality before maintainers trust automation.
```

## What It Does

1. Audits `.github/ISSUE_TEMPLATE` locally.
2. Checks issue-form and template chooser quality with category scores.
3. Dry-run analyzes submitted issue text.
4. Detects missing bug-report information.
5. Routes support and security-sensitive reports.
6. Surfaces possible duplicates with simple reasons.
7. Plans a contributor-reviewed Repro Pack CLI.

## Why It Is Safe

- No external APIs.
- No paid AI calls.
- No hosting.
- No dependencies.
- No public comments by default.
- No labels by default.
- No auto-close.
- No contributor code execution.

## Current Evidence

- 36 local tests.
- 30 sample issues.
- 20 public repositories benchmarked.
- Local issue-template audit command with text, Markdown, and JSON reports.
- Issue-form gallery with copyable common and better patterns.
- Maintainer proof cards for screenshots, release notes, and pilot requests.
- Good first issue drafts for docs, fixtures, and tests.
- GitHub public action checklist for the live publishing session.
- Pilot feedback kit for safe maintainer evidence collection.
- GitHub research refresh on issue-form validators, parsers, and AI issue intake.
- Dry-run GitHub Action wrapper.
- Trust and safety docs.
- No-cost policy.
- Repro Pack roadmap.

## Why It Helps The Community

OSS Intake Doctor gives maintainers a free, transparent, low-risk way to improve issue quality.

It helps contributors understand what information maintainers need.

It protects maintainers from premature automation while still moving toward better OSS workflows.

## Current Ask

Complete the public GitHub checklist, release v0.1.0, collect maintainer pilot evidence, and apply to OpenAI Codex for OSS with proof that the project supports maintainer triage, review, and workflow quality.
