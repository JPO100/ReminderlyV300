1 - Scope

Modify the dev tools page to add a new section titled Dummy lists.

The section must be rendered directly below the existing Dummy reminders section.

The implementation must reuse the same UI elements, layout structure, spacing, typography, input styling, toggle styling, button styling, and container styling already used in the Dummy reminders section wherever equivalent elements exist.

2 - Controls

The Dummy lists section must contain exactly four controls.

Control 1
Label: Number of lists
Type: Numeric input field
UI: Must reuse the same numeric input element used in the Dummy reminders section.

Control 2
Label: Max number of list items
Type: Numeric input field
UI: Must reuse the same numeric input element used in the Dummy reminders section.

Control 3
Label: Include done list items
Type: ON / OFF toggle
UI: Must reuse the same toggle element used in the Dummy reminders section.

Control 4
Label: Clear lists
Type: Button
UI: Must reuse the same button element used for Clear reminders.

3 - Section enable / disable behaviour

The entire Dummy lists section must be disabled when the Lists feature toggle is OFF.

When the Lists feature toggle is OFF:

* The Number of lists input must be disabled.
* The Max number of list items input must be disabled.
* The Include done list items toggle must be disabled.
* The Clear lists button must be disabled.

When the Lists feature toggle is ON:

* All four controls must be enabled and interactive.

4 - UI requirements

The Dummy lists section must reuse the same structural pattern used by the Dummy reminders section.

The following elements must match the Dummy reminders section exactly:

* Section container layout
* Section spacing
* Label typography
* Input styling
* Toggle styling
* Button styling
* Control alignment
* Vertical spacing between controls

No new UI patterns, styles, components, wrappers, abstractions, or layout structures may be introduced.

The section must visually appear as a continuation of the Dummy reminders section.

5 - Files changed

Only the dev tools page file may be modified.

No other files may be edited.

6 - Non-scope

The following are not allowed:

* Any modification to the Dummy reminders section
* Any modification to reminder dev tools logic
* Any modification to reminder generation logic
* Any modification to list creation logic
* Any persistence changes
* Any changes to application behaviour outside the dev tools page
* Any new UI components
* Any new layout patterns
* Any refactoring of existing code
* Any documentation changes
* Any test changes

7 - Verification

Confirm the following after implementation:

Dummy lists appears directly below Dummy reminders.

The section contains exactly four controls.

The labels match exactly:

Number of lists
Max number of list items
Include done list items
Clear lists

The numeric inputs reuse the same input element used in Dummy reminders.

The toggle reuses the same toggle element used in Dummy reminders.

The Clear lists button reuses the same button element used for Clear reminders.

All controls are disabled when the Lists feature toggle is OFF.

All controls are enabled when the Lists feature toggle is ON.

No existing dev tools sections were modified.

Only the dev tools page file was edited.
