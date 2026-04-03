Scope

Update the Reminderly self-check system to achieve the following three outcomes only:

1. Add self-check coverage for existing dev tools settings and feature flags that are currently not represented in the self-check suites.
2. Insert section titles into the self-check output so the list of checks is grouped by functional area.
3. Update baseline and documentation references so totals and descriptions match the actual self-check implementation after the update.

The implementation must remain simple and must follow the exact architectural patterns already used in the existing self-check system located in `/src/app/dev`.

No redesign, new framework, new architecture, or new product behaviour is permitted.

Claude must not introduce discovery phases, refactoring work, architectural changes, or behavioural assumptions.

All new checks must mirror behaviour that already exists in the codebase.

---

Self-check coverage

Add new checks only for behaviours that already exist in the application and are already implemented in code.

The checks must follow the exact pattern already used in the current self-check suites:

* deterministic
* pure-function style where possible
* no component mounting
* no UI rendering tests
* no asynchronous tests
* no external libraries
* no new testing framework

Tests must read the real implementation and verify its behaviour exactly.
Do not infer behaviour.
Do not introduce new behaviour.

Add checks for the following settings and feature flags if they exist in the codebase:

Dev tools password required

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

Paywall toggle

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

Onboarding tutorial enabled toggle

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

Tutorial first-launch toggle

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

Tutorial every-start toggle

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

First-launch tutorial sentinel behaviour

Verify the exact behaviour implemented in the codebase.
Tests must replicate the existing logic exactly.

Filters menu setting

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

Show date and time subtitles setting

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration
* any reset behaviour that already exists in the code

Hide overdue dev toggle

Verify:

* behaviour when no persisted value exists
* persistence behaviour
* behaviour after reload or hydration

No other behaviours may be tested.

No new feature flags or settings may be introduced.

---

Self-check output structure

Modify the display of the self-check output so the list of checks is grouped using section titles.

Do not change the checks themselves.

Do not remove any checks.

Do not change the order of checks.

Do not change pass or fail logic.

The only change permitted is inserting section titles above groups of checks.

Required sections:

Schedule and reminder logic
Persistence and hydration
Natural language parsing
Natural language interaction
Done, deleted, and completion
Dev tools and feature flags

The summary section at the top of the output must remain unchanged and must still include:

* invocation id
* run time
* duration
* passed and failed totals

The output must remain a simple textual list.

The following changes are not permitted:

* filtering
* search
* sorting
* collapsing sections
* accordions
* tabs
* navigation controls
* styling redesign

---

Documentation and baseline updates

After the self-check updates are complete, update documentation and baseline references so they match the real implementation.

Update the following files:

`/src/app/dev/BASELINE.md`
`/docs/06-quality-and-dev/self-check-system.md`
`/docs/06-quality-and-dev/tests-and-baselines.md`
`/docs/01-core-surfaces/dev-tools-overlay.md`

Required updates:

* correct total number of checks
* correct per-suite counts
* correct example output
* removal of outdated totals such as 228 if they no longer match the real count

If other documentation files reference self-check totals or output structure, update those references.

No documentation restructuring is permitted.

---

Non-scope

The following are explicitly not permitted:

* no changes to reminder behaviour
* no changes to production features
* no changes to application logic
* no new dev tools functionality
* no redesign of the dev tools overlay
* no new UI elements
* no new testing framework
* no new architecture for the self-check system
* no refactoring unrelated to the self-check system
* no documentation changes unrelated to the self-check system

---

Implementation constraints

The implementation must:

* follow the current architecture used in `/src/app/dev`
* reuse the same check structure already used in existing suites
* maintain deterministic ordering
* maintain the existing summary format
* remain lightweight and simple

Section titles must be inserted using the existing output generation mechanism.

Do not introduce new rendering systems or abstractions.

---

Acceptance criteria

The work is complete only when all of the following are true:

1. The self-check suite includes checks for the dev tools settings and feature flags listed above where those behaviours exist in the code.
2. The self-check output is grouped into titled sections while preserving the full list of checks.
3. The summary section at the top of the report remains unchanged.
4. The total number of checks displayed matches the number of checks executed.
5. Baseline and documentation files reflect the updated totals and output format.
6. No new behaviours, UI changes, or architectural changes have been introduced.

---

Delivery format

Return:

1. Scope confirmation
2. Files changed
3. New checks added grouped by area
4. Final self-check totals
5. Documentation updates applied
