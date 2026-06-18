# Trust And Safety

OSS Intake Doctor is intentionally conservative.

Maintainers should be able to trust it before giving it power.

## What It Will Not Do

The MVP will not:

- Auto-close issues.
- Reject pull requests.
- Run contributor code.
- Upload files.
- Send issue content to external APIs.
- Use paid AI APIs.
- Accuse contributors of using AI.
- Shame contributors.

## What It Does Instead

The MVP:

- Reads local issue text.
- Checks for missing information.
- Suggests labels.
- Suggests possible duplicates.
- Explains duplicate reasons.
- Warns on invalid config.
- Routes support questions to support links.
- Routes security-sensitive reports to private reporting.

## Data Handling

The local MVP does not store issue content in a database.

The local MVP does not call external APIs.

The local MVP does not upload artifacts.

## Safety Boundary

The first public release should stay in dry-run or comment-only mode.

Stricter actions, such as applying labels or closing duplicates, should require explicit maintainer opt-in and pilot evidence.

