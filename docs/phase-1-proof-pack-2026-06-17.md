# Phase 1 Proof Pack - 2026-06-17

## Purpose

Prepare everything possible before the public publishing session.

This phase does not publish, contact maintainers, spend money, call paid APIs, or apply to programs.

## Completed Phase 1 Artifacts

- [Public repo template benchmark](public-repo-template-benchmark-2026-06-17.md)
- [GitHub research refresh](github-research-refresh-2026-06-17.md)
- [OpenAI OSS application draft](openai-oss-application-draft.md)
- [One-page proof](one-page-proof.md)
- [Release v0.1.0 draft](release-v0.1.0-draft.md)
- [Public launch runbook](public-launch-runbook.md)
- [Launch verification log](verification-log-2026-06-18.md)
- [Verification log](verification-log-2026-06-17.md)

## Current Local Product Proof

Existing proof:

- Tested core analyzer.
- 30 sample issue bank.
- Dry-run Action wrapper.
- Issue Form Doctor template audit with category scores and suggested fixes.
- Config validation.
- Trust and safety docs.
- No-cost policy.
- Pilot guide.
- Repro Pack roadmap.

## Benchmark Proof

20 public repositories were checked for issue-template intake signals.

Result:

```text
Repos checked: 20
Repos disabling blank issues: 15
Repos with support route signals: 19
Repos with security route signals: 7
Repos using YAML issue forms: 18
Repos using markdown-only templates: 2
Repos with all 6 checked bug-report fields: 7
```

Interpretation:

Even mature open-source projects use issue intake differently. A local preflight report can help maintainers understand tradeoffs before enabling automation.

## Research-Backed Upgrade

Follow-up GitHub research found that nearby tools already cover AI issue triage, issue-form parsing, and post-submission validation.

The product was sharpened toward the safer gap:

```text
Local maintainer-intake quality before automation.
```

Implemented after the research refresh:

- Category scores for bug-report quality, privacy, routing, and syntax.
- Suggested fixes for every template-audit finding.
- GitHub-compatible duplicate-label handling with unique `id` values.
- Unsupported issue-form type detection.
- Required-field warnings for important bug-report fields.
- Checkbox option label collision detection.

## OpenAI OSS Story

Use this framing:

```text
We are building OSS Intake Doctor because open-source maintainers need safer, no-cost intake quality tools. Codex support helps us execute faster while keeping the tool free for the community.
```

Less useful framing:

```text
This is mainly a private productivity project.
```

## Remaining Approval-Gated Work

Requires Rohit present:

- Decide final GitHub owner/name.
- Create public repository.
- Replace placeholder links.
- Confirm public security contact route.
- Push code.
- Create release.
- Submit OpenAI OSS application.

## Phase 1 Status

Ready for final verification.
