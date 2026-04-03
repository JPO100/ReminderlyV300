Claude, implement Ticket 8: make the root README.md the single authoritative entry point. Keep this minimal and practical.

This is a documentation-only change. No code changes. No dependency changes. No behaviour changes.

Scope

* README.md (root) only.
* If README.md does not exist, create it.

Non-scope (non-negotiable)

* Do not modify docs/README.md.
* Do not modify any code files.
* Do not move files.
* Do not change package.json.
* Do not add badges, shields, or marketing content.
* No formatting overhauls. Keep it simple and readable.

Goal
README.md must clearly state:

1. What this project is

* Reminderly - a lightweight reminders app.
* Emphasise simplicity over abstraction.
* State explicitly: “This is a reminders app, not a framework.”

2. Platform constraint

* src/app/components/ui is platform-managed in Figma Make.
* It must not be imported or modified.
* It cannot be deleted in this environment.

3. Dependency rule of engagement

* Do not remove dependencies unless:

  * They are unused repo-wide (including platform-managed folders), and
  * A build can be verified in the target environment.

4. Where core logic lives

* src/app/App.tsx - primary state and orchestration
* src/app/reminder-utils.ts - categorisation, overdue, sorting, persistence sanitisation
* src/app/utils/ - NLC and helper logic

5. How to run

* npm run dev
* npm run build
* npm run test

Keep tone direct and practical. No fluff. No over-explanation.

Structure (simple headings only)

* Overview
* Project structure
* Platform constraints
* Development
* Rules of engagement

Acceptance criteria

* README.md is clear, under ~150–200 lines.
* No duplication of large docs content.
* No behavioural changes.
* Only README.md changed (or created if missing).

Output requirements

* Provide the full README.md content.
* Diff summary.
* Stop.
