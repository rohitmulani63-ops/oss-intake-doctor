# OSS Intake Doctor

OSS Intake Doctor is a zero-cost, no-external-API intake quality toolkit for open-source maintainers.

It helps maintainers receive cleaner, safer, and more actionable GitHub issues before maintainer time is wasted.

Maintainers do not need another noisy AI reviewer. They need fewer bad things to review.

## Status

Local MVP. Not published yet.

Current mode:

- Zero cost.
- No external APIs.
- No dependencies.
- Dry-run focused.
- Issue-template audit with category scores and suggested fixes.
- No auto-close.
- No contributor code execution.

## Competitive Wedge

This project is not trying to be "the only GitHub issue triage tool."

That would be false. GitHub and other projects already offer AI-powered issue triage, duplicate detection, labels, and automated comments.

OSS Intake Doctor is built for the maintainers who want the safer first step:

```text
No API key.
No paid model.
No external issue-content sharing.
No hidden AI judgment.
No destructive automation.
```

The product wedge is simple:

```text
Better forms, better reports, and transparent issue-quality checks before maintainers trust heavier automation.
```

See [docs/positioning.md](docs/positioning.md), [docs/competitive-research-2026-06-10.md](docs/competitive-research-2026-06-10.md), and [docs/github-research-refresh-2026-06-17.md](docs/github-research-refresh-2026-06-17.md).

## The Problem

Open-source projects often receive issues like:

- "It does not work."
- "Please fix this."
- "I found a bug" with no version, logs, or reproduction steps.
- Support questions filed as bug reports.
- Duplicate reports for already-known problems.
- Security-sensitive reports posted publicly by mistake.

Every unclear report creates work for maintainers. They have to ask follow-up questions, search for duplicates, redirect support requests, and protect security reports from being discussed in public.

AI makes this problem bigger because low-effort issues and pull requests are easier to generate at scale.

## The Product

OSS Intake Doctor is a maintainer-first intake layer for GitHub repositories.

When a new issue is opened, it checks:

- Is this a real bug, feature request, support question, documentation issue, or security report?
- Is required information missing?
- Does it look similar to an existing issue?
- Should it be routed to docs, Discussions, or private security reporting?
- What should the maintainer see first?

The first version is intentionally conservative. It summarizes and suggests next actions. It does not auto-close issues by default.

The current local MVP produces dry-run output. Comment posting and label application stay behind explicit maintainer opt-in after pilot evidence.

Before issues are opened, OSS Intake Doctor can also audit local GitHub issue templates:

```text
npm run audit:templates
```

The audit reports separate scores for bug-report quality, privacy risk, routing, and syntax, then gives concrete suggested fixes.

See [docs/issue-form-doctor.md](docs/issue-form-doctor.md).

## First-Version Behavior

For every new issue, OSS Intake Doctor should produce a short maintainer summary:

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: missing information
Missing: version, reproduction steps, logs
Possible duplicate: #123
Suggested labels: needs-info, possible-duplicate
Suggested next action: ask reporter for version and minimal reproduction
```

## What It Does First

Version 1 focuses on seven jobs:

1. Audit GitHub issue forms and template chooser setup.
2. Read a new GitHub issue.
3. Detect missing information.
4. Suggest likely issue type.
5. Suggest labels.
6. Surface possible duplicates.
7. Produce a concise maintainer summary in dry-run mode first.

Comment-only mode is a later pilot step, not the starting assumption.

## What It Does Not Do Yet

Version 1 will not:

- Auto-close issues.
- Reject pull requests.
- Run contributor code.
- Upload private files.
- Replace maintainers.
- Accuse contributors of using AI.

The tool judges report quality, not authorship.

For the full safety boundary, see [docs/trust-and-safety.md](docs/trust-and-safety.md).

## Planned Structure

```text
oss-intake/
  docs/
    mvp-spec.md
    validation-plan.md
  packages/
    core/       # classification, missing-info checks, duplicate scoring
    action/     # GitHub Action entrypoint
    cli/        # future Repro Pack collector
  examples/     # sample issues and demo repos
  .github/
    ISSUE_TEMPLATE/
    workflows/
