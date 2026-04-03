Scope clarification and answers to questions (keep it lean)

High level correction
Do not remove DelayedEmptyState or EMPTY_STATE_DELAY globally. Only stop using DelayedEmptyState for the navigation-to-empty case. The existing delay behaviour is still required for the last-item removed case, but it must be conditional as per the user stories. Treat DelayedEmptyState as not fit for this requirement because it delays on cold empty / navigation empty too.

Questions

Rendered count tracking
Do not add a second ref (renderedCountRef). Do not duplicate filter logic in handlers either.

The simplest approach is:

In the render path, compute renderedReminders for the currently active list as you already do (you must already have the filtered array to map rows).

Pass renderedCount (or a boolean isLastVisibleInList) into the row action callbacks at render time.

Example pattern:

When mapping rows, compute isLastVisible = renderedReminders.length === 1.

For each row, wire onComplete/onDelete as:

() => handleCompleteClick(reminder.id, { armEmptyDelay: isLastVisible })

() => handleDeleteClick(reminder.id, { armEmptyDelay: isLastVisible })

Then inside handleCompleteClick/handleDeleteClick:

If armEmptyDelay is true, set emptyPlaceholderDelayUntilMsRef.current = Date.now() + 350.

This avoids a second ref and avoids recomputing filters inside handlers. It is also deterministic - it uses the exact array you are rendering.

Done/deleted view
Do not apply the delay mechanism to done/deleted empty placeholders. Leave done/deleted empty placeholders immediate.

Reason:

The user story only calls out last-item removal in an active list (delete/complete) and navigation-to-empty behaviour.

Delaying done/deleted empty states adds complexity for no user value, and your own note is correct that it would practically never trigger with the chosen arming rules.

So:

Active lists: conditional 350ms delay when last visible item is deleted/completed.

Done/deleted: placeholder always immediate.

Clearing on list change
No useEffect needed. Avoid it.

Because the delay is only armed by an explicit click (delete/complete on last visible), and it is only consulted when renderedCount === 0, you can keep this even simpler:

When renderedCount > 0, do nothing.

When renderedCount === 0, show placeholder only if now >= delayUntil.

The only required reset is: when showing placeholder (delay elapsed), you can optionally clear the ref to 0 to avoid stale values. Not required, but ok.

Navigation-to-empty will be immediate as long as you do not arm the delay on navigation. Since the delay only arms on delete/complete, navigation does not need any explicit clearing.

So: no effect, no extra dependencies, no touching call sites.

Overlay completion path
Confirmed. No special casing. If the overlay calls the same handler, it should arm the delay when and only when the action was performed on the last visible item in the current list. Passing armEmptyDelay from the rendered row will handle this automatically.

Implementation summary (tight)

Keep EMPTY_STATE_DELAY = 350.

Add one ref: emptyPlaceholderDelayUntilMsRef (initial 0).

In active list render:

compute renderedReminders (already exists)

compute isLastVisible = renderedReminders.length === 1

pass armEmptyDelay: isLastVisible into the delete/complete callbacks for each row

In handleDeleteClick/handleCompleteClick:

if armEmptyDelay, set ref to now + 350

Empty placeholder render for active lists only:

if renderedCount === 0 and Date.now() < ref: hide placeholder

else if renderedCount === 0: show placeholder immediately

Do not delay placeholders for done/deleted.

No DelayedEmptyState for this logic. Do not introduce any new timers. Do not add extra refs.

Non-scope reminder
No changes to categorisation, sorting, animations, undo, pending windows, or any other UI. Only the empty placeholder render condition for active lists and the arming flag passed into delete/complete callbacks.
