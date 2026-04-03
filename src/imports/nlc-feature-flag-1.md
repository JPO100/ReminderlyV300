Scope: Natural Language Capture feature flag

Goal

Use the existing Dev Tools NLC toggle as the single control for enabling or disabling Natural Language Capture (NLC).

When disabled, the application behaves as plain text capture. No parsing runs and no NLC UI is rendered.

Existing reminder data must never be modified by this feature.

State rules

Add one boolean state variable in App.tsx:

nlcEnabled: boolean

Default value must be true.

This state becomes the single source of truth controlling whether NLC is enabled.

This boolean must be passed down through props following the exact same pattern already used for:

nlcMode

filtersMenuVariant

Do not introduce:

context providers

feature flag frameworks

configuration systems

state managers

Only a single boolean state in App.tsx is permitted.

Behaviour rules

When nlcEnabled is false:

Do not run NLC parsing when creating a reminder.

Do not run NLC parsing when editing a reminder.

Do not render any NLC UI elements (token highlights, mirrors, hit layers, recognition hints).

Ignore any existing token metadata stored on reminders.

When nlcEnabled is true:

All NLC behaviour must work exactly as it does today.

Parsing must run on create.

Parsing must run on edit/save.

NLC UI elements render exactly as they currently do.

Data safety rules (non-negotiable)

Toggling NLC must never modify reminder data.

Specifically the following fields must never be altered, removed, or rewritten:

dueAt

repeatRule

completedAt

deletedAt

No reminder migrations or background processing are permitted.

Turning NLC on or off must not:

rewrite reminders

strip scheduling fields

re-parse existing reminders

perform background processing

Implementation rules

Add the boolean state

Add the following state to App.tsx:

const [nlcEnabled, setNlcEnabled] = useState(true)

Pass this value down as a prop wherever the existing NLC parsing and NLC UI currently operate.

Gate the parsing call

Locate the existing parseTokens call used during reminder creation and editing (currently inside NewReminderOverlay).

Wrap that call with a simple conditional:

if (nlcEnabled) {
tokens = parseTokens(...)
} else {
tokens = []
}

Important constraints:

Do not modify the parseTokens implementation.

Do not move the parser.

Do not refactor the parser.

The only change allowed is gating the existing call.

Gate NLC UI rendering

Any UI components responsible for displaying token highlights, mirrors, hit layers, or recognition hints must only render when nlcEnabled is true.

When nlcEnabled is false those components must not render at all.

Do not add additional UI states or disabled variants.

No other behavioural changes

The following systems must remain completely unchanged:

reminder creation

manual scheduling UI

reminder editing

reminder sorting

reminder categorisation

completion logic

deletion logic

repeat reminder logic

timers

Acceptance checks

NLC OFF

Creating a reminder with text such as “Dentist tomorrow at 3” saves the text exactly and does not automatically set a date or time.

Editing a reminder title does not trigger parsing.

Existing dueAt values remain unchanged.

No token UI appears anywhere.

Toggle behaviour

Turning NLC OFF does not modify existing reminders.

Turning NLC ON does not re-parse or modify existing reminders.

NLC ON

Creating a reminder behaves exactly as it does today.

Editing and saving a reminder behaves exactly as it does today.

Explicit non-scope (forbidden)

This task must not introduce:

new state structures beyond the single boolean

feature flag frameworks

configuration systems

background jobs

reminder migrations

parser refactoring

changes to reminder data models

changes to DevTools navigation

changes to nlcMode behaviour

The only allowed change is conditional gating of existing NLC parsing and NLC UI rendering using the boolean state.