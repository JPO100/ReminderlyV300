Copy-paste ready instruction for Claude below.

This is tightly scoped. No creativity. No refactors. No abstractions. No data model changes.

---

# Repeat reminder uncomplete – prevent duplicate active instances

## Context

Current behaviour:

When a repeating reminder is marked done:

* The completed instance stays in DONE.
* A new next instance is inserted into ACTIVE.

This is correct.

However, when a completed repeating reminder is later “undone” from the DONE/DELETED list:

* It is restored into ACTIVE.
* The already-created next repeating instance is still in ACTIVE.
* Result: two active reminders for the same repeating series.

This is undesirable.

We are not changing the data model.
We are not introducing series IDs.
We are not refactoring repeat logic.
We are not redesigning undo.

We are applying a minimal, surgical correction inside the uncomplete handler only.

---

# Desired behaviour

When uncompleting a completed reminder that has a repeatRule:

1. Compute what its “next occurrence” schedule would be using the existing repeat calculation logic.
2. Search ACTIVE reminders for an existing reminder that matches:

   * Same repeatRule (logical equality)
   * Same originalText
   * Same displayText
   * Schedule equal to the computed next schedule
   * completedAt == null
3. If and only if exactly one such active reminder exists:

   * Remove that active reminder.
   * Then uncomplete the original reminder (normal behaviour).
4. If zero matches exist:

   * Perform normal uncomplete behaviour.
5. If more than one match exists:

   * Perform normal uncomplete behaviour (do not guess).

This ensures:

* At most one active instance per repeat series after undo.
* No guessing.
* No destructive behaviour when ambiguous.

---

# Strict constraints

Do NOT:

* Add new fields (no seriesId, parentId, originId, metadata).
* Modify Reminder type.
* Introduce new hooks or state.
* Introduce new utilities.
* Refactor repeat calculation logic.
* Change completion flow.
* Change timers.
* Change sorting.
* Change filters.
* Change animations.
* Add logging.
* Add deduping logic elsewhere.

This change must live entirely inside the uncomplete handler.

If your change touches more than the uncomplete handler and necessary local helpers already in this file, you are over-engineering.

---

# Implementation details

## File

`/src/app/App.tsx`

## Location

Inside `handleUncompleteClick` (or equivalent uncomplete handler).

Do not modify other files.

---

## Step 1 – Early guard

Inside the uncomplete handler:

If the reminder being uncompleted does NOT have a repeatRule:

* Run existing uncomplete logic unchanged.
* Return.

No other behaviour change.

---

## Step 2 – Compute expected next schedule

Before mutating state:

* Capture:

  * originalText
  * displayText
  * schedule
  * repeatRule

Use the existing repeat calculation logic (the same function used in completion reinsertion) to compute:

`expectedNextSchedule`

If no next schedule can be computed:

* Fall back to normal uncomplete behaviour.
* Return.

Do not rewrite repeat logic.
Do not duplicate algorithm.
Call the existing function only.

---

## Step 3 – State update logic

Modify the state update inside the uncomplete handler to:

1. Identify active reminders (completedAt == null).
2. Among those, find reminders where:

   * repeatRule logically equals the uncompleted reminder’s repeatRule
   * originalText === capturedOriginalText
   * displayText === capturedDisplayText
   * schedule equals expectedNextSchedule (use existing schedule equality helper if available)
   * id !== the id being uncompleted

Use existing equality helpers if present.
Do not write new deep comparison utilities.

Collect matches.

---

## Step 4 – Decision logic

If matches.length === 1:

* Remove that matched active reminder from the array.
* Then apply the normal uncomplete transformation to the original reminder.

If matches.length === 0:

* Perform normal uncomplete logic unchanged.

If matches.length > 1:

* Perform normal uncomplete logic unchanged.
* Do not remove anything.

No other branching.

---

## Step 5 – Important ordering

The removal of the matched active reminder and the uncompletion of the original reminder must happen in the same state update (single setState call).

Do not:

* Chain multiple state updates.
* Use timers.
* Use useEffect.
* Split logic across renders.

One functional setState(prev => { ... }) block.

Keep it simple.

---

# What must remain unchanged

* Non-repeat reminders uncomplete behaviour unchanged.
* Repeat reminders complete behaviour unchanged.
* DONE/DELETED list logic unchanged.
* All animation timings unchanged.
* No change to highlight logic.
* No change to sorting or filtering.

---

# Edge case handling policy

We only remove the counterpart when there is exactly one confident match.

If ambiguous, we do nothing special.

We do not attempt to be clever.

We do not attempt fuzzy matching.

We do not attempt recovery.

Simple, deterministic, safe.

---

# Verification checklist (must confirm)

After implementation:

1. Non-repeat reminder uncomplete still works exactly as before.
2. Repeat reminder:

   * Complete → DONE + new ACTIVE instance (already working).
   * Undo → Only one ACTIVE instance remains.
3. If the next instance was manually edited (text/schedule changed), undo does not remove it.
4. If duplicates already existed, undo does not attempt mass deletion.
5. No type changes.
6. No other files modified.
7. All tests pass.

---

# Implementation philosophy

Keep it:

* Small
* Local
* Deterministic
* Boring
* Explicit

No new architecture.
No model evolution.
No system redesign.

We are preventing a duplicate. Nothing more.

Proceed.
