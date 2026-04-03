Claude, implement this exact fix. No alternatives, no refactors.

Problem

The placeholder is not appearing after clearing a list because the empty-state layer is currently anchored to a container that can collapse to 0 height once the last row leaves the data. During the extra 350ms spacer window, there are no rows to give the container height, so both the spacer and the placeholder have no visible area - and the placeholder remains invisible even when the delay expires.

Required fix

Anchor the spacer and placeholder to the scrollable list viewport container, and ensure that container never collapses when the list is empty.

Make these exact changes in /src/app/App.tsx.

1. Identify the scrollable list viewport container

This is the div that represents the list viewport (the area that scrolls the reminder rows). It already exists in the active list branch and you recently added relative positioning to it.

On that exact div, set all of the following:

* style: position: relative (keep or add)
* style: flex: 1
* style: minHeight: 0
* style: overflowY: auto (keep existing scrolling)

This guarantees the viewport retains height within the page layout even when it contains zero rows.

Do not apply these to a child wrapper that only exists when rows exist. Apply them to the actual scrollable viewport div.

2. Move the empty-state layer to be a direct child of the viewport container

Inside that same scrollable viewport div, render in this order:

a) The list rows (AnimatePresence + mapped rows). AnimatePresence must remain mounted at all times.

b) The empty-state layer element (this is either spacer during the delay window or the placeholder when allowed).

The empty-state layer must be rendered as a direct child of the viewport container from step 1, not inside any nested wrapper that depends on rows for height.

3. Make the spacer fill the viewport

In the “delay active” case (filtered.length === 0 and ref matches current filter and Date.now() < untilMs), render this exact spacer element:

* a div with:

  * style: position: absolute
  * style: inset: 0
  * style: zIndex: 0

No empty fragment. No zero-height div. It must fill the viewport.

4. Make the placeholder fill the viewport and sit behind rows

In the “show placeholder” case (filtered.length === 0 and delay is not active), render the placeholder in the same empty-state layer location as the spacer, as an absolutely positioned element that fills the viewport:

* wrapper div:

  * style: position: absolute
  * style: inset: 0
  * style: display: flex
  * style: alignItems: center
  * style: justifyContent: center
  * style: zIndex: 0

Ensure the rows render above it:

* The rows container (or each row) must be at zIndex: 1 relative to the viewport container, or wrapped in a div with:

  * style: position: relative
  * style: zIndex: 1

This ensures the placeholder never sits on top of an exiting row.

5. Do not change any timing or delay logic

Keep exactly:

* untilMs = Date.now() + EMPTY_STATE_DELAY + 350
* the filterKey gating
* clearing the ref only when rendering the placeholder
* no useEffect, no timers, no extra refs

6. Verification (must pass)

* Clear last reminder in an active list:

  * strike-through + recolour
  * pause
  * fade away
  * blank gap continues until T+700
  * placeholder appears centred at T+700 within the list viewport (not missing)

* Navigate to an empty list:

  * placeholder appears immediately

Make only the changes above. Do not introduce any other structural changes beyond moving the empty-state layer into the scrollable viewport container and enforcing the viewport’s stable height.
