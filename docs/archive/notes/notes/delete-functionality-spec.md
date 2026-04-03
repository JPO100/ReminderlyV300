Delete functionality – behavioural specification

Objective
Introduce a true delete state that:

Removes a reminder from the active list immediately.

Moves it to the Done / Deleted list.

Prevents repeat reminders from auto-rescheduling.

Allows recovery only via explicit undelete (uncheck in Done / Deleted).

Core principle
Delete is not Done.
Done = completes this occurrence (repeat may reschedule).
Delete = permanently suppress reminder (no auto-return, no repeat regeneration).

User story

As a user, I want to delete a reminder so that it is removed from the active list and placed in the Done / Deleted list, and does not return unless I explicitly undelete it.

Primary use case

Repeat reminders:

When marked done → next occurrence auto-generates (correct behaviour).

When deleted → repeat rule must not regenerate.

Delete must suppress recurrence entirely.

State model

Introduce a deleted state alongside completedAt.

Reminder should now support:

completedAt (existing done logic)

deletedAt (new delete logic)

Rules:

If deletedAt != null:

Reminder is excluded from all active filters.

Repeat rescheduling logic must ignore it.

It appears only in Done / Deleted view.

If undeleted:

deletedAt is cleared.

Reminder returns to active list.

Repeat behaviour resumes normally.

Deleted is authoritative over done.
If both exist, deleted state governs visibility and recurrence.

UI behaviour – delete action

When user taps delete:

Immediate behaviour:

Remove from active list.

Insert into Done / Deleted list.

Apply deleted styling (not blue).

No reschedule.
No grace period that triggers repeat logic.

Visual differentiation

Use colour: #939393

Delete / Deleted visual rules:

Checkbox:

Fill: #939393

Tick: #FFFFFF

Title:

Colour: #939393

Strikethrough: yes

Subtitle:

Colour: #939393

Strikethrough: yes

Status icon:

Colour: #939393

Important:
This must be visually distinct from Done (Reminderly blue).

Interaction in Done / Deleted list

In Done / Deleted list:

Deleted reminders show grey styling.

Unchecking (undelete) restores:

deletedAt = null

Reminder returns to correct active filter.

Repeat resumes if applicable.

No auto-transition back without explicit user action.

Repeat logic modification

Current behaviour:

Done on repeat → generate next instance.

New rule:

If deletedAt != null → skip recurrence logic entirely.

Delete must be terminal for repeat generation.

This prevents repeat reminders reappearing after deletion.

Edge cases

Delete a reminder that is mid-repeat cycle.

Must not generate future instances.

Delete an overdue reminder.

Treated same as any other.

Delete a reminder already marked done.

deletedAt overrides completedAt.

Styling must reflect deleted state (grey, not blue).

Undelete a repeat reminder.

Repeat rule resumes.

No retroactive generation.

Non-scope

No soft-delete expiry.

No archive view.

No undo snackbar.

No new filters.

No UI redesign beyond colour differentiation.

No schema refactor beyond adding deletedAt.

Keep it simple.
Single additional field.
Minimal branching in render logic.
No over engineering.