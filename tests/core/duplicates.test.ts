import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findPossibleDuplicates } from "../../packages/core/src/index.ts";

describe("stronger duplicate detection", () => {
  it("weights shared title terms and explains why a duplicate was suggested", () => {
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
          body: "Please add dark mode to settings.",
          url: "https://github.com/example/repo/issues/13",
        },
      ]
    );

    assert.equal(duplicates.length, 1);
    assert.equal(duplicates[0].number, 12);
    assert.ok(duplicates[0].score >= 0.7);
    assert.deepEqual(duplicates[0].reasons, [
      "shared title terms: crash, csv, export, windows",
      "shared body terms: 11, cannot, csv, export, properties, read, undefined, windows",
    ]);
  });
});

