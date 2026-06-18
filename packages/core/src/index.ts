export type IssueType =
  | "bug"
  | "feature-request"
  | "support-question"
  | "documentation"
  | "security-sensitive"
  | "unknown";

export type Actionability =
  | "actionable"
  | "not-actionable"
  | "route-support"
  | "route-private-security";

export type MissingField =
  | "version"
  | "environment"
  | "reproduction_steps"
  | "expected_behavior"
  | "actual_behavior"
  | "logs_or_error";

export type IssueInput = {
  title: string;
  body: string;
};

export type ExistingIssue = IssueInput & {
  number: number;
  url?: string;
};

export type DuplicateCandidate = {
  number: number;
  title: string;
  url?: string;
  score: number;
  reasons: string[];
};

export type AnalysisResult = {
  likelyType: IssueType;
  actionability: Actionability;
  missing: MissingField[];
  labels: string[];
  nextAction: string;
};

export type IntakeLabels = {
  bug?: string;
  featureRequest?: string;
  docs?: string;
  support?: string;
  security?: string;
  needsInfo?: string;
  reproNeeded?: string;
  highSignal?: string;
  lowSignal?: string;
};

export type IntakeConfig = {
  labels?: IntakeLabels;
  requiredFields?: {
    bug?: MissingField[];
  };
  routing?: {
    supportUrl?: string;
    securityUrl?: string;
  };
  duplicateThreshold?: number;
};

export type ConfigValidationIssue = {
  path: string;
  message: string;
};

export type IssueTemplateFile = {
  path: string;
  content: string;
};

export type IssueTemplateAuditSeverity = "error" | "warning";
export type IssueTemplateAuditCategory = "bug-report" | "privacy" | "routing" | "syntax";

export type IssueTemplateAuditFinding = {
  path: string;
  severity: IssueTemplateAuditSeverity;
  category?: IssueTemplateAuditCategory;
  message: string;
  suggestion?: string;
};

export type IssueTemplateAuditCategoryScores = {
  bugReport: number;
  privacy: number;
  routing: number;
  syntax: number;
};

export type IssueTemplateAuditResult = {
  filesAudited: number;
  score: number;
  categoryScores: IssueTemplateAuditCategoryScores;
  findings: IssueTemplateAuditFinding[];
};

type IssueFormControl = {
  type: string;
  id?: string;
  label?: string;
  optionLabels: string[];
  required: boolean;
  block: string;
};

type ResolvedConfig = {
  labels: Required<IntakeLabels>;
  requiredBugFields: MissingField[];
  routing: {
    supportUrl?: string;
    securityUrl?: string;
  };
  duplicateThreshold: number;
};

const BUG_REQUIRED_FIELDS: MissingField[] = [
  "version",
  "environment",
  "reproduction_steps",
  "expected_behavior",
  "actual_behavior",
  "logs_or_error",
];

const ISSUE_TEMPLATE_AUDIT_CATEGORY_ROWS = [
  { label: "bug-report", key: "bugReport" },
  { label: "privacy", key: "privacy" },
  { label: "routing", key: "routing" },
  { label: "syntax", key: "syntax" },
] as const;

const DEFAULT_LABELS: Required<IntakeLabels> = {
  bug: "bug",
  featureRequest: "feature-request",
  docs: "docs",
  support: "support",
  security: "security-review",
  needsInfo: "needs-info",
  reproNeeded: "repro-needed",
  highSignal: "high-signal",
  lowSignal: "low-signal",
};

const DEFAULT_DUPLICATE_THRESHOLD = 0.35;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "can",
  "do",
  "does",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "please",
  "the",
  "this",
  "to",
  "with",
]);

