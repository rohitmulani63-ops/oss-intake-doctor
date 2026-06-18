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

## Safety Boundary

This release does not:

- Call external APIs.
- Require paid services.
- Post comments.
- Apply labels.
- Auto-close issues.
- Run contributor code.
- Upload files.

## Notes For Maintainers

Start with:

```text
npm run audit:templates
npm run report
```

Then test the dry-run workflow in a private or test repository before enabling any public-facing behavior.

## Known Limitations

- The issue-template audit is a lightweight local scanner, not a full YAML parser.
- Duplicate detection is local text similarity only.
- Repro Pack is planned, not implemented.
- Public comments and label application are intentionally not enabled by default.
