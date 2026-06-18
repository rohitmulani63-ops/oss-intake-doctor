# Public Repo Template Benchmark - 2026-06-17

## Purpose

This benchmark checks whether real open-source repositories have consistent issue-intake setup across `.github/ISSUE_TEMPLATE`.

It supports the OSS Intake Doctor thesis:

```text
Open-source maintainers need no-cost, local, preflight intake checks before they trust heavier automation.
```

## Method

Checked 20 public repositories from their public GitHub web pages and raw template files.

No GitHub account actions, paid APIs, or external AI services were used.

The benchmark looked for:

- Template files present.
- Issue forms versus markdown templates.
- `blank_issues_enabled: false`.
- Support routing.
- Security or vulnerability routing.
- Bug-report coverage for version, environment, reproduction, expected behavior, actual behavior, and logs/error output.
- Whether the product should report category-level quality instead of only a blended score.

Important note:

This is a maintainer-intake signal scan, not a criticism of any project. Mature repositories have different workflows, legacy constraints, and project-specific routing decisions.

## Summary

```text
Repositories checked: 20
Repositories successfully analyzed: 20
Repos disabling blank issues: 15/20
Repos with support route signals: 19/20
Repos with security route signals: 7/20
Repos using YAML issue forms: 18/20
Repos using markdown-only templates: 2/20
Repos whose bug template covered all 6 checked fields: 7/20
```

## Benchmark Table

| Repo | Files | Forms | Markdown | Blank Disabled | Support Route | Security Route | Bug Fields | Opportunity |
|---|---:|---:|---:|---|---|---|---|---|
| microsoft/vscode | 4 | 0 | 3 | yes | yes | no | 4/6 | security route; markdown-to-form migration; bug fields: expected/actual |
| kubernetes/kubernetes | 5 | 4 | 0 | no | yes | yes | 5/6 | blank issues policy review; bug fields: logs |
| nodejs/node | 5 | 4 | 0 | no | yes | no | 5/6 | blank issues policy review; security route; bug fields: logs |
| python/cpython | 5 | 4 | 0 | no | yes | no | 6/6 | blank issues policy review; security route |
| rust-lang/rust | 12 | 3 | 8 | no | yes | no | 5/6 | blank issues policy review; security route; bug fields: actual |
| tensorflow/tensorflow | 6 | 1 | 4 | yes | yes | no | 6/6 | security route |
| pytorch/pytorch | 10 | 5 | 4 | yes | yes | yes | 5/6 | bug fields: environment |
| vercel/next.js | 4 | 3 | 0 | yes | yes | no | 5/6 | security route; bug fields: logs |
| angular/angular | 6 | 5 | 0 | yes | yes | yes | 6/6 | none obvious |
| vuejs/core | 2 | 1 | 0 | yes | yes | no | 5/6 | security route; bug fields: logs |
| electron/electron | 4 | 3 | 0 | yes | yes | no | 5/6 | security route; bug fields: logs |
| home-assistant/core | 3 | 2 | 0 | yes | yes | no | 5/6 | security route; bug fields: expected |
| ansible/ansible | 6 | 4 | 1 | yes | yes | yes | 6/6 | none obvious |
| elastic/kibana | 5 | 1 | 3 | no | yes | yes | 6/6 | blank issues policy review |
| grafana/grafana | 6 | 2 | 3 | yes | yes | yes | 4/6 | bug fields: expected/logs |
| hashicorp/terraform | 3 | 2 | 0 | yes | yes | no | 6/6 | security route |
| moby/moby | 3 | 2 | 0 | yes | yes | yes | 6/6 | none obvious |
| rails/rails | 2 | 0 | 1 | yes | no | no | 4/6 | security route; support route; markdown-to-form migration; bug fields: environment/logs |
| Homebrew/brew | 3 | 2 | 0 | yes | yes | no | 2/6 | security route; bug fields: version/environment/expected/logs |
| microsoft/TypeScript | 7 | 5 | 1 | yes | yes | no | 3/6 | security route; bug fields: environment/repro/logs |

## Sources

- https://github.com/microsoft/vscode/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/kubernetes/kubernetes/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/nodejs/node/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/python/cpython/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/rust-lang/rust/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/tensorflow/tensorflow/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/pytorch/pytorch/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/vercel/next.js/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/angular/angular/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/vuejs/core/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/electron/electron/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/home-assistant/core/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/ansible/ansible/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/elastic/kibana/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/grafana/grafana/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/hashicorp/terraform/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/moby/moby/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/rails/rails/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/Homebrew/brew/tree/HEAD/.github/ISSUE_TEMPLATE
- https://github.com/microsoft/TypeScript/tree/HEAD/.github/ISSUE_TEMPLATE

## Interpretation

The benchmark supports three conclusions:

1. Issue intake is real infrastructure, not a cosmetic README detail.
2. Even mature repositories make different tradeoffs, so maintainers benefit from a local preflight report rather than a one-size-fits-all rule.
3. The most defensible OSS Intake Doctor wedge is pre-submission quality and dry-run evidence, not generic AI triage.

## Product Implications

Next improvements should prioritize:

- Category scoring instead of one blended score. Completed in local MVP after this benchmark.
- Suggested fixes for each opportunity. Completed in local MVP after this benchmark.
- A markdown benchmark output command.
- Clear differentiation between GitHub syntax validity and maintainer-intake quality.
- Checkbox option collision checks and GitHub-compatible duplicate-label handling. Completed in local MVP after GitHub Docs review.

See [GitHub Research Refresh - 2026-06-17](github-research-refresh-2026-06-17.md) for the follow-up research that turned this benchmark into product upgrades.
