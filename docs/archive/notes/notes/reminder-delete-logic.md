Here are the answers Claude needs - written as direct, copy-paste instructions. No extras, no new scope.

1. Delete trigger
   Add Delete as an action in ReminderInfoOverlay. This is the intended trigger. Keep the active row UI unchanged (checkbox remains Done behaviour).

2. Delete animation / delay
   Delete is immediate. No pending-delete delay. The reminder should disappear from the active list instantly as soon as Delete is tapped, and be visible in Done / Deleted view when that view is opened. Do not add pendingDeletedIds, timers, or animation gating for delete.

3. Deleting an already-done reminder and undelete behaviour
   On delete, set deletedAt regardless of completedAt. Deleted styling always wins.

On undelete:

* Clear deletedAt only.
* Preserve completedAt as-is.

Result:

* If it was previously done, it stays in Done / Deleted view, but returns to Done styling (blue) once deletedAt is cleared.
* If it was not done, it returns to the active list.

Do not auto-clear completedAt on undelete.

4. Sorting in Done / Deleted view
   Sort by an effective timestamp:

* Use deletedAt when deletedAt != null
* Else use completedAt

Descending (most recent first).

If both exist, deletedAt governs sort position.

5. Delete from Done / Deleted view
   No. Delete is only available from the active list via ReminderInfoOverlay. Do not add delete actions to the Done / Deleted view.

6. ReminderInfoOverlay interface changes
   Yes, confirm the current interface by reading ReminderInfoOverlay before modifying it. Then add a minimal onDelete callback and a single Delete action. Keep the overlay UI minimal and consistent with existing actions. No redesign.

7. Uncheck logic in Done / Deleted view
   Update the uncheck handler to branch:

* If reminder.deletedAt != null: undelete path (clear deletedAt only)
* Else: existing uncomplete path (clear completedAt and run existing repeat duplicate logic)

Do not run repeat duplicate removal for undelete.

8. Race condition: done pending then delete within 350ms
   Handle it with a simple guard, not new mechanisms:

* When deleting a reminder, cancel any pending completion/uncomplete timers for that reminder id, and remove it from pendingDoneIds / pendingUncompleteIds if present.
* Ensure repeat reschedule callback checks deletedAt at execution time and exits early if deletedAt != null.

This keeps delete "terminal" without introducing new architecture.

That's the full set of decisions.
