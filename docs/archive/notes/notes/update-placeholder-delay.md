Claude, this is a small behavioural adjustment. Do not refactor. Do not introduce new timers, refs, or abstractions.

Goal

When clearing the last visible reminder in the active list:

keep the existing 350ms pending window (strike-through, recolour, pause)

keep the existing exit animation (fade away)

add an additional 350ms gap before the empty placeholder appears

Navigation to an already empty list must remain immediate (no delay).

Current behaviour (for clarity)

Delay ref is armed at clickTime + 350

Pending window also lasts 350

At T+350 the item leaves the array, exit animation starts, placeholder becomes eligible to render

Required new behaviour

Placeholder must not appear until 700ms after click (350 existing + 350 additional)

All other timings remain unchanged

Implementation (minimal change)

Do not modify:

COMPLETION_DELAY

delete/complete pending windows

exit animation durations

AnimatePresence structure

ref shape

filterKey logic

Only change how the placeholder delay ref is armed

Currently inside handleCompleteClick / handleDeleteClick:

emptyPlaceholderDelayRef.current = {
untilMs: Date.now() + 350,
filterKey: opts.filterKey
}

Change this to:

emptyPlaceholderDelayRef.current = {
untilMs: Date.now() + 700,
filterKey: opts.filterKey
}

This additional 350ms must apply only when armEmptyDelay is true (i.e. only when clearing the last visible reminder in the active list).

Do not change the render condition

Rendering logic remains:

If filtered.length === 0:

If ref exists AND
ref.filterKey === activeFilter AND
Date.now() < ref.untilMs:

 Render spacer (do not clear ref)

Else:

 Render placeholder immediately
 Clear ref

4) Do not change anything else

No changes to navigation behaviour.

No changes to done/deleted empty behaviour.

No new constants unless you define a clearly named local constant like:

const EMPTY_PLACEHOLDER_EXTRA_DELAY = 350

But do not over-abstract. A simple + 350 inline is acceptable.

Expected visual timeline

T+0: click → strike-through + recolour
T+350: item removed from data → fade-out begins
~T+650: fade-out completes, list visually empty
T+700: placeholder appears

Make only the arming change described above. No additional structural changes.
