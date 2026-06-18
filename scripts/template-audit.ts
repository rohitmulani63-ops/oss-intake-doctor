import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  auditIssueTemplates,
  formatIssueTemplateAudit,
  formatIssueTemplateAuditMarkdown,
  type IssueTemplateFile,
} from "../packages/core/src/index.ts";

const ISSUE_TEMPLATE_DIR = join(".github", "ISSUE_TEMPLATE");

export function buildIssueTemplateAuditReport(root = process.cwd()): string {
  return formatIssueTemplateAudit(buildIssueTemplateAudit(root));
}

export function buildIssueTemplateAuditMarkdownReport(root = process.cwd()): string {
  return formatIssueTemplateAuditMarkdown(buildIssueTemplateAudit(root));
}

export function buildIssueTemplateAuditJsonReport(root = process.cwd()): string {
  const result = buildIssueTemplateAudit(root);

  return JSON.stringify({
    tool: "oss-intake-doctor",
    reportType: "issue-template-audit",
    filesAudited: result.filesAudited,
    score: result.score,
    categoryScores: {
      "bug-report": result.categoryScores.bugReport,
      privacy: result.categoryScores.privacy,
      routing: result.categoryScores.routing,
      syntax: result.categoryScores.syntax,
    },
    findings: result.findings.map((finding) => ({
      path: finding.path,
      severity: finding.severity,
      category: finding.category ?? null,
      message: finding.message,
      suggestion: finding.suggestion ?? null,
    })),
  }, null, 2);
}

export function readIssueTemplateFiles(root = process.cwd()): IssueTemplateFile[] {
  const directory = join(root, ISSUE_TEMPLATE_DIR);

  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => /\.(ya?ml|md)$/i.test(entry.name))
    .map((entry) => {
      const fullPath = join(directory, entry.name);

      return {
        path: normalizeOutputPath(relative(root, fullPath)),
        content: readFileSync(fullPath, "utf8"),
      };
    })
    .sort((left, right) => left.path.localeCompare(right.path));
}

function normalizeOutputPath(path: string): string {
  return path.replaceAll("\\", "/");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = parseArgs(process.argv.slice(2));

  if (options.format === "json") {
    console.log(buildIssueTemplateAuditJsonReport(options.root));
  } else if (options.format === "markdown") {
    console.log(buildIssueTemplateAuditMarkdownReport(options.root));
  } else {
    console.log(buildIssueTemplateAuditReport(options.root));
  }
}

function buildIssueTemplateAudit(root = process.cwd()) {
  return auditIssueTemplates(readIssueTemplateFiles(root));
}

function parseArgs(args: string[]): { format: "json" | "markdown" | "text"; root: string } {
  let format: "json" | "markdown" | "text" = "text";
  let root = process.cwd();

  for (const arg of args) {
    if (arg === "--json" || arg === "--format=json") {
      format = "json";
    } else if (arg === "--markdown" || arg === "--format=markdown" || arg === "--md") {
      format = "markdown";
    } else {
      root = arg;
    }
  }

  return { format, root };
}
