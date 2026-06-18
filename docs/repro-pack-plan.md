# Repro Pack Plan

## Current Status

Repro Pack CLI now exists as a companion project:

```text
https://github.com/rohitmulani63-ops/repro-pack-cli
```

Release `v0.1.0` is published:

```text
https://github.com/rohitmulani63-ops/repro-pack-cli/releases/tag/v0.1.0
```

This document remains the product rationale that connects Repro Pack CLI back to OSS Intake Doctor.

## Why Repro Pack Matters

Most issue triage tools react after a weak issue is opened.

Repro Pack should help contributors prepare a better report before maintainers have to ask the same questions again.

The goal:

```text
Turn "it crashes" into a reviewable, safe, contributor-approved bug package.
```

## No-Cost Boundary

Repro Pack must follow the same project rules:

- No paid APIs.
- No external upload by default.
- No contributor code execution.
- No secrets collection.
- No hidden telemetry.
- No automatic posting without contributor review.

## Implemented Command

```text
node bin/repro-pack.js --input examples/incomplete-bug.json --output repro-pack.md
```

## What It Should Collect

Safe default fields:

- Tool name and version, if provided by the contributor.
- Operating system.
- Node, npm, pnpm, yarn, Python, or other relevant runtime versions when safe.
- Package manager lockfile presence, not full private dependency content by default.
- Minimal reproduction steps entered by the contributor.
- Expected behavior.
- Actual behavior.
- Error message or logs pasted by the contributor.

## What It Must Avoid

- Reading arbitrary project files.
- Running install, build, test, or reproduction commands automatically.
- Uploading files.
- Collecting `.env` files.
- Collecting tokens, cookies, private keys, or credentials.
- Expanding security-sensitive exploit details into public output.

## Review-First Output

The CLI should generate a local text or markdown bundle first:

```text
oss-intake-repro-pack.md
```

The contributor reviews it before copying it into an issue.

## Example Output Shape

```text
# Repro Pack

## Environment

- OS:
- Runtime:
- Package manager:
- Project version:

## Reproduction Steps

1.
2.
3.

## Expected Behavior

## Actual Behavior

## Logs Or Error

## Contributor Review

- [ ] I checked this does not include secrets.
- [ ] I checked this is safe to post publicly.
```

## MVP Sequence

1. Document the intended output format. Done.
2. Build a local interactive prompt with built-in Node.js only. Done in Repro Pack CLI.
3. Write the markdown file locally. Done.
4. Add tests for redaction warnings. Done.
5. Add sample Repro Packs to docs. Started with fictional examples.
6. Pilot it with maintainers after the dry-run issue analyzer proves useful. Next.

## Success Criteria

Repro Pack is useful if:

- Maintainers ask fewer follow-up questions.
- Contributors understand what evidence to provide.
- Reports include safer environment details.
- Logs are reviewed before public posting.
- No private data is collected or uploaded by default.
