Claude,

Thanks - good spot on the perceived conflict. Here are the answers and the tightened constraints. Please follow these exactly.

NLC pattern conflict (localStorage)

You are correct: the onboarding tutorial flag must be persisted to localStorage and must survive refresh.

Interpret “match NLC” as follows:

Use the same overall approach as NLC for where feature flags live (App-level state) and how the UI toggle controls them (single source of truth).

For default value only, match NLC’s current default behaviour (true).

Therefore implement onboarding flag init and persistence using the same localStorage read/write pattern already used in App.tsx for other settings (for example showDateAndTimeSubtitles), but with default true when the key is missing.

Rules:

localStorage key: reminderly-ff-onboarding-tutorial

Missing key default: true

Do not add any new abstraction, helper, hook, or “feature flag system”. Just a boolean state + localStorage read on init + localStorage write on change.

Dev tools toggle location and prop chain

Yes, it is acceptable to thread the App state through the existing component chain. Keep it minimal and purely plumbing.

Rules:

Only add the two props needed:

isOnboardingTutorialEnabled: boolean

onOnboardingTutorialEnabledChange: (next: boolean) => void

Pass them straight through App.tsx -> DevToolsOverlay.tsx -> DevToolsContent -> DevToolsHome (or equivalent existing chain) -> the toggle component.

Do not refactor DevTools, do not introduce context, do not introduce a global store, do not move DevTools files, do not add new components.

Also: do not wire anything in /src/imports/ as “source of truth”. The source of truth must remain App.tsx state.

“Dev tools tutorial settings element” wording (SettingsOverlay link)

Correct: this refers to the “Reminderly tutorial” link in SettingsOverlay.tsx. That is the element that must be disabled when isOnboardingTutorialEnabled is false.

Rules:

Pass isOnboardingTutorialEnabled into SettingsOverlay (only as far as required to disable that link).

Apply disabled behaviour exactly as specified:

Suppress all link behaviour when disabled (no navigation, no action, no hover/active implication).

Link text colour: #939393.

cursor: default.

pointer-events: none on the link element only (not the whole row).

Also gate the click handler; when disabled, call preventDefault and stopPropagation.

Do not disable other settings links. Do not change SettingsOverlay layout or styles beyond that one link’s disabled state.

TutorialOverlay gating

Your understanding is correct. Implement exactly:

App passes isEnabled={isOnboardingTutorialEnabled}

TutorialOverlay.tsx: if (!isEnabled) return null

No additional behavioural changes, no new timers, no new cleanup systems. Existing React effect cleanups are sufficient.

Guardrails

Do not add or change anything beyond:

App.tsx: new boolean state + localStorage init/persist.

Minimal prop plumbing to dev tools toggle.

Minimal prop plumbing to SettingsOverlay to disable the one link.

TutorialOverlay: isEnabled prop and early return.

Everything else remains unchanged.

Proceed on that basis.