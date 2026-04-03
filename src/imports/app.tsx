Claude, proceed with this change exactly as specified. Do not make any other changes. Do not refactor. Do not “improve” related logic. Do not touch any other files.

Goal

When a repeating reminder is marked done:

The completed instance must remain completed and appear in the done/deleted list

A new next instance must be inserted into the active list

This must be implemented by changing the existing reschedule callback to append a new reminder instead of mutating the existing one.

Non-negotiable constraints

Keep the existing timer as-is (the existing 1000ms reschedule delay remains). Do not change any timings (including 350ms). Do not add new timers.

Do not change filters, sorting, animations, or list view logic.

Do not add new fields (no parentId, originId, instanceId, metadata, flags, etc.).

Do not add new hooks, new state, new abstractions, new helpers, or shared utilities.

Do not change parsing or text normalisation.

Do not address the uncomplete duplication edge case. It is explicitly out of scope.

Exact implementation change

File: App.tsx
Location: the reschedule callback inside handleCompleteClick (the existing code path that currently clears completedAt and advances schedule on the same reminder id).

Current incorrect pattern (conceptually):

In the timer callback, code finds the same reminder id and mutates it to become the next instance by clearing completedAt and replacing schedule

Replace that with:

Do nothing to the original completed reminder in the timer callback. Specifically:

Do not clear completedAt

Do not modify schedule

Do not modify repeatRule

Do not modify text fields

In the timer callback, compute the next schedule using the existing repeat calculation logic (no changes to that logic).

If next schedule is not computable, stop. Do not insert anything.

If next schedule is computable, append a brand new reminder object to state.

The new reminder object must be created with:

id: crypto.randomUUID() (inline, at this call site only)

createdAt: new Date().toISOString()

schedule: nextScheduleObj (the computed next schedule)

repeatRule: copied from the completed reminder

completedAt: null

originalText: copied from the completed reminder

displayText: copied from the completed reminder

Do not recompute displayText. Do not normalise. Copy as-is.

The state update must be an append (or equivalent) that adds a new item, not a map that transforms the existing item.

What must not change

Non-repeat reminders completion behaviour stays exactly the same.

Done/deleted list logic stays exactly the same.

All animations, delays, and visibility windows stay exactly the same.

No other code paths are touched.

Deliverables after change

Return:

The exact diff for the modified callback block in App.tsx

Confirmation that only App.tsx changed

Confirmation that the old map-based mutation of the completed reminder id is fully removed

Test run output showing all tests pass (no new tests unless an existing test fails because of this change)

Proceed now with only this surgical correction.