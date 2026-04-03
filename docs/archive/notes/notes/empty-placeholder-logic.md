Answer: option b, but keep it as one ref and keep it tiny.

We cannot accept option a. Claude's edge case is real and it breaks the acceptance criterion. We must ensure navigation-to-empty is always immediate, even during a pending delay window.

Do this (tightened instruction)

Decision
Use a single ref, but store a tiny object instead of a plain number:

* emptyPlaceholderDelayRef.current = { untilMs: number, filterKey: string } | null

No second ref. No useEffect. No timers.

Filter key
Use the current active list identity only (whatever you already use to decide which active list is being rendered). This must be the key that changes when the user switches lists via the filters menu. Keep it simple - a string or enum value you already have (for example activeFilter).

Arming rule
In handleCompleteClick / handleDeleteClick:

* only when armEmptyDelay is true, set:

  * emptyPlaceholderDelayRef.current = { untilMs: Date.now() + 350, filterKey: activeFilterAtClick }
* activeFilterAtClick must be passed in from render, same as armEmptyDelay (do not read state inside the handler to avoid accidental mismatch).

Render rule (active lists only)
When filtered.length === 0:

* read ref
* if ref is not null and ref.filterKey equals current activeFilter and Date.now() < ref.untilMs:

  * hide placeholder (render spacer)
* else:

  * show placeholder immediately

Also, when you show the placeholder (the else branch), clear the ref to null. This prevents any stale carry over.

Navigation guarantee
Because the render rule only honours the delay when filterKey matches the current active filter, switching to an already-empty list will show immediately (it will not be blocked by a delay armed in a different list).

What not to do

* No DelayedEmptyState in active list empty branch.
* No second ref.
* No useEffect for clearing.
* No duplicating filter computations in handlers.

Overlay path
Same approach:

* pass both armEmptyDelay and activeFilterKey from the current rendered list context into the overlay action closures.

Scope stays the same otherwise
No changes to categorisation, sorting, animations, undo, pending windows, or done/deleted empty placeholders.

Go ahead with this exact approach.
