Claude, review and update all documentation so it accurately reflects the current build state.

This is a documentation-only task.

Guard rails - non negotiable

* Do not change any application code.
* Do not change any UI, styling, behaviour, logic, tests, constants, or configuration.
* Do not refactor anything.
* Do not "improve" implementation.
* Documentation only.
* All documentation must live inside /docs.
* Do not create documentation outside /docs.
* Do not move production files.
* Do not rename source files.

The codebase is the source of truth. Documentation must reflect the current implementation exactly as it exists.

Scope

1. Review the entire build first

* Scan the full repository.
* Understand the current architecture, file structure, key flows, feature behaviour, edge cases, and dev tooling.
* Pay special attention to:

  * Reminder categorisation logic
  * Done / deleted system
  * Repeat logic and rescheduling
  * Natural language capture and normalisation
  * Dev tools and dummy reminder systems
  * Any guard logic (timers, dedupe, pending states, etc.)
* Do not assume documentation is correct - verify everything against code.

2. Update existing documentation

* Correct stale file paths, incorrect function locations, wrong counts, outdated behaviour descriptions.
* Ensure all references to functions, utilities, constants, and files match the current build.
* Remove anything that no longer exists in the code.
* Ensure terminology is consistent across all docs.

3. Create new documentation where needed

* If any meaningful feature, subsystem, or important logic exists in code but is undocumented, create a new focused document inside /docs.
* Prefer small, clear, purpose-driven documents rather than one large catch-all file.

4. Add relevant supporting documentation

Add anything necessary to help a new engineer:

* Understand system boundaries
* Understand key flows
* Understand known edge cases and design decisions
* Verify behaviour safely
* Avoid breaking fragile logic

Keep it practical and lightweight. Do not over-engineer the documentation set.

Output requirements

A. Review summary

* List of folders/files reviewed
* Confirmation that full repo was scanned

B. Documentation change log
For each file created or updated:

* File path (inside /docs only)
* Created or updated
* Summary of what changed
* Reason (what in the code required this change)

C. Definition of done

Documentation is complete when:

* All documented behaviour matches current code.
* No significant logic exists in code without documentation.
* No documentation contradicts the implementation.
* A new engineer could understand the system and verify behaviour without tribal knowledge.

Again:
No code changes.
No UI changes.
Documentation only.
All documentation must live inside /docs.
