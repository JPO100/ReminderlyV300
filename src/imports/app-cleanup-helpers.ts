Scope

src/app/App.tsx only.

Refactor for simplification only. No behavioural changes.

Non-scope

No UI changes.

No timing changes (keep all delays the same).

No changes to reminder data shapes.

No new abstractions across files (helpers stay inside App.tsx).

No dependency changes.

No doc changes.

Changes to make

Add a small helper in App.tsx:

cancelAllTimersForId(reminderId: string)

It must clear and delete entries for that id from all timer maps:

completionTimersRef

uncompleteTimersRef

pendingDeleteTimersRef

undeleteTimersRef

rescheduleTimersRef

Add a small helper in App.tsx:

clearPendingStateForId(reminderId: string)

It must remove the id from all relevant pending sets and maps:

pendingDoneIds

pendingUncompleteIds

pendingDeleteIds

pendingUndeleteIds

pendingUncompleteCompletedAtRef (delete key)

pendingUndeleteSortKeyRef (delete key)

Replace duplicated inline cleanup logic with these helpers in the highest-risk handlers

Update these handlers to call the helpers instead of duplicating clearing logic:

handleDeleteClick

handleUndeleteClick (if it exists)

handleUncompleteClick

handleCompleteClick (only where it cancels pending timers / reschedule timers, do not change scheduling behaviour)

Constraints

Keep the code flat and readable. No new files. No new utility modules.

Do not change any state names, only consolidate operations.

Do not introduce generic frameworks or “manager” objects.

Acceptance criteria

App.tsx contains the two helpers and handlers use them.

No delays, UX, or logic changes beyond consolidation.

Existing delete/repeat protections remain intact (including reschedule cancellation and duplicate prevention).

Output requirements

Provide exact file path and line ranges for:

the new helper functions

each handler updated

Diff summary.