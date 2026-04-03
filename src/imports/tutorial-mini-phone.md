Scope

Use the existing filters menu state

The app already has a state value that controls the filters menu mode (for example filtersMenuVariant, which determines grouped vs standard).

This value is the single source of truth.

Implementation rules:

Pass the existing filters menu state from App.tsx down to the tutorial mini phone via props.

Do not create duplicate state.

Do not create tutorial-only state.

Do not introduce a new dev tools toggle.

Do not introduce context, selectors, helpers, or feature flag systems.

The tutorial mini phone must simply read the existing filters menu mode value.

Mirror the current menu mode visually

The tutorial mini phone must render the same menu mode currently active in the app.

Behaviour:

If the app is in grouped mode, the mini phone shows grouped mode.

If the app is in standard mode, the mini phone shows standard mode.

No other UI changes are allowed.

Adjust the tutorial sample reminder placement

The tutorial mini phone uses sample reminder data purely for demonstration. Only the placement of these sample reminders should change.

Grouped mode

Keep the current behaviour exactly as it is today.

Later and sometime reminders appear together under the later tab.

Standard mode

Later reminders must appear only in the later list.

Sometime reminders must appear only in the sometime list.

They must not appear combined under later.

Implementation rule:

Use a simple conditional based on the filters menu mode to determine which sample list structure is rendered.

Do not modify the app’s real reminder categorisation logic.

Keep the change isolated

Only modify the tutorial mini phone implementation.

Do not modify:

reminder-utils.ts

categoriseReminder

real reminder filtering logic

reminder sorting logic

dev tools architecture

tutorial overlay layout, animation, or text.

Do not introduce shared utilities, data mappers, or new helper functions.

Implementation constraints

The implementation must remain simple:

Pass the existing filters menu state into the tutorial mini phone.

Inside the mini phone, use a simple conditional:

grouped mode -> render the existing grouped layout

standard mode -> render the standard layout with later and sometime split.

No other behavioural changes are permitted.

Verification criteria

The implementation is correct only if all of the following are true:

When grouped mode is active in the app, the tutorial mini phone shows grouped mode.

When standard mode is active in the app, the tutorial mini phone shows standard mode.

In grouped mode, later and sometime appear together under later.

In standard mode, later and sometime appear as separate lists.

Switching the filters menu mode in dev tools immediately updates the tutorial mini phone.

No changes occur to the real reminder filtering behaviour anywhere else in the app.

Non-scope

The following must not be changed:

Real reminder logic

Reminder categorisation utilities

Dev tools implementation

Tutorial overlay UI or animation

Any files unrelated to the tutorial mini phone.