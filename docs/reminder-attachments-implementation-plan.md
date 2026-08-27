# Reminder Attachments – Implementation Plan

## Architecture overview

Reminder Attachments uses a two-layer storage approach:

* **Reminder metadata** (including attachment reference) → existing localStorage persistence, alongside the existing reminder data.
* **Attachment binary files** → native app filesystem sandbox via `@capacitor/filesystem`.

One attachment per reminder. No cloud storage. No attachment synchronisation.

---

## 1. Repository and branch health check

* Review current local and remote branches.
* Confirm there are no uncommitted or untracked changes that need retaining.
* Confirm all completed work has been committed and pushed to the Reminderly GitHub repo.
* Bring the main development branch fully up to date.
* Run/build the current app and existing test suite to establish a known-good baseline.
* Only proceed once the existing codebase is confirmed clean and stable.

## 2. Create the feature branch

* Create a dedicated `reminder-attachments` feature branch from the confirmed current baseline.
* Push the new branch to GitHub.
* All Reminder Attachments development takes place within this branch.

## 3. Add the feature gate

* Add **Reminder attachments** to Dev Tools > Home.
* Position it directly below **Onboarding**.
* Match the UI and behaviour of the existing feature toggles.
* No `>` navigation or additional settings screen.
* Feature OFF by default.
* Verify that OFF produces zero visible change elsewhere in Reminderly.
* Switching OFF hides attachment functionality but does not delete existing attachments.
* Switching back ON makes previously attached files available again.
* Add self-check coverage for the feature-gate behaviour.

## 4. Install required Capacitor plugins

Install `@capacitor/filesystem` for native file storage.

Install `@capacitor/camera` for "Take a photo" and "Choose a photo" functionality.

For "Choose a file", evaluate two approaches before implementing:

* Standard web `<input type="file">` — no additional dependency, but may have limitations in the iOS WebView context.
* `@capawesome/capacitor-file-picker` — dedicated native file picker, but adds a dependency.

Recommend the simplest reliable approach for Reminderly/iOS. Add a plugin only if the standard web file picker has a genuine limitation that affects the user experience.

Add the required iOS permissions to Info.plist:

* `NSCameraUsageDescription`: "Reminderly needs camera access so you can take a photo to attach to your reminder."
* `NSPhotoLibraryUsageDescription`: "Reminderly needs photo access so you can choose an image to attach to your reminder."

Verify that the new plugins build and initialise without affecting existing app behaviour.

## 5. Add the attachment data model and storage foundation

Extend the reminder data model to optionally reference one attachment.

The attachment metadata should contain the **minimum fields actually required** to locate, display and validate the attachment. Do not add speculative fields.

Storage rules:

* Attachment metadata lives in the existing localStorage reminder JSON, alongside the other reminder fields.
* Attachment binary files are written to Reminderly's native app filesystem sandbox via `@capacitor/filesystem`.
* Reminderly retains its own copy of each attachment. The attachment does not depend on the original file remaining in Photos or Files.
* Maximum attachment size: **25 MB**.
* Existing reminders must continue to load and operate unchanged. Use the existing migration patterns in `loadReminders()`.

Supported file types (V1):

**Images:** JPG/JPEG, PNG, GIF, HEIC/HEIF, WebP

**Documents:** PDF, TXT, RTF, DOC/DOCX, XLS/XLSX, CSV, PPT/PPTX

Validation uses MIME type information with sensible extension handling rather than relying purely on the filename extension.

Deletion rules:

* Soft-deleting a reminder retains the attachment file. Restoring the reminder also restores the attachment.
* Permanently deleting/purging a reminder deletes the associated attachment file from the filesystem.
* No separate garbage-collection architecture.

Add self-check coverage for the data model, validation logic, and supported-type checking.

Test this foundation before introducing the attachment UI.

## 6. Add the paperclip and attachment menu

**Wait for the supplied UI specification and visual assets before implementing this step.**

The detailed UI visuals, dimensions, positioning and final icons will be supplied separately. Do not make assumptions about the final layout, particularly given the existing NLC textarea architecture.

Once the UI specification is available:

* Add the supplied paperclip icon to the bottom-right of the reminder panel text area.
* Only display it when Reminder Attachments is enabled via the feature gate.
* Tapping it opens the standard Reminderly centred overlay.

**Title:** Add an attachment

**Options:**

* Choose a photo
* Take a photo
* Choose a file

Follow the supplied UI specification and assets exactly.

## 7. Connect the device pickers

* **Choose a photo** → open the device photo library via `@capacitor/camera`.
* **Take a photo** → open the device camera via `@capacitor/camera`.
* **Choose a file** → open the device file picker (approach determined in step 4).
* Validate the selected attachment (file type, MIME type, size) before writing it to storage.
* Copy successful attachments into Reminderly's native filesystem sandbox.
* Cancelling a picker or camera simply returns the user to the reminder with no message.
* An attachment failure must never affect the reminder itself.
* Add self-check coverage for the testable validation and attachment-handling logic. Physical device interactions (camera, pickers) do not need to be artificially automated.

## 8. Add the attachment thumbnail

**Wait for the supplied UI specification before implementing thumbnail layout.**

Once the UI specification is available:

* Once successfully attached, replace the paperclip with a larger attachment thumbnail.
* Generate an actual preview wherever possible.
* If a preview cannot be generated:
  * use the supplied generic **image** icon for images;
  * use the supplied generic **file** icon for everything else.
