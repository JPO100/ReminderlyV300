Claude - good output and the structure is right. Before you commit the documentation changes, apply the following corrections and tightening so we avoid any drift or accidental scope creep.

Required corrections

1. /src/imports handling

* You can read /src/imports as reference material, but it must not be presented as part of the "build scanned for source of truth".
* Update the review summary line for /src/imports to make this explicit, for example:

  * "/src/imports scanned as read-only reference material (not source of truth)"
* Remove any phrasing that implies /src/imports was used to validate behaviour.

2. Confirm the /src/imports filenames are real

* You listed "/src/imports/DevTools.tsx, DummyReminders.tsx". Ensure these file paths actually exist exactly as written.
* If they do not exist, remove them from the review summary and instead list the real files you referenced.
* Do not guess or paraphrase paths.

3. Check count change needs to be precise and consistent

* You wrote "done-deleted 4->9". This is only correct if the current build contains 9 checks in the done-deleted checks file.
* Ensure the docs state:

  * the exact file name
  * the exact current count
  * and do not reference older counts unless you are explicitly stating "was previously documented as X, corrected to Y".
* If you corrected multiple check files, ensure the README and build-guide count statements match each other.

4. "Other category" naming

* In /docs/filter-system.md and /docs/reminder-logic.md, ensure the naming matches the UI and code exactly.
* If the UI label is "Later" but code uses "other" internally (or similar), document it clearly as:

  * "UI label" vs "internal bucket"
* Do not introduce new terminology. Mirror what the build uses.

5. Sunday edge case language

* In /docs/reminder-logic.md, describe it as current behaviour and an edge case.
* Do not label it a bug unless the code is objectively wrong.
* Keep it short and plain English.

6. Not manually verified flag

* Keep this lightweight and local to the relevant feature section only (as you said).
* Do not add a separate QA section or test plan.

Quality bar checks before finalising

* Cross-doc consistency: any mention of overlays, variants, categories, breakpoints, and file paths must be identical across docs.
* No "inventory lists" that become stale - prefer documenting how to derive the truth from code, but keep it lightweight.
* Keep documentation clean and practical - no new frameworks, heavy taxonomies, or process docs.

Once those are applied, your change log can stay as-is, but make sure it reflects the corrected wording for /src/imports and any path fixes.
