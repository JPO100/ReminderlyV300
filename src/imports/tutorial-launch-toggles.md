Scope: Add tutorial launch toggles to dev tools > overlay tutorial

Objective

Add two dev tools toggles that control when the existing tutorial overlay auto-launches.

These toggles only control whether the existing tutorial overlay is opened automatically on app load. They must not alter the tutorial overlay itself, its content, its layout, its animation, or any other behaviour.

The toggle row UI components will be attached alongside this scope and must be used as the visual basis exactly as provided. They may be wired to real state and click handlers, but no visual, copy, icon, or layout changes are permitted.

Location

Dev tools panel
Section: Onboarding tutorial

Existing master gate

All behaviour in this scope remains gated by the existing isOnboardingTutorialEnabled feature flag.

This means:

If isOnboardingTutorialEnabled is false, the tutorial must not auto-launch under any circumstance, regardless of the two new toggles.

If isOnboardingTutorialEnabled is true, the two new toggles behave exactly as defined below.

No changes are to be made to the purpose or behaviour of isOnboardingTutorialEnabled itself.

Toggles to add

Show tutorial on first launch

Description
Automatically show the tutorial the first time the app is opened.

Behaviour

Default state: enabled.

When enabled, and only when isOnboardingTutorialEnabled is also enabled, the tutorial auto-launches on app load only if it has never previously auto-launched or been launched under this first-launch rule.

Once the tutorial overlay appears from this first-launch rule, it must be considered shown and must not auto-launch again on later app loads from this rule.

Show tutorial on every app start

Description
Automatically show the tutorial on every app load. Intended for testing.

Behaviour

Default state: disabled.

When enabled, and only when isOnboardingTutorialEnabled is also enabled, the tutorial auto-launches on every app load.

This toggle takes priority over the first-launch toggle.

Exact launch logic

On app load, the existing tutorial overlay must auto-open only according to these rules, in this exact order:

If isOnboardingTutorialEnabled is false
→ Do not auto-launch the tutorial.

Else if “Show tutorial on every app start” is enabled
→ Auto-launch the tutorial.

Else if “Show tutorial on first launch” is enabled, and the persisted first-launch-shown flag is not yet set
→ Auto-launch the tutorial, then immediately persist the first-launch-shown flag.

Else
→ Do not auto-launch the tutorial.

No other launch conditions, guards, dependencies, or exceptions are to be introduced.

Opening behaviour

For auto-launch on app load, open the tutorial directly by setting the existing tutorial-open state only.

Do not call handleTutorialOpen for auto-launch.
Do not close settings.
Do not add any extra timing logic beyond what already exists for the overlay itself.
Do not add overlay-conflict handling, sequencing, or suppression logic.

Auto-launch should fire unconditionally on app load when the above rules say it should.

Persistence

Persist the two new toggle states using the same lightweight localStorage pattern already used by existing dev tools toggles.

Persist the first-launch-shown flag in localStorage as a separate flag.

No new persistence system, abstraction, helper framework, migration layer, or settings architecture is to be introduced.

Reset / clear behaviour

The persisted first-launch-shown flag must not be reset by any existing clear, reset, or delete action unless that behaviour already exists today.

Specifically:

Do not change the behaviour of “Clear reminders list”.

Do not add any new reset control for the first-launch-shown flag.

Do not couple this flag to any other reset path.

If a reset path for this flag is needed in future, that will be scoped separately.

UI constraints

Use the attached Figma toggle row components exactly as provided for:

text

icons

layout

visual styling

They may be made interactive by wiring them to real state and click handlers, but nothing visual may be changed.

No new UI components are to be created.
No extra helper text, labels, captions, badges, or explanatory UI are to be added.

Implementation constraints

Keep the implementation simple and lightweight.

Do not introduce:

new contexts

new services

new custom hooks

new feature-flag systems

new abstraction layers

new launch managers

new overlay coordination systems

new state machines

new timing or retry logic

Only the minimum code required to:

render the two toggles

persist their states

persist the first-launch-shown flag

run the exact auto-launch logic above on app load

should be added.

Out of scope

Do not change:

tutorial overlay layout

tutorial overlay styling

tutorial overlay animation

tutorial page content

onboarding mini phone UI

existing manual tutorial open behaviour

existing isOnboardingTutorialEnabled behaviour

existing settings / dev tools behaviour beyond the two new toggles and the exact auto-launch logic above