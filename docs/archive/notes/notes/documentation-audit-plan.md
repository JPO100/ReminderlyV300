Send this to Reminderly exactly as written.

---

Title: Full documentation audit and update - all areas

Objective
Perform a complete, forensic-level review and update of all Reminderly documentation across the entire project - not just recent repeat changes. Everything must be accurate, current, consistent, and aligned with the actual codebase as it exists today.

This is a documentation-only task.
No code changes.

Scope
Audit and update documentation across:

* Natural language capture (NLC)
* Reminder model and data structures
* Scheduling logic
* Repeat logic (all frequencies)
* List rendering behaviour
* Done / deleted behaviour
* Overlay behaviour (NewReminderOverlay, ReminderInfoOverlay)
* Normalisation utilities
* Date/time formatting rules
* Dev tools and test harness
* reminder-checks.ts coverage
* BASELINE.md totals
* Feature flags (if any)
* LocalStorage persistence rules
* Legacy field handling and migration behaviour
* Any architectural notes or README files
* Any glossary or terminology sections
* Any developer-facing behavioural contracts

Requirements

1. Code is source of truth
   Do not document intended behaviour.
   Document actual current behaviour as implemented.

2. Remove outdated documentation
   Delete references to:

* Inbox (if fully removed)
* Any deprecated repeat formats
* Any removed legacy fields (done, completed, etc.)
* Any behaviour that no longer exists

3. Standardise terminology
   Ensure consistent wording for:

* "Repeats every …"
* schedule.date
* schedule.time
* repeatRule
* interval
* frequency
* completedAt
* pendingUncompleteIds (if documented)
* scheduled vs unscheduled vs sometime

4. Repeat section must now reflect:

* Interval=1 uses "Repeats every {unit}"
* Interval>1 uses "Repeats every {n} {plural}"
* Weekly uses parenthetical weekday formatting
* Monthly uses schedule.date for day-of-month when present
* Time appended only when schedule.time exists
* Overlay inherits formatter behaviour (if applicable)

5. Tests documentation

* Ensure reminder-checks.ts section accurately lists what is covered
* Ensure BASELINE.md totals match current numbers
* Update any coverage summary counts
* Remove references to removed tests
* Do not inflate coverage claims

6. Keep documentation simple

Do not introduce architectural theory.
Do not suggest future refactors.
Do not propose improvements.
Do not add "recommended enhancements".
This is not a redesign pass.
It is an accuracy and clarity pass.

7. Style requirements

* Clear, direct, technical writing.
* No marketing language.
* No speculative language.
* No roadmap content.
* No "could", "should", or "future".
* Use present tense.
* Prefer bullet points over long prose.

Deliverables

Produce:

1. A structured summary of all documentation files updated.
2. A concise changelog of documentation corrections made.
3. A confirmation statement that:

   * All repeat wording matches implementation.
   * All test counts match BASELINE.md.
   * No deprecated behaviour remains documented.
   * No assumptions were made beyond current code.

Important

If you encounter contradictions between docs and code:

* Update documentation to match code.
* Do not change code.
* Flag the discrepancy in your summary.

No over engineering.
No structural rewrites.
No new documentation systems.
Just accurate, clean, current documentation across the entire Reminderly project.

---
