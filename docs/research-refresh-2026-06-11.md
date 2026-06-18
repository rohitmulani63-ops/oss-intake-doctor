# Research Refresh - 2026-06-11

## Question

How can OSS Intake Doctor become stronger after another current-market research pass?

## Short Answer

The best upgrade is to move earlier in the intake flow.

Generic AI issue triage is crowded. GitHub itself documents an AI-powered issue intake tool, and the Marketplace has many issue triage actions.

The better path is:

```text
Issue Form Doctor + Dry-Run Intake Doctor + Future Repro Pack
```

That means OSS Intake Doctor should help maintainers before, during, and after issue submission:

1. Before: audit GitHub issue forms and template chooser setup.
2. During: guide contributors through better required fields and routing.
3. After: dry-run analyze submitted issues for missing info, duplicates, support, and security-sensitive routing.
4. Future: help contributors generate safe Repro Packs.

## Current Evidence

### GitHub Issue Forms Are Native Intake Infrastructure

GitHub Docs say issue forms can define input types, validations, default assignees, and labels.

Source:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms

GitHub Docs also say issue forms encourage contributors to include specific, structured information.

Source:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

Implication:

OSS Intake Doctor should not ignore issue forms. It should audit and improve them.

### Template Chooser Configuration Is Strategic

GitHub supports `blank_issues_enabled: false` and `contact_links` for routing support or security reports away from public blank issues.

Source:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

Implication:

Template chooser audit is a strong no-cost feature. It helps maintainers prevent weak issues before bots need to react.

### GitHub Itself Has AI Issue Intake

GitHub Docs describe an AI-powered issue intake tool that analyzes incoming issues and provides suggestions for triage.

Source:

- https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/triaging-an-issue-with-ai

Implication:

Do not compete as a generic AI issue triage bot. GitHub is already there.

### The AI Marketplace Is Crowded

GitHub Marketplace search for "triage" shows many actions, including AI-powered issue triage and duplicate tools.

Source:

- https://github.com/marketplace?query=triage&type=actions

The GitHub-owned `ai-assessment-comment-labeler` evaluates labeled issues with an AI model, can post comments, and can apply AI-derived labels.

Source:

- https://github.com/github/ai-assessment-comment-labeler

Implication:

OSS Intake Doctor should stay distinct: no external AI, no paid key, dry-run first, explainable rules, issue-form audit.

### There Are Issue Form Validators Already

`issue-ops/validator` validates submitted issues against issue forms and can use custom validation logic.

Source:

- https://github.com/issue-ops/validator

GitHub also has `issue-parser`, which parses issue form responses into structured JSON.

Source:

- https://github.com/github/issue-parser

Implication:

OSS Intake Doctor should not claim there are no validators. Its angle is broader and safer: audit templates, audit chooser routing, analyze submitted issues, and produce maintainer-facing dry-run evidence without dependencies.

### GitHub Issue Forms Still Have Gaps

GitHub community discussions ask for more granular validation such as regex and max length. The discussion also says issue forms improved report quality, but missing validation can still let weak reproductions through.

Source:

- https://github.com/orgs/community/discussions/10227

Implication:

The future Repro Pack is still valuable. Forms help collect fields, but Repro Pack can help contributors prepare safer, more complete reproduction evidence.

## Product Upgrade From This Research

Added a new local capability:

```text
npm run audit:templates
```

This audits `.github/ISSUE_TEMPLATE` files locally and reports:

- Missing template chooser config.
- `blank_issues_enabled` not disabled.
- Missing support/security contact links.
- Issue forms with no input fields.
- Missing top-level issue form keys.
- Duplicate issue-form IDs or labels.
- Private-data-risk labels such as password, token, or secret.
- Bug forms missing version, environment, reproduction steps, expected behavior, actual behavior, or logs/error fields.

It uses no dependencies, no APIs, and no network calls.

## Updated Strategic Position

Best positioning now:

```text
OSS Intake Doctor is a no-cost maintainer intake quality toolkit: it audits GitHub issue forms before submission, dry-run analyzes issues after submission, and will later help contributors create safe Repro Packs.
```

Avoid:

```text
OSS Intake Doctor is an AI issue triage bot.
```

## Next Best Feature

Add an example `docs/issue-form-doctor.md` workflow that shows maintainers how to:

1. Audit their templates.
2. Fix weak issue forms.
3. Re-run the audit.
4. Run the issue-bank report.
5. Start a dry-run pilot.

