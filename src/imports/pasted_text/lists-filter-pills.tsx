```text
Re-read /Claude.md before making any changes.

1 - scope

Modify only:
/src/app/App.tsx

Delete the current lists filter pills block inside the lists tab active-list view.

Replace it with a lists filter pills implementation that uses the exact same implementation pattern already used by the reminder filter pills block in the white container reminders view.

The lists filters implementation must match the reminder filters implementation in the same way in all of the following areas:
- branch structure
- JSX structure
- wrapper structure
- pill order structure
- click behaviour
- active/inactive styling behaviour
- responsive fourth-pill behaviour in standard mode
- grouped-mode left/right layout structure
- grouped-mode settings button structure

Only the following substitutions are allowed:
- reminder labels -> list labels
- reminder filter values -> list filter values
- reminder state variable -> list state variable
- grouped reminder category mapping -> grouped list category mapping

A. Source implementation pattern

Use the existing reminder filter pills implementation in the white container reminders branch in /src/app/App.tsx as the direct template.

That is the branch that:
- sits inside the white container reminders view
- uses `effectiveFiltersVariant === "grouped"` for grouped reminders mode
- renders grouped mode as left-side pills plus right-side `LaterBtn`
- renders standard mode as four pills
- applies fourth-pill responsive behaviour to the fourth standard reminder pill only

Do not use the blue header reminder filters block as the template.
Do not mix patterns from multiple locations.
Do not create a new implementation pattern.

B. Lists standard filters

In the lists tab active-list view, standard lists filters must follow the exact same implementation pattern as the standard reminder filters block from the white container reminders branch.

Render four pills in this exact order:
1. Complete
2. Almost
3. Started
4. Todo

Use these exact values:
1. "complete"
2. "almost"
3. "started"
4. "todo"

Rules:
- use the same standard-mode wrapper structure as reminders
- use the same button JSX structure as reminders
- use the same class structure as reminders
- use the same click-toggle pattern as reminders
- use the same active/inactive styling pattern as reminders
- apply the same responsive behaviour pattern used by the fourth reminder pill to the fourth lists pill only
- the fourth lists pill is Todo
- the third lists pill is Started
- do not hide Started responsively
- do not introduce `max-[389px]:hidden`
- do not introduce any custom lists-only responsive behaviour
- do not change the reminder responsive behaviour

C. Lists grouped filters

In the lists tab active-list view, grouped lists filters must follow the exact same implementation pattern as the grouped reminder filters block from the white container reminders branch.

Render grouped pills in this exact order on the left:
1. Complete
2. Almost
3. Todo

Use these exact values:
1. "complete"
2. "almost"
3. "grouped-todo"

Rules:
- use the same grouped-mode wrapper structure as reminders
- use the same left-side pills wrapper structure as reminders
- use the same right-side settings button structure as reminders
- use the same button JSX structure as reminders
- use the same class structure as reminders
- use the same click-toggle pattern as reminders
- use the same active/inactive styling pattern as reminders
- use the same structural pattern used by the grouped reminder third pill for the grouped lists third pill
- render the same right-side settings button used by reminders:
  - `LaterBtn`
  - `onClick={() => setIsSettingsOpen(true)}`
- do not remove the grouped settings button
- do not create a grouped lists layout that differs from grouped reminders layout

D. Variant source for lists filters

For the lists filter pills branch only, use:
- `filtersMenuVariant`

Do not use:
- `effectiveFiltersVariant`

This is required so grouped and standard switching remains reachable for lists.

Do not change the reminder filters branch.
Do not change `effectiveFiltersVariant`.
Do not change reminder behaviour.

E. List filter state

Keep the existing list filter state in /src/app/App.tsx exactly as follows:
- state name: `activeListFilter`
- initial value: `"all"`
- allowed values:
  - "all"
  - "complete"
  - "almost"
  - "started"
  - "todo"
  - "grouped-todo"

Do not rename this state.
Do not move this state.
Do not create additional list filter state.

F. List filter interaction

Use the exact same interaction pattern as reminder filters.

Rules:
- clicking an inactive lists pill sets `activeListFilter` to that pill value
- clicking the active lists pill sets `activeListFilter` to "all"

Do not add any other behaviour.

G. Variant switching reset

Keep the existing handler:
- `handleFiltersMenuVariantChange`

That handler must contain exactly these three state updates:
- `setFiltersMenuVariant(variant);`
- `setActiveFilter("all");`
- `setActiveListFilter("all");`

Do not add any other logic to that handler.
Do not move this logic elsewhere.

H. List categorisation

Keep list categorisation inline in /src/app/App.tsx.

Use these exact rules:
- total = total current items in the list
- checked = total checked items in the list
- complete = checked === total
- almost = checked / total >= 0.5 AND checked !== total
- started = checked > 0 AND checked / total < 0.5
- todo = checked === 0

Rules:
- assume a list always has at least 1 item
- do not add zero-item handling
- do not move categorisation to another file
- do not reuse reminder categorisation logic

I. List filtering

Apply list filtering before rendering.

Use only these exact rules:
- "all" -> all lists
- "complete" -> complete only
- "almost" -> almost only
- "started" -> started only
- "todo" -> todo only
- "grouped-todo" -> started OR todo

Do not add any other mapping.

J. List sorting

Apply list sorting after filtering.

Use only:
- primary category order:
  1. complete
  2. almost
  3. started
  4. todo
- secondary order:
  - current `createdLists` insertion order exactly

Implement the insertion-order tiebreak explicitly using the original `createdLists` array position.
Do not rely on implicit sort stability.
Do not add any other sort rule.
Do not add overdue logic.
Do not change reminder sorting.

K. No reminder changes

Do not modify:
- reminder filter rendering
- reminder filter interaction
- reminder grouped layout
- reminder grouped settings button
- reminder standard responsive behaviour
- reminder filtering
- reminder sorting
- `effectiveFiltersVariant`

The reminder white-container filters block is the template to mirror.
It must remain unchanged.

L. Replacement rule

Delete the current lists filters implementation that differs from the reminder white-container filters implementation pattern.

Replace it with a lists filters implementation that matches that reminder implementation pattern exactly, with only the substitutions explicitly listed in this scope:
- labels
- values
- state variable
- grouped list mapping

2 - non-scope

Do not modify:
- any file other than /src/app/App.tsx
- reminder logic
- reminder UI
- dev tools UI
- dev tools behaviour
- feature flags
- list creation
- list editing
- list persistence
- overlays
- shared abstractions
- helper extraction
- new components
- refactors
- zero-item handling
- custom lists-only responsive behaviour

3 - files changed

/src/app/App.tsx

4 - changes made

- delete the current lists filter pills block inside the lists tab active-list view
- rebuild that block using the exact implementation pattern already used by the white-container reminder filters block
- keep lists using `filtersMenuVariant`
- restore grouped-mode right-hand settings button parity
- restore standard-mode fourth-pill responsive parity
- keep list categorisation inline
- keep list filtering limited to the agreed categories
- keep list sorting limited to the agreed category order with explicit createdLists insertion-order tiebreak
- keep the existing variant-change handler with the three exact state updates listed above

5 - verification

Verify all of the following exactly.

A. Standard lists filters parity
- standard lists filters use the same implementation pattern as the standard reminder filters block in the white container reminders branch
- standard lists filters render four pills in this exact order:
  - Complete
  - Almost
  - Started
  - Todo
- clicking an inactive pill activates it
- clicking the active pill resets to all
- the fourth lists pill follows the exact same responsive behaviour pattern as the fourth reminder pill
- Started is not the responsive-hidden pill
- Todo is the responsive-hidden pill in the same way Sometime is for reminders

B. Grouped lists filters parity
- grouped lists filters use the same implementation pattern as the grouped reminder filters block in the white container reminders branch
- grouped lists filters render left-side pills in this exact order:
  - Complete
  - Almost
  - Todo
- grouped lists filters render the same right-side settings button structure as reminders using `LaterBtn`
- clicking that settings button opens SettingsOverlay the same way as reminders
- clicking an inactive pill activates it
- clicking the active pill resets to all

C. Variant behaviour
- lists filters use `filtersMenuVariant`
- Dev Tools grouped/standard switching changes the lists filters mode
- switching variants resets `activeListFilter` to "all"
- reminder variant behaviour remains unchanged

D. Filtering
- complete shows only complete lists
- almost shows only almost lists
- started shows only started lists
- todo shows only todo lists
- grouped todo shows started and todo lists together
- all shows all lists

E. Sorting
- complete lists appear before almost
- almost before started
- started before todo
- within each category, current `createdLists` insertion order is preserved exactly

F. Regression protection
- reminder filters unchanged
- reminder responsive behaviour unchanged
- reminder grouped settings button unchanged
- Dev Tools toggle unchanged
- no other UI behaviour changed

6 - diff summary

1 file changed:
/src/app/App.tsx

Changes limited to deleting the current lists filters block and replacing it with one that mirrors the existing white-container reminder filters implementation exactly, with only the explicitly allowed substitutions for list labels, list values, list state, and grouped list mapping.
```
