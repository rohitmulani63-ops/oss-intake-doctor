# Validation Plan

## Purpose

Before building too much, prove that real maintainers want OSS Intake Doctor.

The question is not:

```text
Can we build this?
```

The real question is:

```text
Will maintainers trust this enough to install it?
```

After competitive research, the second validation question is:

```text
Do maintainers prefer a no-cost, no-external-API, dry-run first tool before adopting AI-heavy triage?
```

## Phase 1: Desk Validation

Collect 30 to 50 public GitHub issues from real projects.

Include:

- Complete bug reports.
- Incomplete bug reports.
- Duplicates.
- Support questions.
- Feature requests.
- Documentation issues.
- Possible security-sensitive reports.

Run the analyzer against them and measure:

- Did it classify the issue correctly?
- Did it identify missing information?
- Did it avoid overreacting?
- Was the maintainer summary useful?

Also compare the output against the positioning in [positioning.md](positioning.md):

- Did transparent rules explain the result clearly?
- Did the dry-run output feel safer than a public bot comment?
- Did the no-external-API approach matter for this repo?

## Phase 1B: Template Validation

Collect public `.github/ISSUE_TEMPLATE` setups from 10 to 20 OSS repositories.

Run:

```text
npm run audit:templates
```

Measure:

- Do repos disable blank issues?
- Do repos route support questions away from bug reports?
- Do repos route security reports privately?
- Do bug forms ask for version, environment, reproduction, expected behavior, actual behavior, and logs?
- Do findings match what a maintainer would care about?

## Phase 2: Demo Repo

Create a private or public demo GitHub repo.

Add:

- Issue templates.
- Sample issues.
- GitHub Action workflow.
- Dry-run mode.
- Example output comments.

The goal is to show maintainers the product without touching their real repo first.

## Phase 3: Maintainer Interviews

Ask 10 maintainers simple questions:

1. What wastes the most time in your issue queue?
2. How often do you ask for missing information?
3. How often are issues duplicates?
4. Would you trust a comment-only triage assistant?
5. What action would annoy you or your contributors?
6. What would make you install this?
7. Would no API key and no external issue-content sharing make adoption easier?
8. Would a dry-run report be useful before public comments?

## Phase 4: Pilot Installs

Find 2 or 3 repos willing to test comment-only mode.

Start with dry-run mode. Move to comment-only mode only after the maintainer reviews the dry-run output.

Pilot rules:

- No auto-close.
- No PR rejection.
- No contributor code execution.
- Maintainer can disable anytime.
- Weekly review of false positives.
- No external APIs.

## Pilot Metrics

Track:

- Number of issues analyzed.
- Number marked `needs-info`.
- Number of possible duplicates suggested.
- Maintainer-confirmed duplicate precision.
- Median time to first useful label.
- Number of maintainer follow-up comments saved.
- Number of wrong or annoying comments.
- Template audit score before and after fixes.
- Number of weak forms improved.

## Early Success Targets

Initial targets:

- 30% fewer repeated missing-info follow-ups.
- Duplicate suggestions useful at least 70% of the time.
- Maintainers say summaries are useful in weekly review.
- Zero destructive false positives.
- No public mishandling of security-sensitive issues.

## Kill Criteria

Stop or rethink if:

- Maintainers find the comments noisy.
- Duplicate suggestions are often wrong.
- Contributors feel blocked or shamed.
- The tool creates more work than it saves.
- Setup takes more than 15 minutes for a small repo.

## Validation Outcome

If 2 maintainers keep the tool installed after the pilot, move to Version 2.

Version 2 should add:

- Better duplicate search.
- Repro Pack CLI alpha.
- Maintainer feedback buttons.
- Simple metrics report.
- Template audit autofix suggestions.