export function analyzeIssue(issue: IssueInput, config: IntakeConfig = {}): AnalysisResult {
  const resolvedConfig = resolveConfig(config);
  const text = joinIssueText(issue);
  const likelyType = classifyIssue(text);

  if (likelyType === "security-sensitive") {
    return {
      likelyType,
      actionability: "route-private-security",
      missing: [],
      labels: [resolvedConfig.labels.security],
      nextAction: withOptionalRoute(
        "route reporter to private security reporting before public discussion",
        resolvedConfig.routing.securityUrl
      ),
    };
  }

  if (likelyType === "support-question") {
    return {
      likelyType,
      actionability: "route-support",
      missing: [],
      labels: [resolvedConfig.labels.support],
      nextAction: withOptionalRoute(
        "route reporter to support or discussions",
        resolvedConfig.routing.supportUrl
      ),
    };
  }

  if (likelyType === "feature-request") {
    return {
      likelyType,
      actionability: "actionable",
      missing: [],
      labels: [resolvedConfig.labels.featureRequest, resolvedConfig.labels.highSignal],
      nextAction: "maintainer can review the request",
    };
  }

  if (likelyType === "documentation") {
    return {
      likelyType,
      actionability: "actionable",
      missing: [],
      labels: [resolvedConfig.labels.docs, resolvedConfig.labels.highSignal],
      nextAction: "maintainer can review the documentation report",
    };
  }

  if (likelyType === "bug") {
    const missing = detectMissingBugFields(text, resolvedConfig.requiredBugFields);
    const actionability: Actionability = missing.length === 0 ? "actionable" : "not-actionable";
    const labels = buildBugLabels(missing, resolvedConfig.labels);

    return {
      likelyType,
      actionability,
      missing,
      labels,
      nextAction:
        missing.length === 0
          ? "maintainer can review the report"
          : `ask reporter for ${formatFieldList(missing)}`,
    };
  }

  return {
    likelyType,
    actionability: "not-actionable",
    missing: [],
    labels: [resolvedConfig.labels.needsInfo, resolvedConfig.labels.lowSignal],
    nextAction: "ask reporter to clarify whether this is a bug, feature request, or support question",
  };
}

export function findPossibleDuplicates(
  issue: IssueInput,
  existingIssues: ExistingIssue[],
  thresholdOrConfig: number | IntakeConfig = DEFAULT_DUPLICATE_THRESHOLD
): DuplicateCandidate[] {
  const sourceTitleTokens = tokenize(issue.title);
  const sourceBodyTokens = tokenize(issue.body);
  const threshold =
    typeof thresholdOrConfig === "number"
      ? thresholdOrConfig
      : resolveConfig(thresholdOrConfig).duplicateThreshold;

  return existingIssues
    .map((candidate) => {
      const candidateTitleTokens = tokenize(candidate.title);
      const candidateBodyTokens = tokenize(candidate.body);
      const titleScore = similarityScore(sourceTitleTokens, candidateTitleTokens);
      const bodyScore = similarityScore(sourceBodyTokens, candidateBodyTokens);

      return {
        number: candidate.number,
        title: candidate.title,
        url: candidate.url,
        score: Number((titleScore * 0.65 + bodyScore * 0.35).toFixed(3)),
        reasons: duplicateReasons(
          sourceTitleTokens,
          candidateTitleTokens,
          sourceBodyTokens,
          candidateBodyTokens
        ),
      };
    })
    .filter((candidate) => candidate.score >= threshold)
    .sort((left, right) => right.score - left.score || left.number - right.number);
}

export function validateConfig(config: IntakeConfig): ConfigValidationIssue[] {
  const issues: ConfigValidationIssue[] = [];

  for (const [key, value] of Object.entries(config.labels ?? {})) {
    if (!VALID_LABEL_KEYS.has(key)) {
      issues.push({
        path: `labels.${key}`,
        message: `unknown label key: ${key}`,
      });
      continue;
    }

    if (typeof value !== "string" || value.trim().length === 0) {
      issues.push({
        path: `labels.${key}`,
        message: "label must be a non-empty string",
      });
    }
  }

  const seenRequiredFields = new Set<string>();

  (config.requiredFields?.bug ?? []).forEach((field, index) => {
    if (seenRequiredFields.has(field)) {
      issues.push({
        path: `requiredFields.bug[${index}]`,
        message: `duplicate required field: ${field}`,
      });
    }

    seenRequiredFields.add(field);

    if (!VALID_REQUIRED_FIELDS.has(field)) {
      issues.push({
        path: `requiredFields.bug[${index}]`,
        message: `unknown required field: ${field}`,
      });
    }
  });

  for (const [key, value] of Object.entries(config.routing ?? {})) {
    if (value !== undefined && !isHttpUrl(value)) {
      issues.push({
        path: `routing.${key}`,
        message: "route must be an http(s) URL",
      });
    }
  }

  if (
    config.duplicateThreshold !== undefined &&
    (typeof config.duplicateThreshold !== "number" ||
      config.duplicateThreshold < 0 ||
      config.duplicateThreshold > 1)
  ) {
    issues.push({
      path: "duplicateThreshold",
      message: "duplicateThreshold must be between 0 and 1",
    });
  }

  return issues;
}

