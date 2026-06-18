# Security Policy

OSS Intake Doctor is designed to reduce public mishandling of security-sensitive reports.

## Reporting Security Issues

If you find a vulnerability in OSS Intake Doctor itself, do not open a public issue with exploit details.

Use the repository security policy page:

```text
https://github.com/rohitmulani63-ops/oss-intake-doctor/security/policy
```

If GitHub private vulnerability reporting is available for this repository, use it. Otherwise, open a minimal public issue that says a private security report is needed, without exploit details, secrets, tokens, or reproduction steps that could harm users.

## Security Design Rules

The MVP must:

- Never run contributor code.
- Never execute files attached to issues or pull requests.
- Never send issue content to paid or external APIs.
- Treat issue and pull request text as untrusted input.
- Keep GitHub permissions minimal.
- Route security-sensitive reports away from public discussion.
- Warn on invalid config instead of silently trusting it.

## Current Limitations

The current MVP is local and dry-run focused.

It does not:

- Post comments to GitHub.
- Apply labels.
- Close issues.
- Upload files.
- Connect to external services.

## Disclosure Handling

If a report appears security-sensitive, OSS Intake Doctor should recommend private reporting through:

- GitHub private vulnerability reporting.
- The repository security policy.
- A maintainer-provided security contact.
