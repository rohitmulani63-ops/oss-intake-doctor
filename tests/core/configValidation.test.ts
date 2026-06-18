import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  analyzeIssue,
  findPossibleDuplicates,
  validateConfig,
  type IntakeConfig,
} from "../../packages/core/src/index.ts";

describe("validateConfig", () => {
  it("accepts the default empty config", () => {
    assert.deepEqual(validateConfig({}), []);
  });

  it("reports invalid labels, fields, routes, and thresholds", () => {
    const config = {
      labels: {
        bug: "",
        support: 123,
      },
      requiredFields: {
        bug: ["version", "version", "unknown_field"],
      },
      routing: {
        supportUrl: "github.com/example/repo/discussions",
        securityUrl: "https://github.com/example/repo/security/policy",
      },
      duplicateThreshold: 1.5,
    } as IntakeConfig;

    assert.deepEqual(validateConfig(config), [
      {
        path: "labels.bug",
        message: "label must be a non-empty string",
      },
      {
        path: "labels.support",
        message: "label must be a non-empty string",
      },
      {
        path: "requiredFields.bug[1]",
        message: "duplicate required field: version",
      },
      {
        path: "requiredFields.bug[2]",
        message: "unknown required field: unknown_field",
      },
      {
        path: "routing.supportUrl",
        message: "route must be an http(s) URL",
      },
      {
        path: "duplicateThreshold",
        message: "duplicateThreshold must be between 0 and 1",
      },
    ]);
  });

  it("ignores invalid label overrides during analysis", () => {
    const result = analyzeIssue(
      {
        title: "App not working",
        body: "It crashes. Please fix fast.",
      },
      {
        labels: {
          bug: "",
          needsInfo: "status/needs-info",
        },
      } as IntakeConfig
    );

    assert.deepEqual(result.labels, [
      "bug",
      "status/needs-info",
      "repro-needed",
      "low-signal",
    ]);
  });

  it("falls back to the default duplicate threshold when configured threshold is invalid", () => {
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
        },
      ],
      {
        duplicateThreshold: 2,
      }
    );

    assert.equal(duplicates.length, 1);
  });
});
