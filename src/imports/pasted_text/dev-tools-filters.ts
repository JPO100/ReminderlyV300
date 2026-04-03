Re-read /Claude.md before making any changes.

1 - scope

Modify only these files:
/src/app/App.tsx
/src/app/components/DevToolsOverlay.tsx

A. Dev Tools filters menu must be disabled again when lists are enabled

In /src/app/components/DevToolsOverlay.tsx:

Reintroduce the lists-enabled behaviour for the Filters Menu control only.

When lists are enabled:
- disable the Filters Menu control
- reduce Filters Menu control opacity to 0.5
- apply `pointerEvents: 'none'` to the Filters Menu control wrapper
- display "standard" as the visible selected mode

When lists are not enabled:
- preserve the existing normal Filters Menu control behaviour

Do not change any other Dev Tools behaviour.
Do not change any other Dev Tools control.
Do not change any feature flag behaviour.

B. Effective filter mode must default to standard when lists are enabled

In /src/app/App.tsx:

Keep grouped filters logic in the code.

When lists are enabled:
- reminders must use standard filters
- lists must use standard filters

Use one effective variant for active rendering when lists are enabled:
- `"standard"`

Do not remove grouped filters code.
Do not delete grouped lists logic.
Do not delete grouped reminder logic.
Grouped logic must remain in place but be unreachable while lists are enabled.

C. Reminder filters

Keep the existing reminder behaviour that defaults reminders to standard filters when lists are enabled.

Do not change reminder filter interaction.
Do not change reminder filter styling.
Do not change reminder responsive behaviour.

D. Lists filters must also default to standard when lists are enabled

In /src/app/App.tsx:

For the lists active-list filters:
- use the same effective standard-only behaviour when lists are enabled
- do not allow grouped lists filters to render while lists are enabled

Keep the grouped lists implementation in the file.
Do not remove it.
Do not refactor it.
Do not change its logic beyond making it unreachable while lists are enabled.

E. Standard lists filters

Keep the current standard lists filters behaviour.

Render four pills in this exact order:
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
Use:
- `max-[389px]:hidden`

Do not apply responsive hiding to any other standard lists pill.

F. Variant switching reset

In /src/app/App.tsx, keep the existing `handleFiltersMenuVariantChange` function.

That function must contain exactly these state updates:
- `setFiltersMenuVariant(variant);`
- `setActiveFilter("all");`
- `setActiveListFilter("all");`

Do not add any other logic.
Do not remove any of these three lines.
Do not move this logic elsewhere.

G. Current incorrect Dev Tools/App mismatch must be removed

The final behaviour must be consistent across both files:

When lists are enabled:
- Dev Tools Filters Menu control is disabled
- Dev Tools visibly shows standard mode
- reminders render standard filters
- lists render standard filters

When lists are not enabled:
- Dev Tools Filters Menu control is interactive
- reminders continue to follow the selected filtersMenuVariant
- lists-enabled-specific forcing does not apply

2 - non-scope

Do not modify:
- any file other than /src/app/App.tsx and /src/app/components/DevToolsOverlay.tsx
- reminder filter styling
- reminder responsive rules
- standard lists filters logic beyond what is explicitly written above
- list categorisation
- list filtering
- list sorting
- list creation
- list editing
- list persistence
- overlays
- shared abstractions
- helper extraction
- new components
- refactors

3 - files changed

/src/app/App.tsx
/src/app/components/DevToolsOverlay.tsx

4 - changes made

- re-disable the Dev Tools Filters Menu control when lists are enabled
- restore visible standard-mode display in Dev Tools when lists are enabled
- make both reminders and lists render standard filters when lists are enabled
- keep grouped filters logic in code but unreachable while lists are enabled
- keep Started as the only standard lists pill hidden below 390px

5 - verification

Verify exactly the following:

A. With lists enabled
- Dev Tools Filters Menu control is disabled
- Dev Tools Filters Menu control has opacity 0.5
- Dev Tools Filters Menu control has pointerEvents disabled
- Dev Tools Filters Menu control visibly shows standard mode
- reminders render standard filters only
- lists render standard filters only
- grouped filters do not render for reminders
- grouped filters do not render for lists

B. With lists not enabled
- Dev Tools Filters Menu control is interactive
- reminders follow the selected filtersMenuVariant normally
- no lists-enabled forcing applies

C. Standard lists filters
- pills render in this exact order:
  - Complete
  - Almost
  - Started
  - Todo
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

D. Regression protection
- grouped filters logic still exists in code
- handleFiltersMenuVariantChange still contains exactly the three required state updates
- no unintended behaviour changes outside the two scoped files

6 - diff summary

2 files changed:
/src/app/App.tsx
/src/app/components/DevToolsOverlay.tsx

Changes limited to re-disabling the Dev Tools Filters Menu control when lists are enabled and forcing standard filters rendering for both reminders and lists while preserving grouped logic in code.