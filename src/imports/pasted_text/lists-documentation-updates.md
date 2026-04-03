Re-read your /docs/claude.md file in full before doing anything. Do not rely on memory.

Failure to follow claude.md caused the issues below. This must not happen again.

---

## Objective

Correct the previously implemented Lists documentation so that:

* All edits are applied in the correct location
* All formatting matches existing documentation patterns
* All content is explicit, concrete, and non-generic
* All outputs match what is claimed

This is a documentation-only correction task.

---

## Scope

Modify only the following files:

/docs/01-core-surfaces/dev-tools-overlay.md
/docs/06-quality-and-dev/dev-tools.md
/docs/00-overview/README.md
/docs/05-design-and-layout/component-hierarchy.md
/docs/00-overview/architecture.md
/docs/00-overview/data-model-and-persistence.md
/docs/07-lists/lists-overview.md
/docs/07-lists/list-lifecycle.md
/docs/07-lists/list-ui-and-interactions.md

No other files are permitted.

---

## Required changes

### 1. /docs/01-core-surfaces/dev-tools-overlay.md

Remove the standalone line:

Dummy lists

Then update the existing dev tools table by adding one new row at the end of the table:

| Dummy lists | Dev-only page for lists testing |

Do not modify any other part of the table.

---

### 2. /docs/06-quality-and-dev/dev-tools.md

Remove the final line:

* Dummy lists

Then locate the existing features list and append this bullet at the end of that list:

* Dummy lists

Do not modify any other content.

---

### 3. /docs/00-overview/README.md

Replace the entire “07-lists” section with exactly:

### 📋 07-lists

* [Lists overview](/docs/07-lists/lists-overview.md) - Lists as a standalone app area
* [List lifecycle](/docs/07-lists/list-lifecycle.md) - List states and transitions
* [List UI and interactions](/docs/07-lists/list-ui-and-interactions.md) - Lists surface behaviour

Do not modify any other sections.

---

### 4. /docs/05-design-and-layout/component-hierarchy.md

Remove the existing “Lists” section.

Append the following at the end of the file:

### Lists

* ListsTab
* ListRow
* ListsOverlay

Do not add any additional text.

---

### 5. /docs/00-overview/architecture.md

Remove the existing “Lists” section.

Append the following at the end of the file:

### Lists

Lists are stored in a separate state slice from reminders.
Lists are persisted via localStorage.
Lists do not interact with reminder scheduling or lifecycle logic.

Do not add any additional text.

---

### 6. /docs/00-overview/data-model-and-persistence.md

Remove the existing “Lists” section.

Append the following at the end of the file:

### Lists

Lists are stored in localStorage.
Lists use a separate data structure from reminders.
No shared schema exists between lists and reminders.

Do not add any additional text.

---

### 7. /docs/07-lists/lists-overview.md

Replace the entire file content with exactly:

#### Overview

Lists are user-created collections of items.
Lists are a core app area alongside reminders.
Lists do not include scheduling, due dates, or time-based behaviour.
Lists are structurally separate from reminders.

#### Access

Lists are accessed via the Lists tab in the main app.
Users switch between reminders and lists using the main tab control.

#### Core capabilities

Users can create a list.
Users can view a list.
Users can rename a list.

#### Related documentation

* /docs/07-lists/list-lifecycle.md
* /docs/07-lists/list-ui-and-interactions.md

---

### 8. /docs/07-lists/list-lifecycle.md

Replace the entire file content with exactly:

#### Overview

Lists have a simple lifecycle with no time-based states.

#### List states

Lists have a single state: active.
Lists do not have done, deleted, scheduled, or archived states.

#### Create list

Entry point: “Add new list” button.
Action: opens lists overlay.
Save behaviour: creates a new list.

#### Edit list

Lists can be renamed.
No other edit behaviour is defined.

#### Delete list

Not implemented.

#### Persistence

Lists are stored in localStorage.

#### Constraints

Lists do not interact with reminder scheduling, repeats, or completion states.

#### Related documentation

* /docs/07-lists/lists-overview.md
* /docs/07-lists/list-ui-and-interactions.md

---

### 9. /docs/07-lists/list-ui-and-interactions.md

Replace the entire file content with exactly:

#### Overview

Lists are presented as a separate app area from reminders.

#### Access

Lists are accessed via the Lists tab in the main app.

#### Main tab behaviour

Switching tabs changes between reminders and lists.
No shared state or behaviour exists between the two.

#### Header and primary actions

“Add new list” button is visible when Lists tab is active.
Pressing the button opens the lists overlay.

#### List rows

Lists are displayed as rows.
Selecting a list opens that list.

#### Empty state

No lists are displayed when none exist.

#### Interactions

Users can open a list.
Users can create a list.
Users can rename a list.

#### Responsive behaviour

Follows the same responsive rules as the reminders surface.

#### Related documentation

* /docs/07-lists/lists-overview.md
* /docs/07-lists/list-lifecycle.md

---

## Non-scope

* No changes to any files not listed above
* No changes under /docs/archive/
* No changes to reminder documentation
* No new behaviours
* No assumptions about future features
* No restructuring of documentation

---

## Verification checklist

* No standalone “Dummy lists” lines remain
* Dev tools table contains a valid row for “Dummy lists”
* Dev tools features list contains a single “Dummy lists” bullet
* README 07-lists section matches existing format
* All Lists sections are concrete and non-generic
* All three /07-lists/ files match the specified content exactly

---

Do not proceed with partial output. Complete all items exactly as specified.
