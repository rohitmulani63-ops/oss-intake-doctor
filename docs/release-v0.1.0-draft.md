# Release Draft - v0.1.0

## Title

OSS Intake Doctor v0.1.0 - local, no-cost maintainer intake quality MVP

## Summary

This first release introduces OSS Intake Doctor as a local, no-external-API toolkit for open-source maintainers who want safer issue intake before enabling public bot comments or heavier automation.

## Highlights

- Local issue-template audit with category scores.
- Markdown and JSON issue-template audit reports.
- Suggested fixes for issue-template findings.
- GitHub-compatible duplicate-label and checkbox option checks.
- Dry-run issue analyzer.
- Missing-information detection for bug reports.
- Support and security-sensitive routing.
- Conservative duplicate suggestions.
- Config validation.
- 30-item sample issue bank.
- Dry-run GitHub Action wrapper.
- No-cost policy.
- Trust and safety docs.
- Issue form gallery.
- Maintainer proof cards.
- Good first issue drafts.
- Repro Pack roadmap.
- Public benchmark report across 20 repositories.

## Commands

```text
npm test
npm run demo
npm run report
npm run audit:templates
npm run audit:templates:markdown
npm run audit:templates:json
```

## Built-In Safety

This release keeps the core workflow simple and maintainer-controlled:

- Runs locally.
- Uses no external APIs.
- Requires no paid services.
- Reviews issue intake in dry-run mode.
- Keeps public comments, labels, and closing decisions under maintainer control.
- Avoids contributor code execution.
- Avoids file uploads.

## Notes For Maintainers

Start with:

```text
npm run audit:templates
npm run report
```

Then test the dry-run workflow in a private or test repository before enabling any public-facing behavior.

## Current Scope

- The issue-template audit is a lightweight local scanner tailored to GitHub issue forms.
- Duplicate detection uses local text similarity.
- Repro Pack is planned for a future release.
- Public comments and label application are maintainer-controlled future options outside the default dry-run path.
