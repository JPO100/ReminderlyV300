Send this to Claude exactly as written.

---

Title: Surface time in repeat reminder secondary label

Context
In the reminder list, repeat reminders currently render as:

Call mum
Repeats everyday

This is incomplete when a time is set. If a reminder repeats daily at 5pm, the user needs to see that time in the secondary label.

Required change
Update the secondary repeat label rendering logic in the list view so that:

1. If a repeat rule exists and a time is set in schedule, the time is appended to the repeat label.
2. If no time is set, behaviour remains unchanged.
3. No changes to data model, parsing, scheduling logic, or repeat calculation. This is a display-only enhancement.

Expected behaviour

Daily repeat with time
Current:
Call mum
Repeats everyday

Required:
Call mum
Repeats everyday at 5pm

Weekly repeat with time
Current:
Call mum
Repeats weekly

Required:
Call mum
Repeats weekly every Wednesday at 4pm

Formatting rules

* Time must use the existing app-wide time formatter. Do not introduce a new formatting utility.
* Respect 12/24 hour formatting rules already in use elsewhere in the app.
* Reuse existing weekday formatting logic from repeatRule.byDay where applicable.
* Do not duplicate logic that already exists in schedule label generation.
* Keep the string generation simple and inline with current architecture. No new abstractions.

Edge cases

* If repeat exists but schedule.time is null, do not append anything.
* If repeat is weekly with multiple days (if supported), preserve current wording and append time once at the end.
* Do not alter recurring logic or next-occurrence calculations.

Scope guardrails

* No refactors.
* No new utilities unless absolutely required.
* No UI layout changes.
* No styling changes.
* No changes to tests except where display strings must be updated.

Add unit coverage

Add lightweight tests to confirm:

* Daily repeat with time includes "at [time]".
* Weekly repeat with time includes both weekday and "at [time]".
* Repeat without time remains unchanged.

Keep implementation clean, minimal, and surgical.
We are enhancing clarity, not redesigning repeat logic.
