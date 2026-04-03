Scope

Update the Reminderly self-check system so that:

1. The self-check suite includes checks for existing dev tools settings and feature flags that are currently missing.
2. The self-check output is grouped into clearly titled sections while preserving the existing list of individual checks.
3. All documentation and baseline references accurately reflect the updated self-check suite and totals.

The implementation must remain simple, deterministic, and aligned with the current self-check architecture. No new frameworks, abstractions, or behaviours may be introduced.

Objectives

1. Expand the self-check suite to cover existing behaviour relating to dev tools settings and feature flags.
2. Improve readability of the self-check output by grouping the existing flat list into titled sections.
3. Update all relevant documentation and baseline references so totals, suite descriptions, and example output match the real system after the update.

In scope

Self-check coverage

Add self-checks for existing behaviour already present in the codebase but not currently represented in the self-check suites.

The checks must follow the same pattern used by the existing suites:

* Deterministic
* Pure-function style where possible
* No component mounting
* No UI rendering tests
* No external dependencies

Add checks for the following existing behaviours only.

Dev tools password required

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

Paywall toggle

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

Onboarding tutorial enabled toggle

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

Tutorial first-launch toggle

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

Tutorial every-start toggle

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

First-launch tutorial sentinel behaviour

Verify existing behaviour only:

* First launch opens tutorial when enabled and sentinel is absent
* Sentinel is written after first launch
* Tutorial does not auto-open once sentinel exists
* Disabled states do not auto-open tutorial

Filters menu setting

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

Show date and time subtitles setting

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration
* Grouped-to-standard reset behaviour that currently exists in the application logic

Hide overdue dev toggle

* Default value when no localStorage entry exists
* Persistence to localStorage
* Correct value returned after reload/hydration

No additional behaviours may be inferred, extended, or invented. Only verify behaviour that already exists in the codebase.

Self-check output structure

Refactor the self-check output presentation so that the list of checks is grouped into titled sections.

Requirements:

* Every individual check must remain visible in the output.
* Each check must continue to display its existing pass/fail indicator.
* The order of checks must remain deterministic.
* No checks may be removed, merged, or summarised.

The change must only introduce section titles above groups of checks.

The titles must correspond directly to the logical areas already represented by the suites.

Required sections:

Schedule and reminder logic
Persistence and hydration
Natural language parsing
Natural language interaction
Done, deleted, and completion
Dev tools and feature flags

The existing summary at the top of the report must remain unchanged:

* Invocation id
* Run time
* Duration
* Passed and failed totals

No additional UI elements may be introduced. Specifically:

* No filters
* No search
* No collapsing sections
* No accordions
* No sorting controls
* No visual redesign
* No new UI controls

The output must remain a simple textual list with section titles inserted.

Documentation and baseline updates

After the self-check updates are complete, update all documentation and baseline references so they match the real implementation.

This includes:

* Correct total number of checks
* Correct per-suite counts
* Correct example output
* Correct baseline content
* Removal of outdated totals such as 228 if the real number differs

Update only documentation that directly references the self-check system.

Files expected to be updated include:

/src/app/dev/BASELINE.md
/docs/06-quality-and-dev/self-check-system.md
/docs/06-quality-and-dev/tests-and-baselines.md
/docs/01-core-surfaces/dev-tools-overlay.md

If other documentation files reference self-check totals or output format, update those references as required.

Non-scope

The following are explicitly not permitted:

* No new application behaviour
* No modification of reminder logic
* No changes to production features
* No redesign of the dev tools overlay
* No new dev tools controls
* No search, filtering, export, or navigation features for self-check output
* No framework or architecture changes to the self-check system
* No documentation restructuring beyond correcting self-check references
* No refactoring unrelated to the self-check system

Implementation constraints

The implementation must:

* Follow the current self-check architecture already present in `/src/app/dev`
* Remain lightweight and simple
* Avoid new abstractions unless strictly required to add checks or insert section titles
* Maintain deterministic ordering of checks
* Maintain the existing output format except for the addition of section titles

Acceptance criteria

The work is complete only when all of the following are true:

1. The self-check suite includes checks for the existing dev tools settings and feature flag behaviours listed in this scope.
2. The self-check output is grouped into titled sections while preserving the full list of checks.
3. The top-level summary remains unchanged.
4. The total number of checks shown in the output matches the actual number executed.
5. All documentation and baseline files referencing the self-check system reflect the updated totals and structure.
6. No additional behaviours, UI changes, or architectural changes have been introduced.

Delivery format

Return the following:

1. Scope confirmation
2. Files changed
3. New checks added grouped by area
4. Final self-check totals
5. Documentation updates applied
