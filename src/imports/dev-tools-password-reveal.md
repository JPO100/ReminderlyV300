Scope

Add a hidden password reveal behaviour to the LoginScreen component inside DevToolsOverlay.tsx.

Trigger condition

The reveal must only occur when both of the following conditions are true:

1. The password input field value is exactly `GILBURN`
2. The user presses the existing login button

Typing `GILBURN` alone must not reveal the password.

The comparison must be strict:

* The value must be exactly `GILBURN`
* All characters must be uppercase
* The value must match exactly with no additional characters
* No trimming, normalisation, or case conversion may be applied before comparison

Any value other than the exact string `GILBURN` must result in no reveal behaviour.

Reveal behaviour

When the login button is pressed and the password field value is exactly `GILBURN`:

* The current dev tools password must immediately appear beneath the login button
* The revealed password must use the same existing password constant already used by the login validation logic
* The revealed password must remain visible for exactly 3000ms in total

Fade behaviour

The revealed password must fade out during the final portion of the 3000ms display window.

Timing must be:

* 2700ms fully visible
* 300ms fade-out
* then removed from view

The fade-out must affect only the revealed password text. No other UI elements may animate or move.

Input change behaviour

If the revealed password is currently visible and the password input value changes to anything other than `GILBURN` before the 3000ms completes:

* The revealed password must disappear immediately
* Any active timer must be cleared

Re-trigger behaviour

If the user changes the password field away from `GILBURN`, then enters `GILBURN` again and presses the login button again:

* The reveal must run again
* A new 3000ms cycle must begin

Pressing the login button again while `GILBURN` is still present must restart the reveal as a fresh 3000ms cycle.

Display rules

The revealed password must appear directly beneath the existing login button.

It must appear above the existing error message element.

The revealed password must be plain text.

The revealed password must not be inserted into the password input field.

The revealed password must display the same password value used by the login validation logic. The implementation must reference the existing password constant and must not duplicate or redefine the value.

Styling must remain simple and use the existing page text styling. No new styling abstractions or components may be introduced.

Existing behaviour that must remain unchanged

The following must not change:

* The stored dev tools password
* Login validation behaviour
* Login success or failure logic
* Button enabled or disabled behaviour
* Form submission behaviour
* Password eye-toggle behaviour
* Page routing
* Overlay behaviour
* Dev tools settings
* Any other part of the login page not directly required for this behaviour

Entering `GILBURN` and pressing the login button must reveal the password but must not log the user in unless `GILBURN` is also the real password.

Implementation constraints

The implementation must remain local to LoginScreen inside DevToolsOverlay.tsx.

No new files may be created.

No refactoring is permitted beyond the minimum code required to add this behaviour.

No new abstractions, utilities, hooks, contexts, helper modules, or shared components may be introduced.

Only the minimum additional local state and timer handling required for:

* strict `GILBURN` comparison
* reveal triggered only by login button press
* 3000ms total display window
* 300ms fade-out
* cancellation on input change
* timer cleanup on re-trigger and unmount

Non-scope

* No changes to the password constant
* No changes to login UX other than displaying the revealed password in the specified case
* No persistence
* No analytics
* No telemetry
* No console output
* No debug helpers
* No additional explanatory text or labels

Acceptance criteria

1. Typing `GILBURN` alone does nothing.
2. Pressing the login button with any value other than exact `GILBURN` does not reveal the password.
3. Pressing the login button while the password field contains exact `GILBURN` reveals the current dev tools password beneath the login button.
4. The revealed password uses the same password constant already used by the login validation logic.
5. The revealed password appears above the existing error message element.
6. The revealed password remains visible for 3000ms in total.
7. The final 300ms of that 3000ms window is a fade-out.
8. After the 3000ms completes the revealed password is removed from view.
9. The reveal must not trigger for near matches. Examples include:

   * `gilburn`
   * `Gilburn`
   * `[space]GILBURN`
   * `GILBURN[space]`
   * `GILBURN123`
10. If the revealed password is visible and the input changes away from `GILBURN`, the password disappears immediately and the timer is cleared.
11. Entering `GILBURN` again and pressing the login button again starts a fresh 3000ms reveal cycle.
12. All existing login, validation, error handling, eye-toggle, routing, and overlay behaviour remain unchanged.
