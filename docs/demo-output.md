# Demo Output

This is the current zero-cost local demo output from the sample issues.

The configurable dry-run command can also use [examples/config/oss-intake.config.json](../examples/config/oss-intake.config.json).

For broader analyzer coverage, see the 30-item [sample issue bank](sample-issue-bank.md).

Run `npm run report` to summarize the sample bank locally.

Run `npm run audit:templates` to audit local GitHub issue forms.

## Duplicate Bug

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: not-actionable
Missing: reproduction steps, expected behavior, actual behavior
Possible duplicate: #12 - Windows CSV export crash
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for reproduction steps, expected behavior, and actual behavior
```

## Complete Bug

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: actionable
Suggested labels: bug, high-signal
Suggested next action: maintainer can review the report
```

## Incomplete Bug

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: not-actionable
Missing: version, environment, reproduction steps, expected behavior, actual behavior, logs or error
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for version, environment, reproduction steps, expected behavior, actual behavior, and logs or error
```

## Security-Sensitive Report

```text
OSS Intake Doctor summary

Likely type: security-sensitive
Actionability: route-private-security
Suggested labels: security-review
Suggested next action: route reporter to private security reporting before public discussion
```

## Support Question

```text
OSS Intake Doctor summary

Likely type: support-question
Actionability: route-support
Suggested labels: support
Suggested next action: route reporter to support or discussions
```

## Feature Request

```text
OSS Intake Doctor summary

Likely type: feature-request
Actionability: actionable
Suggested labels: feature-request, high-signal
Suggested next action: maintainer can review the request
```

## Issue Template Audit

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
