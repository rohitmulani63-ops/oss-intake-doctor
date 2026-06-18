# Verification Log - 2026-06-18

## Scope

Public launch verification for OSS Intake Doctor.

No paid APIs, hosted services, account tokens, or external AI services were used.

## Commands Run

```text
npm.cmd test
npm.cmd run demo
npm.cmd run report
npm.cmd run audit:templates
npm.cmd run audit:templates:markdown
npm.cmd run audit:templates:json
node packages/action/src/index.ts examples/events/issue-opened.json examples/issues/existing-issues.json examples/config/oss-intake.config.json
npm.cmd ls --depth=0
```

## Results

### Tests

```text
tests 36
suites 12
pass 36
fail 0
```

### Demo

Passed.

Covered:

- Duplicate bug.
- Feature request.
- Complete bug.
- Incomplete bug.
- Security-sensitive report.
- Support question.

### Local Issue-Bank Report

```text
Total issues analyzed: 30

By type:
- bug: 9
- support-question: 6
- documentation: 5
- feature-request: 5
- security-sensitive: 5

By actionability:
- actionable: 16
- route-support: 6
- route-private-security: 5
- needs-info: 3
```

### Issue-Template Audit

```text
Files audited: 4
Score: 100/100

Category scores:
- bug-report: 100/100
- privacy: 100/100
- routing: 100/100
- syntax: 100/100

Findings: none
```

### Markdown Issue-Template Audit

Passed.

The Markdown report includes:

- Summary table.
- Category score table.
- Findings section.
- Next maintainer step.

Current score:

```text
Overall score: 100/100
Findings: none
```

### JSON Issue-Template Audit

Passed.

The JSON report includes:

- `tool`
- `reportType`
- `filesAudited`
- `score`
- `categoryScores`
- `findings`

Current result:

```json
{
  "tool": "oss-intake-doctor",
  "reportType": "issue-template-audit",
  "filesAudited": 4,
  "score": 100,
  "findings": []
}
```

### Dry-Run Action

Passed.

The dry-run Action produced a maintainer summary for the sample issue, including:

- Likely type: bug.
- Actionability: needs-info.
- Missing fields.
- Possible duplicate.
- Configured labels.
- Suggested next action.

## Safety Scans

### Dependency Check

`npm.cmd ls --depth=0` passed and showed no installed package dependencies.

### API/Cost Scan

No source-code usage of OpenAI, Anthropic, embeddings, database clients, hosted services, or paid API patterns was found.

### Secret Scan

No likely API keys, GitHub tokens, private keys, password assignments, secret assignments, or token assignments found.

The broad token scan found `normalizeToken(token: string)` in local text-processing code only. This is not a secret.

### Personal Info Scan

No personal emails, known private account strings, passport markers, card markers, or IBAN markers found.

The broad email-style scan produced GitHub URL false positives only.

## Known Public-Launch Blockers

- OpenAI OSS application has not been submitted.

## Status

Launch verification passed locally. Public repository created at:

```text
https://github.com/rohitmulani63-ops/oss-intake-doctor
```
