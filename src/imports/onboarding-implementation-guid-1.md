Implement onboarding now
All /src/imports dependencies are confirmed present as real .ts / .tsx files. There are no blockers.
Begin implementation now. Do not perform additional verification passes.
Single source of truth
The onboarding component source is onboarding-source-bundle.md.
The code in that bundle must be copied exactly.
Do not modify:
* imports
* exports
* component names
* props
* styling
* layout
* animation
* text
* formatting

Step 1 — create the onboarding component files
Create the following files using the code from onboarding-source-bundle.md.
Paths must match exactly.
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
Rules
* Copy code verbatim from the bundle.
* Do not rename files.
* Do not change imports.
* Do not reformat code.
* Do not move files to other directories.
* Do not introduce new components.

Step 2 — mount the onboarding content
Open:
/src/app/components/TutorialOverlay.tsx
Locate the empty body container on line 8.
Insert exactly:
<TutorialOnboardingContent onComplete={onClose} />
Rules
* Insert the component directly inside the existing container.
* Do not wrap it in additional <div> elements.
* Do not introduce new layout containers.
* Do not add padding or styling.
* Do not add transforms or animation.

Step 3 — overlay shell must remain unchanged
Do not modify:
* overlay positioning
* overlay slide-up animation
* overlay backdrop
* overlay padding
* overlay border radius
* overlay responsive behaviour
* overlay motion settings
Only the single mount line may be added.

Step 4 — completion behaviour
The onboarding wrapper already handles navigation and completion.
When the final step triggers completion, onComplete() must call the existing onClose handler.
Do not add new close logic.

Step 5 — verification
Confirm the following:
1. All 12 onboarding component files exist in /src/app/components/.
2. TutorialOverlay.tsx contains exactly one instance of:
<TutorialOnboardingContent onComplete={onClose} />
1. No other files were modified.

Response format
Follow /Claude.md format exactly.
Include:
* scope
* non-scope
* files changed (paths only)
* changes made (brief)
* verification
* diff summary
Do not provide design suggestions or refactors.

