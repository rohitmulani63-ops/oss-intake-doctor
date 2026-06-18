import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import {
  buildIssueTemplateAuditJsonReport,
  buildIssueTemplateAuditMarkdownReport,
  buildIssueTemplateAuditReport,
} from "../../scripts/template-audit.ts";

describe("template audit script", () => {
  it("builds a report from local issue-template files", async () => {
    const root = await mkdtemp(join(tmpdir(), "oss-intake-template-audit-"));
    const templateDir = join(root, ".github", "ISSUE_TEMPLATE");

    await mkdir(templateDir, { recursive: true });

    await writeFile(
      join(templateDir, "config.yml"),
      [
        "blank_issues_enabled: false",
        "contact_links:",
        "  - name: Support questions",
        "    url: https://github.com/example/repo/discussions",
        "  - name: Security reports",
        "    url: https://github.com/example/repo/security/policy",
      ].join("\n")
    );

    await writeFile(
      join(templateDir, "bug_report.yml"),
      [
        "name: Bug report",
        "description: Report a reproducible bug.",
        "title: \"[Bug]: \"",
        "labels: [\"bug\"]",
        "body:",
        "  - type: input",
        "    id: version",
        "    attributes:",
        "      label: Version",
        "    validations:",
        "      required: true",
        "  - type: input",
        "    id: environment",
        "    attributes:",
        "      label: Environment",
        "    validations:",
        "      required: true",
        "  - type: textarea",
        "    id: steps",
        "    attributes:",
        "      label: Steps to reproduce",
        "    validations:",
        "      required: true",
        "  - type: textarea",
        "    id: expected",
        "    attributes:",
        "      label: Expected behavior",
        "    validations:",
        "      required: true",
        "  - type: textarea",
        "    id: actual",
        "    attributes:",
        "      label: Actual behavior",
        "    validations:",
        "      required: true",
        "  - type: textarea",
        "    id: logs",
        "    attributes:",
        "      label: Logs or error output",
      ].join("\n")
    );

    try {
      const report = buildIssueTemplateAuditReport(root);

      assert.match(report, /Files audited: 2/);
      assert.match(report, /Score: 100\/100/);
      assert.match(report, /- none/);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("builds a markdown report for maintainer review", async () => {
    const root = await mkdtemp(join(tmpdir(), "oss-intake-template-audit-"));
    const templateDir = join(root, ".github", "ISSUE_TEMPLATE");

    await mkdir(templateDir, { recursive: true });
    await writeFile(join(templateDir, "config.yml"), "blank_issues_enabled: true");

    try {
      const report = buildIssueTemplateAuditMarkdownReport(root);

      assert.match(report, /^# OSS Intake Doctor Issue-Template Audit/);
      assert.match(report, /\| Overall score \| 60\/100 \|/);
      assert.match(report, /\| routing \| 70\/100 \|/);
      assert.match(report, /\| warning \| routing \| `.github\/ISSUE_TEMPLATE\/config.yml` \| set blank_issues_enabled: false to reduce low-quality blank issues \| Add `blank_issues_enabled: false` to route contributors into structured choices\. \|/);
      assert.match(report, /## Next Maintainer Step/);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("builds a stable JSON report for local automation", async () => {
    const root = await mkdtemp(join(tmpdir(), "oss-intake-template-audit-"));
    const templateDir = join(root, ".github", "ISSUE_TEMPLATE");

    await mkdir(templateDir, { recursive: true });
    await writeFile(join(templateDir, "config.yml"), "blank_issues_enabled: true");

    try {
      const report = JSON.parse(buildIssueTemplateAuditJsonReport(root));

      assert.equal(report.tool, "oss-intake-doctor");
      assert.equal(report.reportType, "issue-template-audit");
      assert.equal(report.filesAudited, 1);
      assert.equal(report.score, 60);
      assert.deepEqual(report.categoryScores, {
        "bug-report": 100,
        privacy: 100,
        routing: 70,
        syntax: 90,
      });
      assert.equal(report.findings[0].path, ".github/ISSUE_TEMPLATE/config.yml");
      assert.equal(report.findings[0].severity, "warning");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
