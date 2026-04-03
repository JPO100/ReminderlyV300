Yes, makes sense. Here is a copy-paste ready prompt for engineers.

Title: Dev tools overlay - dummy reminders page - repeats status icon and repeat generation

Context
On the dummy reminders page in the dev tools overlay, we need a per-reminder-type toggle that controls whether that dummy reminder type also generates repeat reminders.

Scope

1. UI

* Insert a repeats status icon to the right of the number field for each reminder item row on the dummy reminders page.
* The icon has two visual states:

  * Inactive: grey
  * Active: reminderly dark blue
* The icon is clickable and toggles active/inactive for that reminder type row.

2. Behaviour

* By default, all reminder types are active.
* When a reminder type is active:

  * The generated dummy reminders for that type should include a random number of repeat reminders.
* When a reminder type is inactive:

  * The generated dummy reminders for that type should include zero repeat reminders.

3. Exception

* The 'Sometime' dummy reminder type does not support repeats.
* For 'Sometime':

  * Do not show the repeats icon at all, or show it disabled with no interaction (pick the simplest existing pattern in the dev tools overlay).
  * Regardless, ensure 'Sometime' never generates repeat reminders.

Random repeat count rules

* Random count should be per generation run, per reminder type (not per individual reminder row).
* Keep it lightweight and deterministic enough for development use:

  * Use a small bounded range, for example 0 to N, where N is modest (for example 1 to 5).
  * When active, allow 0 as a possible value only if that is intentional. Otherwise make it at least 1.

Acceptance criteria

* Each dummy reminder type row (except 'Sometime') shows the repeats icon immediately to the right of the number input.
* Clicking the icon toggles the icon colour between grey (inactive) and dark blue (active).
* Default state on first load is active for all supported types.
* Generating dummy reminders:

  * Supported types: active includes some repeat reminders (random bounded count), inactive includes none.
  * Sometime: never includes repeat reminders.
* No changes outside the dev tools overlay dummy reminders page.

Implementation notes

* Store the per-type repeats active flag in the same place you store the per-type count value (local state is fine).
* Keep the icon purely presentational plus onClick, no new shared utilities or new settings systems.
* If you already have a "generate dummy data" function, pass the per-type repeats flag into it and gate repeat generation there.
