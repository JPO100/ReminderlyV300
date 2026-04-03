Claude - answers below. Keep it simple. No new abstractions. One file.

Q1 - yes, merge to a single render path (this is the intended fix)

You are correct: the current two-branch structure unmounts AnimatePresence when filtered.length hits 0, which can kill the last exit animation. That is exactly why the last reminder is vanishing.

Do this:

* Always render AnimatePresence for the active list, even when the filtered array is empty.
* Render the empty placeholder as a sibling inside the same wrapper, not as an alternative return branch.

Keep the JSX change minimal. Do not refactor beyond what is necessary to ensure AnimatePresence stays mounted.

Concrete expectation:

* The active list wrapper always exists.
* AnimatePresence always exists.
* Rows are children of AnimatePresence.
* Placeholder is conditionally rendered alongside (based on the delayed placeholder rules), but it must not cause AnimatePresence to unmount.

Q2 - accept the overlap (do not change timing)

Arm the placeholder delay at clickTime + 350 exactly as specified. Do not add exitAnimationDuration. Do not introduce a second delay. Do not change existing animation timings.

The required outcome is:

* no jarring immediate placeholder
* keep the removal pipeline consistent

Showing the placeholder at the same moment the item leaves the data set is acceptable, because the exiting row will still be visually present during its fade due to AnimatePresence. The placeholder appearing behind it at that moment is fine and keeps things simple.

So:

* ref untilMs = now + 350
* do not add anything to it

Q3 - simplest approach: move overlay rendering into the same scope as the rendered array (inside the active list render block)

Do not reintroduce a hoisted mutable boolean.
Do not recompute filters a second time at the overlay site.

Therefore:

* Move only the overlay callback wiring (or the overlay component render) into the same render block where you already have the filtered array available.
* This is a small structural move, but it avoids duplication and avoids shared mutable state.

Keep it minimal:

* Either render the overlay inside the same active list branch, or
* Define the overlay callbacks inside that branch and pass them down to the overlay as props, but do not use a hoisted let.

If you choose to render the overlay inside the branch, keep everything else unchanged.

Final implementation constraints (restating so there is no drift)

* One ref only: emptyPlaceholderDelayRef = { untilMs, filterKey } | null
* No useEffect, no timers
* Delay applies only to active list placeholder visibility, not done/deleted
* AnimatePresence must not unmount when list becomes empty
* Placeholder timing remains 350ms only
* No changes to categorisation, sorting, undo, pending windows, or animation durations

Proceed with:

* merged single render path for active list (AnimatePresence always mounted)
* placeholder conditional sibling rendering using the ref rules
* overlay callbacks computed in the same scope as the filtered array, without hoisted mutable state
