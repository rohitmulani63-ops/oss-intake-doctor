# GitHub Action Package

Planned responsibilities:

- Read GitHub issue events.
- Load repo configuration.
- Call the core analyzer.
- Search similar issues.
- Print dry-run maintainer summaries.
- Suggest labels in the output.

The first release runs in dry-run mode only. It does not post comments, apply labels, or call external APIs.

Local example:

```text
node packages/action/src/index.ts examples/events/issue-opened.json examples/issues/existing-issues.json examples/config/oss-intake.config.json
```

Inputs:

- `existing-issues-path`: optional JSON file for dry-run duplicate suggestions.
- `config-path`: optional JSON config file.
