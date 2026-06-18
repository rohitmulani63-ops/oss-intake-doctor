import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  analyzeIssue,
  findPossibleDuplicates,
  formatMaintainerSummary,
  type ExistingIssue,
  type IssueInput,
} from "../packages/core/src/index.ts";

const issuesDir = fileURLToPath(new URL("../examples/issues", import.meta.url));
const existingIssues = readJson<ExistingIssue[]>("existing-issues.json");

for (const fileName of readdirSync(issuesDir)) {
  if (!fileName.endsWith(".json") || fileName === "existing-issues.json") {
    continue;
  }

  const issue = readJson<IssueInput>(fileName);
  const analysis = analyzeIssue(issue);
  const duplicates = findPossibleDuplicates(issue, existingIssues);

  console.log(`\n=== ${basename(fileName, ".json")} ===`);
  console.log(`Title: ${issue.title}\n`);
  console.log(formatMaintainerSummary(analysis, duplicates));
}

function readJson<T>(fileName: string): T {
  const path = join(issuesDir, fileName);
  return JSON.parse(readFileSync(path, "utf8")) as T;
}
