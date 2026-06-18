import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildDryRunOutput, runDryRunFromFiles } from "../../packages/action/src/index.ts";

describe("buildDryRunOutput", () => {
  it("formats dry-run output from a GitHub issue event without network calls", () => {
    const output = buildDryRunOutput(
      {
        action: "opened",
        repository: {
          full_name: "example/repo",
        },
        issue: {
          number: 44,
          title: "CSV export crashes on Windows",
          body: "Version 1.4.2. Export CSV crashes on Windows 11 with Cannot read properties of undefined.",
          html_url: "https://github.com/example/repo/issues/44",
        },
      },
      [
        {
          number: 12,
          title: "Windows CSV export crash",
          body: "CSV export fails on Windows 11 with Cannot read properties of undefined.",
          url: "https://github.com/example/repo/issues/12",
        },
      ]
    );

    assert.equal(
      output,
      [
        "OSS Intake Doctor dry run",
        "Repository: example/repo",
        "Issue: #44 - CSV export crashes on Windows",
        "URL: https://github.com/example/repo/issues/44",
        "",
        "OSS Intake Doctor summary",
        "",
        "Likely type: bug",
        "Actionability: needs-info",
        "Missing: reproduction steps, expected behavior, actual behavior",
        "Possible duplicate: #12 - Windows CSV export crash",
        "Suggested labels: bug, needs-info, repro-needed, low-signal",
        "Suggested next action: ask reporter for reproduction steps, expected behavior, and actual behavior",
      ].join("\n")
    );
  });

  it("uses config for labels, routes, and duplicate threshold", () => {
    const output = buildDryRunOutput(
      {
        action: "opened",
        repository: {
          full_name: "example/repo",
        },
        issue: {
          number: 45,
          title: "App not working",
          body: "It crashes. Please fix fast.",
          html_url: "https://github.com/example/repo/issues/45",
        },
      },
      [],
      {
        labels: {
          bug: "type/bug",
          needsInfo: "status/needs-info",
          reproNeeded: "status/repro-needed",
          lowSignal: "signal/low",
        },
        requiredFields: {
          bug: ["version", "reproduction_steps"],
        },
      }
    );

    assert.equal(
      output,
      [
        "OSS Intake Doctor dry run",
        "Repository: example/repo",
        "Issue: #45 - App not working",
        "URL: https://github.com/example/repo/issues/45",
        "",
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

  it("loads config from a local file in dry-run mode", () => {
    const output = runDryRunFromFiles(
      "examples/events/issue-opened.json",
      "examples/issues/existing-issues.json",
      "examples/config/oss-intake.config.json"
    );

    assert.match(output, /Suggested labels: type\/bug, status\/needs-info, status\/repro-needed, signal\/low/);
    assert.match(output, /Missing: reproduction steps, expected behavior, actual behavior/);
  });

  it("prints config warnings in dry-run mode", () => {
    const output = buildDryRunOutput(
      {
        action: "opened",
        repository: {
          full_name: "example/repo",
        },
        issue: {
          number: 46,
          title: "App not working",
          body: "It crashes. Please fix fast.",
          html_url: "https://github.com/example/repo/issues/46",
        },
      },
      [],
      {
        labels: {
          bug: "",
        },
        duplicateThreshold: 2,
      } as never
    );

    assert.match(output, /Config warnings:/);
    assert.match(output, /- labels\.bug: label must be a non-empty string/);
    assert.match(output, /- duplicateThreshold: duplicateThreshold must be between 0 and 1/);
    assert.match(output, /Suggested labels: bug, needs-info, repro-needed, low-signal/);
  });
});
