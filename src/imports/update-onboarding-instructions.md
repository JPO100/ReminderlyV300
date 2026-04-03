Change instruction for Claude

Context
We have already built the tutorial overlay shell in the new Reminderly app (positioning, slide-up animation, backdrop behaviour, responsive rules). The onboarding journey must now be implemented inside that overlay shell.

You are being given a single source bundle file that contains everything required to reproduce the old onboarding journey exactly:

onboarding-source-bundle.md

This bundle contains:

* TutorialOnboardingContent.tsx (content-only wrapper)
* OnboardingPage1Content.tsx through OnboardingPage9Content.tsx
* NewReminderPopPage4.tsx
* ReminderInfoOverlay.tsx
* A complete dependency list under /src/imports plus external packages

Goal
Reproduce the onboarding journey pixel-perfect identical to the old build, inside the existing TutorialOverlay shell, with no new behaviours and no redesign.

Scope
In scope

* Add the onboarding content components exactly as provided in onboarding-source-bundle.md.
* Wire TutorialOnboardingContent into the existing tutorial overlay body content area.
* Ensure all imports resolve by adding the required /src/imports files listed in the bundle.
* Ensure the external dependency motion/react is present and used exactly as in the provided files.
* Ensure onComplete is passed and is invoked exactly where the provided wrapper triggers completion.

Out of scope

* Do not create or modify any overlay shell, backdrop, slide-up container, z-index, positioning, or logo spacing.
* Do not change any responsive overlay rules. Follow the existing overlay implementation.
* Do not redesign, re-style, re-space, re-copy, or re-layout any onboarding page.
* Do not add analytics, tracking, persistence, localStorage, feature flags, or new configuration.
* Do not introduce new components, abstractions, or dependencies beyond what is already referenced by the provided code.

Non-negotiable rules

1. Do not modify the code content
   All 12 files in onboarding-source-bundle.md must be copied verbatim. No edits, no formatting changes, no renames, no refactors. This includes classNames, inline styles, motion timings, svg usage, and text.

2. Content-only wrapper must remain content-only
   TutorialOnboardingContent.tsx must not introduce:

* fixed positioning
* backdrop rendering
* slide-up animation wrappers
* hardcoded outer padding
* fixed height
  The wrapper must remain a normal content component that fills its parent.

3. Import paths must resolve without rewriting the onboarding files
   Prefer to make the new repo match the import paths used by the provided files, rather than editing the onboarding files to fit the new repo.

Implementation steps
Step 1. Add the onboarding files
Create or overwrite the following files in the new repo at these exact paths:

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

Copy the contents exactly from onboarding-source-bundle.md.

Step 2. Add required /src/imports dependencies
From the dependencies list in onboarding-source-bundle.md, ensure every referenced /src/imports file exists in the new repo with the exact same filename and path.

Create or copy all listed files into:

/src/imports/

Do not substitute or rename these files. Do not use wildcards. Use the exact filenames listed.

Step 3. Ensure external dependency support
Confirm the new repo has the external package used by the onboarding pages:

motion/react

Do not replace motion/react usage with another animation library. Do not remove motion/react usage from the onboarding code.

Step 4. Mount the onboarding content inside the existing tutorial overlay
Locate the component that renders the tutorial overlay shell (the overlay container that slides up and positions 16px above the logo). In that overlay’s body content slot, render TutorialOnboardingContent.

Mounting requirements:

* Render TutorialOnboardingContent inside the overlay’s existing body container (the same container where other overlay content would go).
* Do not add extra wrappers that apply padding, fixed heights, transforms, or animations. If the overlay body already provides padding, keep it. If it does not, do not add new padding here - the pages are expected to render as they did in the old build.
* Pass onComplete to TutorialOnboardingContent. When onComplete fires, close the tutorial overlay using the overlay’s existing close mechanism (the same path used by the close button/backdrop).

Step 5. Do not change overlay close behaviour
The overlay shell already defines:

* close button behaviour
* backdrop tap behaviour
* settings overlay delayed close behaviour (tutorial opens over settings, settings closes behind)

Do not modify any of that. The onboarding content must fit within the existing overlay lifecycle.

Acceptance criteria
Functional

* Clicking “Reminderly tutorial” opens the tutorial overlay.
* The onboarding carousel renders within the overlay and shows 9 steps.
* Back/next/restart behaviour matches the old build.
* Pagination dots match the old build.
* The final completion action triggers onComplete, which closes the tutorial overlay.

Visual

* The onboarding pages are pixel-perfect identical to the old build.
* No duplicate slide-up animation occurs (only the overlay shell animates in).
* The content does not overflow unexpectedly and does not introduce new spacing compared to the old build.

Build integrity

* No TypeScript errors.
* No missing module errors for /src/imports dependencies.
* No new dependencies added beyond motion/react (which is already expected).

Common failure modes to avoid

* Editing onboarding files to “fit” the new overlay. Do not do this.
* Leaving out /src/imports files or renaming them.
* Adding wrapper divs that introduce padding, fixed heights, or transforms.
* Accidentally creating a second overlay shell around the content.
* Replacing motion/react with framer-motion or CSS transitions.

Delivery expectation
When you respond, provide:

* A list of files created/updated (paths only).
* The single place where TutorialOnboardingContent was mounted (file path and a minimal snippet showing the insertion).
* Confirmation that you did not modify the 12 onboarding files beyond copying them verbatim.
