# GitHub Research Refresh - 2026-06-17

## Question

How should OSS Intake Doctor become stronger after checking GitHub and nearby tools again?

## Short Answer

Do not compete as another generic issue triage bot.

The strongest path is a no-cost, local, preflight maintainer-intake quality tool:

```text
Audit the forms before bad issues arrive.
Dry-run the issue quality checks before bots write comments or labels.
Keep every check explainable, local, and free.
```

## What The Search Confirmed

GitHub already supports structured issue forms with input types, validations, labels, assignees, and projects:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms

GitHub documents common issue-form validation errors, including non-markdown field requirements, unique ids, duplicate labels, and checkbox label conflicts:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms

GitHub also documents AI-powered issue intake, which can analyze issues and suggest triage actions through an Action:

- https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/triaging-an-issue-with-ai

Existing IssueOps tools parse and validate submitted issue-form responses after an issue exists:

- https://github.com/github/issue-parser
- https://github.com/issue-ops/parser
- https://github.com/issue-ops/validator

GitHub community discussions show maintainers still want easier validation and preview before issue-form changes are merged:

- https://github.com/orgs/community/discussions/4907
- https://github.com/orgs/community/discussions/7039

## Product Gap

Most nearby tools are either:

- AI/API triage after submission.
- Parser or validator logic for an already-created issue.
- IDE preview or YAML linting.
- Repository-specific automation.

OSS Intake Doctor should own this smaller, safer wedge:

```text
Maintainer-intake quality before automation.
```

## Upgrade Made From This Research

Issue Form Doctor now has a stronger local audit model:

- Category scores for `bug-report`, `privacy`, `routing`, and `syntax`.
- Actionable suggestions for each finding.
- GitHub-compatible duplicate label behavior using unique `id` values.
- Unsupported issue-form type detection.
- Required-field warnings for important bug report fields.
- Checkbox option label collision detection.

## Positioning To Use

```text
OSS Intake Doctor is a zero-cost, no-external-API maintainer intake quality toolkit that audits issue forms, checks missing bug-report evidence, routes support/security reports, and gives dry-run summaries before maintainers trust write automation.
```

## Positioning To Avoid

```text
OSS Intake Doctor is the first GitHub issue triage bot.
OSS Intake Doctor replaces GitHub's AI issue intake.
OSS Intake Doctor guarantees perfect duplicate detection.
```

## Next Best Product Moves

1. Add a markdown benchmark/report command for repository template audits.
2. Add a fixture-driven gallery of bad form examples and fixed form examples.
3. Add optional local JSON output for CI, still with no external calls.
4. Add a pilot scorecard for maintainers to measure fewer `needs-info` cycles.
5. Build the Repro Pack CLI only after the public repo is credible.