export function auditIssueTemplates(files: IssueTemplateFile[]): IssueTemplateAuditResult {
  const findings: IssueTemplateAuditFinding[] = [];
  const config = files.find((file) => normalizePath(file.path).endsWith("/config.yml"));
  const issueForms = files.filter((file) => isIssueFormFile(file.path));

  if (!config) {
    findings.push(makeFinding({
      path: ".github/ISSUE_TEMPLATE/config.yml",
      category: "routing",
      severity: "warning",
      message: "missing .github/ISSUE_TEMPLATE/config.yml chooser config",
      suggestion: "Add `.github/ISSUE_TEMPLATE/config.yml` with blank issue policy and contact links.",
    }));
  } else {
    auditTemplateChooserConfig(config, findings);
  }

  if (issueForms.length === 0) {
    findings.push(makeFinding({
      path: ".github/ISSUE_TEMPLATE",
      category: "syntax",
      severity: "warning",
      message: "add at least one issue form template",
      suggestion: "Add at least one YAML issue form with structured fields.",
    }));
  }

  for (const file of issueForms) {
    auditIssueFormFile(file, findings);
  }

  return {
    filesAudited: files.length,
    score: scoreTemplateAudit(findings),
    categoryScores: scoreTemplateAuditCategories(findings),
    findings,
  };
}

export function formatIssueTemplateAudit(result: IssueTemplateAuditResult): string {
  const lines = [
    "OSS Intake Doctor issue-template audit",
    "",
    `Files audited: ${result.filesAudited}`,
    `Score: ${result.score}/100`,
    "",
    "Category scores:",
    ...formatCategoryScores(result.categoryScores),
    "",
    "Findings:",
  ];

  if (result.findings.length === 0) {
    lines.push("- none");
  } else {
    for (const finding of result.findings) {
      const category = finding.category ? ` ${finding.category}` : "";
      lines.push(`- ${finding.severity}${category} ${finding.path}: ${finding.message}`);

      if (finding.suggestion) {
        lines.push(`  suggestion: ${finding.suggestion}`);
      }
    }
  }

  return lines.join("\n");
}

export function formatIssueTemplateAuditMarkdown(result: IssueTemplateAuditResult): string {
  const lines = [
    "# OSS Intake Doctor Issue-Template Audit",
    "",
    "## Summary",
    "",
    "| Metric | Value |",
    "|---|---:|",
    `| Files audited | ${result.filesAudited} |`,
    `| Overall score | ${result.score}/100 |`,
    "",
    "## Category Scores",
    "",
    "| Category | Score |",
    "|---|---:|",
    ...ISSUE_TEMPLATE_AUDIT_CATEGORY_ROWS.map(
      (category) => `| ${category.label} | ${result.categoryScores[category.key]}/100 |`
    ),
    "",
    "## Findings",
    "",
  ];

  if (result.findings.length === 0) {
    lines.push("No findings. Keep this report as a clean baseline before changing issue forms.");
  } else {
    lines.push("| Severity | Category | Path | Finding | Suggested fix |");
    lines.push("|---|---|---|---|---|");

    for (const finding of result.findings) {
      lines.push([
        "",
        markdownTableCell(finding.severity),
        markdownTableCell(finding.category ?? "general"),
        markdownTableCell(`\`${finding.path}\``),
        markdownTableCell(finding.message),
        markdownTableCell(finding.suggestion ?? "Review manually."),
        "",
      ].join(" | "));
    }
  }

  lines.push(
    "",
    "## Next Maintainer Step",
    "",
    result.findings.length === 0
      ? "Run the demo and sample report next to review issue-analysis summaries before enabling any workflow."
      : "Fix errors first, then warnings. Re-run the audit after each template change."
  );

  return lines.join("\n");
}

export function formatMaintainerSummary(
  result: AnalysisResult,
  duplicates: DuplicateCandidate[] = []
): string {
  const lines = [
    "OSS Intake Doctor summary",
    "",
    `Likely type: ${result.likelyType}`,
    `Actionability: ${formatActionability(result.actionability)}`,
  ];

  if (result.missing.length > 0) {
    lines.push(`Missing: ${formatFieldCommaList(result.missing)}`);
  }

  if (duplicates.length > 0) {
    const duplicate = duplicates[0];
    lines.push(`Possible duplicate: #${duplicate.number} - ${duplicate.title}`);
  }

  lines.push(`Suggested labels: ${result.labels.join(", ")}`);
  lines.push(`Suggested next action: ${result.nextAction}`);

  return lines.join("\n");
}

export function formatActionability(actionability: Actionability): string {
  if (actionability === "not-actionable") {
    return "needs-info";
  }

  return actionability;
}

