Re-read /docs/claude.md in full before doing anything else. Do not rely on memory.

Do not begin implementation. First confirm your understanding of the scope below.

Scope

Add persistence for:

dynamically created lists

active main tab

Files that may be modified

Only:
/src/app/App.tsx

No other files may be modified.

LocalStorage keys to add

Use exactly these two keys:

reminderly-created-lists

reminderly-active-main-tab

No other localStorage keys may be added or changed.

Required persisted state

Persist exactly these two pieces of state only:

createdLists

activeMainTab

No other state may be persisted as part of this scope.

Required behaviour

Created lists persistence

Dynamically created lists must persist across app refresh.

Dynamically created lists edited through the existing edit flow must persist across app refresh.

On app load, createdLists must be restored from localStorage and rendered in the Lists tab.

Restored lists must preserve their existing ids.

Restoring persisted lists must not create duplicates.

Restoring persisted lists must not trigger insertion delay, fade, or highlight behaviour.

The static "Spaghetti bolognese recipe" example card must remain unchanged and must not be stored inside createdLists.

Active main tab persistence

activeMainTab must persist across app refresh.

If the user leaves the app while activeMainTab is set to the Reminders tab value, the app must reopen with that same tab active.

If the user leaves the app while activeMainTab is set to the Lists tab value, the app must reopen with that same tab active.

Only existing activeMainTab values already used by /src/app/App.tsx may be stored or restored.

If the stored tab value is missing or invalid, activeMainTab must fall back to the app’s current default tab value and nothing else.

Persistence implementation rule

Use the same persistence style already used by existing persisted state inside /src/app/App.tsx.

That means:

follow the same read pattern already used in App.tsx

follow the same write pattern already used in App.tsx

follow the same guard style already used in App.tsx

do not introduce a new persistence pattern

do not introduce a new abstraction layer

do not create helper utilities unless the exact same helper pattern already exists in App.tsx and is reused directly

Data rules

Do persist:

dynamically created lists only

active main tab only

Do not persist:

the static example card

overlay open / closed state

in-progress unsaved list title

in-progress unsaved list items

edit mode state

editing target id

reminder state

reminder UI state

animation state

highlight state

Non-scope

Do not change:

reminder behaviour

reminder persistence

reminder overlays

reminder animations

list create behaviour

list edit behaviour

overlay layout

overlay UI design

list card styling

sorting

filtering

the static "Spaghetti bolognese recipe" example card

any file other than /src/app/App.tsx

Implementation constraints

Keep the implementation simple, clean, and lightweight.

Do not create new components.

Do not create new helper utilities unless an identical helper pattern already exists in App.tsx and is reused directly.

Do not refactor unrelated code.

Do not introduce abstractions.

Do not change any behaviour outside this scope.

Required response

Before any implementation work begins, respond with:

scope understanding

exact state that will be persisted

confirmation that the only localStorage keys added will be reminderly-created-lists and reminderly-active-main-tab

confirmation that restored lists will not trigger insert delay, fade, or highlight behaviour

confirmation that only /src/app/App.tsx will change

any blocking questions

Do not begin implementation until I explicitly instruct you to proceed.

This version is tighter because it removes the remaining ambiguity around keys, invalid stored values, and restore-time animation behaviour.