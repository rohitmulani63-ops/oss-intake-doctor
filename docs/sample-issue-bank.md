# Sample Issue Bank

The sample issue bank gives the analyzer broad local coverage without using live GitHub data.

File:

```text
examples/issue-bank/sample-issues.json
```

The bank currently includes 30 sample issues across:

- Complete bug reports.
- Incomplete bug reports.
- Support questions.
- Feature requests.
- Documentation issues.
- Security-sensitive reports.
- Duplicate-style bugs.

The test suite verifies that every sample issue can be analyzed locally and produces labels plus a next action.

## Local Report

Run:

```text
npm run report
```

Current sample-bank output:

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
- not-actionable: 3
```

## Why This Matters

This lets us improve the analyzer without touching real maintainers, live repositories, or external services.

It also creates a safe demo set for future README examples and maintainer walkthroughs.
