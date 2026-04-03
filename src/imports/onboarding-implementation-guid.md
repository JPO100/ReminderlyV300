Instruction for Claude

All previously missing dependency files have now been provided.
There are no remaining blockers.

You must now implement the onboarding system exactly as defined.

No redesign, no refactoring, no additional behaviour.

Single source of truth

The file onboarding-source-bundle.md is the only source of truth for the onboarding implementation.

Ignore:

any earlier snippets

any earlier versions of the wrapper

any assumptions about layout, padding, height, or animation

All onboarding code must be copied exactly from that bundle.

Do not modify any code inside the bundle.

Implementation steps

Step 1 — Create the onboarding component files

Create the following files exactly as they appear in onboarding-source-bundle.md.

Paths must match exactly:

/src/app/components/TutorialOnboardingContent.tsx
/src/app/components/OnboardingPage1Content.tsx
/src/app/components/OnboardingPage2Content.tsx
/src/app/components/OnboardingPage3Content.tsx
/src/app/components/OnboardingPage4Content.tsx
/src/app/components/OnboardingPage5Content.tsx
/src/app/components/OnboardingPage6Content.tsx
/src/app/components/OnboardingPage7Content.tsx
/src/app/components/OnboardingPage8Content.tsx
/src/app/components/OnboardingPage9Content.tsx
/src/app/components/NewReminderPopPage4.tsx
/src/app/components/ReminderInfoOverlay.tsx

Rules:

Copy code exactly.

Do not modify formatting.

Do not change imports.

Do not rename anything.

Do not adjust styles, motion, spacing, or layout.

Step 2 — Install the import dependencies

The required /src/imports dependency files have now been supplied.

Each file must be placed exactly at:

/src/imports/<filename>

Rules:

Do not rename files.

Do not modify their contents.

Do not create alternative implementations.

Do not create stubs.

Step 3 — Do not modify the overlay shell

The tutorial overlay shell already exists and must remain unchanged.

You must not modify:

TutorialOverlay.tsx layout

overlay slide-up animation

overlay backdrop

overlay padding

overlay border radius

overlay positioning

responsive behaviour

Step 4 — Mount the onboarding content

Open the existing file:

/src/app/components/TutorialOverlay.tsx

Inside the overlay’s existing content container (the container that currently renders overlay content), render:

<TutorialOnboardingContent onComplete={closeTutorialOverlay} />

Rules:

Do not create additional wrapper elements.

Do not introduce new padding.

Do not introduce new layout rules.

Do not add transforms or animations.

The overlay shell must remain responsible for all animation and layout.

Step 5 — Completion behaviour

The onboarding wrapper already implements all navigation logic.

Do not modify it.

When the final onboarding step triggers completion, onComplete() must be called.

The overlay should close using the existing overlay close mechanism.

Do not create new closing logic.

Step 6 — External dependency

Confirm the project already includes:

motion/react

If it already exists in package.json, do nothing.

Do not replace this library.

Step 7 — Final verification

Before responding, confirm the following:

All 12 onboarding files exist in /src/app/components.

All /src/imports dependency files exist.

None of the onboarding files were modified.

TutorialOverlay.tsx was not edited except to mount TutorialOnboardingContent.

No new dependencies were introduced.

Response format

Respond with:

Files created or updated (paths only)

The file where TutorialOnboardingContent was mounted

The exact snippet showing the mount

Confirmation that onboarding-source-bundle.md was copied verbatim with zero edits

Do not provide suggestions, improvements, or additional commentary.