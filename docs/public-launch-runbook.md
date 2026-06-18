# Public Launch Runbook

This runbook is for the sit-together publishing session.

Use these steps when Rohit is present and has approved the public action.

For the exact next GitHub UI steps, use [github-public-action-checklist.md](github-public-action-checklist.md).

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

1. Confirm the public repository is live.
2. Check README rendering.
3. Check docs links.
4. Add repo description and topics.
5. Confirm Discussions or update the support route.
6. Create the first labels.
7. Create two or three first public issues from [good-first-issue-drafts.md](good-first-issue-drafts.md).
8. Create release `v0.1.0` using [release-v0.1.0-draft.md](release-v0.1.0-draft.md).
9. Update proof docs with the release link.
10. Submit the OpenAI OSS application only after the release and evidence are ready.

## Approval Boundaries In The Publishing Session

- Paid APIs stay out of scope.
- Hosting stays out of scope.
- Maintainer outreach happens in a separate session.
- Public bot comments stay opt-in.
- Program applications stay focused on relevant OSS support.
- GitHub permissions stay minimal.
