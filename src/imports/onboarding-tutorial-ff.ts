Implement an onboarding tutorial feature flag using the exact same pattern already used for the NLC feature flag. Do not introduce any new feature-flag systems, shared helpers, abstractions, utilities, or frameworks. This must be implemented as a simple boolean state persisted to localStorage and controlled via the existing dev tools toggle.

Scope

Add a persisted boolean flag in App.tsx

Add a new boolean state alongside the existing NLC feature flag state:

isOnboardingTutorialEnabled: boolean

Initialisation

Initialise the value from localStorage using the exact same logic and pattern already used for the NLC flag.

If the localStorage key is missing, use the same default value rule used by the NLC flag. Do not invent a new default rule.

Persistence

Persist the state back to localStorage using the same useEffect pattern already used for NLC.

Use the key: reminderly-ff-onboarding-tutorial.

No additional state, helpers, hooks, abstractions, or utilities may be created for this.

Wire the existing dev tools toggle

The existing dev tools toggle at:

Dev tools → Onboarding tutorial

must control the new state directly.

Behaviour:

checked = isOnboardingTutorialEnabled

onChange sets isOnboardingTutorialEnabled

The toggle must be the only control for enabling or disabling the tutorial overlay.

Do not introduce additional UI controls, configuration panels, or feature flag UI.

Gate the TutorialOverlay

The TutorialOverlay component must only render when the flag is enabled.

Implementation:

App.tsx must pass the flag into the overlay:

<TutorialOverlay isEnabled={isOnboardingTutorialEnabled} />

Inside TutorialOverlay.tsx add an early return:

if (!isEnabled) return null

No other logic changes are permitted.

Do not add new timers, scheduling systems, or feature flag helpers.

When the flag is turned off, the overlay must unmount naturally via React. Any existing effect cleanups inside the overlay will run automatically. Do not add additional cleanup systems.

Dev tools settings row behaviour when the tutorial is disabled

When isOnboardingTutorialEnabled is false, the tutorial overlay settings element in dev tools must behave as disabled.

Required behaviour:

The link must not be clickable.

No navigation or click behaviour may occur.

Hover or active styling must not suggest the element is interactive.

The link text colour must change to #939393.

Implementation rules:

The click handler must be gated by isOnboardingTutorialEnabled.

When disabled, the handler must call preventDefault and stopPropagation.

Apply the following styles only when the feature flag is false:

color: #939393
cursor: default
pointer-events: none

Pointer-events must be applied only to the link element itself, not the entire row, so that the toggle control remains usable.

No additional UI states, animations, or styling behaviour may be introduced.

Defaults

The behaviour when the localStorage key is missing must match the NLC feature flag exactly.

Do not introduce any new environment-based logic, dev-only defaults, or conditional behaviour beyond what NLC already does.

Verification criteria

The implementation is correct only if all of the following are true:

When toggled off, TutorialOverlay never renders.

When toggled off, the overlay does not intercept clicks or reserve layout space.

When toggled on, the overlay behaves exactly as it does today.

Refreshing the page preserves the flag state via localStorage.

When disabled, the dev tools tutorial settings link displays in #939393 and cannot be clicked.

When enabled, the link behaves normally.

Non-scope

The following must not be changed:

Tutorial overlay UI, layout, or animation behaviour.

Reminder logic or any other application logic.

Dev tools architecture.

Existing NLC implementation.

Any files unrelated to the feature flag wiring described above.

No new abstractions, helpers, frameworks, utilities, or configuration systems may be introduced.