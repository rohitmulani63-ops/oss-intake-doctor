# OSS Intake Doctor

OSS Intake Doctor helps open-source maintainers improve GitHub issue intake before the issue queue becomes noisy.

It audits issue forms, checks sample issues in dry-run mode, highlights missing bug-report details, suggests labels, routes support and security-sensitive reports, and gives maintainers a short summary they can review.

The project is built to stay lightweight: local rules, clear output, no required paid service, and no external issue-content sharing.

## Why It Exists

Maintainers often lose time on issues that need one more round of basic information: version, environment, reproduction steps, expected behavior, actual behavior, logs, duplicate context, or the right support route.

OSS Intake Doctor gives a repository a simple front desk:

- Contributors get clearer templates.
- Maintainers get a faster read on issue quality.
- Security-sensitive reports get routed with more care.
- Teams can inspect results in dry-run mode before enabling any write workflow.

## What It Does

### Issue Form Doctor

Audit `.github/ISSUE_TEMPLATE` locally:

```text
npm run audit:templates
npm run audit:templates:markdown
npm run audit:templates:json
```

Current audit categories:

- Bug-report quality.
- Privacy risk.
- Support and security routing.
- GitHub issue-form syntax.

Example:

```text
OSS Intake Doctor issue-template audit

Files audited: 4
Score: 100/100

Category scores:
- bug-report: 100/100
- privacy: 100/100
- routing: 100/100
- syntax: 100/100

Findings:
- none
```

### Dry-Run Issue Analysis

Analyze issue text and produce a maintainer summary:

```text
npm run demo
```

Example summary:

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: needs-info
Missing: reproduction steps, expected behavior, actual behavior
Possible duplicate: #12 - Windows CSV export crash
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for reproduction steps, expected behavior, and actual behavior
```

### Sample Issue Bank

Run the local sample report:

```text
npm run report
```

The current sample bank covers 30 issues across bugs, support questions, documentation reports, feature requests, security-sensitive reports, and duplicate-style issues.

## Quick Start

Requirements:

- Node.js 24 or newer.
- Git.

Clone and run:

```text
git clone https://github.com/rohitmulani63-ops/oss-intake-doctor.git
cd oss-intake-doctor
npm test
npm run audit:templates
npm run demo
npm run report
```

The current MVP uses built-in Node.js features only.

## First Maintainer Check

For a first pass on an existing repository, start with the issue-template audit:

```text
npm run audit:templates
```

Then run the demo and sample report to see how the maintainer summaries read before using the workflow in another project.

## GitHub Action

The repository includes a dry-run GitHub Action example:

```text
.github/workflows/oss-intake-dry-run.yml
```

The workflow runs on opened or edited issues and prints analysis output for maintainers to inspect.

## Configuration

Repositories can customize labels, required bug fields, support routes, security routes, and duplicate sensitivity with a local JSON file.

See [docs/configuration.md](docs/configuration.md).

## Project Status

Public MVP, ready for maintainer pilots.

Current proof:

- 36 local tests.
- 30-item sample issue bank.
- Issue-template audit with text, Markdown, and JSON reports.
- Dry-run GitHub Action wrapper.
- Public benchmark across 20 repositories.
- Launch verification log.
- MIT license, contribution guide, code of conduct, and security policy.

Useful links:

- [Launch verification](docs/verification-log-2026-06-18.md)
- [Public repo benchmark](docs/public-repo-template-benchmark-2026-06-17.md)
- [Community growth and OpenAI OSS plan](docs/community-growth-and-openai-oss-plan-2026-06-18.md)
- [Issue Form Doctor](docs/issue-form-doctor.md)
- [Issue form gallery](docs/issue-form-gallery.md)
- [Before/after demo](docs/before-after-demo.md)
- [Pilot guide](docs/pilot-guide.md)
- [Good first issue drafts](docs/good-first-issue-drafts.md)
- [Trust and safety](docs/trust-and-safety.md)

## Roadmap

Near-term:

- Release `v0.1.0`.
- Collect maintainer feedback from small pilot repositories.

Later:

- Contributor-reviewed Repro Pack CLI.
- Better duplicate explanations.
- Optional integrations for teams that want stronger automation after dry-run evidence.

## Design Principles

- Local-first checks.
- Maintainer-readable output.
- Dry-run before write workflows.
- Clear routing for support and security-sensitive reports.
- Useful without paid APIs or hosted infrastructure.

## Contributing

Contributions are welcome, especially:

- Better issue-form audit rules.
- More sample issue fixtures.
- Documentation improvements.
- Maintainer pilot feedback.
- Repro Pack design notes.

Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
