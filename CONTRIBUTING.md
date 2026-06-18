# Contributing

Thank you for helping improve OSS Intake Doctor.

This project exists to reduce maintainer workload without punishing good contributors.

## Current Project Rules

- No paid APIs.
- No paid AI APIs.
- No paid hosting.
- No new dependencies unless they are clearly necessary and approved.
- No auto-close behavior by default.
- No contributor code execution.
- No AI-authorship accusations.

## Local Setup

Use Node.js 24 or newer.

Run tests:

```text
npm test
```

Run the local demo:

```text
npm run demo
```

Run the dry-run Action wrapper:

```text
node packages/action/src/index.ts examples/events/issue-opened.json examples/issues/existing-issues.json examples/config/oss-intake.config.json
```

## Contribution Areas

Good first contributions:

- Add sample issues to `examples/issue-bank/sample-issues.json`.
- Improve rule-based classification.
- Improve config validation.
- Improve documentation clarity.
- Add tests for edge cases.

## Pull Request Expectations

Before opening a pull request:

- Add or update tests for behavior changes.
- Run `npm test`.
- Keep output concise and maintainer-focused.
- Explain whether the change affects safety, routing, or duplicate suggestions.

## Safety Expectations

Do not add behavior that:

- Executes untrusted issue or PR content.
- Posts security details publicly.
- Automatically closes issues by default.
- Sends data to external services.
- Requires paid services.

## Philosophy

OSS Intake Doctor should guide contributors and protect maintainers.

It should judge report quality, not the person who wrote the report.