function classifyIssue(text: string): IssueType {
  if (containsAny(text, SECURITY_PATTERNS)) {
    return "security-sensitive";
  }

  if (containsAny(text, SUPPORT_PATTERNS)) {
    return "support-question";
  }

  if (containsAny(text, FEATURE_PATTERNS)) {
    return "feature-request";
  }

  if (containsAny(text, DOCS_PATTERNS)) {
    return "documentation";
  }

  if (containsAny(text, BUG_PATTERNS)) {
    return "bug";
  }

  return "unknown";
}

function detectMissingBugFields(text: string, requiredFields: MissingField[]): MissingField[] {
  const checks: Record<MissingField, boolean> = {
    version: hasVersion(text),
    environment: containsAny(text, ENVIRONMENT_PATTERNS),
    reproduction_steps: containsAny(text, REPRODUCTION_PATTERNS),
    expected_behavior: containsAny(text, EXPECTED_PATTERNS),
    actual_behavior: containsAny(text, ACTUAL_PATTERNS),
    logs_or_error: containsAny(text, LOG_PATTERNS),
  };

  return requiredFields.filter((field) => !checks[field]);
}

function buildBugLabels(missing: MissingField[], labels: Required<IntakeLabels>): string[] {
  if (missing.length === 0) {
    return [labels.bug, labels.highSignal];
  }

  const output = [labels.bug, labels.needsInfo];

  if (missing.includes("reproduction_steps")) {
    output.push(labels.reproNeeded);
  }

  output.push(labels.lowSignal);
  return output;
}

function resolveConfig(config: IntakeConfig): ResolvedConfig {
  return {
    labels: {
      ...DEFAULT_LABELS,
      ...validLabelOverrides(config.labels),
    },
    requiredBugFields: resolveRequiredBugFields(config),
    routing: {
      supportUrl: isHttpUrl(config.routing?.supportUrl) ? config.routing?.supportUrl : undefined,
      securityUrl: isHttpUrl(config.routing?.securityUrl) ? config.routing?.securityUrl : undefined,
    },
    duplicateThreshold: isValidDuplicateThreshold(config.duplicateThreshold)
      ? config.duplicateThreshold
      : DEFAULT_DUPLICATE_THRESHOLD,
  };
}

function validLabelOverrides(labels: IntakeLabels | undefined): IntakeLabels {
  const output: IntakeLabels = {};

  for (const [key, value] of Object.entries(labels ?? {})) {
    if (VALID_LABEL_KEYS.has(key) && typeof value === "string" && value.trim().length > 0) {
      output[key as keyof IntakeLabels] = value;
    }
  }

  return output;
}

function resolveRequiredBugFields(config: IntakeConfig): MissingField[] {
  if (!config.requiredFields?.bug) {
    return BUG_REQUIRED_FIELDS;
  }

  const output: MissingField[] = [];

  for (const field of config.requiredFields.bug) {
    if (VALID_REQUIRED_FIELDS.has(field) && !output.includes(field)) {
      output.push(field);
    }
  }

  return output;
}

function auditTemplateChooserConfig(
  file: IssueTemplateFile,
  findings: IssueTemplateAuditFinding[]
): void {
  const text = file.content.toLowerCase();

  if (!/^\s*blank_issues_enabled:\s*false\s*$/im.test(file.content)) {
    findings.push(makeFinding({
      path: file.path,
      category: "routing",
      severity: "warning",
      message: "set blank_issues_enabled: false to reduce low-quality blank issues",
      suggestion: "Add `blank_issues_enabled: false` to route contributors into structured choices.",
    }));
  }

  if (!/^\s*contact_links:\s*$/im.test(file.content)) {
    findings.push(makeFinding({
      path: file.path,
      category: "routing",
      severity: "warning",
      message: "add contact_links for support and security routing",
      suggestion: "Add `contact_links` for Discussions/support and private security reporting.",
    }));
  }

  if (!/\b(discussions?|support|community)\b/i.test(text)) {
    findings.push(makeFinding({
      path: file.path,
      category: "routing",
      severity: "warning",
      message: "add a support contact link, usually GitHub Discussions",
      suggestion: "Add a `contact_links` entry that routes usage questions to Discussions or support.",
    }));
  }

  if (/^\s*contact_links:\s*$/im.test(file.content) && !/\b(security|vulnerability)\b/i.test(text)) {
    findings.push(makeFinding({
      path: file.path,
      category: "routing",
      severity: "warning",
      message: "add a security contact link or private vulnerability reporting route",
      suggestion: "Add a `contact_links` entry that points to SECURITY.md or GitHub private vulnerability reporting.",
    }));
  }
}

