Claude, read this fully before making changes. This is a correction, not a redesign.

Context

We are implementing two tightly defined UX rules:

If the user deletes or completes the last visible reminder in the current active list, the empty placeholder must appear after ~350ms. Not immediately.

If the user navigates to a list that is already empty, the placeholder must appear immediately. Never delayed on navigation.

Additionally:

When clearing the list (deleting or completing the last visible reminder), the removal animation must be identical to any other removal:

strike-through

recolour

pause

fade away
The last reminder must not vanish immediately after strike-through/recolour. It must respect the same exit timing as any other removal in the list.

We are building a reminders app, not a rocket to Mars. Keep this minimal, deterministic, and scoped.

Current failures

The empty placeholder is appearing immediately instead of after ~350ms.

When clearing the list, the last reminder is vanishing immediately after strike-through/recolour instead of performing the normal fade-away exit sequence.

Required implementation (exact)

Part A - Correctly arm the empty placeholder delay

Do not use any hoisted boolean like activeListIsLastVisible.
Remove it entirely.

In the active list render branch:

You already compute the filtered array that you map to rows.

Immediately before mapping:

const rendered = filteredReminders

const isLastVisibleInThisList = rendered.length === 1

Inside the map for each row:

onComplete: () =>
handleCompleteClick(r.id, {
armEmptyDelay: isLastVisibleInThisList,
filterKey: activeFilter
})

onDelete: () =>
handleDeleteClick(r.id, {
armEmptyDelay: isLastVisibleInThisList,
filterKey: activeFilter
})

Do not rely on shared mutable flags. Use the exact array being rendered.

Overlay actions

When wiring overlay onMarkAsDone and onDelete:

Compute isLastVisibleInThisList from the same rendered array used for the list.

Pass the same options object into the handlers:
{ armEmptyDelay: isLastVisibleInThisList, filterKey: activeFilter }

No special casing.

Part B - Delay ref behaviour (must be exact)

We use one ref only:

emptyPlaceholderDelayRef.current = { untilMs: number, filterKey: string } | null

Arming (inside handleCompleteClick / handleDeleteClick):

If opts.armEmptyDelay is true:
emptyPlaceholderDelayRef.current = {
untilMs: Date.now() + 350,
filterKey: opts.filterKey
}

Do not read activeFilter from component state inside the handler.
Use the passed filterKey only.

Rendering (active lists only):

If filtered.length === 0:

If ref exists AND
   ref.filterKey === activeFilter AND
   Date.now() < ref.untilMs:

     Render spacer only.
     Do not clear ref.

Else:

     Render placeholder immediately.
     Clear ref (set to null).

Do not clear the ref anywhere else.
Do not use useEffect.
Do not introduce timers.

Done/deleted empty placeholder remains unchanged and immediate.

Part C - Last item removal animation must match normal removal

This is critical.

Deleting or completing the last visible reminder must follow the exact same visual removal pipeline as when removing any other item from a non-empty list:

strike-through

recolour

pause (respecting existing completion/delete delay)

fade away

then unmount

The fact that the list becomes empty must not short-circuit the animation.

You must ensure:

The last item remains rendered for the full existing completion/delete delay window.

The empty placeholder logic does not cause early unmount or conditional rendering that bypasses the normal exit animation.

No special-case branch for "last item" removal in the row rendering.

Do not modify the existing animation timings.
Do not modify pending windows.
Do not introduce new animation logic.
Only ensure the last item is treated identically to any other item being removed.

Non-scope guardrails

Do not change categorisation.

Do not change sorting.

Do not change isOverdue.

Do not change undo behaviour.

Do not change any animation durations.

Do not refactor unrelated code.

Do not modify done/deleted empty behaviour.

Do not introduce additional refs or effects.

Expected final behaviour

Deleting or completing the last visible reminder:

strike-through

recolour

pause

fade away

list becomes empty

placeholder appears after ~350ms

Navigating to an already empty list:

placeholder appears immediately

no delay

Make only the changes required to satisfy the above. Do not reinterpret or extend the scope.
