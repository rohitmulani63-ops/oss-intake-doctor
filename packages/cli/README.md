# CLI Package

Reserved for the future Repro Pack collector.

See [../../docs/repro-pack-plan.md](../../docs/repro-pack-plan.md).

Planned command:

```text
npx oss-intake-doctor collect
```

The CLI should collect only safe diagnostics by default and require contributor review before upload.

The CLI must not run contributor code, upload files, read secrets, or use paid APIs.
