Scope

Add a hidden password reveal behaviour to the dev tools login page.

Required behaviour

When the password input field on the dev tools login page contains the exact value `GILBURN`, the current dev tools password must be displayed beneath the login button.

The comparison must be strict:

* The value must be exactly `GILBURN`
* All characters must be uppercase
* The value must match exactly with no additional characters
* No trimming, normalisation, or case conversion may be applied before comparison

Any value other than the exact string `GILBURN` must result in no reveal behaviour.

Reveal behaviour

When the password field value becomes exactly `GILBURN`:

* The current dev tools password must immediately appear beneath the login button
* The password must remain visible for exactly 3000ms
* After 3000ms the password must fade out and then be removed from view

The fade-out must affect only the revealed password text. No other UI elements may animate, move, or change.

Cancellation behaviour

If the password field value changes to anything other than `GILBURN` before the 3000ms period completes:

* The revealed password must immediately stop showing
* Any active reveal timer must be cleared

Re-trigger behaviour

If the user enters `GILBURN` again after previously changing the field to another value:

* The reveal behaviour must trigger again
* A new 3000ms timer must begin

Display rules

The revealed password must appear directly beneath the existing login button on the dev tools login page.

The revealed password must display the same password value that the login system currently expects for authentication. The implementation must not duplicate or redefine the password value - it must reference the existing constant already used by the login validation logic.

The revealed password must be plain text.

The revealed password must not be inserted into the password input field.

Non-scope

The following must not be changed:

* The stored dev tools password
* Login validation behaviour
* Login success or failure logic
* Button enabled or disabled state
* Form submission behaviour
* Page routing
* Overlay behaviour
* Dev tools settings
* Any other part of the login page not directly required for the reveal behaviour

No logging, analytics, console output, debugging helpers, or telemetry may be added.

No persistence may be added.

Implementation constraints

The implementation must remain local to the dev tools login page component.

No new files may be created.

No refactoring of the login component is permitted.

No new abstractions, utilities, hooks, contexts, or helper modules may be introduced.

Only the minimum additional state and timer handling required to support the reveal behaviour may be added.

Acceptance criteria

1. Typing `GILBURN` exactly into the password field reveals the current dev tools password beneath the login button.
2. The revealed password appears immediately.
3. The revealed password remains visible for 3000ms.
4. After 3000ms the revealed password fades out and disappears.
5. Typing anything other than the exact value `GILBURN` results in no reveal behaviour.
6. The reveal must not trigger for any near matches. Examples include:

   * `gilburn`
   * `Gilburn`
   * `[space]GILBURN`
   * `GILBURN[space]`
   * `GILBURN123`
7. If the input value changes away from `GILBURN` while the password is visible, the password disappears immediately and the timer is cleared.
8. Re-entering `GILBURN` after changing the value triggers a new 3000ms reveal cycle.
9. All existing login behaviour remains unchanged.
