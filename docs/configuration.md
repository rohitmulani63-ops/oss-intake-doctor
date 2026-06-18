# Configuration

OSS Intake Doctor uses JSON config for the no-cost MVP.

JSON is less friendly than YAML, but it keeps the project dependency-free. No parser package is required.

## Example Config

See [examples/config/oss-intake.config.json](../examples/config/oss-intake.config.json).

```json
{
  "labels": {
    "bug": "type/bug",
    "featureRequest": "type/feature",
    "docs": "type/docs",
    "support": "type/support",
    "security": "type/security-review",
    "needsInfo": "status/needs-info",
    "reproNeeded": "status/repro-needed",
    "highSignal": "signal/high",
    "lowSignal": "signal/low"
  },
  "requiredFields": {
    "bug": [
      "version",
      "environment",
      "reproduction_steps",
      "expected_behavior",
      "actual_behavior",
      "logs_or_error"
    ]
  },
  "routing": {
    "supportUrl": "https://github.com/example/repo/discussions",
    "securityUrl": "https://github.com/example/repo/security/policy"
  },
  "duplicateThreshold": 0.35
}
```

## Labels

Repos can customize these labels:

- `bug`
- `featureRequest`
- `docs`
- `support`
- `security`
- `needsInfo`
- `reproNeeded`
- `highSignal`
- `lowSignal`

If a label is not configured, the default label is used.

## Required Bug Fields

Repos can choose which bug-report fields are required:

- `version`
- `environment`
- `reproduction_steps`
- `expected_behavior`
- `actual_behavior`
- `logs_or_error`

Example:

```json
{
  "requiredFields": {
    "bug": ["version", "reproduction_steps"]
  }
}
```

That config makes the analyzer ask only for version and reproduction steps.

## Routing

Support questions can point to Discussions or another support page:

```json
{
  "routing": {
    "supportUrl": "https://github.com/owner/repo/discussions"
  }
}
```

Security-sensitive reports can point to the repo security policy:

```json
{
  "routing": {
    "securityUrl": "https://github.com/owner/repo/security/policy"
  }
}
```

## Duplicate Threshold

`duplicateThreshold` controls how conservative local duplicate matching should be.

```json
{
  "duplicateThreshold": 0.35
}
```

Lower values suggest more duplicates. Higher values suggest fewer duplicates.

The MVP only suggests possible duplicates. It never closes issues.

## Validation

The analyzer validates config locally.

It warns about:

- Empty label names.
- Unknown label keys.
- Duplicate required fields.
- Unknown required fields.
- Non-http support or security routes.
- Duplicate thresholds outside `0` to `1`.

Invalid values are ignored where possible and safe defaults are used instead.

Example warning:

```text
Config warnings:
- labels.bug: label must be a non-empty string
- duplicateThreshold: duplicateThreshold must be between 0 and 1
```

## Local Dry Run

```text
node packages/action/src/index.ts examples/events/issue-opened.json examples/issues/existing-issues.json examples/config/oss-intake.config.json
```