function auditIssueFormFile(
  file: IssueTemplateFile,
  findings: IssueTemplateAuditFinding[]
): void {
  for (const requiredKey of ["name", "description", "body"]) {
    if (!new RegExp(`^\\s*${requiredKey}:\\s*\\S`, "im").test(file.content)) {
      findings.push(makeFinding({
        path: file.path,
        category: "syntax",
        severity: "error",
        message: `issue form is missing top-level ${requiredKey}`,
        suggestion: `Add the top-level \`${requiredKey}\` field required by GitHub issue forms.`,
      }));
    }
  }

  const controls = parseIssueFormControls(file.content);
  const unsupportedControls = controls.filter((control) => !VALID_ISSUE_FORM_TYPES.has(control.type));

  for (const control of unsupportedControls) {
    findings.push(makeFinding({
      path: file.path,
      category: "syntax",
      severity: "error",
      message: `unsupported issue-form field type: ${control.type}`,
      suggestion: "Use one of GitHub's supported issue-form types: markdown, input, textarea, dropdown, or checkboxes.",
    }));
  }

  if (!controls.some((control) => NON_MARKDOWN_ISSUE_FORM_TYPES.has(control.type))) {
    findings.push(makeFinding({
      path: file.path,
      category: "syntax",
      severity: "error",
      message: "issue form body must include at least one non-markdown input field",
      suggestion: "Add at least one `input`, `textarea`, `dropdown`, or `checkboxes` block.",
    }));
  }

  for (const duplicateId of findDuplicateValues(file.content, /^\s*id:\s*([a-zA-Z0-9_-]+)\s*$/gim)) {
    findings.push(makeFinding({
      path: file.path,
      category: "syntax",
      severity: "error",
      message: `duplicate issue-form id: ${duplicateId}`,
      suggestion: "Give each issue-form control a unique `id`.",
    }));
  }

  for (const duplicateLabel of duplicateLabelsWithoutUniqueIds(controls)) {
    findings.push(makeFinding({
      path: file.path,
      category: "syntax",
      severity: "error",
      message: `duplicate issue-form label: ${duplicateLabel}`,
      suggestion: "Differentiate duplicate visible labels with unique `id` values, or make the labels more specific.",
    }));
  }

  for (const label of controls.map((control) => control.label).filter(isString)) {
    if (containsAny(label, ISSUE_FORM_FORBIDDEN_LABEL_PATTERNS)) {
      findings.push(makeFinding({
        path: file.path,
        category: "privacy",
        severity: "error",
        message: `issue-form label may ask for private data: ${stripYamlQuotes(label)}`,
        suggestion: "Reword the label so contributors do not paste secrets, credentials, tokens, or private keys.",
      }));
    }
  }

  if (isBugIssueForm(file)) {
    auditBugIssueFormCoverage(file, controls, findings);
  }
}

function auditBugIssueFormCoverage(
  file: IssueTemplateFile,
  controls: IssueFormControl[],
  findings: IssueTemplateAuditFinding[]
): void {
  const text = file.content.toLowerCase();

  for (const check of BUG_FORM_FIELD_CHECKS) {
    if (!containsAny(text, check.patterns)) {
      findings.push(makeFinding({
        path: file.path,
        category: "bug-report",
        severity: "warning",
        message: `bug form should ask for ${check.label}`,
        suggestion: `Add a bug-report field for ${check.label}.`,
      }));
      continue;
    }

    if (check.required && !bugFieldIsRequired(controls, check.patterns)) {
      findings.push(makeFinding({
        path: file.path,
        category: "bug-report",
        severity: "warning",
        message: `bug form field should be required: ${check.shortLabel}`,
        suggestion: `Add \`validations: required: true\` to the ${check.shortLabel} field.`,
      }));
    }
  }
}

function scoreTemplateAudit(findings: IssueTemplateAuditFinding[]): number {
  const errorCount = findings.filter((finding) => finding.severity === "error").length;
  const rawPenalty = findings.length * 10 + errorCount * 10;

  return Math.max(50, 100 - rawPenalty);
}

function scoreTemplateAuditCategories(
  findings: IssueTemplateAuditFinding[]
): IssueTemplateAuditCategoryScores {
  return {
    bugReport: scoreTemplateAuditCategory(findings, "bug-report"),
    privacy: scoreTemplateAuditCategory(findings, "privacy"),
    routing: scoreTemplateAuditCategory(findings, "routing"),
    syntax: scoreTemplateAuditCategory(findings, "syntax"),
  };
}

