# MVP Specification

## Product Goal

Build the smallest useful version of OSS Intake Doctor: a local intake quality toolkit that helps maintainers improve issue forms and triage new issues without taking destructive action.

The MVP should prove one thing:

```text
Can we reduce maintainer effort on messy GitHub issues while staying safe and trustworthy?
```

It should prove that with transparent local rules first. Paid APIs, LLM APIs, hosted services, and opaque automation are outside the MVP.

## Target User

The first user is an open-source maintainer who receives enough GitHub issues to feel triage pain.

Good early targets:

- Developer tools.
- JavaScript, Python, or CLI projects.
- Repos with 50+ open issues.
- Repos where many issues are duplicates, support questions, or missing reproduction steps.

## MVP Scope

The MVP has two local lanes:

1. Audit `.github/ISSUE_TEMPLATE` before publishing or piloting.
2. Analyze a new GitHub issue after it is opened.

It should:

1. Audit issue forms and template chooser config.
2. Parse the issue title and body.
3. Detect missing required fields.
4. Classify the likely issue type.
5. Search existing issues for possible duplicates.
6. Suggest labels.
7. Produce one concise maintainer summary in dry-run mode.
8. Store no sensitive user data by default.

Comment posting can be tested after dry-run output is useful. Applying labels requires explicit maintainer opt-in.

## Issue Types

The MVP should classify issues into:

- `bug`
- `feature-request`
- `support-question`
- `documentation`
- `security-sensitive`
- `possible-duplicate`
- `missing-info`
- `unknown`

The classification stays rule-based in the no-cost MVP. Any LLM or embedding integration is a future optional path that requires explicit approval and real pilot evidence.

## Missing-Information Checks

For bug reports, check whether the issue includes:

- Software version.
- Operating system or environment.
- Steps to reproduce.
- Expected behavior.
- Actual behavior.
- Error logs or stack trace.
- Minimal reproduction link or explanation.

For feature requests, check whether the issue includes:

- Problem being solved.
- Proposed solution.
- User impact.
- Alternatives considered.

For support questions, suggest routing to:

- Docs.
- GitHub Discussions.
- Community forum.
- Discord or support channel if configured.

For security-sensitive reports, suggest private routing:

- GitHub private vulnerability reporting, if available.
- `SECURITY.md`.
- Maintainer-provided security email or process.

## Labels

The MVP should suggest labels, not force them unless the maintainer enables that behavior.

Default label suggestions:

- `bug`
- `feature-request`
- `docs`
- `support`
- `security-review`
- `needs-info`
- `possible-duplicate`
- `repro-needed`
- `high-signal`
- `low-signal`

## Issue Form Audit

The MVP should include a local issue-template audit.

It should check:

- Missing `.github/ISSUE_TEMPLATE/config.yml`.
- `blank_issues_enabled` not set to `false`.
- Missing support or security contact links.
- Issue forms with no non-markdown input fields.
- Missing top-level issue form keys.
- Duplicate field IDs or visible labels.
- Private-data-risk labels such as password, token, secret, credential, or private key.
- Bug forms missing version, environment, reproduction steps, expected behavior, actual behavior, or logs/error fields.

The audit is a lightweight scanner, not a full YAML parser.

## Maintainer Summary Format

The comment should be short, specific, and useful.

Example:

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: not actionable yet
Missing: version, reproduction steps, actual behavior
Possible duplicate: #123
Suggested labels: needs-info, possible-duplicate
Suggested next action: ask for version and minimal reproduction
```

Avoid long bot walls. Maintainers should be able to scan the result in seconds.

## Safety Rules

The MVP must:

- Never run code from an issue or pull request.
- Never auto-close by default.
- Never accuse a user of using AI.
- Never publish security-sensitive details.
- Treat issue text as untrusted input.
- Use the minimum GitHub permissions required.
- Support dry-run mode.

## Configuration

Repos should be able to configure:

- Required fields by issue type.
- Labels to apply or suggest.
- Support channel links.
- Security reporting instructions.
- Duplicate-search sensitivity.
- Whether comments are public or maintainer-only where possible.
- Dry-run/comment-only behavior.

Example config:

```yaml
mode: comment-only

labels:
  missingInfo: needs-info
  duplicate: possible-duplicate
  support: support
  security: security-review

requiredFields:
  bug:
    - version
    - reproduction_steps
    - expected_behavior
    - actual_behavior

routing:
  supportUrl: https://github.com/owner/repo/discussions
  securityUrl: https://github.com/owner/repo/security/policy
```

## Technical Architecture

Version 1 should be simple:

```text
GitHub issue opened
        |
GitHub Action runs
        |
Core analyzer parses issue
        |
Rules check missing info and issue type
        |
Duplicate search checks existing issues
        |
Action posts summary and suggested labels
```

## Package Responsibilities

`packages/core`

- Parse issue text.
- Detect issue type.
- Detect missing information.
- Score actionability.
- Generate summary data.
- Audit local issue templates.

`packages/action`

- Receive GitHub Action context.
- Fetch issue data.
- Call `packages/core`.
- Search similar issues.
- Print dry-run output first.
- Later, post comments only after pilot approval.
- Later, apply labels only after explicit maintainer opt-in.

`packages/cli`

- Reserved for future Repro Pack.
- Not required for MVP launch.

`scripts`

- Run local demos.
- Run local issue-bank reports.
- Run local issue-template audits.

## MVP Exit Criteria

The MVP is ready for pilot testing when:

- It can analyze at least 30 sample issues.
- It can audit the repo's issue templates locally.
- It produces stable summaries.
- It does not take destructive action.
- It can run in a test GitHub repo.
- Maintainers can configure labels and required fields.
- Duplicate suggestions are conservative.
- Security-sensitive wording is routed carefully.

## Non-Goals

The MVP is not:

- A full SaaS dashboard.
- A complete GitHub App.
- A PR review bot.
- An AI slop detector.
- A replacement for maintainers.
- A support desk for end users.
- A competitor that claims issue triage is an empty category.

## First Build Order

1. Write test issue fixtures.
2. Build core missing-info detection.
3. Build issue classification.
4. Build summary generation.
5. Add GitHub Action wrapper.
6. Add duplicate search.
7. Add config file support.
8. Add issue-template audit.
9. Test on a private demo repo.
