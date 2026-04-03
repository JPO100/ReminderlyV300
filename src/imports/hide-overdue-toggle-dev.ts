Scope: Hide overdue reminders toggle (dev tools, dummy reminders)

Goal
Add a single dev-only toggle that hides overdue reminders everywhere in the UI to reduce noise from randomly-dated dummy reminders later in the day. This is a visual filter only.

Definitions

* Overdue means whatever the existing isOverdue(reminder) function returns. Do not change isOverdue.

In scope

1. Dev tools UI

* On the dummy reminders page in dev tools, add one toggle labelled Hide overdue reminders.

2. Default

* Default is off.

3. Behaviour when on

* When enabled, hide any reminder where isOverdue(reminder) is true.
* This must apply to every list and view that renders reminders, including overdue, today, this week, later, sometime, done, deleted.

4. Done and deleted

* Done and deleted are not exempt.
* If an item in done or deleted is overdue, it is hidden while the toggle is on.
* No special cases.

5. Persistence

* Persist this toggle using the same mechanism and pattern already used for dummy reminders dev controls. Do not introduce a new persistence approach.

Hard constraints

* Visual filter only. Do not mutate reminder data.
* Do not change generation, counts, scheduling, categorisation, sorting, timers, undo flows, or any non-dev UI.
* Keep implementation to: one boolean + one conditional filter in the render pipeline.

Non-scope

* No new helper utilities.
* No refactors of reminder logic or list rendering.
* No additional toggles or options.
* No analytics, logging, or tests unless the project already has an existing lightweight dev-check pattern for this exact area.

Acceptance checks

* Toggle off: app behaviour unchanged.
* Toggle on: overdue reminders are not visible anywhere, including done and deleted.
* Toggle off again: hidden items immediately reappear.
* Verifiable that reminder objects are unchanged by toggling.
