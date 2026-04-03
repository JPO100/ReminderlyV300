Change request: A/B active filters menu (dev-only, minimal change)

Implement exactly what is written here.
Do not add improvements, refactors, abstractions, or “nice to haves”.
This is a small dev-only toggle and a small UI swap.

Goal

Add a dev tools setting that swaps the active list filters menu between two variants:

Standard filters (existing menu, unchanged)

Grouped filters (new menu: Today, This week, Other, Settings)

This affects active lists only.
Done/deleted and its filters menu must remain completely untouched.

Single intended implementation shape

This should be implemented as:

One new dev-tools state value: filtersMenuVariant with two values: standard and grouped

One conditional render: render the existing menu when standard, render the new menu when grouped

One reset rule when the variant changes: set activeFilter to "all"

Nothing else.

Do not introduce new architecture. Do not restructure filtering. Do not create reusable frameworks.

1. Dev tools

Add a dev tools section titled: Filters menu

Provide two mutually exclusive toggles:

Standard filters

Grouped filters

Rules:

Only one can be active at a time.

Default is Standard filters.

When the admin changes this setting, immediately run the reset rule (below).

Use the simplest existing dev tools state pattern already in the codebase.
Do not add new persistence mechanisms.

2. Reset rule when switching menu variant

Whenever the admin changes the filters menu variant in dev tools:

Immediately set activeFilter to "all"

The active list shows all reminders (no filter active)

Do not preserve or map the previous filter

Do not add special cases

This rule is absolute.

3. Standard filters variant (existing behaviour)

When variant = Standard filters:

Render the current menu exactly as-is

Do not change items, labels, order, logic, styling, layout, or behaviour

Items remain:

Today

This week

Later

Sometime

4. Grouped filters variant (new menu)

When variant = Grouped filters, render this menu above the active list:

Menu items (in this order):

Today

This week

Other

Settings

4.1 Today / This week

Use the exact existing logic and behaviour. No changes.

4.2 Other

Other must display the combined results of what currently appears under:

Later

Sometime

Implementation requirement:

Reuse the existing “later” filter condition and the existing “sometime” filter condition

Other = (later OR sometime)

Do not create new categorisation logic

Do not refactor or extract shared utilities

Do not change the definitions of later or sometime

4.3 Settings

Render the provided Settings button component

Place it as the last item, far right

No divider

No click behaviour

No navigation

No state changes

It is visual-only

5. Hard non-scope boundaries

Do not touch:

Done/deleted view or filters menu

Reminder parsing or normalisation

Categorisation rules (except using them as-is for “Other”)

Data models

Global styling

File structure

Any unrelated cleanup

Do not:

Add feature-flag systems

Add new configuration layers

Add abstractions for “future variants”

Add analytics or instrumentation

6. Minimal tests (only if already easy)

Only add tests if there is an existing nearby pattern that makes it trivial. If not, skip.

If added, keep to these checks only:

Grouped variant renders Today, This week, Other, Settings

Other returns later ∪ sometime

Changing variant resets activeFilter to "all"

Done/deleted unaffected

No test framework work. No new helpers.

7. Required completion note (short)

At the end, report only:

Files changed

What was added (dev tools toggle, conditional menu render, reset-to-all rule)

Confirmation that done/deleted was not modified

Nothing else.