```

## Future Killer Feature: Repro Pack

The long-term differentiator is a contributor-controlled diagnostic bundle:

```text
npx oss-intake-doctor collect
```

This command will help contributors create a safe, reviewable bug report package with:

- Environment details.
- Package versions.
- Reproduction steps.
- Logs with secrets redacted.
- Optional screenshots or artifacts.

The contributor must review the bundle before anything is uploaded.

See [docs/repro-pack-plan.md](docs/repro-pack-plan.md).

## Success Criteria

The project is working if maintainers can prove:

- Fewer issues enter `needs-info`.
- Duplicates are found earlier.
- First useful labels appear faster.
- Maintainers spend fewer touches per issue.
- Contributors understand what information is needed.
- Security reports are routed away from public comments.

## Positioning

OSS Intake Doctor is not an anti-contributor bot.

It is also not an AI issue triage bot.

It is a front desk for open-source maintenance:

```text
Good contributors get guided.
Maintainers get signal.
Risky public reports get routed safely.
Low-quality issues get clarified before they become human work.
```

Use this positioning:

```text
OSS Intake Doctor is a zero-cost, no-external-API maintainer intake layer that checks issue quality, missing information, support/security routing, and duplicate risk before maintainers waste time.
```

Avoid this positioning:

```text
OSS Intake Doctor is an AI issue triage bot.
```

## Current Status

This project is a local MVP with a tested core analyzer, sample issue bank, dry-run Action wrapper, and publish-readiness docs.

The first public target is a GitHub Action that runs in dry-run mode on test repositories.

## No-Cost Rule

This project is being built with a strict no-cost rule:

- No paid APIs.
- No paid AI APIs.
- No paid hosting.
- No paid databases.
- No subscriptions.

See [NO_COST_POLICY.md](NO_COST_POLICY.md).

## Configuration

Repos can customize labels, required bug fields, support routes, security routes, and duplicate sensitivity with a local JSON config.

See [docs/configuration.md](docs/configuration.md).

## Duplicate Detection

The MVP uses local text similarity only. It compares issue titles and bodies, then returns conservative possible-duplicate suggestions with simple reasons.

See [docs/duplicate-detection.md](docs/duplicate-detection.md).

## Issue Form Doctor

The template audit checks `.github/ISSUE_TEMPLATE` locally before publishing or piloting:

```text
npm run audit:templates
```

It catches common GitHub issue-form mistakes, unsupported field types, duplicate labels and checkbox option collisions, weak support/security routing, and bug forms that ask for important fields without making them required.

See [docs/issue-form-doctor.md](docs/issue-form-doctor.md).

## Evidence Pack

Phase 1 public-proof materials are prepared in [docs/phase-1-proof-pack-2026-06-17.md](docs/phase-1-proof-pack-2026-06-17.md).

Current launch verification is in [docs/verification-log-2026-06-18.md](docs/verification-log-2026-06-18.md).

The public repo benchmark is in [docs/public-repo-template-benchmark-2026-06-17.md](docs/public-repo-template-benchmark-2026-06-17.md).

The latest GitHub research refresh is in [docs/github-research-refresh-2026-06-17.md](docs/github-research-refresh-2026-06-17.md).

## Sample Issue Bank

The local sample bank contains 30 issue fixtures across bugs, support, features, docs, security-sensitive reports, and duplicate-style issues.

See [docs/sample-issue-bank.md](docs/sample-issue-bank.md).

## Maintainer Demo

See [docs/before-after-demo.md](docs/before-after-demo.md) for examples of messy issues becoming maintainer-ready summaries.

For safe trial instructions, see [docs/pilot-guide.md](docs/pilot-guide.md).

For publish preparation, see [docs/publish-readiness-checklist.md](docs/publish-readiness-checklist.md).

For the public launch session, see [docs/public-launch-runbook.md](docs/public-launch-runbook.md).

## Local Demo

Run the local sample analyzer:

```text
npm run demo
```

Run local tests:

```text
npm test
```

Run the local issue-bank report:

```text
npm run report
```

Run the local issue-template audit:

```text
npm run audit:templates
```

These commands use built-in Node.js features only. They do not call external APIs.

See [docs/demo-output.md](docs/demo-output.md) for example summaries.
