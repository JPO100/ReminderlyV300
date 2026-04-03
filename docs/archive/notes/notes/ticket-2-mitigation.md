Claude, do not proceed further with Ticket 2 deletion in this environment.

Ticket 2 is blocked because src/app/components/ui is platform-protected in Figma Make and cannot be deleted here. Implement the smallest possible mitigation so this does not block day-to-day work, while still preventing accidental usage.

Scope (only these two edits)

1. scripts/guard-no-ui-suite.mjs
2. docs/README.md

Non-scope (non-negotiable)

* No further deletions.
* No dependency changes.
* No app code changes.
* No import/refactor/reformat work.
* No new scripts beyond the one that already exists.
* No other docs changes beyond the one paragraph described below.

Change 1: Make guard:repo non-blocking in Figma Make

* Update scripts/guard-no-ui-suite.mjs so it never exits non-zero.
* Behaviour:

  * If src/app/components/ui exists:

    * print exactly one warning line:

      * "Warning: src/app/components/ui is platform-managed in Figma Make and cannot be deleted here. Do not import from it."
    * exit(0)
  * If it does not exist:

    * exit(0)
* Do not add environment detection, flags, config, or new abstractions. Just make it warn-not-fail.

Change 2: Document the platform constraint (one paragraph)

* In docs/README.md, directly under the existing guardrail sentence, add one short paragraph stating:

  * src/app/components/ui is platform-managed/protected in Figma Make and cannot be deleted in this environment
  * it is intentionally unused and must not be imported
  * in a normal git environment it can be removed with rm -rf src/app/components/ui

Verification (logical, no execution required)

* Confirm src/app/components/ui still exists.
* Read back the updated script and confirm it cannot exit with code 1.
* Read back docs/README.md and confirm the paragraph is present once, directly under the guardrail sentence.

Output requirements

* List exactly which files changed (should be 2).
* Diff summary (lines added/changed).
* Confirm Ticket 2 deletion remains blocked by platform protection and is not attempted further.
