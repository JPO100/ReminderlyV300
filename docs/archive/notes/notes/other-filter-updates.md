Claude - your understanding is correct. Proceed with the simplest path. Decisions below are final. Do not expand scope.

Active filter representation for "Other"
Choose option (a).

Add "other" to the activeFilter union type.

Treat it as a normal filter value only in the grouped menu variant.

Filtering rule for "other" must be exactly: later OR sometime.

Do not introduce new categorisation logic. Do not refactor the categoriseReminder function. Do not create new helper utilities.

Implementation detail:

In the existing filter predicate, add a single branch:

if activeFilter === "other" return cat === "later" || cat === "sometime"
Keep everything else as-is.

Empty state message for "Other"
Add an "other" entry to emptyMessages.
Use the exact same message as "later" (and/or "sometime") to avoid new copy decisions.

Use: the existing "later" message string, exactly.
Do not invent new copy.

Settings button rendering
Render the provided component as-is.

Import and render the supplied Settings button component directly within the filter row.

Do not inline SVG manually.

Do not rebuild it inside a pill container.

Do not attempt to "make it match" by recreating styling.
Only apply the minimum wrapper needed to position it far right.

Layout rule:

It is last item and aligned far right in the same row.

Use the simplest layout already used elsewhere (eg existing flex row with spacer).

No new layout abstractions.

Interaction rule:

No click handler.

No onPress.

No navigation.

No state changes.
If the component has an onClick prop, pass a no-op only if required by typing, otherwise omit.

Label for "Other"
Yes - label string is exactly:
Other

Add support in getCategoryLabel() for "other" returning "Other".
No other label changes.

Animation / AnimatePresence key note
Acknowledged. No changes required.
Do not adjust keys, AnimatePresence, or animation behaviour for this feature.

Additional guardrail
Because this is dev-only A/B switching:

When the filtersMenuVariant changes, always reset activeFilter to "all" immediately (you already noted this).

Do not attempt to remember prior selection per menu variant.

Do not attempt any migration logic when switching back and forth.

Proceed now.

End-of-work report must include only:

Files changed

What you added (dev tools toggles, filtersMenuVariant state, "other" filter, settings component render, reset-to-all rule)

Explicit confirmation done/deleted files and logic were not touched

No other commentary.
