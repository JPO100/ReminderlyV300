Here is your copy-paste ready instruction for Claude.

It is deliberately explicit, tightly scoped, and removes room for interpretation or creativity. It keeps implementation simple and avoids over-engineering.

---

# Repeat reminder completion – correct done + reinsertion behaviour

## Context

We already have repeat reinsertion logic working correctly.

Current incorrect behaviour:

* When a repeat reminder is marked as done, it is reinserted for the next occurrence.
* But the completed instance does NOT appear in the DONE/DELETED list.

This is logically wrong.

Correct behaviour must be:

When a repeat reminder is marked as done:

1. The current instance must behave exactly like a normal reminder completion.
2. It must appear in the DONE/DELETED list with a completedAt timestamp.
3. Independently, the next occurrence must be calculated and inserted into the active list.
4. The two behaviours must be decoupled but triggered from the same user action.

We are not changing UX.
We are not changing animation behaviour.
We are not changing filtering logic.
We are not changing repeat calculation logic.
We are not adding new models or abstractions.
We are not refactoring architecture.
We are not introducing services, managers, or patterns.

Keep this simple and clean.

We are building a reminders app, not a distributed event system.

---

# Required behaviour model

When user marks a repeat reminder as done:

Treat it as two simple operations executed in sequence:

Operation A – Complete current instance
Operation B – Insert next instance

These must be independent and explicit.

---

# Data model assumptions (do not change)

Reminder has:

* id
* text
* createdAt
* schedule
* repeatRule (nullable)
* completedAt (nullable)

We are not changing this shape.

---

# Implementation rules

## 1. Do NOT mutate the original reminder into the next instance

This is critical.

The completed reminder must remain completed.
The next instance must be a NEW reminder object.

Do not reuse the same object.
Do not reuse the same id.
Do not "clear" completedAt.
Do not "advance" schedule on the same object.

That is what is currently causing the loss of done history.

---

## 2. Completion logic (Operation A)

When toggleDone is triggered for a repeat reminder:

You must:

* Set completedAt = new Date().toISOString() (or existing standard)
* Leave repeatRule intact on the completed instance
* Leave schedule as it was for that instance
* Allow existing done-view logic to pick it up naturally

Do not bypass normal completion flow.
Do not special-case repeat reminders in a way that skips done behaviour.

Repeat reminders must enter DONE/DELETED exactly like non-repeat reminders.

No exceptions.

---

## 3. Reinsertion logic (Operation B)

After completion is recorded:

If repeatRule exists:

* Compute next scheduled date using existing repeat calculation logic.
* If next date cannot be computed, stop. Do nothing further.

Then:

Create a NEW reminder object:

* id: new unique id (use existing id generation logic only – do not invent new mechanism)
* text: same text
* createdAt: new Date().toISOString()
* schedule: next computed schedule
* repeatRule: copy original repeatRule
* completedAt: null

Insert this new reminder into reminders state as an active reminder.

Do not:

* Modify original object.
* Remove repeatRule from original.
* Copy completedAt.
* Link the two objects.
* Add parentId, originId, metadata, flags, etc.

No relational modelling.
No history tracking.
No extra fields.

Simple duplication with new schedule.

---

## 4. Order of operations

Correct order must be:

1. Mark current reminder completed (state update).
2. Compute next occurrence.
3. Insert new reminder.

This must happen within the same user action.

Do not introduce timers.
Do not introduce async workflows.
Do not introduce useEffect side-effects to trigger reinsertion.
Keep it in the same logical handler.

---

## 5. DONE/DELETED list behaviour

You must verify:

* Completed repeat reminders appear in DONE/DELETED immediately.
* Reinsertion does not remove them from DONE.
* Filtering logic (r.completedAt != null) continues to work unchanged.
* No regression in done-view animation.

Do not modify DONE/DELETED filter logic.

If your implementation requires changing done filtering, you have done it wrong.

---

## 6. Critical constraints

Do NOT:

* Introduce new hooks.
* Introduce new state.
* Introduce flags like isRepeatInstance.
* Add conditionals in filter logic.
* Change sorting logic.
* Change animation timing.
* Create abstraction layers.
* Refactor repeat engine.
* Add logging.
* Add configuration.
* Generalise beyond current requirement.

We are solving exactly one problem:
Repeat reminders must both appear in DONE and be reinserted.

Nothing more.

---

## 7. Required verification checklist

After implementing:

Confirm:

1. Non-repeat reminder completion unchanged.
2. Repeat reminder:

   * Completed instance appears in DONE.
   * New instance appears in active list.
   * IDs are different.
   * completedAt is set only on completed one.
3. No duplicate behaviour.
4. No infinite reinsertion loops.
5. No regression in existing repeat scheduling.
6. All tests pass.

If tests fail, fix minimally. Do not refactor.

---

## 8. Implementation principle

This must be:

* Small.
* Surgical.
* Explicit.
* Boring.
* Predictable.

If your change touches more than the completion handler and the immediate reinsertion logic, you are over-engineering.

Keep it clean.
Keep it lightweight.
Keep it obvious.

End of instruction.
