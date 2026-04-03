Button placement
Replace the active list filter buttons when viewMode is done/deleted.

When done/deleted view is active, the header filter row should show: Done, Deleted, Clear list (only).

The active list filters (All, Today, This week, Later, Sometime) should not be shown in this view.

When you exit done/deleted view back to active lists, restore the active list filter row exactly as it is today.

This satisfies "separate from the active list filters" and avoids two competing filter bars on one screen.

Clear list must include pending restore items
Yes. Clear list must remove everything currently visible in the done/deleted list, including pending restore rows.

So the clear target set is:

Any reminder where completedAt != null OR deletedAt != null

Plus any reminder id currently in pendingUncompleteIds

Plus any reminder id currently in pendingUndeleteIds

Implementation: build a Set of ids to remove using those four conditions and delete them from reminders in one pass.

Important: do not change the done/deleted view filter definition for normal rendering. This rule is only for what clear removes.

Clear list should not touch pending delete items in active list
Correct. Do not touch pendingDeleteIds items.

Rationale: they are not in the done/deleted list yet and the user is clearing the done/deleted list only.

Cleanup scope expectation
Agreed. When clear executes, clean up for all removed ids:

Clear any timers in all timer maps that reference removed ids (completion, uncomplete, reschedule, delete, undelete, and any clear-list timer).

Remove ids from all pending id sets (pendingDoneIds, pendingUncompleteIds, pendingDeleteIds, pendingUndeleteIds) - but only for ids being removed.

Remove ids from any sort-key refs (pendingUndeleteSortKeyRef) for removed ids.

Keep this cleanup surgical: only remove entries for ids that are cleared.

Extra behavioural rules to implement (no new questions)

Clear list executes regardless of current doneDeletedFilter state (clears the entire done/deleted dataset, not the filtered subset).

Clicking Done or Deleted while in "Clear list?" cancels the confirmation and resets Clear list back to default immediately.

While showing "Cleared!", ignore clicks until it resets after 500ms.

Leaving done/deleted view resets:

doneDeletedFilter -> 'all'

Clear list button state -> default

any pending clear-list reset timer is cancelled

Proceed with implementation on this basis.
