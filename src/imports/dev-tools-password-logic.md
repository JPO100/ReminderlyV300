Implement the following behaviour on the Dev tools password page.

Do not introduce new components, overlays, contexts, hooks, storage mechanisms, or architectural patterns. Modify only the existing dev tools password setting and the existing login gate behaviour.

Definitions

Password required toggle - the existing toggle on the Dev tools password page.

Stored password - the existing password constant currently used by the login gate (currently '123').

Behaviour when Password required is OFF

When the Password required toggle is OFF:

* the dev tools login screen must still appear when dev tools are opened
* the password field remains visible
* the Log in button must appear enabled immediately when the login screen loads
* clicking the Log in button must unlock dev tools regardless of what is in the password field
* password validation must not run
* the incorrect password error message must never appear

Behaviour when Password required is ON

When the Password required toggle is ON:

* the login screen behaviour must revert to the existing password-gated behaviour
* the entered password must be compared directly to the stored password
* access must only be granted when the entered password exactly matches the stored password
* incorrect passwords must show the existing inline error message
* all other login behaviour must remain unchanged

Password persistence rules

Changing the Password required toggle must not modify the stored password.

When Password required is turned OFF:

* the stored password must remain unchanged

When Password required is turned ON again:

* the same stored password must still be required
* no reset, regeneration, or modification of the password must occur

Login screen UI behaviour

When Password required is OFF:

* the Log in button must appear blue/enabled immediately
* no validation state should block the button
* no additional UI text, labels, or indicators should be added

When Password required is ON:

* the existing login behaviour must remain exactly as it currently works

Technical constraints

* do not add server-side functionality
* do not introduce authentication services
* do not add encryption or hashing
* do not introduce new state systems, contexts, or global auth logic
* do not modify overlay behaviour, overlay mounting, or overlay layout
* do not modify reminder logic or any other application behaviour

Outcome

The Password required toggle must only control whether the login gate enforces password validation. The login screen must always appear, and the previously configured password must remain unchanged when the toggle is turned OFF and ON.
