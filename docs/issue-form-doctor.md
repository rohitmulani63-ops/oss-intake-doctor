# Issue Form Doctor

Issue Form Doctor is the pre-submission lane of OSS Intake Doctor.

It helps maintainers improve `.github/ISSUE_TEMPLATE` before weak issues enter the tracker.

## Why This Exists

GitHub issue forms already help maintainers collect structured reports. That is good.

But maintainers still need a quick way to check whether their template setup asks for the right information, routes support/security reports correctly, and avoids common form mistakes.

Issue Form Doctor is that local audit.

It reports one overall score plus category scores for:

- Bug-report quality.
- Privacy risk.
- Routing setup.
- Issue-form syntax.

## Run The Audit

```text
npm run audit:templates
```

Markdown and JSON outputs are available for review notes and local automation:

```text
npm run audit:templates:markdown
npm run audit:templates:json
```

The command reads local files only:

```text
.github/ISSUE_TEMPLATE/config.yml
.github/ISSUE_TEMPLATE/*.yml
.github/ISSUE_TEMPLATE/*.yaml
.github/ISSUE_TEMPLATE/*.md
```

It does not call GitHub APIs or any external service.

## What It Checks

Template chooser:

- Is `config.yml` present?
- Is `blank_issues_enabled: false` set?
- Are support contact links present?
- Are security or vulnerability reporting links present?

Issue forms:

- Is `name` present?
- Is `description` present?
- Is `body` present?
- Is there at least one non-markdown input field?
- Are field types supported by GitHub issue forms?
- Are `id` values unique?
- Are visible labels unique enough?
- Are duplicate labels safely differentiated by unique `id` values?
- Are checkbox option labels free of collisions GitHub cannot disambiguate?
- Do labels avoid private-data-risk words such as password, token, secret, credential, or private key?

Bug forms:

- Version, required.
- Environment, required.
- Reproduction steps, required.
- Expected behavior, required.
- Actual behavior, required.
- Logs or error output, present but not required.

## Example Output

```text
OSS Intake Doctor issue-template audit

Files audited: 4
Score: 100/100

Category scores:
- bug-report: 100/100
- privacy: 100/100
- routing: 100/100
- syntax: 100/100

Findings:
- none
```

Markdown output starts with a maintainer-friendly summary:

```text
# OSS Intake Doctor Issue-Template Audit

## Summary

| Metric | Value |
|---|---:|
| Files audited | 4 |
| Overall score | 100/100 |
```

JSON output is stable enough for local scripts and CI review:

```json
{
  "tool": "oss-intake-doctor",
  "reportType": "issue-template-audit",
  "filesAudited": 4,
  "score": 100
}
```

When a finding exists, the report includes the category and a concrete suggestion:

```text
- warning routing .github/ISSUE_TEMPLATE/config.yml: set blank_issues_enabled: false to reduce low-quality blank issues
  suggestion: Add `blank_issues_enabled: false` to route contributors into structured choices.
```

## How This Fits The Product

Issue Form Doctor runs before issue submission.

Dry-run Intake Doctor runs after issue submission.

Repro Pack will help contributors prepare better evidence before posting.

Together:

```text
Better forms.
Better reports.
Less maintainer follow-up.
No paid APIs.
```

## Limitations

This is a lightweight local scanner, not a full YAML parser.

It is meant to catch common maintainer-intake risks quickly while staying dependency-free. GitHub remains the final source of truth for issue form syntax.
