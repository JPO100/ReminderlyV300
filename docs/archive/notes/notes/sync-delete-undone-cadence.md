Scope change request: match delete and un-delete cadence to done and un-done

Goal
Delete and un-delete must follow the exact same cadence, sequence, and timing as done and un-done. Apart from the colour change (grey vs blue), the interaction must be identical down to the millisecond.

Do not change any styling beyond what is required to achieve identical timing and prevent list reordering jumps.

Observed issues to fix

Delete cadence mismatch
Deleting a reminder currently removes it from the active list with different timing to marking done. This must match done exactly.

Un-delete list jump
Un-deleting currently causes the row to move to the bottom of the Done / Deleted list and then reinsert into the active list. We have already solved this exact issue for un-done using the pendingUncompleteIds approach (row stays visible in done view during the 350ms window while active reinsertion happens immediately). Apply the same strategy to un-delete.

Implementation requirements

A. Add a pending delete visual lifecycle identical to pending done

Introduce pendingDeleteIds (Set) and pendingDeleteTimers (Map) in the same style and structure as pendingDoneIds / completeTimers.

When user triggers delete from ReminderInfoOverlay:

Add id to pendingDeleteIds immediately.

Render the row in the active list in the "deleting" state using the existing deleted styling (grey #939393) so the user sees the same instant feedback as done (just in grey).

After COMPLETION_DELAY (the exact same delay used for done), commit the delete:

Set deletedAt = Date.now()

Remove id from pendingDeleteIds

Ensure any reschedule logic does not fire (keep the existing deletedAt guard in the reschedule updater)

Important: the deletion should not be committed earlier or later than the done completion commit. Use the same constants and timer pattern as done.

Active list filtering must allow pendingDeleteIds to continue rendering during the delay window, exactly like pendingDoneIds does for done. Concretely:

Active list should include:

items where deletedAt == null AND completedAt == null (existing active rules)

plus items in pendingDeleteIds (so they remain visible during the 350ms window even if other state flips)

At the end of COMPLETION_DELAY, the item should disappear from the active list and appear in Done / Deleted view, matching done behaviour.

B. Un-delete must mirror un-done, including the 350ms done-view window and immediate active reinsertion

Implement an undelete path that is structurally identical to the existing uncomplete path:

Introduce pendingUndeleteIds (Set) and undeleteTimers (Map) mirroring pendingUncompleteIds / uncompleteTimersRef.

On un-delete (uncheck a deleted item in Done / Deleted view):

Immediately clear deletedAt (this causes immediate reinsertion to the active list).

Add the id to pendingUndeleteIds so the row stays visible in the Done / Deleted view during the exact same COMPLETION_DELAY window used by un-done.

During this window, render the row in the Done / Deleted view using the same "active styling during pending un-done" pattern:

open circle, active colours, no grey deleted styling

this should match what un-done currently does during its 350ms window (the pattern you previously confirmed: pendingUncompleteIds keeps row visible and renders as active)

After COMPLETION_DELAY, remove id from pendingUndeleteIds.

This must prevent the "move to bottom then reinsert" artefact.

C. Prevent sort jumps during pending un-delete window

The bottom-jump happens because once deletedAt is cleared, the effective timestamp changes (deletedAt ?? completedAt) and the row can reorder within the Done / Deleted list during the 350ms window.

Fix this the same way we avoided weird behaviour in the un-done flow:

Capture the prior deletedAt timestamp at the moment un-delete is triggered.

Store it in a pendingUndeleteSortKey map (id -> number).

Update the Done / Deleted sort key to use:

pendingUndeleteSortKey.get(id) when pendingUndeleteIds has id

else deletedAt ?? completedAt

When the timer completes, remove the sortKey entry.

This keeps the row in place during the 350ms done-view window, identical to the un-done experience.

D. Timer cleanup and race safety

Deleting must cancel any pending completion, uncomplete, reschedule timers, plus any new pending delete / pending undelete timers for that id.

Un-deleting must cancel any pending delete timers for that id (defensive).

Maintain the same cleanup discipline used by existing timer maps (delete entries on completion, clear all on unmount if that pattern exists).

E. Tests

Update or add tests to cover the two regressions:

Delete cadence matches done cadence

Assert that the delete commit happens after COMPLETION_DELAY, not immediately.

During the delay, the item is still present in the active list but rendered in deleting styling (grey).

Un-delete does not reorder within Done / Deleted view during the 350ms window

Assert it remains visible in Done / Deleted view during COMPLETION_DELAY via pendingUndeleteIds, while also being present in the active list immediately.

Assert no intermediate "bottom of list" state is observable in sorted output while pending (use the pendingUndeleteSortKey).

Non-scope

No new UI controls.

No swipe / long press behaviours.

No new views or filters.

No animation redesign.

No additional colours beyond existing deleted grey usage.

Do not change done or un-done behaviour, only mirror its timing and structure.

Deliverable expectation

The delete flow should now feel identical to done in timing, with only colour difference.

The un-delete flow should now feel identical to un-done in timing, with no list jump artefact.
