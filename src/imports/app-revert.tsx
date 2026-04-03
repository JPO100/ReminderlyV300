Scope

src/app/App.tsx only.

Revert all changes made under Ticket 5.

No additional edits beyond the revert.

Non-scope

No refactors.

No structural cleanups.

No formatting changes.

No dependency changes.

No unrelated edits anywhere else.

Required outcome

App.tsx must match the exact pre-Ticket-5 version for the entire handleCompleteClick block and the reschedule timer callback logic.

Evidence requirements (non-negotiable)

You must prove the revert is complete and exact using all of the following:

Structural confirmation

Confirm that:

The reschedule timer is created inside the completion setReminders updater (as originally).

No capture variables exist outside the updater that were introduced in the refactor.

The reschedule callback contains exactly one setReminders call (as it originally did).

No additional guards were introduced.

Line-range comparison

Provide:

Exact current line range for handleCompleteClick.

Exact current line range for the reschedule timer callback block.

Confirm these match the original structure (as described before the refactor).

Diff confirmation

Provide a diff summary.

Confirm:

Only src/app/App.tsx was modified.

The diff consists solely of reverting the prior Ticket 5 changes.

No net new logic exists compared to the original pre-Ticket-5 state.

Negative confirmation
Explicitly confirm:

No new variables remain from the refactor attempt.

No scheduling logic exists outside the completion updater.

No additional state updates were introduced.

No ordering of operations changed.

Final line
End your output with:
“Revert complete. App.tsx matches pre-Ticket-5 behaviour exactly.”