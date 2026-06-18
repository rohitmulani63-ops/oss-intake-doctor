# Upcoming Projects Roadmap - 2026-06-11

## Research Goal

Decide what our upcoming OSS Intake projects should become after a deeper current-market research pass.

Constraints:

- No paid APIs.
- No external AI calls.
- No hosting.
- No publishing or maintainer outreach without explicit approval.
- Research and planning only for this pass.

## Research Method

Checked:

- GitHub official docs.
- OpenAI official OSS program page.
- GitHub Marketplace and competitor actions.
- GitHub Community discussions.
- GitHub Blog maintainer/IssueOps posts.
- Real `.github/ISSUE_TEMPLATE` setups from large OSS repos.
- In-app browser checks using Playwright-backed page inspection.

## Strongest Verdict

Build something more specific than broad AI issue triage.

That lane is already crowded, and GitHub itself is actively moving there.

Build this instead:

```text
OSS Intake Doctor = no-cost maintainer intake quality toolkit
```

The ecosystem should become:

```text
Issue Form Doctor
        +
Dry-Run Intake Doctor
        +
Repro Pack
        +
Benchmark Evidence Pack
        +
Maintainer Pilot Kit
```

That is the best path because it starts before issue submission, stays private and free, and gives maintainers evidence before asking for trust.

## Key Research Findings

### 1. GitHub issue forms are the native intake layer

GitHub issue forms support structured fields, validations, default labels, and default assignees.

Source:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

Product implication:

Issue Form Doctor should become the first project lane. It prevents low-quality issues before analysis is needed.

### 2. GitHub documents common form errors we can audit locally

GitHub docs list errors such as missing top-level keys, body with only markdown, duplicate IDs, duplicate labels, similar labels, invalid field types, and forbidden label words.

Source:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms

Product implication:

Our local template audit is a real, source-backed feature. It should expand carefully, but stay dependency-free until needed.

### 3. Template chooser configuration is strategic

GitHub supports `blank_issues_enabled: false` and `contact_links` to route support and security reports outside normal public issues.

Source:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

Product implication:

Support/security routing audit should be a first-class score category, not a small warning.

### 4. AI issue triage is already crowded

GitHub has official AI issue intake docs. Marketplace search for triage shows many issue/AI/duplicate-labeling tools. Issue AI Agent classifies, labels, detects duplicates, replies, and supports Anthropic/OpenAI APIs.

Sources:

- https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/triaging-an-issue-with-ai
- https://github.com/marketplace?query=triage&type=actions
- https://github.com/marketplace/actions/issue-ai-agent
- https://github.com/github/ai-assessment-comment-labeler

Product implication:

Never lead with "AI triage." Lead with no-cost, pre-submission, local evidence, privacy, and maintainer trust.

### 5. Maintainer pain is real and measurable

GitHub surveyed 500+ maintainers. Reported needs included issue triage, duplicate detection, spam protection, and low-quality contribution filtering. GitHub also says maintainers want AI as a second pair of eyes that does not intervene unless asked.

Source:

- https://github.blog/open-source/maintainers/how-github-models-can-help-open-source-maintainers-focus-on-what-matters/

Product implication:

Default mode should remain dry-run and report-first. Public comments and labels must stay opt-in.

### 6. Pre-submission triage demand exists

GitHub Community requests ask for similar-issue suggestions, missing-information checks, and category detection before submission.

Source:

- https://github.com/orgs/community/discussions/189316

Product implication:

Repro Pack and issue-form improvement are not side quests. They are the most defensible product direction.

### 7. Issue form validation still has gaps

Community discussions ask for regex validation, max length, clearer validation diagnostics, and preview/validation tooling.

Sources:

- https://github.com/orgs/community/discussions/10227
- https://github.com/orgs/community/discussions/10101
- https://github.com/orgs/community/discussions/63402

Product implication:

Upcoming work should include local preview/audit diagnostics and optional custom policy checks, not just GitHub syntax checks.

### 8. Existing form validators/parsers exist

`issue-ops/validator` validates submitted issues against issue forms and custom rules. GitHub's `issue-parser` parses issue-form responses into machine-readable JSON.

Sources:

- https://github.com/issue-ops/validator
- https://github.com/github/issue-parser
- https://github.com/issue-ops/parser

Product implication:

Do not claim parser/validator uniqueness. Our difference is offline preflight, no dependencies, no write permission, no external AI, and a wider maintainer-intake score.

### 9. Mature repos use template routing differently

Checked:

- VS Code: issue templates plus `blank_issues_enabled: false`, support/contact routing.
- Kubernetes: multiple YAML issue forms for bug, enhancement, tests, and support routing.
- React: specialized bug forms, docs/support routing, and repro-heavy fields.
- Node.js: multiple issue forms and contact links, with blank issues enabled.

Sources:

- https://github.com/microsoft/vscode/tree/main/.github/ISSUE_TEMPLATE
- https://github.com/kubernetes/kubernetes/tree/master/.github/ISSUE_TEMPLATE
- https://github.com/react/react/tree/main/.github/ISSUE_TEMPLATE
- https://github.com/nodejs/node/tree/main/.github/ISSUE_TEMPLATE

Product implication:

We should build a benchmark matrix from real repos. This gives us evidence without needing users yet.