function scoreTemplateAuditCategory(
  findings: IssueTemplateAuditFinding[],
  category: IssueTemplateAuditCategory
): number {
  const categoryFindings = findings.filter((finding) => finding.category === category);
  let penalty = 0;

  for (const finding of categoryFindings) {
    if (
      finding.message === "missing .github/ISSUE_TEMPLATE/config.yml chooser config" ||
      finding.message === "issue form body must include at least one non-markdown input field"
    ) {
      penalty += finding.severity === "error" ? 50 : 20;
      continue;
    }

    penalty += finding.severity === "error" ? 20 : 10;
  }

  return Math.max(50, 100 - penalty);
}

function formatCategoryScores(
  scores: IssueTemplateAuditCategoryScores
): string[] {
  return ISSUE_TEMPLATE_AUDIT_CATEGORY_ROWS.map(
    (category) => `- ${category.label}: ${scores[category.key]}/100`
  );
}

function markdownTableCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function makeFinding(finding: IssueTemplateAuditFinding): IssueTemplateAuditFinding {
  return finding;
}

function parseIssueFormControls(content: string): IssueFormControl[] {
  const controls: IssueFormControl[] = [];
  const matches = [...content.matchAll(/^\s*-\s*type:\s*([a-zA-Z_-]+)\s*$/gim)];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const nextMatch = matches[index + 1];
    const block = content.slice(match.index ?? 0, nextMatch?.index ?? content.length);
    const type = normalizeIssueFormValue(match[1] ?? "");

    controls.push({
      type,
      id: extractFirstValue(block, /^\s*id:\s*([a-zA-Z0-9_-]+)\s*$/im),
      label: extractFirstValue(block, /^\s*label:\s*(.+?)\s*$/im),
      optionLabels: type === "checkboxes" ? extractCheckboxOptionLabels(block) : [],
      required: /^\s*required:\s*true\s*$/im.test(block),
      block,
    });
  }

  return controls;
}

function duplicateLabelsWithoutUniqueIds(controls: IssueFormControl[]): string[] {
  const byLabel = new Map<string, { id?: string; nested: boolean }[]>();

  for (const control of controls) {
    if (control.label) {
      const normalizedLabel = normalizeTemplateLabel(control.label);
      byLabel.set(normalizedLabel, [
        ...(byLabel.get(normalizedLabel) ?? []),
        { id: control.id, nested: false },
      ]);
    }

    for (const optionLabel of control.optionLabels) {
      const normalizedLabel = normalizeTemplateLabel(optionLabel);
      byLabel.set(normalizedLabel, [
        ...(byLabel.get(normalizedLabel) ?? []),
        { nested: true },
      ]);
    }
  }

  const duplicates: string[] = [];

  for (const [label, matchingLabels] of byLabel.entries()) {
    if (matchingLabels.length < 2) {
      continue;
    }

    const topLevelLabels = matchingLabels.filter((entry) => !entry.nested);
    const nestedLabelCount = matchingLabels.length - topLevelLabels.length;
    const ids = topLevelLabels.map((entry) => entry.id?.trim()).filter(isString);

    if (
      nestedLabelCount > 1 ||
      ids.length !== topLevelLabels.length ||
      new Set(ids).size !== ids.length
    ) {
      duplicates.push(label);
    }
  }

  return duplicates.sort();
}

function extractCheckboxOptionLabels(block: string): string[] {
  return extractLineValues(block, /^\s*-\s*label:\s*(.+?)\s*$/gim);
}

function bugFieldIsRequired(controls: IssueFormControl[], patterns: RegExp[]): boolean {
  return controls.some((control) => {
    const searchable = `${control.id ?? ""}\n${control.label ?? ""}\n${control.block}`;
    return control.required && containsAny(searchable, patterns);
  });
}

function isIssueFormFile(path: string): boolean {
  const normalizedPath = normalizePath(path);
  return (
    normalizedPath.includes("/issue_template/") &&
    !normalizedPath.endsWith("/config.yml") &&
    (normalizedPath.endsWith(".yml") || normalizedPath.endsWith(".yaml"))
  );
}

function normalizePath(path: string): string {
  return path.replaceAll("\\", "/").toLowerCase();
}

