Scope: Add tutorial launch toggles to dev tools > overlay tutorial

Objective

Add two dev tools toggles that control when the tutorial overlay automatically launches.

These toggles only affect the launch condition of the existing tutorial overlay. They must not alter the tutorial overlay itself in any way.

The toggle UI components will be attached alongside this scope and must be used exactly as provided.

Location

Dev tools panel
Section: Overlay tutorial

Toggles to add

Show tutorial on first launch

Description
Automatically show the tutorial the first time a user opens the app.

Behaviour

When enabled, the tutorial automatically launches the first time the app is opened.

After it has launched once, it must not automatically launch again on subsequent app loads.

The tutorial launch must be considered “completed” once the overlay appears. No completion tracking beyond this is required.

Default state
Enabled

Show tutorial on every app start

Description
Forces the tutorial to appear every time the app loads. This is intended for testing.

Behaviour

When enabled, the tutorial launches automatically on every app load or refresh.

This behaviour takes priority over “Show tutorial on first launch”.

If both toggles are enabled, the tutorial launches on every app start.

Default state
Disabled

Launch logic

The tutorial auto-launch behaviour must follow exactly these rules:

If “Show tutorial on every app start” is enabled
→ Always launch the tutorial on app load.

Else if “Show tutorial on first launch” is enabled
→ Launch the tutorial only if it has never previously been launched.

Else
→ Do not auto-launch the tutorial.

State handling

The two toggle states must persist using the same persistence approach already used by other dev tools toggles.

The “first launch already shown” flag must persist so the tutorial does not relaunch on later app loads when the first-launch toggle is enabled.

Out of scope

The following must not be changed or introduced:

No changes to tutorial overlay layout, styling, or animation.

No changes to tutorial page content.

No changes to the onboarding mini phone UI.

No new onboarding systems, frameworks, services, or abstractions.

No additional launch conditions or logic beyond what is explicitly defined above.

No new UI components - the attached toggle components must be used exactly as provided.

The implementation must remain lightweight and limited strictly to controlling when the existing tutorial overlay is automatically launched.