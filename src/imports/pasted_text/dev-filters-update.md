```text
Re-read /Claude.md before making any changes.

1 - scope

Modify only these files:
/src/app/App.tsx
/src/app/components/DevToolsOverlay.tsx

A. Dev Tools filters menu

In /src/app/components/DevToolsOverlay.tsx:

Remove only the lists-enabled behaviour that affects the filters menu control.

Delete only the logic that does any of the following when lists are enabled:
- disables the filters menu control
- reduces filters menu control opacity
- applies `pointerEvents: 'none'`
- forces the displayed filters menu mode to "standard"

After this change:
- the filters menu control must remain interactive when lists are enabled
- the control must display the real current `filtersMenuVariant` value
- switching the control must continue to call the existing filters menu variant change flow

Do not change any other Dev Tools behaviour.
Do not change any other Dev Tools control.
Do not change any feature flag behaviour.

B. Lists filters variant source

In /src/app/App.tsx:

For the lists active-list filters only:
- use `filtersMenuVariant` directly

Do not use:
- `effectiveFiltersVariant`

Do not change:
- reminder filters variant source
- `effectiveFiltersVariant`
- reminder filters behaviour

C. Lists standard filters

In the lists tab active-list view in /src/app/App.tsx:

Replace the current standard lists filters implementation completely.

Render exactly four pills in this exact order:
1. Complete
2. Almost
3. Started
4. Todo

Use these exact values:
- Complete -> "complete"
- Almost -> "almost"
- Started -> "started"
- Todo -> "todo"

Click behaviour:
- if inactive, clicking sets `activeListFilter` to that pill value
- if active, clicking sets `activeListFilter` to "all"

Responsive rule:
- when viewport width is below 390px, hide Started
- when viewport width is 390px or above, show Started
- Complete must remain visible at all widths
- Almost must remain visible at all widths
- Todo must remain visible at all widths

Apply the responsive rule only to Started.
Do not hide any other standard lists pill.
Do not use the reminder fourth-pill responsive pattern for lists.
Do not use `hidden min-[390px]:flex` on Started.
Do not use any custom responsive rule on Complete, Almost, or Todo.

D. Lists grouped filters

In the lists tab active-list view in /src/app/App.tsx:

Replace the current grouped lists filters implementation completely.

Use the same grouped layout structure already used by grouped reminder filters:
- fragment wrapper
- left-side pills wrapper
- right-side settings button wrapper

Left side pills must render exactly:
1. Complete
2. Almost
3. Todo

Use these exact values:
- Complete -> "complete"
- Almost -> "almost"
- Todo -> "grouped-todo"

Click behaviour:
- if inactive, clicking sets `activeListFilter` to that pill value
- if active, clicking sets `activeListFilter` to "all"

Grouped mapping:
- "grouped-todo" must include lists categorised as:
  - started
  - todo

Right side settings button:
- render `LaterBtn`
- wrapper click handler must be:
  `onClick={() => setIsSettingsOpen(true)}`

Do not remove the settings button in grouped lists mode.
Do not change reminder grouped filters.

E. List filter state

In /src/app/App.tsx, keep a single list filter state only.

State name:
- `activeListFilter`

Initial value:
- `"all"`

Allowed values only:
- "all"
- "complete"
- "almost"
- "started"
- "todo"
- "grouped-todo"

Do not rename this state.
Do not move this state.
Do not create any additional list filter state.

F. Variant switching reset

In /src/app/App.tsx, keep the existing `handleFiltersMenuVariantChange` function.

That function must contain exactly these state updates:
- `setFiltersMenuVariant(variant);`
- `setActiveFilter("all");`
- `setActiveListFilter("all");`

Do not add any other logic.
Do not remove any of these three lines.
Do not move this logic elsewhere.

G. List categorisation

In /src/app/App.tsx, keep list categorisation inline.

Use only these exact rules:
- total = total current items in the list
- checked = total checked items in the list
- complete = checked === total
- almost = checked / total >= 0.5 AND checked !== total
- started = checked > 0 AND checked / total < 0.5
- todo = checked === 0

Assume lists always have at least 1 item.
Do not add empty-list handling.
Do not reuse reminder categorisation logic.
Do not move categorisation to another file.

H. List filtering

In /src/app/App.tsx, apply list filtering before rendering.

Use only these exact rules:
- "all" -> all lists
- "complete" -> complete only
- "almost" -> almost only
- "started" -> started only
- "todo" -> todo only
- "grouped-todo" -> started OR todo

Do not add any other mapping.

I. List sorting

In /src/app/App.tsx, apply list sorting after filtering.

Use only this primary category order:
1. complete
2. almost
3. started
4. todo

Use only this secondary order:
- original `createdLists` insertion order

Implement the secondary order explicitly using original `createdLists` array position.
Do not rely on implicit sort stability.
Do not add any other sort rule.
Do not add overdue logic.
Do not change reminder sorting.

J. Current incorrect implementation must be removed

In /src/app/App.tsx:
- delete the current lists filters implementation
- replace it fully with the implementation defined in this scope

In /src/app/components/DevToolsOverlay.tsx:
- delete the current lists-enabled filters menu disabling/forcing logic
- replace it only with behaviour that leaves the filters menu interactive and truthful to `filtersMenuVariant`

Do not patch around the existing incorrect behaviour.
Do not leave partial conflicting logic in place.

2 - non-scope

Do not modify:
- any file other than /src/app/App.tsx and /src/app/components/DevToolsOverlay.tsx
- reminder filters
- reminder behaviour
- reminder responsive rules
- `effectiveFiltersVariant`
- feature flags
- list creation
- list editing
- list persistence
- overlays, except using the existing `LaterBtn` grouped settings button pattern
- shared abstractions
- helper extraction
- new components
- refactors
- styling outside the exact scope above

3 - files changed

/src/app/App.tsx
/src/app/components/DevToolsOverlay.tsx

4 - changes made

- remove lists-enabled filters menu disabling/forced-standard behaviour from Dev Tools
- keep Dev Tools filters menu interactive and truthful to `filtersMenuVariant`
- replace lists standard filters implementation
- replace lists grouped filters implementation
- ensure grouped lists filters include the settings cog
- ensure Started is the only standard lists pill hidden below 390px
- keep list categorisation inline
- keep list filtering limited to the agreed mappings
- keep list sorting limited to category order with explicit createdLists insertion-order tiebreak
- keep the existing variant-change handler with the three exact state updates listed above

5 - verification

Verify exactly the following:

A. Dev Tools
- with lists enabled, the filters menu control is interactive
- with lists enabled, the filters menu control shows the real current `filtersMenuVariant`
- switching between standard and grouped changes the lists filters immediately
- no other Dev Tools control behaviour changes

B. Standard lists filters
- pills render in this exact order:
  - Complete
  - Almost
  - Started
  - Todo
- clicking an inactive pill activates it
- clicking the active pill resets to all
- below 390px:
  - Started hidden
  - Complete visible
  - Almost visible
  - Todo visible
- at 390px and above:
  - Complete visible
  - Almost visible
  - Started visible
  - Todo visible

C. Grouped lists filters
- grouped layout uses:
  - fragment wrapper
  - left-side pills wrapper
  - right-side settings button wrapper
- left-side pills render in this exact order:
  - Complete
  - Almost
  - Todo
- right-side settings button renders `LaterBtn`
- clicking the settings button opens SettingsOverlay
- clicking an inactive pill activates it
- clicking the active pill resets to all
- grouped Todo includes started and todo lists together

D. Sorting
- complete lists appear before almost
- almost before started
- started before todo
- within each category, original `createdLists` insertion order is preserved exactly

E. Regression protection
- reminder filters unchanged
- reminder responsive behaviour unchanged
- `effectiveFiltersVariant` unchanged
- no unintended UI behaviour changes outside the two scoped files

6 - diff summary

2 files changed:
/src/app/App.tsx
/src/app/components/DevToolsOverlay.tsx

Changes limited to fixing lists filters behaviour and restoring Dev Tools filters menu interaction for lists.
```
