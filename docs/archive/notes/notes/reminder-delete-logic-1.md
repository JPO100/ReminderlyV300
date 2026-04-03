Proceed.

Implementation instructions (follow exactly)

1. Keep the change set exactly as you summarised
   Do not add any new behaviours, UI, or abstractions beyond the confirmed scope.

2. Reminder type and persistence

* Add deletedAt?: number | null to Reminder in reminder-utils.ts.
* Ensure loadReminders sanitisation preserves deletedAt when present (and drops everything else as it currently does).

3. Overlay wiring

* In ReminderInfoOverlay, add onDelete prop.
* Rewire the existing Delete button (currently calling onClose) to call onDelete.
* The button's existing styling and label remain unchanged.
* Ensure onDelete also closes the overlay via the handler in App.tsx (not inside the overlay).

4. App.tsx handlers and timers

* Implement handleDeleteClick(reminderId) with these steps in order:
  a) Cancel any pending completion/uncomplete/reschedule timers for that reminder id.
  b) Remove the id from pendingDoneIds and pendingUncompleteIds.
  c) Set deletedAt = Date.now() on that reminder.
  d) Close ReminderInfoOverlay.

No new timer systems. Use the existing timer tracking structures.

5. Filtering and visibility

* Active list: exclude deleted reminders with && r.deletedAt == null.
* Done / Deleted view: include reminders where r.completedAt != null OR r.deletedAt != null (plus keep the existing pendingUncompleteIds behaviour intact).

6. Sorting

* Done / Deleted view sort key: deletedAt ?? completedAt, descending.
* If both exist, deletedAt wins.

7. Rendering and styling

* In Done / Deleted view, branch styling:

  * deletedAt != null: apply grey #939393 styling for checkbox fill, title/subtitle colour and strike-through, and status icon colour.
  * else: keep existing done blue styling unchanged.

Do not change any styling outside the Done / Deleted view.

8. Uncheck behaviour in Done / Deleted view

* If deletedAt != null: clear deletedAt only. Do not touch completedAt. Do not run repeat duplicate removal.
* Else: keep existing uncomplete path unchanged.

9. Repeat reschedule guard

* In the reschedule timer callback, check the reminder's latest state and exit early if deletedAt != null.
* This must be checked at execution time, not only at scheduling time.

10. Tests

* Add at least one regression test that covers:

  * deleting a repeating reminder prevents any reschedule.
  * undelete restores expected visibility (active vs done) based on completedAt presence.

Do not broaden the test suite beyond what is needed for this feature.

Deliverables

* Code changes only to the files already identified (unless you discover a required import/type reference).
* Short confirmation summary listing exactly what changed and what was intentionally not changed.
