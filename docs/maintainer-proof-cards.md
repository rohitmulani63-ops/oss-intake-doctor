# Maintainer Proof Cards

These compact cards are designed for screenshots, release notes, pilot requests, and maintainer discussions.

All examples are fictional. No external API, paid service, or hosted system is needed to reproduce the output.

Regenerate the local demo:

```text
npm run demo
```

## Card 1 - Incomplete Bug

Before:

```text
Title: App not working
Body: It crashes. Please fix fast.
```

OSS Intake Doctor:

```text
Likely type: bug
Actionability: needs-info
Missing: version, environment, reproduction steps, expected behavior, actual behavior, logs or error
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for version, environment, reproduction steps, expected behavior, actual behavior, and logs or error
```

Takeaway:

```text
Maintainers can ask for the exact missing evidence instead of writing a custom follow-up.
```

## Card 2 - Possible Duplicate

Before:

```text
Title: CSV export crashes on Windows
Body: Version 1.4.2. Export CSV crashes on Windows 11 with Cannot read properties of undefined.
```

OSS Intake Doctor:

```text
Likely type: bug
Actionability: needs-info
Missing: reproduction steps, expected behavior, actual behavior
Possible duplicate: #12 - Windows CSV export crash
Suggested labels: bug, needs-info, repro-needed, low-signal
Suggested next action: ask reporter for reproduction steps, expected behavior, and actual behavior
```

Takeaway:

```text
Duplicate risk is surfaced as a review hint, not an auto-close decision.
```

## Card 3 - Support Question

Before:

```text
Title: How do I connect this to Stripe?
Body: Question: can someone explain the correct setup? I am not reporting a bug.
```

OSS Intake Doctor:

```text
Likely type: support-question
Actionability: route-support
Suggested labels: support
Suggested next action: route reporter to support or discussions
```

Takeaway:

```text
Usage questions can move to the right support lane before the bug queue gets noisy.
```

## Card 4 - Security-Sensitive Report

Before:

```text
Title: Possible auth bypass vulnerability
Body: I found an exploit that may allow account takeover. Should I post details here?
```

OSS Intake Doctor:

```text
Likely type: security-sensitive
Actionability: route-private-security
Suggested labels: security-review
Suggested next action: route reporter to private security reporting before public discussion
```

Takeaway:

```text
Security-sensitive reports get private-routing guidance before public details expand.
```

## Maintainer Pilot Line

Use this when asking for feedback:

```text
Would this dry-run summary help you decide whether an incoming issue needs more info, support routing, private security routing, or maintainer review?
```
