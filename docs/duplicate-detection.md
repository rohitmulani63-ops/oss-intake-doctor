# Duplicate Detection

OSS Intake Doctor uses local text matching only in the no-cost MVP.

It does not call external APIs, embeddings services, or paid search tools.

## How It Works

For each new issue, the analyzer compares:

- New issue title against existing issue titles.
- New issue body against existing issue bodies.

Title matches are weighted more strongly than body matches because duplicate issues often repeat the same short problem statement.

## Output

Duplicate candidates include:

- Issue number.
- Issue title.
- Optional issue URL.
- Local similarity score.
- Human-readable reasons.

Example reasons:

```text
shared title terms: crash, csv, export, windows
shared body terms: 11, cannot, csv, export, properties, read, undefined, windows
```

## Threshold

`duplicateThreshold` controls how conservative suggestions are.

```json
{
  "duplicateThreshold": 0.35
}
```

Lower values suggest more possible duplicates.

Higher values suggest fewer possible duplicates.

The MVP never closes issues. It only suggests possible duplicates.

