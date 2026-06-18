import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  auditIssueTemplates,
  formatIssueTemplateAudit,
  type IssueTemplateFile,
} from "../packages/core/src/index.ts";

const ISSUE_TEMPLATE_DIR = join(".github", "ISSUE_TEMPLATE");

export function buildIssueTemplateAuditReport(root = process.cwd()): string {
  return formatIssueTemplateAudit(auditIssueTemplates(readIssueTemplateFiles(root)));
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
  console.log(buildIssueTemplateAuditReport(process.argv[2] ?? process.cwd()));
}
