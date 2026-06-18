# Good First Issue Drafts

Use these drafts when Rohit is present and ready to create public GitHub issues.

They are designed to help first-time contributors make useful, low-risk improvements without adding cost, dependencies, hosted services, or external API calls.

Recommended labels:

```text
good first issue
help wanted
documentation
fixtures
tests
```

## Draft 1 - Add Five Sample Issues To The Local Issue Bank

Title:

```text
Add five sample issues to the local issue bank
```

Suggested labels:

```text
good first issue, fixtures, tests
```

Body:

```text
OSS Intake Doctor uses a local sample issue bank to prove how the analyzer behaves without calling external services.

Task:
- Add five new sample issues to `examples/issue-bank/sample-issues.json`.
- Cover at least three different issue types, such as bug, support question, documentation, feature request, and security-sensitive report.
- Keep every sample fictional. Do not copy real private issues or include credentials, emails, tokens, account IDs, or customer data.
- Make sure each sample has a clear title and body.

Acceptance criteria:
- `npm test` passes.
- `npm run report` still prints a clear local report.
- The sample bank still reads as maintainer-focused, not spammy or repetitive.

No-cost rule:
- Do not add dependencies.
- Do not call APIs.
- Do not use paid services.
```

## Draft 2 - Add A New Issue Form Gallery Case

Title:

```text
Add one more issue form gallery case
```

Suggested labels:

```text
good first issue, documentation
```

Body:

```text
The issue form gallery helps maintainers compare common weak intake patterns with better local-first patterns.

Task:
- Add one new case to `docs/issue-form-gallery.md`.
- Use the same structure as the existing cases:
  - Common pattern.
  - Why it creates follow-up.
  - Better pattern.
  - What OSS Intake Doctor should report.
- Good topics include feature requests, docs reports, environment fields, or support routing.

Acceptance criteria:
- The example is copyable YAML or text.
- The language is constructive and does not shame other projects.
- The example stays no-cost and local-first.
- `npm test` passes.

No-cost rule:
- Do not add dependencies.
- Do not add hosted screenshots.
- Do not call APIs.
```

## Draft 3 - Make The Before/After Demo Easier To Screenshot

Title:

```text
Make the before/after demo easier to screenshot
```

Suggested labels:

```text
good first issue, documentation
```

Body:

```text
The before/after demo is one of the fastest ways for maintainers to understand OSS Intake Doctor.

Task:
- Improve `docs/before-after-demo.md` so each example is easier to screenshot or paste into a release note.
- Keep the existing scenarios:
  - Incomplete bug.
  - Possible duplicate.
  - Support question.
  - Security-sensitive report.
- Add short one-line takeaways under each example.

Acceptance criteria:
- The page is still concise.
- The examples remain fictional.
- The output matches current analyzer wording.
- `npm run demo` still confirms the public examples are directionally accurate.

No-cost rule:
- Do not add generated images.
- Do not add external assets.
- Do not use paid design tools.
```

## Draft 4 - Add A Small Edge-Case Test For Template Audit Markdown

Title:

```text
Add a template-audit markdown edge-case test
```

Suggested labels:

```text
good first issue, tests
```

Body:

```text
OSS Intake Doctor now supports text, Markdown, and JSON issue-template audit reports.

Task:
- Add one small test in `tests/examples/templateAuditScript.test.ts`.
- Focus on Markdown escaping or formatting for a finding message that contains a pipe character (`|`) or multi-line text.
- Keep the test local and deterministic.

Acceptance criteria:
- The new test fails before the fix if formatting is unsafe.
- The final test passes with `npm test`.
- The Markdown table remains readable.

No-cost rule:
- Do not add dependencies.
- Do not use snapshots.
- Do not call external services.
```

## Draft 5 - Improve Contributor Setup Notes

Title:

```text
Improve contributor setup notes
```

Suggested labels:

```text
good first issue, documentation
```

Body:

```text
The contributing guide should help a new contributor make their first safe change quickly.

Task:
- Update `CONTRIBUTING.md` with a short "First contribution path" section.
- Mention the safest first commands:
  - `npm test`
  - `npm run audit:templates`
  - `npm run demo`
  - `npm run report`
- Link to `docs/good-first-issue-drafts.md`.

Acceptance criteria:
- The guide stays short.
- The guide keeps the no-cost and no-external-API rules visible.
- No behavior changes are required.

No-cost rule:
- Do not add tools, dependencies, or services.
```

## Maintainer Notes

When turning these drafts into GitHub issues:

- Create only two or three at first.
- Use `good first issue` only for tasks that are genuinely small.
- Add `help wanted` when outside contributors are welcome.
- Keep one maintainer available to answer first contributor questions.
- Close or refresh stale starter issues instead of letting them rot.
