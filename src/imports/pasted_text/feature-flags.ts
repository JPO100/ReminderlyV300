Before doing anything else, re-read the entire /docs/claude.md file. Do not rely on memory. Read the full file.
After reading it, read this instruction in full.
Do not start work. First confirm your understanding and list the files you will modify.
Only proceed once I explicitly instruct you to.

Change request Introduce a single Lists feature flag and wire it to the existing Dev Tools toggle.
This change prepares the codebase for the upcoming Lists feature. No Lists UI or functionality is being built in this change.
Reminderly is an app, not a rocket ship to Mars. Keep the implementation simple and minimal.

Objective
Introduce one canonical feature flag named listsEnabled.
This flag must be controlled by the existing Dev Tools “Lists” toggle and must be readable from a single central location in the application.
This change must not alter any current reminder behaviour or UI.
When listsEnabled is false, the app must behave exactly as it does today.

Scope
Only the following actions are allowed.
1. Introduce a canonical Lists feature flag
2. Wire the existing Dev Tools Lists toggle to that flag
3. Expose the flag through one central helper so the rest of the app can read it
4. Ensure the flag value persists using the same mechanism used by existing Dev Tools toggles
No UI changes are allowed in this change.

Files to create
Create the following file:
/src/app/config/features.ts
Contents:
export type FeatureFlags = {
  listsEnabled: boolean;
};

export const defaultFeatureFlags: FeatureFlags = {
  listsEnabled: false,
};

Files to create
Create the following helper:
/src/app/utils/featureFlags.ts
Contents:
import { defaultFeatureFlags } from "@/app/config/features";

export function isListsEnabled(): boolean {
  const stored = localStorage.getItem("dev.listsEnabled");

  if (stored === null) {
    return defaultFeatureFlags.listsEnabled;
  }

  return stored === "true";
}
This helper becomes the single read point for the Lists feature flag.
No other file should read the Dev Tools toggle directly.

Files to modify
Modify the Dev Tools toggle that already exists for Lists.
File:
/src/app/dev/DevToolsOverlay.tsx
Update the Lists toggle so that it writes to:
localStorage key: dev.listsEnabled
When toggle ON
localStorage.setItem("dev.listsEnabled", "true")
When toggle OFF
localStorage.setItem("dev.listsEnabled", "false")
Do not change the visual appearance or layout of Dev Tools.

Files NOT allowed to change
Do not modify any other files.
Specifically do not modify:
* reminder components
* reminder parsing
* reminder scheduling
* reminder storage
* reminder UI
* overlay components
* list UI
* navigation
* home screen layout
* analytics
* tests
* documentation
No other files may be edited.

Required behaviour
After this change:
Dev Tools Lists toggle OFF
localStorage["dev.listsEnabled"] === "false"
Dev Tools Lists toggle ON
localStorage["dev.listsEnabled"] === "true"
The helper
isListsEnabled()
must return the correct value.

Verification
Confirm the following manually:
1. Toggle Lists ON in Dev Tools
2. Confirm localStorage contains
dev.listsEnabled = "true"
1. Toggle Lists OFF
2. Confirm localStorage contains
dev.listsEnabled = "false"
1. Confirm the application UI behaves exactly as before.
No visible UI changes should occur.

Non-scope
The following must not be added or changed:
* Lists UI
* Lists tabs
* Lists models
* Lists persistence
* Lists navigation
* Lists screens
* Lists analytics
* A/B testing infrastructure
* Reminder logic
* Reminder UI
* Reminder storage
* Reminder tests
* Dev Tools layout

Result
After this change the codebase will have:
* one canonical Lists feature flag
* one central helper isListsEnabled()
* Dev Tools controlling that flag
* no UI or behavioural change
This prepares the codebase so future Lists work can be safely built behind the flag.

Confirm the following before proceeding:
1. Your understanding of the scope
2. The files you will modify
3. That no other files will be touched
Do not start work until I approve.
