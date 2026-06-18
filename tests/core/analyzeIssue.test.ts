import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  analyzeIssue,
  findPossibleDuplicates,
  formatMaintainerSummary,
} from "../../packages/core/src/index.ts";

describe("analyzeIssue", () => {
  it("marks a complete bug report as actionable", () => {
    const result = analyzeIssue({
      title: "Crash when exporting CSV on Windows",
      body: [
        "Version: 1.4.2",
        "OS: Windows 11",
        "Steps to reproduce:",
        "1. Open the reports page",
        "2. Click Export CSV",
        "Expected behavior: the CSV downloads",
        "Actual behavior: the app crashes",
        "Error: Cannot read properties of undefined",
      ].join("\n"),
    });

    assert.equal(result.likelyType, "bug");
    assert.equal(result.actionability, "actionable");
    assert.deepEqual(result.missing, []);
    assert.deepEqual(result.labels, ["bug", "high-signal"]);
    assert.equal(result.nextAction, "maintainer can review the report");
  });

  it("marks an incomplete bug report as needs-info", () => {
    const result = analyzeIssue({
      title: "App not working",
      body: "It crashes. Please fix fast.",
    });

    assert.equal(result.likelyType, "bug");
    assert.equal(result.actionability, "not-actionable");
    assert.deepEqual(result.missing, [
      "version",
      "environment",
      "reproduction_steps",
      "expected_behavior",
      "actual_behavior",
      "logs_or_error",
    ]);
    assert.deepEqual(result.labels, ["bug", "needs-info", "repro-needed", "low-signal"]);
    assert.equal(
      result.nextAction,
      "ask reporter for version, environment, reproduction steps, expected behavior, actual behavior, and logs or error"
    );
  });

  it("routes support questions away from the bug queue", () => {
    const result = analyzeIssue({
      title: "How do I connect this to Stripe?",
      body: "Question: can someone explain the correct setup? I am not reporting a bug.",
    });

    assert.equal(result.likelyType, "support-question");
    assert.equal(result.actionability, "route-support");
    assert.deepEqual(result.missing, []);
    assert.deepEqual(result.labels, ["support"]);
    assert.equal(result.nextAction, "route reporter to support or discussions");
  });

  it("routes security-sensitive reports privately", () => {
    const result = analyzeIssue({
      title: "Possible auth bypass vulnerability",
      body: "I found an exploit that may allow account takeover. Should I post details here?",
    });

    assert.equal(result.likelyType, "security-sensitive");
    assert.equal(result.actionability, "route-private-security");
    assert.deepEqual(result.missing, []);
    assert.deepEqual(result.labels, ["security-review"]);
    assert.equal(result.nextAction, "route reporter to private security reporting before public discussion");
  });

  it("classifies feature requests without demanding bug reproduction fields", () => {
    const result = analyzeIssue({
      title: "Feature request: add CSV import",
      body: "Problem: users manually copy data. Proposed solution: add CSV import. Impact: faster onboarding.",
    });

    assert.equal(result.likelyType, "feature-request");
    assert.equal(result.actionability, "actionable");
    assert.deepEqual(result.missing, []);
    assert.deepEqual(result.labels, ["feature-request", "high-signal"]);
  });
});

describe("findPossibleDuplicates", () => {
  it("suggests duplicates conservatively from local issue text", () => {
    const duplicates = findPossibleDuplicates(
      {
        title: "CSV export crashes on Windows",
        body: "Version 1.4.2. Export CSV crashes on Windows 11 with Cannot read properties of undefined.",
      },
      [
        {
          number: 12,
          title: "Windows CSV export crash",
          body: "CSV export fails on Windows 11 with Cannot read properties of undefined.",
          url: "https://github.com/example/repo/issues/12",
        },
        {
          number: 13,
          title: "Add dark mode",
          body: "Please add dark mode to the settings page.",
          url: "https://github.com/example/repo/issues/13",
        },
      ]
    );

    assert.equal(duplicates.length, 1);
    assert.equal(duplicates[0].number, 12);
    assert.ok(duplicates[0].score >= 0.35);
  });
});

describe("formatMaintainerSummary", () => {
  it("formats a short maintainer summary", () => {
    const result = analyzeIssue({
      title: "App not working",
      body: "It crashes. Please fix fast.",
    });

    const summary = formatMaintainerSummary(result, [
      {
        number: 12,
        title: "Windows CSV export crash",
        url: "https://github.com/example/repo/issues/12",
        score: 0.42,
      },
    ]);

    assert.equal(
      summary,
      [
        "OSS Intake Doctor summary",
        "",
        "Likely type: bug",
        "Actionability: needs-info",
        "Missing: version, environment, reproduction steps, expected behavior, actual behavior, logs or error",
        "Possible duplicate: #12 - Windows CSV export crash",
        "Suggested labels: bug, needs-info, repro-needed, low-signal",
        "Suggested next action: ask reporter for version, environment, reproduction steps, expected behavior, actual behavior, and logs or error",
      ].join("\n")
    );
  });
});
