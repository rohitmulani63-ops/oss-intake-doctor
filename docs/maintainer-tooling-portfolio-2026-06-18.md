# Maintainer Tooling Portfolio - 2026-06-18

This portfolio is a no-cost, local-first toolkit for open-source maintainers.

The projects are intentionally small, practical, and connected. The goal is not to replace maintainers. The goal is to reduce repeated follow-up work around weak issues and unclear bug reports.

## Project 1 - OSS Intake Doctor

Repository:

```text
https://github.com/rohitmulani63-ops/oss-intake-doctor
```

Release:

```text
https://github.com/rohitmulani63-ops/oss-intake-doctor/releases/tag/v0.1.0
```

Purpose:

- Audit GitHub issue forms.
- Dry-run analyze issue text.
- Detect missing bug-report information.
- Route support and security-sensitive reports.
- Surface possible duplicate risk.

Current proof:

- 36 local tests.
- 30-item sample issue bank.
- Issue-template audit with text, Markdown, and JSON output.
- Three starter contributor issues.
- Public release `v0.1.0`.

## Project 2 - Repro Pack CLI

Repository:

```text
https://github.com/rohitmulani63-ops/repro-pack-cli
```

Release:

```text
https://github.com/rohitmulani63-ops/repro-pack-cli/releases/tag/v0.1.0
```

Purpose:

- Turn weak bug reports into local Markdown reproduction packs.
- Detect missing reproduction evidence.
- Flag secret-looking logs before public posting.
- Keep contributors in control of what gets shared.

Current proof:

- 7 local tests.
- Local demo for incomplete bug reports.
- Local security demo for secret-looking logs.
- No dependencies.
- Public release `v0.1.0`.

## Shared Principles

- No paid APIs.
- No hosted service requirement.
- No uploads by default.
- No telemetry.
- No contributor code execution.
- Dry-run or local review before public automation.

## Community Story

OSS Intake Doctor helps maintainers see what is wrong with issue intake.

Repro Pack CLI helps contributors produce the missing reproduction evidence.

Together, they form a practical maintainer workflow:

```text
Cleaner issue intake -> clearer repro evidence -> less repeated maintainer follow-up.
```

## Next Proof To Collect

- One maintainer pilot using OSS Intake Doctor.
- One maintainer pilot using Repro Pack CLI.
- One public-safe feedback note per project.
- One small contributor PR or issue from outside the maintainer account.