### 10. OpenAI OSS program needs proof, not just a good idea

OpenAI says maintainers can apply for API credits, six months of ChatGPT Pro with Codex, and Codex Security. The page says core maintainers or widely used public projects should apply, and that triage/review/maintainer workflows are included.

Source:

- https://developers.openai.com/community/codex-for-oss

Product implication:

We should not apply yet. First build public proof: repo, docs, tests, benchmark, pilot evidence, maintainer feedback.

## Upcoming Project Plan

### Project 1: Issue Form Doctor

Purpose:

Audit `.github/ISSUE_TEMPLATE` before maintainers publish or pilot.

Why first:

It is the strongest white space. It prevents bad issues before they exist.

Scope:

- Template chooser score.
- Bug form completeness score.
- Support/security routing score.
- Duplicate/similar label check.
- Private-data-risk label check.
- Real repo benchmark report.
- Suggested fixes, but no autofix yet.

Success metric:

Given 20 public repos, produce useful findings a maintainer would understand in under 30 seconds locally.

### Project 2: Benchmark Evidence Pack

Purpose:

Create a research-backed dataset of public repo template setups and anonymized findings.

Why second:

Before we ask maintainers to trust us, we need proof the audit catches real patterns.

Scope:

- 20 to 50 public repos.
- Record template files present.
- Record blank issue policy.
- Record support/security routes.
- Record bug-form fields.
- Record missing/warning categories.
- Save source URLs and date checked.

Success metric:

Publishable evidence table showing common gaps and best-practice patterns.

### Project 3: Dry-Run Intake Doctor

Purpose:

Analyze submitted issue text locally and produce maintainer summaries without posting.

Why third:

We already have a working core. It becomes more convincing after template audit because it covers the after-submission lane.

Scope:

- Improve confidence scoring.
- Better duplicate reasons.
- Security-sensitive routing.
- Support-routing match.
- Config warnings.
- Issue-bank report.

Success metric:

On 50 sample issues, maintainers would agree with suggested action 70%+ of the time.

### Project 4: Repro Pack

Purpose:

Help contributors produce safe, reviewable reproduction evidence before posting.

Why fourth:

Research shows forms help, but forms still cannot enforce rich reproducibility. Repro Pack is our most original future feature.

Scope:

- Local interactive prompt.
- Markdown bundle output.
- No automatic upload.
- Secret warning checklist.
- Runtime/environment fields.
- Minimal reproduction steps.
- Optional logs pasted by user.

Success metric:

A contributor can generate a cleaner bug report without exposing secrets or running untrusted code.

### Project 5: Maintainer Pilot Kit

Purpose:

Make safe adoption easy.

Why fifth:

OpenAI OSS readiness and community growth require evidence. Pilots need a clean package.

Scope:

- Pilot checklist.
- Dry-run workflow.
- Evidence summary template.
- Before/after report.
- Maintainer feedback form.
- False-positive log.

Success metric:

A maintainer can test the project in dry-run mode in under 15 minutes.

### Project 6: Optional AI Bridge

Purpose:

Only after traction, provide optional integration points for maintainers who already have GitHub Models/OpenAI/Codex support.

Why last:

It violates the current core wedge if done early.

Scope:

- Disabled by default.
- Separate package or plugin.
- No paid requirement in core.
- Clear privacy warnings.
- Uses maintainer-provided infrastructure only.

Success metric:

Core remains fully useful without AI. AI never becomes required.

## Recommended 90-Day Sequence

### Weeks 1-2

Research-only benchmark setup:

- Define benchmark schema.
- Collect 20 public repo template setups.
- Run current audit manually.
- Write findings report.

### Weeks 3-4

Issue Form Doctor upgrade:

- Add better scoring categories.
- Add suggested-fix text.
- Add markdown report output.
- Add benchmark docs.

### Weeks 5-6

Dry-run Intake Doctor upgrade:

- Add confidence levels.
- Add more sample issues.
- Improve duplicate explanation.
- Add false-positive examples.

### Weeks 7-8

Repro Pack alpha plan and docs:

- Define CLI prompts.
- Define output file.
- Define secret checklist.
- Write sample Repro Packs.

### Weeks 9-10

Pilot kit:

- Finalize public README.
- Remove placeholders.
- Add screenshots/log snippets.
- Prepare maintainer-friendly guide.

### Weeks 11-12

Decision point:

- If benchmark evidence is strong, prepare public launch.
- If a friendly maintainer is available, ask approval before outreach.
- Apply to OpenAI OSS when there is public adoption or pilot evidence.

## Keep For Later, With Evidence

- Hosted SaaS dashboard.
- Paid API integration.
- Generic AI triage positioning.
- Auto-close duplicates.
- Auto-post public comments by default.
- GitHub App requiring broad permissions.
- Maintainer outreach automation.
- OpenAI OSS application before evidence.

## Best One-Line Direction

```text
Build the no-cost preflight and dry-run toolkit that helps maintainers improve issue quality before they trust AI automation.
```

## Final Recommendation

The next project should be:

```text
Public Repo Template Benchmark Pack
```

That gives us evidence, product direction, and credibility without spending money or contacting anyone.

After that, improve Issue Form Doctor based on the benchmark, then move to Repro Pack.
