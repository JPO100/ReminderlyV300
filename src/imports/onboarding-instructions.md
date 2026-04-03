Instruction for Claude

You are currently using an outdated version of TutorialOnboardingContent.tsx from earlier conversation context.

Stop. Discard all prior assumptions, notes, “line references”, and any previously seen snippets.

Single source of truth

The only valid source of truth for this task is the attached file:

onboarding-source-bundle.md

You must read that file in full and treat its contents as authoritative.

You must ignore:

* any earlier code snippets
* any earlier “extraction” documents
* any earlier versions of TutorialOnboardingContent.tsx
* any claims about isAnimating, translateY, fixed height 808px, or hardcoded padding unless they exist in onboarding-source-bundle.md

Non-negotiable rule

You must not change any code contained in onboarding-source-bundle.md.

This includes:

* no refactors
* no formatting changes
* no renames
* no styling changes
* no motion timing changes
* no removing or “neutralising” transforms
* no altering padding
* no changing component structure
* no changing copy/text
* no changes to exports or props

Your job is only to copy and wire, not to improve.

Scope

In scope

1. Create the 12 files exactly as they appear in onboarding-source-bundle.md, verbatim, at these exact paths:

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

2. Copy every /src/imports dependency listed in onboarding-source-bundle.md into:

/src/imports/

Use the exact filenames and paths listed. No substitutions. No renames. No stubs.

3. Confirm the external dependency motion/react is present in package.json.
   If it is already present, do nothing.
   If it is missing, add it. Do not swap it for a different library.

4. Mount the onboarding content into the existing tutorial overlay shell by rendering:

<TutorialOnboardingContent onComplete={...} />

inside the tutorial overlay body content slot.

When onComplete fires, close the tutorial overlay via the existing close mechanism already implemented for that overlay.

Out of scope (do not do any of these)

* Do not modify TutorialOverlay shell layout, padding, rounded corners, animation, backdrop, z-index, or positioning.
* Do not remove or adjust any padding in the shell.
* Do not wrap TutorialOnboardingContent in any new containers that add padding, height, transforms, or animation.
* Do not “fix” or “clean up” anything you consider redundant.
* Do not create additional behaviour such as persistence, analytics, feature flags, or auto-progress.

Hard constraint: no analysis phase, no blocker inventing

You are not permitted to block on “double animation”, “double padding”, “fixed height”, or any other behaviour unless you have verified it exists inside onboarding-source-bundle.md.

If onboarding-source-bundle.md does not contain those behaviours, you must not mention them.

Only permitted blocker

The only permitted blocker is missing files that are explicitly listed in onboarding-source-bundle.md (for example missing /src/imports files).

If any dependency file is missing, respond with a clean list of missing file paths only, and stop. Do not create stubs.

Delivery format

After implementation, respond with:

1. Files added/updated (paths only)
2. The single file where TutorialOnboardingContent was mounted, with a minimal snippet showing the insertion
3. Confirmation that onboarding-source-bundle.md was copied verbatim with zero edits

No additional commentary. No suggestions. No alternatives.
