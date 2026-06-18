import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { buildIssueBankReport, formatIssueBankReport } from "../../scripts/report.ts";
import type { IssueInput } from "../../packages/core/src/index.ts";

describe("issue bank report", () => {
  it("summarizes local sample issue outcomes", () => {
    const samples = JSON.parse(
      readFileSync("examples/issue-bank/sample-issues.json", "utf8")
    ) as IssueInput[];

    const report = buildIssueBankReport(samples);

    assert.equal(report.totalIssues, 30);
    assert.equal(report.byType.bug, 9);
    assert.equal(report.byType["feature-request"], 5);
    assert.equal(report.byType["support-question"], 6);
    assert.equal(report.byType.documentation, 5);
    assert.equal(report.byType["security-sensitive"], 5);
    assert.equal(report.byActionability["not-actionable"], 3);
    assert.equal(report.byActionability.actionable, 16);
    assert.equal(report.byActionability["route-support"], 6);
    assert.equal(report.byActionability["route-private-security"], 5);
  });

  it("formats the report for maintainer-facing demos", () => {
    const report = buildIssueBankReport([
      {
        title: "App not working",
        body: "It crashes. Please fix fast.",
      },
      {
        title: "How do I set this up?",
        body: "Question: can someone explain setup?",
      },
    ]);

    assert.equal(
      formatIssueBankReport(report),
      [
        "OSS Intake Doctor local report",
        "",
        "Total issues analyzed: 2",
        "",
        "By type:",
        "- bug: 1",
        "- support-question: 1",
        "",
        "By actionability:",
        "- not-actionable: 1",
        "- route-support: 1",
        "",
        "Top suggested labels:",
        "- bug: 1",
        "- low-signal: 1",
        "- needs-info: 1",
        "- repro-needed: 1",
        "- support: 1",
      ].join("\n")
    );
  });
});