function extractLineValues(content: string, pattern: RegExp): string[] {
  const values: string[] = [];

  for (const match of content.matchAll(pattern)) {
    values.push(stripYamlQuotes(match[1] ?? ""));
  }

  return values;
}

function extractFirstValue(content: string, pattern: RegExp): string | undefined {
  const match = content.match(pattern);
  return match?.[1] ? stripYamlQuotes(match[1]) : undefined;
}

function findDuplicateValues(content: string, pattern: RegExp): string[] {
  return findDuplicateStrings(extractLineValues(content, pattern));
}

function findDuplicateStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    const normalized = value.trim().toLowerCase();

    if (normalized.length === 0) {
      continue;
    }

    if (seen.has(normalized)) {
      duplicates.add(normalized);
    }

    seen.add(normalized);
  }

  return [...duplicates].sort();
}

function normalizeTemplateLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stripYamlQuotes(value: string): string {
  const trimmed = value.trim();
  return trimmed.replace(/^["']|["']$/g, "");
}

function normalizeIssueFormValue(value: string): string {
  return stripYamlQuotes(value).toLowerCase();
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isBugIssueForm(file: IssueTemplateFile): boolean {
  return /\b(bug|defect|crash)\b/i.test(`${file.path}\n${issueFormMetadata(file.content)}`);
}

function issueFormMetadata(content: string): string {
  const bodyIndex = content.search(/^\s*body:\s*$/im);
  return bodyIndex === -1 ? content : content.slice(0, bodyIndex);
}

function isValidDuplicateThreshold(value: unknown): value is number {
  return typeof value === "number" && value >= 0 && value <= 1;
}

function duplicateReasons(
  sourceTitleTokens: Set<string>,
  candidateTitleTokens: Set<string>,
  sourceBodyTokens: Set<string>,
  candidateBodyTokens: Set<string>
): string[] {
  const reasons: string[] = [];
  const sharedTitleTerms = sharedTerms(sourceTitleTokens, candidateTitleTokens);
  const sharedBodyTerms = sharedTerms(sourceBodyTokens, candidateBodyTokens);

  if (sharedTitleTerms.length > 0) {
    reasons.push(`shared title terms: ${sharedTitleTerms.join(", ")}`);
  }

  if (sharedBodyTerms.length > 0) {
    reasons.push(`shared body terms: ${sharedBodyTerms.join(", ")}`);
  }

  return reasons;
}

function sharedTerms(left: Set<string>, right: Set<string>): string[] {
  return [...left].filter((token) => right.has(token)).sort();
}

function isHttpUrl(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function withOptionalRoute(action: string, url?: string): string {
  return url ? `${action}: ${url}` : action;
}

function joinIssueText(issue: IssueInput): string {
  return `${issue.title}\n${issue.body}`.toLowerCase();
}

function containsAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text));
}

function hasVersion(text: string): boolean {
  return /\bversion\s*[:=]/i.test(text) || /\bv?\d+\.\d+(?:\.\d+)?\b/.test(text);
}

function formatFieldList(fields: MissingField[]): string {
  return humanizeList(fields.map(humanizeField));
}

function formatFieldCommaList(fields: MissingField[]): string {
  return fields.map(humanizeField).join(", ");
}

function humanizeField(field: MissingField): string {
  return field.replaceAll("_", " ").replace("logs or error", "logs or error");
}

function humanizeList(items: string[]): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function tokenize(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .match(/[a-z0-9]+/g);

  if (!tokens) {
    return new Set();
  }

  return new Set(
    tokens
      .map(normalizeToken)
      .filter((token) => token.length >= 2)
      .filter((token) => !STOP_WORDS.has(token))
  );
}

function normalizeToken(token: string): string {
  if (token === "windows") {
    return token;
  }

  if (token.endsWith("ies") && token.length > 5) {
    return token;
  }

  if (token.endsWith("ing") && token.length > 5) {
    return token.slice(0, -3);
  }

  if (token.endsWith("es") && token.length > 4) {
    return token.slice(0, -2);
  }

  if (token.endsWith("s") && token.length > 4) {
    return token.slice(0, -1);
  }

  return token;
}

function similarityScore(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) {
    return 0;
  }

  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;

  return Number((intersection / union).toFixed(3));
}

const SECURITY_PATTERNS = [
  /\bvulnerab/i,
  /\bexploit\b/i,
  /\bauth bypass\b/i,
  /\baccount takeover\b/i,
  /\bremote code execution\b/i,
  /\brce\b/i,
  /\bxss\b/i,
  /\bsql injection\b/i,
  /\bcsrf\b/i,
  /\bsecret leak\b/i,
  /\bdata leak\b/i,
];

