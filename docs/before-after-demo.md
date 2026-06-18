# Before And After Demo

OSS Intake Doctor turns unclear issue intake into concise maintainer signal.

## Incomplete Bug

Before:

```text
Title: App not working
Body: It crashes. Please fix fast.
```

After:

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: needs-info
Missing: version, environment, reproduction steps, expected behavior, actual behavior, logs or error
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for version, environment, reproduction steps, expected behavior, actual behavior, and logs or error
```

## Possible Duplicate

Before:

```text
Title: CSV export crashes on Windows
Body: Version 1.4.2. Export CSV crashes on Windows 11 with Cannot read properties of undefined.
```

After:

```text
OSS Intake Doctor summary

Likely type: bug
Actionability: needs-info
Missing: reproduction steps, expected behavior, actual behavior
Possible duplicate: #12 - Windows CSV export crash
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for reproduction steps, expected behavior, and actual behavior
```

Duplicate reason:

```text
shared title terms: crash, csv, export, windows
shared body terms: 11, cannot, csv, export, properties, read, undefined, windows
```

## Support Question

Before:

```text
Title: How do I connect this to Stripe?
Body: Question: can someone explain the correct setup? I am not reporting a bug.
```

After:

```text
OSS Intake Doctor summary

Likely type: support-question
Actionability: route-support
Suggested labels: support
Suggested next action: route reporter to support or discussions
```

## Security-Sensitive Report

Before:

```text
Title: Possible auth bypass vulnerability
Body: I found an exploit that may allow account takeover. Should I post details here?
```

After:

```text
OSS Intake Doctor summary

Likely type: security-sensitive
Actionability: route-private-security
Suggested labels: security-review
Suggested next action: route reporter to private security reporting before public discussion
```
