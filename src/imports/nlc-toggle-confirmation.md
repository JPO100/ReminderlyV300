Team,

Review complete. The instruction is close, but a few areas could allow Claude to introduce extra complexity or make small interpretation decisions. I have tightened the wording to remove those risks while keeping the implementation simple.

Key issues corrected

1. Overlay system ambiguity
   “Use the existing overlay pattern” can lead to Claude creating a new modal component if unsure. The instruction now explicitly says to use the same component pattern already used for other overlays.

2. Toggle interaction ambiguity
   The previous wording could allow the toggle UI to visually flip before confirmation. The updated wording explicitly forbids the toggle changing visual state until confirmation.

3. Button layout ambiguity
   “Horizontally aligned” can still leave spacing decisions. The instruction now specifies equal width buttons with a defined gap.

4. State location clarity
   The state controlling the confirmation must live in the same DevTools component that renders the toggle to prevent unnecessary prop threading.

5. Overlay visibility rule
   The overlay must only render when `pendingNlcState !== null`. This removes interpretation.

Below is the tightened version.

---

Team,

Scope: confirmation overlay for NLC toggle (DevTools)

Goal
Add a confirmation overlay that appears before the Natural Language Capture (NLC) toggle is applied in DevTools.

The toggle must not change visual or functional state until the user confirms.

---

Behaviour rules

When the user attempts to change the NLC toggle:

* Do not immediately change `nlcEnabled`.
* Instead open a confirmation overlay.
* Only the confirmation button may apply the change.

The toggle UI must remain in its current state until confirmation is completed.

---

Overlay content

When turning OFF

Title
Turn off natural language capture?

Body
Reminders will be saved exactly as typed. Dates and times will only be set manually.

Buttons
Cancel
Yes, turn off

---

When turning ON

Title
Turn on natural language capture?

Body
Dates and times will be recognised automatically as you type. Existing reminders remain unchanged until edited.

Buttons
Cancel
Yes, turn on

---

State management (minimal)

Add a single local state variable in the DevTools component that renders the NLC toggle:

`pendingNlcState: boolean | null`

Initial value
`null`

Behaviour

User clicks toggle
→ set `pendingNlcState` to the requested value
→ overlay becomes visible

Cancel
→ set `pendingNlcState = null`
→ overlay closes

Confirm
→ call `onNlcEnabledChange(pendingNlcState)`
→ set `pendingNlcState = null`
→ overlay closes

Overlay visibility rule

Render the overlay only when:

`pendingNlcState !== null`

---

Overlay UI specification

Container

Width
322px

Corner radius
32px

Padding
Top: 40px
Bottom: 40px
Left: 34px
Right: 34px

Vertical spacing between blocks (title, body, buttons)
35px

---

Typography

Title
Font: Lato
Size: 20
Weight: Bold
Colour: Reminderly dark blue

Body
Font: Lato
Size: 17
Weight: Bold
Colour: Reminderly dark blue

---

Buttons

Buttons appear on a single horizontal row.

Gap between buttons
16px

Each button must occupy equal width within the container.

Button height
50px

Corner radius
100px

---

Left button

Label
Cancel

Fill
#BABABA

Font
Lato, 17, bold

Text colour
#FFFFFF

---

Right button

Label
Yes, turn on (when enabling)
Yes, turn off (when disabling)

Fill
#BABABA

Font
Lato, 17, bold

Text colour
Reminderly dark blue

---

Implementation constraints

Use the same overlay/modal component pattern already used elsewhere in the app. Do not introduce a new overlay framework.

Do not modify:

* NLC parsing logic
* parseTokens gating
* reminder data
* reminder scheduling
* reminder categorisation
* nlcMode behaviour
* DevTools navigation
* existing toggle styling

No additional UI behaviour or styling changes are permitted.

---

Acceptance checks

Attempt to turn NLC OFF
→ confirmation overlay appears
→ Cancel leaves `nlcEnabled` unchanged
→ Yes, turn off applies `nlcEnabled = false`

Attempt to turn NLC ON
→ confirmation overlay appears
→ Cancel leaves `nlcEnabled` unchanged
→ Yes, turn on applies `nlcEnabled = true`

All existing NLC behaviour must remain unchanged after confirmation.
