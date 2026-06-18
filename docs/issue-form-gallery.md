# Issue Form Gallery

This gallery shows small issue-form patterns maintainers can copy, compare, and adapt.

Each example stays local-first and no-cost. The goal is not to make every repository use the same template. The goal is to make issue intake easier to review before maintainers enable heavier automation.

## 1. Bug Report With Missing Evidence

Common pattern:

```yaml
name: Bug report
description: Report a bug
body:
  - type: textarea
    id: description
    attributes:
      label: What happened?
```

Why it creates follow-up:

- The maintainer still has to ask for version, environment, reproduction steps, expected behavior, actual behavior, and logs.
- The issue can be real but hard to reproduce.
- Duplicate matching becomes weaker because the report has little structured context.

Better pattern:

```yaml
name: Bug report
description: Report a reproducible bug.
title: "[Bug]: "
labels: ["bug"]
body:
  - type: input
    id: version
    attributes:
      label: Version
      placeholder: "1.4.2"
    validations:
      required: true
  - type: input
    id: environment
    attributes:
      label: Environment
      placeholder: "Windows 11, Node 24, npm 11"
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: |
        1. Open...
        2. Click...
        3. See...
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: Actual behavior
    validations:
      required: true
  - type: textarea
    id: logs
    attributes:
      label: Logs or error output
      description: Paste relevant logs. Remove secrets, tokens, and private data.
      render: text
```

What OSS Intake Doctor should report:

```text
bug-report: 100/100
privacy: 100/100
```

## 2. Blank Issues Without Routing

Common pattern:

```yaml
blank_issues_enabled: true
```

Why it creates follow-up:

- Support questions, security-sensitive reports, and vague bug reports all enter the same public queue.
- Contributors may post private vulnerability details publicly.
- Maintainers spend time redirecting issues that could have been routed earlier.

Better pattern:

```yaml
blank_issues_enabled: false
contact_links:
  - name: Support questions
    url: https://github.com/owner/repo/discussions
    about: Please use Discussions or the configured support channel for usage questions.
  - name: Security reports
    url: https://github.com/owner/repo/security/policy
    about: Please do not post vulnerability details publicly.
```

What OSS Intake Doctor should report:

```text
routing: 100/100
```

## 3. Labels That Ask For Private Data

Common pattern:

```yaml
body:
  - type: input
    id: token
    attributes:
      label: Paste your access token
```

Why it creates risk:

- Contributors may paste secrets into a public issue.
- Maintainers may need to redact, delete, or report exposed credentials.
- The issue queue becomes less safe for casual contributors.

Better pattern:

```yaml
body:
  - type: textarea
    id: logs
    attributes:
      label: Logs or error output
      description: Paste only relevant logs. Remove secrets, tokens, private keys, and account identifiers.
      render: text
```

What OSS Intake Doctor should report:

```text
privacy: 100/100
```

## 4. Duplicate Visible Labels Without Clear IDs

Common pattern:

```yaml
body:
  - type: textarea
    id: details
    attributes:
      label: Details
  - type: textarea
    id: more-details
    attributes:
      label: Details
```

Why it creates follow-up:

- Contributors see repeated labels and may put information in the wrong place.
- Tools that parse form responses can be harder to review.
- Maintainers get less predictable issue bodies.

Better pattern:

```yaml
body:
  - type: textarea
    id: reproduction-context
    attributes:
      label: Reproduction context
  - type: textarea
    id: maintainer-notes
    attributes:
      label: Extra maintainer notes
```

What OSS Intake Doctor should report:

```text
syntax: 100/100
```

## 5. Good First Local Check

Run:

```text
npm run audit:templates
npm run audit:templates:markdown
npm run audit:templates:json
```

Use the text report for quick terminal review, the Markdown report for maintainer notes or pull requests, and the JSON report for local automation.

## Next Step

After improving issue forms, run:

```text
npm run demo
npm run report
```

That shows how the same local rules summarize incoming issues before any workflow posts comments or applies labels.
