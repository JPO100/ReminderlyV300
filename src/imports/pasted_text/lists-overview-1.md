Re-read your /docs/claude.md file in full before doing anything. Do not rely on memory.

---

## Objective

Add documentation for Lists as a new, standalone area of the app.

This is a documentation-only task.

---

## Scope

### 1. Create new folder and files

Create the following folder and files exactly:

/docs/07-lists/lists-overview.md
/docs/07-lists/list-lifecycle.md
/docs/07-lists/list-ui-and-interactions.md

No additional files are permitted.

---

### 2. /docs/07-lists/lists-overview.md

Add the following content exactly:

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

### 3. /docs/07-lists/list-lifecycle.md

Add the following content exactly:

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

### 4. /docs/07-lists/list-ui-and-interactions.md

Add the following content exactly:

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

### 5. Update existing files

Apply the following edits exactly.

---

#### /docs/00-overview/README.md

Replace:

Documentation is organized into 7 logical sections

With:

Documentation is organized into 8 logical sections

Add the following section after the existing numbered sections:

### 07-lists

* /docs/07-lists/lists-overview.md
* /docs/07-lists/list-lifecycle.md
* /docs/07-lists/list-ui-and-interactions.md

Replace:

(00-06)

With:

(00-07)

---

#### /docs/00-overview/product-overview.md

Locate the section titled:

## Key features

Append the following at the end of that section:

### Lists

Lists are a core organisational feature of the app.
Lists are separate from reminders and do not share lifecycle or scheduling behaviour.

---

#### /docs/00-overview/architecture.md

Append the following section at the end of the file:

### Lists

Lists are managed as a separate state from reminders.
Lists are stored in localStorage.
Lists do not interact with reminder scheduling or lifecycle logic.

---

#### /docs/00-overview/data-model-and-persistence.md

Append the following section at the end of the file:

### Lists

Lists are stored in localStorage.
Lists use a separate data structure from reminders.
No shared schema exists between lists and reminders.

---

#### /docs/01-core-surfaces/active-list.md

Replace the first occurrence of:

Active list

With:

Active reminder list

Do not make any other changes.

---

#### /docs/01-core-surfaces/dev-tools-overlay.md

Append the following line to the end of the dev tools list:

Dummy lists

---

#### /docs/05-design-and-layout/component-hierarchy.md

Append the following section at the end of the file:

### Lists

Lists components exist separately from reminder components.
No shared component hierarchy exists between lists and reminders.

---

#### /docs/06-quality-and-dev/dev-tools.md

Append the following bullet at the end of the features list:

* Dummy lists

---

## Non-scope

* No changes to any files not listed above
* No changes under /docs/archive/
* No changes to reminder logic documentation
* No new behaviours
* No assumptions about future features
* No restructuring of documentation
* Do not verify file existence
* Do not request clarification on file paths

---

## Verification checklist

* /docs/07-lists/ exists with three files
* Only the specified files are modified
* No additional files are created
* No undefined behaviour is introduced
* Lists are documented as separate from reminders
* No archive files are modified

---

Do not proceed with partial output. Complete all items exactly as specified.
