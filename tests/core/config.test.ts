import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  analyzeIssue,
  findPossibleDuplicates,
  formatMaintainerSummary,
  type IntakeConfig,
} from "../../packages/core/src/index.ts";

const config: IntakeConfig = {
  labels: {
    bug: "type/bug",
    needsInfo: "status/needs-info",
    reproNeeded: "status/repro-needed",
    lowSignal: "signal/low",
    highSignal: "signal/high",
    support: "type/support",
    security: "type/security-review",
    featureRequest: "type/feature",
  },
  requiredFields: {
    bug: ["version", "reproduction_steps"],
  },
  routing: {
    supportUrl: "https://github.com/example/repo/discussions",
    securityUrl: "https://github.com/example/repo/security/policy",
  },
  duplicateThreshold: 0.8,
};

describe("configurable analysis", () => {
  it("uses custom bug required fields and custom labels", () => {
    const result = analyzeIssue(
      {
        title: "App not working",
        body: "It crashes. Please fix fast.",
      },
      config
    );

    assert.equal(result.likelyType, "bug");
    assert.equal(result.actionability, "not-actionable");
    assert.deepEqual(result.missing, ["version", "reproduction_steps"]);
    assert.deepEqual(result.labels, [
      "type/bug",
      "status/needs-info",
      "status/repro-needed",
      "signal/low",
    ]);
    assert.equal(result.nextAction, "ask reporter for version and reproduction steps");
  });

  it("includes configured support route in the maintainer summary", () => {
    const result = analyzeIssue(
      {
        title: "How do I configure the CLI?",
        body: "Question: where should I ask setup questions?",
      },
      config
    );

    assert.equal(result.actionability, "route-support");
    assert.deepEqual(result.labels, ["type/support"]);
    assert.equal(
      result.nextAction,
      "route reporter to support or discussions: https://github.com/example/repo/discussions"
    );
  });

  it("includes configured security route in the maintainer summary", () => {
    const result = analyzeIssue(
      {
        title: "Possible token leak vulnerability",
        body: "I found a secret leak that may expose credentials.",
      },
      config
    );

    assert.equal(result.actionability, "route-private-security");
    assert.deepEqual(result.labels, ["type/security-review"]);
    assert.equal(
      result.nextAction,
      "route reporter to private security reporting before public discussion: https://github.com/example/repo/security/policy"
    );
  });

  it("uses configured duplicate threshold", () => {
    const duplicates = findPossibleDuplicates(
      {
        title: "CSV export crashes on Windows",
        body: "Version 1.4.2. Export CSV crashes on Windows 11.",
      },
      [
        {
          number: 12,
          title: "Windows CSV export crash",
          body: "CSV export fails on Windows 11 with Cannot read properties of undefined.",
        },
      ],
      config
    );

    assert.deepEqual(duplicates, []);
  });

  it("keeps formatted summaries short with configured labels", () => {
    const result = analyzeIssue(
      {
        title: "App not working",
        body: "It crashes. Please fix fast.",
      },
      config
    );

    assert.equal(
      formatMaintainerSummary(result),
      [
        "OSS Intake Doctor summary",
        "",
        "Likely type: bug",
        "Actionability: needs-info",
        "Missing: version, reproduction steps",
        "Suggested labels: type/bug, status/needs-info, status/repro-needed, signal/low",
        "Suggested next action: ask reporter for version and reproduction steps",
      ].join("\n")
    );
  });
});
