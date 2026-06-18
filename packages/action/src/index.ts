import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  analyzeIssue,
  findPossibleDuplicates,
  formatMaintainerSummary,
  validateConfig,
  type ExistingIssue,
  type IntakeConfig,
  type IssueInput,
} from "../../core/src/index.ts";

export type GitHubIssueEvent = {
  action?: string;
  repository?: {
    full_name?: string;
  };
  issue?: {
    number?: number;
    title?: string;
    body?: string | null;
    html_url?: string;
  };
};

export function buildDryRunOutput(
  event: GitHubIssueEvent,
  existingIssues: ExistingIssue[] = [],
  config: IntakeConfig = {}
): string {
  const issue = extractIssue(event);
  const repository = event.repository?.full_name ?? "unknown/repository";
  const configWarnings = validateConfig(config);
  const analysis = analyzeIssue(issue, config);
  const duplicates = findPossibleDuplicates(issue, existingIssues, config);

  const lines = [
    "OSS Intake Doctor dry run",
    `Repository: ${repository}`,
    `Issue: #${event.issue?.number ?? "unknown"} - ${issue.title}`,
    `URL: ${event.issue?.html_url ?? "unknown"}`,
  ];

  if (configWarnings.length > 0) {
    lines.push("");
    lines.push("Config warnings:");
    lines.push(...configWarnings.map((warning) => `- ${warning.path}: ${warning.message}`));
  }

  lines.push("");
  lines.push(formatMaintainerSummary(analysis, duplicates));

  return lines.join("\n");
}

export function runDryRunFromFiles(
  eventPath: string,
  existingIssuesPath?: string,
  configPath?: string
): string {
  const event = readJson<GitHubIssueEvent>(eventPath);
  const existingIssues = existingIssuesPath ? readJson<ExistingIssue[]>(existingIssuesPath) : [];
  const config = configPath ? readJson<IntakeConfig>(configPath) : {};

  return buildDryRunOutput(event, existingIssues, config);
}

function extractIssue(event: GitHubIssueEvent): IssueInput {
  return {
    title: event.issue?.title ?? "Untitled issue",
    body: event.issue?.body ?? "",
  };
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const eventPath = process.argv[2] ?? process.env.GITHUB_EVENT_PATH;
  const existingIssuesPath =
    process.argv[3] ??
    process.env.OSS_INTAKE_EXISTING_ISSUES_PATH ??
    process.env["INPUT_EXISTING-ISSUES-PATH"];
  const configPath =
    process.argv[4] ?? process.env.OSS_INTAKE_CONFIG_PATH ?? process.env["INPUT_CONFIG-PATH"];

  if (!eventPath) {
    console.error("Missing event path. Pass a file path or set GITHUB_EVENT_PATH.");
    process.exit(1);
  }

  console.log(runDryRunFromFiles(eventPath, existingIssuesPath, configPath));
}
