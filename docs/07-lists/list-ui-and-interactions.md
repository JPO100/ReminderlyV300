#### Overview

The lists UI is split into:

* active lists
* the lists done/deleted archive
* the list editor bottom sheet
* the list info overlay
* the saved templates panel
* saved template menus and template editor states

#### Main tab behaviour

When the Lists feature flag is enabled:

* the tab bar switches between reminders and lists
* the lists tab can show either active lists or the lists done/deleted archive
* the logo tick toggles between active lists and `lists-done`

Switching into lists does not merge list rows with reminder rows. The systems remain separate.

#### Header and primary actions

When active lists are visible:

* the filter row shows list filters instead of reminder filters
* the primary CTA is `New list`
* the saved templates panel can also be opened from the lists surface when that feature is enabled

When the lists done/deleted archive is visible:

* the header uses the archive view state
* the archive dataset is derived from list `status`

#### List rows

Each active list row currently includes:

* a left completion button
* the list title
* a progress subtitle in `X of Y` format
* optional smart reminder due-by text
* optional smart reminder indicator
* a right-side row menu button

Pinned rows in the `All` filter also include:

* a pin icon to the left of the title
* dark blue list-circle styling

Pinned rows are only injected into the `All` view. They are hidden from filtered list views.

#### Active list filters and ordering

Active list categorisation is derived from item completion ratio:

* `complete`: all items checked
* `almost`: at least 50% checked, but not all
* `started`: more than 0 checked, but below `almost`
* `todo`: 0 checked

Ordering rules:

* pinned lists sort first in `All` only
* pinned lists sort by newest `pinnedAt` first
* unpinned lists then sort by category bucket and creation order
* category order is currently `todo`, then `started`/`almost`, then `complete`

#### List editor overlay

The list editor is a bottom sheet used for both active lists and saved templates.

Current behaviour includes:

* create mode and edit mode
* title editing
* item add, edit, delete, reorder-through-sort-mode behaviour
* sort mode persistence on active lists
* smart reminder controls on active lists only
* create/save on backdrop close and header submit

Saved template editing reuses the same bottom-sheet editor, but:

* uses alphabetical sort mode
* disables smart reminders
* persists into the saved template dataset instead of the active lists dataset

#### List info overlay

The list info overlay currently supports:

* `Mark as done`
* `Edit list`
* `Pin to top` / `Unpin from top` behind the `Pinned lists` feature flag
* `Create template from list`
* `Delete list`
* smart reminder toggle and due date controls

Action timing:

* `Mark as done`, `Pin to top`, and `Delete list` close the overlay first and then apply the action after a delay
* pin and unpin currently apply after a `200ms` close delay

#### Saved templates panel

The saved templates panel is rendered inside the lists tab.

Current capabilities:

* show active templates only
* show template title and item count
* open a row menu for template actions
* create a new template
* empty-state copy when no templates exist

Current template actions include:

* `Use template`
* `Edit template`
* `Delete template`

Using a template creates a new active list with:

* a new list id
* new item ids
* all template items reset to unchecked
* default active status

#### Empty states

Active list filters have separate empty copy.

Current active-filter empty messages include:

* `No lists here yet.. get busy!`
* `No fully checked off lists yet`
* `Nothing close to completion yet`
* `Nothing started here yet`
* `Nothing 'todo' here!`

Saved templates have a separate empty state:

* `No list templates yet.. get busy!`

#### Responsive behaviour

Lists reuse the same overall responsive shell as reminders.

Additional current list-specific responsive behaviour includes:

* `Started` filter pill hidden below the narrow breakpoint
* pinned icon injected without changing title-row height
* saved templates panel rendered within the same bounded-width content area as active lists

#### Related documentation

* `/docs/07-lists/lists-overview.md`
* `/docs/07-lists/list-lifecycle.md`
