Claude, implement Ticket 5: remove nested setReminders in repeat reschedule timer callback, with zero behavioural change.

Scope

* src/app/App.tsx only.

Non-scope (non-negotiable)

* No UI changes.
* No timing changes (keep COMPLETE_DELAY and RESCHEDULE_DELAY exactly as-is).
* No changes to reminder data shapes or persisted fields.
* No new files, no cross-file helpers.
* No dependency changes.
* No unrelated refactors.

Change to make (surgical)

1. Locate the reschedule timer callback created when completing a repeating reminder (inside handleCompleteClick).
2. Refactor that timer callback so it performs exactly one state update:

* The callback must call setReminders once.
* It must not call setReminders inside that updater or inside any nested function.

Required behaviour inside the single setReminders updater

* Find the source reminder by id (the completed reminder id captured by the timer).
* Return prev unchanged if any of these are true:

  * source not found
  * source.deletedAt is not null
  * source.repeatRule is null
* Otherwise create the next-instance reminder exactly as the current logic does:

  * same schedule computation and repeat handling
  * same text/display fields
  * same insertion behaviour (append vs insert) as current code
* Preserve any existing duplicate-prevention logic exactly.

Timer bookkeeping (must remain identical)

* The reschedule timer must still be stored in rescheduleTimersRef for that id.
* The map entry must still be removed when the timer fires.
* Do not change cancellation logic elsewhere.

Acceptance criteria

* App.tsx is the only file changed.
* The reschedule callback now contains exactly one setReminders call and no nested setReminders.
* Behaviour is unchanged:

  * deleting the reminder before the reschedule fires prevents insertion
  * all existing undo/duplicate protections continue to work as before

Output requirements

* Provide exact line ranges for the before/after reschedule callback block.
* Diff summary.
