```text
Re-read /Claude.md before making any changes.

1 - scope

Modify only:
/src/app/App.tsx

Replace the current lists filter pills implementation so it mirrors the existing reminder filter pills implementation exactly.

A. List filter state

Use one list filter state in /src/app/App.tsx only.

State name:
- activeListFilter

Allowed values:
- "all"
- "complete"
- "almost"
- "started"
- "todo"
- "grouped-todo"

Initial value:
- "all"

B. Standard lists filters

In the lists tab, in standard filters mode, render the list filter pills by copying the same implementation pattern already used for the reminder standard filter pills in /src/app/App.tsx.

Use the same:
- render structure
- element order structure
- active/inactive click behaviour
- active/inactive styling
- responsive fourth-pill behaviour

Substitute only the labels and values below:

1. First pill
- label: Complete
- value: "complete"

2. Second pill
- label: Almost
- value: "almost"

3. Third pill
- label: Started
- value: "started"

4. Fourth pill
- label: Todo
- value: "todo"

Standard mode responsive rule:
- the fourth lists pill must behave exactly the same way as the fourth reminder pill
- do not introduce any different visibility rule
- do not introduce any different breakpoint rule
- do not introduce any different rendering rule

C. Grouped lists filters

In the lists tab, in grouped filters mode, render the list filter pills by copying the same implementation pattern already used for the reminder grouped filter pills in /src/app/App.tsx.

Use the same:
- render structure
- element order structure
- active/inactive click behaviour
- active/inactive styling
- third-pill structure

Substitute only the labels and values below:

1. First pill
- label: Complete
- value: "complete"

2. Second pill
- label: Almost
- value: "almost"

3. Third pill
- label: Todo
- value: "grouped-todo"

Grouped mode rule:
- "grouped-todo" must return lists categorised as started OR todo
- do not introduce any different grouped render structure

D. List filter interaction

Mirror reminder filter interaction exactly:
- clicking an inactive list pill sets activeListFilter to that pill value
- clicking the active list pill sets activeListFilter to "all"

Do not add any other behaviour.

E. Variant switching

In the existing filters menu variant change handler in /src/app/App.tsx:
- keep the existing reminder filter reset unchanged
- add one additional line that resets activeListFilter to "all"

Do not change any other logic in that handler.
Do not move this logic elsewhere.

F. List categorisation

Keep list categorisation inline in /src/app/App.tsx only.

Definitions:
- total = total current items in the list
- checked = total checked items in the list

Categories:
- complete = checked === total
- almost = checked / total >= 0.5 AND checked !== total
- started = checked > 0 AND checked / total < 0.5
- todo = checked === 0

Rules:
- assume a list always has at least 1 item
- do not add empty-list handling
- do not reuse reminder categorisation logic
- do not move categorisation to another file

G. List filtering

Apply list filtering before rendering.

Use only these rules:
- "all" -> all lists
- "complete" -> complete only
- "almost" -> almost only
- "started" -> started only
- "todo" -> todo only
- "grouped-todo" -> started OR todo

H. List sorting

Apply list sorting after filtering.

Primary sort order:
1. complete
2. almost
3. started
4. todo

Secondary sort order:
- preserve current createdLists insertion order exactly

Do not add any other sorting rules.

I. Replacement rule

Delete the current lists filter pills implementation that does not mirror the reminder filter pills implementation exactly.
Replace it with the mirrored implementation described above.

2 - non-scope

Do not modify:
- any file other than /src/app/App.tsx
- reminder filter rendering
- reminder filter interaction
- reminder categorisation
- reminder sorting
- dev tools behaviour
- feature flags
- list creation
- list editing
- list persistence
- overlays
- shared abstractions
- new components
- refactors
- empty-list handling
- any custom responsive logic for lists

3 - files changed

/src/app/App.tsx

4 - changes made

- replace the current lists filter pills implementation with one that mirrors the existing reminder filter pills implementation exactly
- keep list categorisation inline in App.tsx
- keep list filtering limited to the agreed list categories
- keep list sorting limited to the agreed category order with createdLists insertion order as the only tiebreaker
- reset activeListFilter to "all" in the existing filters menu variant change handler

5 - verification

Verify all of the following:

A. Standard lists filters
- the standard lists pills use the same implementation pattern as the standard reminder pills
- Complete, Almost, Started, Todo are rendered in that order
- clicking an inactive pill activates it
- clicking the active pill resets to all
- the fourth lists pill follows the exact same responsive behaviour as the fourth reminder pill

B. Grouped lists filters
- the grouped lists pills use the same implementation pattern as the grouped reminder pills
- Complete, Almost, Todo are rendered in that order
- clicking an inactive pill activates it
- clicking the active pill resets to all
- grouped Todo returns started and todo lists together

C. Sorting and filtering
- complete lists sort before almost
- almost before started
- started before todo
- createdLists insertion order is preserved within each category

D. Regression protection
- reminder filters unchanged
- dev tools grouped/standard toggle unchanged
- no other UI behaviour changed

6 - diff summary

1 file changed:
/src/app/App.tsx

Changes limited to replacing the lists filter pills implementation so it mirrors the existing reminder filter pills implementation exactly, with only list labels and list filter mappings changed.
```
