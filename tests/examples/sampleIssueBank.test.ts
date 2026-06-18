import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { analyzeIssue, type IssueInput } from "../../packages/core/src/index.ts";

describe("sample issue bank", () => {
  it("contains at least 30 locally analyzable sample issues", () => {
    const samples = JSON.parse(
      readFileSync("examples/issue-bank/sample-issues.json", "utf8")
    ) as IssueInput[];

    assert.ok(samples.length >= 30);

    for (const sample of samples) {
      assert.equal(typeof sample.title, "string");
      assert.equal(typeof sample.body, "string");
      assert.ok(sample.title.length > 0);

      const result = analyzeIssue(sample);
      assert.ok(result.labels.length > 0);
      assert.ok(result.nextAction.length > 0);
    }
  });
});

