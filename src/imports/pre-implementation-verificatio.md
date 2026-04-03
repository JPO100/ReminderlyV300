Pre-implementation verification instruction
Do not begin implementation.
This step exists only to confirm that all required files and dependencies are present before the onboarding implementation begins.
You must not create, modify, or delete any files during this step.
You must only confirm that the required files already exist.
If anything is missing, list the missing file paths only.
No other analysis is required.
Single source of truth
The onboarding implementation will use only:
* onboarding-source-bundle.md
* the /src/imports dependency files
* the existing overlay shell in /src/app/components/TutorialOverlay.tsx
Ignore any earlier snippets or assumptions.
Verification checks
Check only the following items.
1. Import dependency files
Confirm that the following files exist as real .tsx files in:
/src/imports/
ReminderList-1189-377.tsx ReminderList-1173-5393.tsx ReminderList-1192-126.tsx ReminderList-1192-272.tsx ReminderList-1196-227.tsx ReminderList-1196-287.tsx ReminderList-1196-373.tsx ReminderList-1196-456.tsx ReminderList-1196-515.tsx ReminderList-1198-119.tsx ReminderList-1198-346.tsx ReminderList-1199-119.tsx Group22.tsx NewReminderPop.tsx OnboardingV2Overlay-1199-682.tsx
These must be actual .tsx files, not .tsx.md wrappers.
1. SVG helper files
Confirm the following files exist as .ts files in:
/src/imports/
svg-go2phgsyt4.ts svg-b2700o3wr8.ts svg-d69hgq55o6.ts svg-k473gxyo2t.ts svg-4op7dnhswu.ts
No action is required if these already exist.
1. Onboarding component bundle
Confirm that onboarding-source-bundle.md is available and contains the 12 onboarding component files that will be created during implementation.
Do not create the files yet.
1. External dependency
Confirm that motion/react exists in package.json.
If it exists, no action is required.
1. Overlay mount target
Confirm that the onboarding component will be mounted in:
/src/app/components/TutorialOverlay.tsx
The expected mount target is:
<TutorialOnboardingContent onComplete={onClose} />
This must be placed inside the existing overlay body container.
Do not create wrapper containers.
Required response format
Respond using exactly this structure.
Section 1 — Import dependencies
List each of the 15 /src/imports .tsx files and confirm that they exist.
Section 2 — SVG helpers
Confirm that the 5 .ts SVG helper files exist.
Section 3 — Bundle availability
Confirm that onboarding-source-bundle.md is available.
Section 4 — Overlay target
Confirm that TutorialOverlay.tsx exists and will be used as the mount target.
Section 5 — Implementation readiness
Provide one final statement:
“All required files and dependencies are present. Implementation can proceed with no blockers.”
Do not begin implementation.
Do not provide suggestions or design changes.
Only confirm readiness or list missing file paths.

