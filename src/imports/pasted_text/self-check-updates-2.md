Scope correction

Two issues must be corrected, and only those two issues may be changed.

1. The on-screen self-check results list does not render section titles, even though section titles already appear in the copied text output.

2. The reported self-check total is wrong and must be corrected everywhere it is referenced.

Do not change anything else.

---

Required fix 1 - On-screen section titles

Render the same section titles in the on-screen self-check results list that already appear in the copied text output.

Requirements

* Use the exact same section titles already used by the copied output.
* Use the exact same section ordering already used by the copied output.
* Preserve the existing check entries exactly as they are.
* Preserve existing pass/fail indicators exactly as they are.
* Preserve existing check names exactly as they are.
* Preserve existing check ordering exactly as it is.
* Do not change grouping names.
* Do not change grouping order.
* Do not change totals.

Implementation constraints

* Reuse the existing section extraction and grouping logic already implemented for the copied output.
* Do not create a second grouping system.
* Do not duplicate grouping logic in a separate implementation.
* Do not modify copied output behaviour.
* Do not redesign the UI.
* Do not add controls, filters, search, collapse behaviour, tabs, layout changes, or new styling systems.

Only render the already-existing section titles in the on-screen list.

---

Required fix 2 - Correct total check count everywhere

The reported total must be corrected to the real executed total.

Use the actual number of checks defined and executed by the current suites. Do not use prior summaries or prior documentation totals.

The verified total is 274.

That total must be used consistently across all of the following:

* runtime self-check report
* `/src/app/dev/BASELINE.md`
* all documentation files that reference the self-check total
* the implementation summary

Do not guess.
Do not round.
Do not leave stale totals in any file.
Do not add or remove checks.

Only correct the reported totals so they match the real executed total of 274.

---

Documentation scope

Update only documentation that directly references the self-check total or the self-check output structure.

This includes any file that still contains stale totals such as 228, 276, or any other incorrect number for the self-check total.

At minimum, correct all directly relevant references in:

* `/docs/00-overview/README.md`
* `/docs/00-overview/product-overview.md`
* `/docs/01-core-surfaces/dev-tools-overlay.md`
* `/docs/03-natural-language-and-scheduling/nlc.md`
* `/docs/06-quality-and-dev/dev-tools.md`
* `/docs/06-quality-and-dev/self-check-system.md`
* `/docs/06-quality-and-dev/tests-and-baselines.md`
* `/src/app/dev/BASELINE.md`

Do not restructure documentation.
Do not rewrite unrelated sections.
Only correct self-check totals and directly related self-check output references.

---

Baseline correction constraints

When updating `/src/app/dev/BASELINE.md`:

* Correct the total to 274.
* Correct any stale section output if required so it matches the actual current grouped output.
* Remove any duplicate check lines only if they are erroneous duplicates introduced by the previous incorrect update.
* Do not rename checks.
* Do not rewrite valid baseline entries.
* Do not change check ordering except where required to make the baseline match the real current output exactly.

The baseline must match the actual current runtime output exactly.

---

Non-scope

The following changes are not permitted:

* modifying any self-check logic
* modifying any check behaviour
* renaming checks
* rewording checks
* reordering checks
* adding checks
* removing checks
* modifying reminder behaviour
* modifying application behaviour
* adding new UI features
* redesigning the dev tools overlay
* introducing new rendering systems
* introducing new abstractions beyond reusing the existing grouping logic
* refactoring unrelated code
* modifying documentation beyond correcting self-check totals and directly related self-check output references

---

Acceptance criteria

The work is complete only when all of the following are true:

1. Section titles appear in the copied self-check report.
2. The same section titles appear in the on-screen self-check results list.
3. Both outputs use the same section titles and the same ordering.
4. The total number of checks is 274 everywhere it is referenced.
5. `BASELINE.md` matches the real runtime output.
6. Documentation references to the self-check total are corrected to 274.
7. No check logic, wording, order, grouping names, or grouping order has changed.

---

Return

1. Files changed
2. Cause of the on-screen section header issue
3. Exact fix applied for on-screen rendering
4. Confirmation that the runtime total is 274
5. List of every file where an incorrect self-check total was corrected
6. Confirmation that runtime output, baseline, documentation, and implementation summary now all match exactly
