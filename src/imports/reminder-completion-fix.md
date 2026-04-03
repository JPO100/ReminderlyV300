Claude, implement the change request below exactly as written. Keep the implementation simple, clean, and lightweight. Do not introduce any new abstractions, frameworks, state machines, or general-purpose infrastructure.

Change request: prevent repeat reminder duplication on double-click during in-flight completion

Context
Repeat reminders have a short in-flight window after the user clicks the checkbox where the reminder is marked done, then a new instance is spawned back into the active list. That baseline behaviour is correct and must not be changed for a single click.

Bug summary
If the user clicks the checkbox twice during the in-flight window (before the original row disappears), the reminder completion is effectively processed twice, resulting in:

* one done entry being created (fine)
* one new active instance being created (expected)
* a second new active instance being created (bug)

Expected behaviour
During the in-flight window, a second checkbox click should undo the pending completion:

* the done action is cancelled
* the reminder stays in the active list
* no new repeat instance is spawned
  Once the in-flight window has completed and the reminder has left the active list, normal behaviour continues as today.

Non-negotiable constraints

* do not change the single-click behaviour for repeat reminders
* do not change behaviour for non-repeat reminders
* do not change reminder scheduling logic, categorisation, sorting, or text rendering
* keep the fix local to the checkbox completion flow for repeat reminders
* no new dependencies
* no broad refactors

Step 1: confirm the root cause with minimal instrumentation
Do not start fixing until you have confirmed whether the repeat completion handler is being executed twice for the same reminder id.

Add temporary, minimal instrumentation in the repeat-complete path only:

* add a per-invocation op id (crypto.randomUUID())
* log one line at handler entry including: reminder id, op id, Date.now(), and a boolean “isPending” (see step 2)
* add a counter keyed by reminder id around the spawn-next-instance line
* only emit a warning log when the counter for a reminder id exceeds 1 during a single reproduction

Repro steps to run once in dev

* create any repeat reminder
* click the checkbox once and observe baseline behaviour
* repeat, but click the checkbox twice quickly during the in-flight pause
  Confirmation criteria
* confirmed cause: two handler entry logs for the same reminder id within the in-flight window, and counter exceeds 1
* if not confirmed, stop and report what you observed instead of guessing

Step 2: implement the smallest fix that achieves the expected behaviour
Implement “second click during in-flight window cancels the pending completion” using a single, local pending flag keyed by reminder id.

Required behaviour of the pending flag

* on first click for a repeat reminder, set pending for that reminder id immediately
* while pending is true, a second click must cancel the completion:

  * clear pending
  * prevent the “mark done” from being committed (or revert it if already queued but not committed)
  * prevent spawning the next repeat instance
  * keep the reminder visible in the active list as normal
* after the completion successfully finishes (normal single click), clear pending for that reminder id

Implementation constraints for the fix

* keep state minimal and local (for example a Set of pending reminder ids, or a single map keyed by reminder id)
* do not add timers unless they already exist in this flow
* do not add new components unless the existing code structure makes it unavoidable
* do not redesign the checkbox UI, animation, or delay timing

Step 3: add a regression check
Add one lightweight regression check that covers the double-click path. It must prove one of the following:

* no duplicate spawn is possible, and
* the second click cancels the pending completion and leaves the reminder active

Keep the test small and targeted to the completion flow for repeat reminders only.

Step 4: remove instrumentation
After confirming the cause and implementing the fix, remove all temporary logs and counters completely.

Deliverable
Return a concise summary of:

* the confirmed cause (based on the instrumentation)
* exactly what code path was changed (file paths and key functions)
* the regression check added (file path and what it asserts)
