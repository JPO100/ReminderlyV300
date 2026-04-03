Copy-paste this to Claude as the next scope change request.

---

Add done/deleted view filter menu and clear list button

Goal
The Done / Deleted list view must have its own filter menu, separate from the active list filters.

Menu buttons
Add three buttons in the same visual style and interaction behaviour as the existing filter buttons:

* Done
* Deleted
* Clear list

Done filter behaviour
When active, the Done / Deleted list shows only items that are done (completedAt != null) and not deleted (deletedAt == null).

Deleted filter behaviour
When active, the Done / Deleted list shows only items that are deleted (deletedAt != null). Include items even if they also have completedAt.

Default state
On entering Done / Deleted view, default filter is "all" (show both done and deleted). Done and Deleted buttons are both inactive in this default state.

Active/inactive states
Done and Deleted must behave like existing filters:

* Clicking a filter sets it active.
* Clicking the active filter again returns to default "all".
* Only one of Done or Deleted can be active at a time.
* Visual active styling must match existing filter active styling exactly.

Clear list behaviour
Clear list affects the Done / Deleted list only. It must not touch active reminders.

What to clear
Clearing removes all reminders that are currently in the Done / Deleted list dataset, meaning:

* All reminders where completedAt != null OR deletedAt != null

This is a permanent clear (removes from state and localStorage through normal persistence). No undo.

Clear list button 3-step confirmation sequence
The Clear list button has a 3-state label cycle and a 500ms reset.

State 0 (default)

* Label: Clear list
* Styling: unchanged from current button style baseline.

Click 1 (confirm)

* Label: Clear list?
* Fill: #ffffff
* Text colour: reminderly dark blue (use the existing constant used elsewhere for "dark blue", do not invent a new colour name without checking existing constants first)
* No list changes yet

Click 2 (execute)

* Label: Cleared!
* Fill: #ffffff
* Text colour: reminderly dark blue
* Immediately clear the done/deleted list (as defined above)
* Empty placeholder text should show immediately after clearing (existing empty state behaviour)

After click 2

* Delay 500ms
* Button returns to State 0 (Clear list, default styling)

Important behaviour rules for Clear list

* While in "Clear list?" state, clicking any other filter (Done or Deleted) should cancel the confirmation and return Clear list to default (State 0).
* While in "Cleared!" state, ignore further clicks until it resets back to default after 500ms.
* On leaving Done / Deleted view, reset Clear list button back to default state.
* Do not add modal dialogs, toasts, snackbars, or alerts.

Timing and animation parity
Do not reuse COMPLETION_DELAY for this. Use a dedicated 500ms timer for the Clear list reset only. Keep implementation lightweight and consistent with existing timer cleanup patterns (refs + clearTimeout on unmount).

Implementation notes (keep it simple)

* Add a done/deleted view local filter state: doneDeletedFilter = 'all' | 'done' | 'deleted'
* Apply it after the done/deleted view base filter (completedAt != null OR deletedAt != null) but before sorting.
* Sorting stays exactly as it is now (effective timestamp logic), applied to the filtered subset.
* Keep all existing pending behaviours intact:

  * pendingUncompleteIds and pendingUndeleteIds rendering rules must continue to work.
  * pendingUndeleteSortKey stability must remain unchanged.
  * Clearing should clear the underlying reminders from state, and also clear any pending sets/timers that reference ids that are being removed to avoid leaks or stale references.

Edge cases to handle

* If Clear list executes while Done or Deleted filter is active, it still clears the entire done/deleted dataset, not just the filtered subset.
* If a reminder is in a pending state within Done / Deleted view (pending uncomplete or pending undelete), and Clear list executes, it should still be removed and any related pending ids/timers cleaned up.

Non-scope

* No changes to the active list filter menu.
* No changes to done/delete cadence logic.
* No new colours beyond #ffffff fill and existing reminderly dark blue text for the two transient states.
* No new empty state copy.

Deliverables

* Code changes in App.tsx only unless a shared filter button component must be reused (prefer reuse, avoid new components).
* Unit tests:

  * Done filter shows only done (not deleted)
  * Deleted filter shows only deleted
  * Clear list requires two clicks, clears list on second click, and resets after 500ms

---
