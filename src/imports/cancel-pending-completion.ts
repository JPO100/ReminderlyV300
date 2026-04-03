Claude - tighten your interpretation to match the change request exactly, and proceed. Do not pause.

Scope confirmations (answers to your questions)

1. Replace “ignore second click” with “cancel pending completion”
   Yes. The existing guard that returns early on a second click is not the desired behaviour. For repeat reminders only, during the in-flight completion window, the second click must actively cancel the pending completion so the reminder stays active and nothing is committed or spawned.

This is not optional and does not require further confirmation.

2. Cover both windows (0-350ms and 350-850ms)
   Yes. The fix must cover the full in-flight period from first click until the repeat-reschedule work is finished and the row has transitioned out. Treat the entire cycle as “pending completion” and make it cancellable by a second click at any point before final commit completes.

In other words: do not key pending purely off completionTimersRef. Key it off the overall in-flight state for that reminder id, so you cannot re-enter the completion flow while the reschedule timer is still in-flight.

3. Instrumentation vs inability to run the app
   Proceed with instrumentation code in place, but do not require you to run it. Implement the fix based on the confirmed code path you already identified, then remove instrumentation after the fix and regression check are in.

However, you must still keep the instrumentation minimal and temporary, and you must state the exact console output we should expect when we run the repro. That allows us to validate quickly on our side without iteration.

4. Regression test location
   Follow the existing pattern in /src/app/dev/ and add a single check alongside the existing reminder checks. Do not introduce a new test framework or new test harness.

Implementation direction (non-negotiable)

A. Root cause you must address
The duplication path is the second unguarded window you described: after the 350ms completion timer fires and removes the reminder id from completionTimersRef, but while the 500ms reschedule timer is still running, a second click starts a second completion cycle. That can spawn twice.

B. Required behaviour
For repeat reminders only:

* first click starts a cancellable “pending completion” state for that reminder id across the entire in-flight lifecycle (covers both the 350ms and the 500ms timers)
* second click while pending cancels everything:

  * clear and delete any completion timer and any reschedule timer for that reminder id
  * revert any pending UI state for that reminder id
  * ensure no done entry is committed
  * ensure no new repeat instance is spawned
  * reminder remains in active list

C. Minimal implementation rules

* do not add timers
* do not add new components
* do not introduce new abstractions
* do not refactor unrelated code paths
* implement using the existing refs (completionTimersRef, rescheduleTimersRef) plus one small local pending structure keyed by reminder id (Set or Map). Keep it in the same file as handleCompleteClick.

Concrete steps to implement

1. Add a single pending set

* pendingRepeatCompletionIdsRef (Set<string>) or similar, stored in a ref.
* Set it on the first click for repeat reminders.
* Clear it only when either:

  * cancel happens, or
  * the full completion + reschedule cycle has completed and the new instance has been spawned exactly once.

2. Change the second click handling
   In handleCompleteClick for repeat reminders:

* if pendingRepeatCompletionIdsRef has reminderId:

  * call cancelPendingRepeatCompletion(reminderId)
  * return

3. Make cancelPendingRepeatCompletion do only this

* clearTimeout for any timer stored for reminderId in completionTimersRef and rescheduleTimersRef
* delete reminderId from both maps/refs
* remove reminderId from pendingRepeatCompletionIdsRef
* revert any local UI state used to render “pending done” (for example pendingDoneIds state, if present)
* do not touch reminder logic beyond these local state/refs

4. Ensure spawn cannot run twice
   Wherever the spawn-next-instance happens (inside the reschedule timer):

* first line must check pendingRepeatCompletionIdsRef still contains reminderId
* if not pending, exit early and do not spawn
* if pending, spawn once, then clear pendingRepeatCompletionIdsRef for that reminder id

This single guard is what makes cancellation robust even if the timeout callback is already queued.

Instrumentation requirements (temporary, minimal)

Add one log at handler entry and one warning only on duplicate spawn attempt:

* handler entry: reminderId, opId, now, isPendingRepeatCompletion
* spawn warning: reminderId, spawnCount, opIds

Expected console validation (what we will see when we run it)

* normal single click: one handler entry log, no warnings, one spawn
* double click during in-flight: first click logs entry, second click logs entry with isPending true, no warnings, no spawn

Regression check (single lightweight dev check)

Add one new check in the existing reminder checks file:

* simulate repeat reminder completion flow with controlled timers (fake timers if already used, otherwise a minimal deterministic approach using direct invocation of the timer callbacks if that is how the dev checks are structured)
* assert that calling the completion handler twice for the same reminder id before reschedule completes results in:

  * no spawn
  * reminder remains active
  * no done entry committed

Keep it to one check. Update BASELINE counts if that is required by the repo’s process.

Deliverable format
Return:

* files changed
* exact function names touched
* what the regression check asserts
* confirm instrumentation removed

No further questions. Proceed.
