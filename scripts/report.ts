import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  analyzeIssue,
  formatActionability,
  type Actionability,
  type IssueInput,
  type IssueType,
} from "../packages/core/src/index.ts";

export type IssueBankReport = {
  totalIssues: number;
  byType: Partial<Record<IssueType, number>>;
  byActionability: Partial<Record<Actionability, number>>;
  labelCounts: Record<string, number>;
};

export function buildIssueBankReport(issues: IssueInput[]): IssueBankReport {
  const report: IssueBankReport = {
    totalIssues: issues.length,
    byType: {},
    byActionability: {},
    labelCounts: {},
  };

  for (const issue of issues) {
    const analysis = analyzeIssue(issue);
    increment(report.byType, analysis.likelyType);
    increment(report.byActionability, analysis.actionability);

    for (const label of analysis.labels) {
      increment(report.labelCounts, label);
    }
  }

  return report;
}

export function formatIssueBankReport(report: IssueBankReport): string {
  return [
    "OSS Intake Doctor local report",
    "",
    `Total issues analyzed: ${report.totalIssues}`,
    "",
    "By type:",
    ...formatCounts(report.byType),
    "",
    "By actionability:",
    ...formatCounts(report.byActionability, formatActionability),
    "",
    "Top suggested labels:",
    ...formatCounts(report.labelCounts),
  ].join("\n");
}

function increment<T extends string>(counts: Partial<Record<T, number>>, key: T): void {
  counts[key] = (counts[key] ?? 0) + 1;
}

function formatCounts(
  counts: Record<string, number> | Partial<Record<string, number>>,
  formatKey: (key: string) => string = (key) => key
): string[] {
  return Object.entries(counts)
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => {
      return rightValue - leftValue || leftKey.localeCompare(rightKey);
    })
    .map(([key, value]) => `- ${formatKey(key)}: ${value}`);
}

function readIssueBank(path: string): IssueInput[] {
  return JSON.parse(readFileSync(path, "utf8")) as IssueInput[];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const path = process.argv[2] ?? "examples/issue-bank/sample-issues.json";
  console.log(formatIssueBankReport(buildIssueBankReport(readIssueBank(path))));
}
