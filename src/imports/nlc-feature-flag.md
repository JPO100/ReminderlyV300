Scope: Natural Language Capture feature flag

Goal
Use the existing Dev Tools toggle as the single source of truth for whether Natural Language Capture (NLC) is enabled.

This toggle only controls whether text parsing and NLC UI are active. It must not alter existing reminder data or scheduling behaviour.

Behaviour rules (must match exactly)

When NLC is OFF

Do not run any NLC parsing when creating a reminder.

Do not run any NLC parsing when editing a reminder.

Do not render any NLC UI elements (tokens, highlights, recognition hints).

Ignore any token metadata that already exists on reminders. It must not be displayed or used.

When NLC is ON

Run the existing NLC parsing logic on reminder creation exactly as it currently works.

Run the existing NLC parsing logic when editing and saving a reminder.

Render NLC UI elements exactly as they currently work.

Data safety rules (non-negotiable)

Toggling NLC must never modify stored reminder data.

Specifically, the following fields must never be altered or removed by this feature:

dueAt

repeatRule

completedAt

deletedAt

any other fields used for reminder behaviour

Turning NLC on or off must not:

rewrite reminders

strip scheduling fields

run migrations

re-parse existing reminders

perform background processing

Existing reminders must remain exactly as they are.

Implementation rules (keep it minimal)

Use the existing Dev Tools NLC toggle boolean as the only control.

Gate the existing NLC parsing call with a simple conditional:

if (nlcEnabled) {
run existing parse logic
}

If the flag is OFF, the parsing call must simply not run.

Do not move, refactor, or rewrite the existing parsing logic.

Gate NLC UI rendering.

Any UI components responsible for displaying recognised tokens, parsing highlights, or similar NLC feedback must only render when nlcEnabled is true.

When nlcEnabled is false those UI components must not render at all.

No other behavioural changes.

Reminder creation, editing, scheduling UI, sorting, categorisation, completion, deletion, repeat logic, and timers must remain unchanged.

Acceptance checks

NLC OFF

Creating a reminder with text like “Dentist tomorrow at 3” saves the exact text and does not automatically set a date or time.

Editing a reminder title does not trigger parsing or alter dueAt/time unless the user manually changes scheduling using the scheduling UI.

No token highlighting or recognition UI appears anywhere.

Toggle behaviour

Turning NLC OFF does not change any existing reminders.

Turning NLC ON does not re-parse or modify existing reminders.

NLC ON

Creating a reminder behaves exactly as it does today (parsing works).

Editing and saving a reminder behaves exactly as it does today.

Non-scope (explicitly forbidden)

This task must not introduce:

new state structures

feature flag frameworks

configuration systems

background jobs

reminder migrations

new parsing passes

changes to reminder data models

refactoring of the parsing system

The only change is conditional gating of existing parsing behaviour and NLC UI rendering based on the existing toggle.