# First Sprint Plan

## Sprint Goal

Create a working dry-run prototype that can analyze sample GitHub issues and produce useful maintainer summaries.

This sprint should not try to become a full product. The goal is proof of usefulness.

After the research refresh, the sprint also includes a local issue-template audit because GitHub issue forms are the first intake layer.

## Week 1: Foundation

### Day 1: Project Setup

- Confirm project name.
- Initialize repository.
- Choose package manager.
- Create TypeScript workspace.
- Add basic test runner.
- Add linting and formatting.

Exit check:

- A developer can install dependencies and run tests.

### Day 2: Sample Issue Fixtures

Create sample issues for:

- Good bug report.
- Missing version.
- Missing reproduction steps.
- Support question.
- Possible duplicate.
- Security-sensitive report.
- Feature request.

Exit check:

- At least 10 fixtures exist and are easy to run through the analyzer.

### Day 3: Missing-Info Detector

Build rule-based checks for:

- Version.
- Operating system.
- Reproduction steps.
- Expected behavior.
- Actual behavior.
- Logs or error message.

Exit check:

- The analyzer correctly flags missing fields in sample issues.

### Day 4: Issue Type Classifier

Build simple rule-based classification:

- Bug.
- Feature request.
- Support question.
- Documentation issue.
- Security-sensitive report.
- Unknown.

Exit check:

- The classifier gets the sample fixtures mostly correct without using an LLM.

### Day 5: Summary Generator

Generate concise maintainer summaries from analyzer output.

Exit check:

- Every sample issue produces a readable summary under 10 lines.

## Week 2: GitHub Action Prototype

### Day 6: Action Wrapper

Build the GitHub Action entrypoint.

It should:

- Read issue title and body.
- Call the core analyzer.
- Print dry-run output.

Exit check:

- The Action runs locally or in a test workflow.

### Day 7: Comment-Only Mode

Prepare the comment-only path, but keep the default behavior dry-run.

Exit check:

- On a test issue, the Action prints a concise summary without posting publicly.
- Public comments remain a later pilot step.

### Day 8: Label Suggestions

Suggest labels based on analyzer output.

Start with suggestions only. Applying labels should be optional.

Exit check:

- Output includes suggested labels for every sample issue.

### Day 9: Conservative Duplicate Search

Fetch existing issues and score simple similarity.

Start with basic title/body matching before embeddings.

Exit check:

- The Action can suggest a possible duplicate without closing anything.

### Day 10: Demo And Review

Create a demo run with:

- 5 sample issues.
- 5 generated summaries.
- Known limitations.
- Next-step recommendations.

Exit check:

- We can show a maintainer the prototype and ask whether they would install comment-only mode.

### Day 11: Issue Form Audit

Add a local audit for `.github/ISSUE_TEMPLATE`.

Exit check:

- `npm run audit:templates` runs locally.
- The audit checks chooser config, support/security routing, required bug fields, duplicate IDs, duplicate labels, and private-data-risk labels.
- The audit does not call GitHub APIs.

## Sprint Rules

- No auto-close.
- No contributor code execution.
- No security-sensitive public detail expansion.
- No AI-authorship accusations.
- No dashboard.
- No hosted backend.
- No external APIs.

## Sprint Deliverable

At the end of this sprint, we should have:

- A TypeScript workspace.
- A tested core analyzer.
- A dry-run GitHub Action prototype.
- A local issue-template audit.
- Sample issue fixtures.
- A demo output.
- A clear decision on whether to continue.