* Only one attachment can exist against a reminder.
* There is no replace action. The existing attachment must first be deleted.
* Add self-check coverage where practical.

## 9. Add attachment viewing and deletion

### Viewing

* Tapping the thumbnail opens the attachment for viewing.
* **Images** — display directly within a Reminderly centred overlay.
* **PDF** — display in-app using existing WebView/browser capabilities where this can be achieved simply and reliably.
* **Other supported documents** — hand off to the appropriate native OS open/share mechanism.
* Do not build custom viewers for Word, Excel, PowerPoint etc.
* If an existing Capacitor or native capability provides a simpler/better solution, flag it before introducing an additional dependency.

### Viewing from ReminderInfoOverlay

* Display the attachment thumbnail/representation in the read-only ReminderInfoOverlay.
* Tapping it opens/views the attachment.
* The X/delete control is **not** shown in the read-only overlay.
* Adding/removing attachments remains part of editing the reminder.

### Deletion

* Add the supplied X control to the top-right of the attachment thumbnail (edit view only).
* Tapping X opens the standard centred delete overlay.

**Title:** Delete attachment

**Button:** Delete

* Delete removes the attachment metadata from the reminder.
* Delete removes the corresponding file from the native filesystem.
* Close the overlay.
* Restore the default paperclip, allowing another attachment to be added.
* Permanently deleting the reminder itself also cleans up its attachment file.
* Soft-deleting the reminder retains the attachment file for potential restore.
* Add self-check coverage for deletion, cleanup and attachment state logic.

## 10. Add error handling

Keep error handling small, human and consistent with Reminderly.

| Situation          | Title             | Message                                 |
| ------------------ | ----------------- | --------------------------------------- |
| File too large     | **Too big!**      | Choose a file under 25 MB.              |
| Unsupported type   | **Not this one**  | Try a different file.                   |
| Can't read/copy    | **Oops!**         | Give it another go.                     |
| Not enough storage | **Low on space**  | Free up some space and try again.       |
| Permission denied  | **Access needed** | Allow access in Settings and try again. |

* Use the existing Reminderly overlay/alert conventions.
* Do not introduce a new error-handling framework purely for attachments.
* Add self-check coverage for the validation logic.

## 11. Review automated test coverage and fill gaps

Tests should be added alongside development throughout steps 3–10 rather than being left until the feature is finished.

At this stage:

* Review the overall self-check suite for Reminder Attachments.
* Ensure the important new logic and behaviours have appropriate coverage.
* Cover feature gating, attachment data model, validation, supported types, size limits, deletion logic and cleanup.
* Add regression checks where existing Reminderly behaviour has been touched by the implementation.
* Do not add tests for behaviour already provided and guaranteed by the operating system.
* Do not complicate the self-check architecture to test filesystem operations, native pickers or preview rendering.
* Run the complete existing and new self-check suite.
* Resolve all failures before proceeding.

## 12. Add Reminder Attachments to Self Check

* Add a dedicated **Reminder Attachments** section to the existing Self Check.
* Follow the existing Self Check structure, behaviour and UI exactly.
* Cover what the existing self-check architecture can genuinely validate:
  * Attachment data/model validation.
  * Supported file-type validation.
  * 25 MB size validation.
  * Feature-gate logic.
  * Other appropriate pure/in-memory attachment logic.
* Do not attempt to automate physical device interactions or filesystem operations within Self Check.
* Report pass/fail using the existing Self Check conventions.
* Reminder Attachments is not considered complete until its Self Check coverage is implemented and passing.

## 13. Regression pass

Test the complete attachment journey with the feature both ON and OFF.

Cover:

* New reminder.
* Existing reminder created before Reminder Attachments.
* Editing an existing reminder.
* Add photo from library.
* Add photo from camera (physical device only).
* Add file.
* Attachment preview/viewing by type.
* Attachment deletion.
* Reminder deletion with attachment (soft-delete retains file, permanent delete removes file).
* Reminder restore with attachment.
* Save and reopen reminder.
* Close and relaunch app.
* Feature ON → attach file → OFF → ON and confirm attachment returns.
* Maximum file size / error handling.
* Permission handling.
* Picker cancellation.
* Attachment visible in ReminderInfoOverlay.

Then specifically verify that existing Reminderly functionality remains unaffected, including:

* Reminder creation.
* Reminder editing.
* Reminder persistence.
* Notifications.
* Recurring reminders.
* Reminder completion/deletion.
* Natural-language reminder handling.
* Existing Dev Tools functionality.
* Existing Self Check functionality.

With the feature OFF, Reminderly should behave functionally and visually exactly as it did before Reminder Attachments was introduced.

## 14. Final clean-up, commit and push

* Remove any temporary/debug code.
* Check for orphaned attachment files or unnecessary storage.
* Run the complete self-check suite and confirm everything passes.
* Run the complete Self Check and confirm everything passes.
* Complete the final regression pass.
* Build and run the app from a clean state.
* Review the complete branch diff for unintended changes.
* Commit the completed feature.
* Push the final feature branch to GitHub.
* Only after everything is confirmed stable should the feature be considered ready to merge into the main development branch.

## Implementation principle

Keep this simple.

**Small change → test → commit → next change.**

Tests should be added as we build, not bolted on at the end.

Reminder Attachments is an additive feature. It should remain isolated from the core mechanisms that already make Reminderly stable, and with the feature switched OFF the app should continue to behave exactly as it does today.

Build an app, not a rocket ship.