const SUPPORT_PATTERNS = [
  /\bhow do i\b/i,
  /\bhow can i\b/i,
  /\bquestion\b/i,
  /\bcan someone explain\b/i,
  /\bsetup\b/i,
  /\bnot reporting a bug\b/i,
];

const FEATURE_PATTERNS = [
  /\bfeature request\b/i,
  /\bproposal\b/i,
  /\bproposed solution\b/i,
  /\badd support\b/i,
  /\bwould like\b/i,
  /\bnew feature\b/i,
];

const DOCS_PATTERNS = [
  /\bdocumentation\b/i,
  /\bdocs\b/i,
  /\breadme\b/i,
  /\btypo\b/i,
];

const BUG_PATTERNS = [
  /\bbug\b/i,
  /\bcrash(?:es|ed|ing)?\b/i,
  /\berror\b/i,
  /\bfail(?:s|ed|ing)?\b/i,
  /\bbroken\b/i,
  /\bnot working\b/i,
  /\bexpected behavior\b/i,
  /\bactual behavior\b/i,
  /\bsteps to reproduce\b/i,
];

const ENVIRONMENT_PATTERNS = [
  /\bos\s*[:=]/i,
  /\benvironment\s*[:=]/i,
  /\bwindows\b/i,
  /\bmacos\b/i,
  /\bmac\b/i,
  /\blinux\b/i,
  /\bubuntu\b/i,
  /\bnode\b/i,
  /\bnpm\b/i,
  /\bpython\b/i,
  /\bchrome\b/i,
  /\bfirefox\b/i,
  /\bsafari\b/i,
];

const REPRODUCTION_PATTERNS = [
  /\bsteps to reproduce\b/i,
  /\brepro(?:duce|duction)?\b/i,
  /\bminimal reproduction\b/i,
  /\b1\.\s+\S/i,
];

const EXPECTED_PATTERNS = [
  /\bexpected behavior\b/i,
  /\bexpected\b/i,
  /\bshould happen\b/i,
  /\bshould\b/i,
];

const ACTUAL_PATTERNS = [
  /\bactual behavior\b/i,
  /\bactual\b/i,
  /\bwhat happened\b/i,
  /\bhappens instead\b/i,
  /\binstead\b/i,
];

const LOG_PATTERNS = [
  /\berror\b/i,
  /\blogs?\b/i,
  /\bstack trace\b/i,
  /\btraceback\b/i,
  /\bexception\b/i,
  /\bcannot read\b/i,
  /```/,
];

const VALID_LABEL_KEYS = new Set(Object.keys(DEFAULT_LABELS));
const VALID_REQUIRED_FIELDS = new Set<MissingField>(BUG_REQUIRED_FIELDS);

const BUG_FORM_FIELD_CHECKS = [
  {
    label: "version",
    shortLabel: "version",
    required: true,
    patterns: [/\bversion\b/i],
  },
  {
    label: "environment",
    shortLabel: "environment",
    required: true,
    patterns: [/\benvironment\b/i, /\bos\b/i, /\bruntime\b/i, /\bbrowser\b/i],
  },
  {
    label: "reproduction steps",
    shortLabel: "reproduction steps",
    required: true,
    patterns: [/\brepro(?:duce|duction)?\b/i, /\bsteps to reproduce\b/i],
  },
  {
    label: "expected behavior",
    shortLabel: "expected behavior",
    required: true,
    patterns: [/\bexpected behavior\b/i, /\bexpected\b/i],
  },
  {
    label: "actual behavior",
    shortLabel: "actual behavior",
    required: true,
    patterns: [/\bactual behavior\b/i, /\bactual\b/i, /\bwhat happened\b/i],
  },
  {
    label: "logs or error output",
    shortLabel: "logs or error output",
    required: false,
    patterns: [/\blogs?\b/i, /\berror\b/i, /\bstack trace\b/i, /\btraceback\b/i],
  },
];

const VALID_ISSUE_FORM_TYPES = new Set(["checkboxes", "dropdown", "input", "markdown", "textarea"]);
const NON_MARKDOWN_ISSUE_FORM_TYPES = new Set(["checkboxes", "dropdown", "input", "textarea"]);

const ISSUE_FORM_FORBIDDEN_LABEL_PATTERNS = [
  /\bpassword\b/i,
  /\btoken\b/i,
  /\bsecret\b/i,
  /\bcredential\b/i,
  /\bprivate key\b/i,
];
