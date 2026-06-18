import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import { buildIssueTemplateAuditReport } from "../../scripts/template-audit.ts";

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
});
