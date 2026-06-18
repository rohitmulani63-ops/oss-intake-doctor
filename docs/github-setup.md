# GitHub Setup

This repo includes GitHub-native setup files for public release.

## Issue Templates

Templates live in:

```text
.github/ISSUE_TEMPLATE/
```

Included templates:

- Bug report.
- Feature request.
- Documentation issue.
- Contact links for support and security routing.

Current contact links in `.github/ISSUE_TEMPLATE/config.yml`:

```text
https://github.com/rohitmulani63-ops/oss-intake-doctor/discussions
https://github.com/rohitmulani63-ops/oss-intake-doctor/security/policy
```

After changing repository owner/name, update those links and run:

```text
npm run audit:templates
```

The audit checks issue forms and template chooser routing locally. It does not call GitHub APIs.

## Dry-Run Workflow

Workflow file:

```text
.github/workflows/oss-intake-dry-run.yml
```

This workflow is intentionally safe:

- It uses read-only issue permissions.
- It does not post comments.
- It does not apply labels.
- It does not close issues.
- It does not call external APIs.

The workflow is a starting point for maintainers who want to test analysis output before enabling stronger behavior.
