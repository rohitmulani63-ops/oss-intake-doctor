# GitHub Public Action Checklist

Use this checklist during a live GitHub session after the local verification commands pass.

The goal is simple: make the public repository easy to understand, easy to discover, and easy for a first contributor to help with. Keep the setup no-cost, local-first, and maintainer-controlled.

## No-Cost Guardrail

Before changing public settings, confirm:

- No paid GitHub Marketplace apps are being installed.
- No paid API keys are being added.
- No hosted service is being connected.
- No secrets are being entered.
- GitHub Actions stays limited to the included dry-run example until maintainers choose otherwise.

## Repo About Panel

Description:

```text
No-cost maintainer intake quality toolkit for GitHub issues: issue-form audits, dry-run analysis, and Repro Pack roadmap.
```

Topics:

```text
github-actions
issue-triage
issue-templates
open-source
maintainers
developer-tools
no-api
local-first
```

Website:

```text
Leave blank until there is a real project page or published docs site.
```

## Repo Settings To Check

- Issues: on.
- Discussions: on if support questions should route there.
- Wiki: off unless a maintainer wants wiki-style docs.
- Projects: off until there is a real project board need.
- Sponsorships: leave unchanged.
- Actions: keep the repository workflow as a dry-run example.

If Discussions stays off, update the support link in `.github/ISSUE_TEMPLATE/config.yml` so contributors are not sent to a missing page.

## Labels To Create

Create only the labels needed for the first public workflow:

| Label | Purpose |
| --- | --- |
| `good first issue` | Small, clear contributor tasks |
| `help wanted` | Tasks where outside contributions are welcome |
| `documentation` | Docs, README, examples, or wording improvements |
| `fixtures` | Sample issue bank and example input data |
| `tests` | Test coverage or verification work |
| `pilot-feedback` | Notes from maintainers trying the project |
| `needs-info` | Issues that need more details from the reporter |
| `repro-needed` | Bug reports that need reproduction steps or a minimal case |
| `possible-duplicate` | Reports that look similar to an existing issue |
| `support` | Usage questions or support-route cleanup |
| `security-sensitive` | Security-sensitive reports that need careful routing |

## First Public Issues

Create two or three starter issues first. A small, real backlog looks better than a long empty backlog.

Recommended first set:

1. Add five sample issues to the local issue bank.
2. Add one more issue form gallery case.
3. Make the before/after demo easier to screenshot.

Use the copy in [good-first-issue-drafts.md](good-first-issue-drafts.md).

## First Release

Create a GitHub release after the repo About panel, labels, and first issues are ready.

Tag:

```text
v0.1.0
```

Title:

```text
OSS Intake Doctor v0.1.0 - local, no-cost maintainer intake quality MVP
```

Release body:

```text
Use docs/release-v0.1.0-draft.md.
```

## After The Release

Update the docs with the public release link:

- `README.md`
- `docs/one-page-proof.md`
- `docs/openai-oss-application-draft.md`
- `docs/verification-log-2026-06-18.md`

Then add one short pilot note under `docs/pilot-feedback/` when a maintainer has reviewed or tried the project.

## Stop Points

Pause before these actions:

- Contacting maintainers.
- Applying to the OpenAI OSS program.
- Enabling any public write automation.
- Installing GitHub apps.
- Entering secrets.
- Adding paid services.
