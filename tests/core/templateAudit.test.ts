import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  auditIssueTemplates,
  formatIssueTemplateAudit,
  type IssueTemplateFile,
} from "../../packages/core/src/index.ts";

describe("auditIssueTemplates", () => {
  it("flags missing chooser config and weak bug issue forms", () => {
    const files: IssueTemplateFile[] = [
      {
        path: ".github/ISSUE_TEMPLATE/bug_report.yml",
        content: [
          "name: Bug report",
          "description: Report a bug.",
          "title: \"[Bug]: \"",
          "labels: [\"bug\"]",
          "body:",
          "  - type: markdown",
          "    attributes:",
          "      value: Thanks for the report",
        ].join("\n"),
      },
    ];

    const audit = auditIssueTemplates(files);

    assert.equal(audit.filesAudited, 1);
    assert.equal(audit.score, 50);
    assert.deepEqual(audit.categoryScores, {
      bugReport: 50,
      privacy: 100,
      routing: 80,
      syntax: 50,
    });
    assert.deepEqual(
      audit.findings.map((finding) => finding.message),
      [
        "missing .github/ISSUE_TEMPLATE/config.yml chooser config",
        "issue form body must include at least one non-markdown input field",
        "bug form should ask for version",
        "bug form should ask for environment",
        "bug form should ask for reproduction steps",
        "bug form should ask for expected behavior",
        "bug form should ask for actual behavior",
        "bug form should ask for logs or error output",
      ]
    );
  });

  it("accepts the current dry-run-first template setup", () => {
    const files: IssueTemplateFile[] = [
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/bug_report.yml",
        content: [
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
        ].join("\n"),
      },
    ];

    const audit = auditIssueTemplates(files);

    assert.equal(audit.score, 100);
    assert.deepEqual(audit.findings, []);
  });

  it("warns when critical bug fields are present but not required", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/bug_report.yml",
        content: [
          "name: Bug report",
          "description: Report a reproducible bug.",
          "body:",
          "  - type: input",
          "    id: version",
          "    attributes:",
          "      label: Version",
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
        ].join("\n"),
      },
    ]);

    assert.deepEqual(
      audit.findings.map((finding) => finding.message),
      ["bug form field should be required: version"]
    );
    assert.deepEqual(
      audit.findings.map((finding) => finding.suggestion),
      ["Add `validations: required: true` to the version field."]
    );
  });

  it("allows duplicate labels when controls have unique ids", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/question.yml",
        content: [
          "name: Question",
          "description: Ask a structured question.",
          "body:",
          "  - type: textarea",
          "    id: context_1",
          "    attributes:",
          "      label: Context",
          "  - type: textarea",
          "    id: context_2",
          "    attributes:",
          "      label: Context",
        ].join("\n"),
      },
    ]);

    assert.deepEqual(audit.findings, []);
  });

  it("flags duplicate checkbox option labels that GitHub cannot disambiguate", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/question.yml",
        content: [
          "name: Question",
          "description: Ask a structured question.",
          "body:",
          "  - type: checkboxes",
          "    id: affected",
          "    attributes:",
          "      label: Affected area",
          "      options:",
          "        - label: CLI",
          "        - label: CLI",
        ].join("\n"),
      },
    ]);

    assert.deepEqual(
      audit.findings.map((finding) => finding.message),
      ["duplicate issue-form label: cli"]
    );
    assert.equal(audit.findings[0].category, "syntax");
  });

  it("flags unsupported issue-form field types", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/bug_report.yml",
        content: [
          "name: Bug report",
          "description: Report a bug.",
          "body:",
          "  - type: textbox",
          "    id: version",
          "    attributes:",
          "      label: Version",
        ].join("\n"),
      },
    ]);

    assert.equal(audit.findings[0].message, "unsupported issue-form field type: textbox");
    assert.equal(audit.findings[0].category, "syntax");
  });

  it("does not require optional top-level issue-form title", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/bug_report.yml",
        content: [
          "name: Bug report",
          "description: Report a reproducible bug.",
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
        ].join("\n"),
      },
    ]);

    assert.deepEqual(audit.findings, []);
  });

  it("does not apply bug-field checks to non-bug forms that mention bugs in body text", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: [
          "blank_issues_enabled: false",
          "contact_links:",
          "  - name: Support questions",
          "    url: https://github.com/OWNER/REPO/discussions",
          "  - name: Security reports",
          "    url: https://github.com/OWNER/REPO/security/policy",
        ].join("\n"),
      },
      {
        path: ".github/ISSUE_TEMPLATE/task.yml",
        content: [
          "name: Maintainer task",
          "description: Track a maintainer task.",
          "body:",
          "  - type: textarea",
          "    id: context",
          "    attributes:",
          "      label: Context",
          "      description: Mention related bugs if this task came from an issue.",
        ].join("\n"),
      },
    ]);

    assert.deepEqual(audit.findings, []);
  });
});

describe("formatIssueTemplateAudit", () => {
  it("formats findings for a local maintainer report", () => {
    const audit = auditIssueTemplates([
      {
        path: ".github/ISSUE_TEMPLATE/config.yml",
        content: "blank_issues_enabled: true",
      },
    ]);

    assert.equal(
      formatIssueTemplateAudit(audit),
      [
        "OSS Intake Doctor issue-template audit",
        "",
        "Files audited: 1",
        "Score: 60/100",
        "",
        "Category scores:",
        "- bug-report: 100/100",
        "- privacy: 100/100",
        "- routing: 70/100",
        "- syntax: 90/100",
        "",
        "Findings:",
        "- warning routing .github/ISSUE_TEMPLATE/config.yml: set blank_issues_enabled: false to reduce low-quality blank issues",
        "  suggestion: Add `blank_issues_enabled: false` to route contributors into structured choices.",
        "- warning routing .github/ISSUE_TEMPLATE/config.yml: add contact_links for support and security routing",
        "  suggestion: Add `contact_links` for Discussions/support and private security reporting.",
        "- warning routing .github/ISSUE_TEMPLATE/config.yml: add a support contact link, usually GitHub Discussions",
        "  suggestion: Add a `contact_links` entry that routes usage questions to Discussions or support.",
        "- warning syntax .github/ISSUE_TEMPLATE: add at least one issue form template",
        "  suggestion: Add at least one YAML issue form with structured fields.",
      ].join("\n")
    );
  });
});
