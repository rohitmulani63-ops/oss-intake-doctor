# Pilot Guide

This guide is for maintainers who want to test OSS Intake Doctor safely.

## Pilot Goal

Measure whether the tool creates useful maintainer signal without adding noise.

The pilot should also test the core positioning:

```text
Can a no-cost, no-external-API intake layer help before maintainers adopt heavier automation?
```

## Recommended Pilot Mode

Start with dry-run mode only.

Dry-run mode:

- Reads the issue event locally inside GitHub Actions.
- Prints the analysis to workflow logs.
- Does not post comments.
- Does not apply labels.
- Does not close issues.
- Does not call external APIs.

## Pilot Setup

1. Add OSS Intake Doctor to a test repository or branch.
2. Configure labels and routes in `examples/config/oss-intake.config.json`.
3. Run the dry-run workflow on new or edited issues.
4. Review workflow logs weekly.

Do not start with public comments. Public comments should come only after maintainers confirm the dry-run summaries are useful and not noisy.

## What To Measure

Track:

- How many issues were analyzed.
- How many were incomplete.
- How many were possible duplicates.
- How many were support questions.
- How many were security-sensitive.
- How many summaries were useful.
- How many summaries were wrong or noisy.
- Whether the summary would have saved a maintainer follow-up.
- Whether the result was safe enough to show publicly.
- Setup time from first install attempt to first useful output.

For local pre-pilot measurement, run:

```text
npm run report
```

## Success Criteria

A pilot is promising if:

- Maintainers find summaries useful.
- Missing-info detection is accurate.
- Duplicate suggestions are conservative.
- Support/security routing is helpful.
- The tool does not create extra maintainer work.

## Stop Criteria

Pause or disable the pilot if:

- Comments or logs are noisy.
- Duplicate suggestions are repeatedly wrong.
- Contributors feel blocked or shamed.
- Security-sensitive details are handled poorly.
- Setup takes too long.

## After Pilot

If dry-run output is useful, the next step is comment-only mode.

Comment-only mode should still avoid:

- Auto-closing.
- PR rejection.
- External APIs.
- Contributor code execution.

## Evidence Summary Template

Use this after each pilot:

```text
Repo:
Pilot dates:
Mode: dry-run
Issues analyzed:
Needs-info detected:
Possible duplicates suggested:
Maintainer-confirmed useful summaries:
Wrong or noisy summaries:
Security-sensitive reports routed:
Setup time:
Maintainer quote:
Decision: continue / revise / stop
```
