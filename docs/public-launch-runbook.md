# Public Launch Runbook

This runbook is for the sit-together publishing session.

Use these steps when Rohit is present and has approved the public action.

## Before Publishing

Run:

```text
npm test
npm run demo
npm run report
npm run audit:templates
```

Confirm:

- No private files are included.
- No secrets are present.
- No paid APIs were added.
- No dependencies were added accidentally.
- Placeholder GitHub links are replaced.
- `SECURITY.md` has a public reporting path.
- Repo owner/name is final.

## Recommended Repo Details

Suggested repo name:

```text
oss-intake-doctor
```

Suggested description:

```text
No-cost maintainer intake quality toolkit for GitHub issues: issue-form audits, dry-run analysis, and Repro Pack roadmap.
```

Suggested topics:

```text
open-source
github-actions
maintainers
issue-triage
issue-templates
no-api
developer-tools
oss
```

License:

```text
MIT
```

Visibility:

```text
Public
```

## Publishing Steps

1. Create public GitHub repository.
2. Replace placeholder links in `.github/ISSUE_TEMPLATE/config.yml`.
3. Update `SECURITY.md` with public security reporting instructions.
4. Initialize Git locally if needed.
5. Commit all files.
6. Push to GitHub.
7. Check README rendering.
8. Check docs links.
9. Create release `v0.1.0` using [release-v0.1.0-draft.md](release-v0.1.0-draft.md).
10. Submit OpenAI OSS application using [openai-oss-application-draft.md](openai-oss-application-draft.md).

## Approval Boundaries In The Publishing Session

- Paid APIs stay out of scope.
- Hosting stays out of scope.
- Maintainer outreach happens in a separate session.
- Public bot comments stay opt-in.
- Program applications stay focused on relevant OSS support.
- GitHub permissions stay minimal.
