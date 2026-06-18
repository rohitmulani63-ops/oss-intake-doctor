# No-Cost Policy

This project must be buildable and testable without spending money.

## Hard Rules

- No paid APIs.
- No paid AI APIs.
- No paid hosting.
- No paid databases.
- No paid dashboards.
- No subscriptions.
- No external services that create a bill.
- No automatic upgrade to paid infrastructure.

## MVP Approach

The first version must use:

- Local rules.
- Local tests.
- Local sample issue files.
- GitHub-native workflows.
- Public-repo GitHub Actions only when the owner approves publishing.

## Allowed Without Approval

- Local files.
- Local scripts.
- Free open-source code already available in the project.
- Built-in Node.js features.
- Rule-based analysis.
- Simple local duplicate search.

## Requires Explicit Approval

- Any paid API.
- Any LLM API.
- Any hosted backend.
- Any cloud database.
- Any deployment with billing risk.
- Contacting maintainers.
- Publishing the repository.
- Installing the Action into a real external repository.

## Product Design Impact

OSS Intake Doctor should prove value before cost.

The no-cost MVP should answer:

```text
Can simple, transparent rules reduce maintainer triage work?
```

Only after real traction should paid options be discussed, and only with explicit approval.

