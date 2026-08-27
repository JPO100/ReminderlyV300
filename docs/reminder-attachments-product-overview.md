# Reminder Attachments – Product Feature Overview

## Overview

Reminder Attachments introduces the ability to attach a single file or image to any Reminderly reminder.

The feature is deliberately simple and lightweight. Attachments are stored locally on the user's device, with no new cloud storage or synchronisation capability being introduced.

The feature will work with both new and existing reminders.

## User experience

When Reminder Attachments is enabled, a **paperclip icon** appears in the bottom-right of the reminder panel text area.

Tapping the paperclip opens the standard Reminderly centred overlay:

**Title:** Add an attachment

**Options:**

* Choose a photo
* Take a photo
* Choose a file

### Choose a photo

Opens the device photo library and allows the user to select an existing image.

### Take a photo

Launches the device camera and allows the user to capture a new image.

### Choose a file

Opens the device file picker and allows the user to select a supported document or file.

Only **one attachment per reminder** is supported.

## Attached state

Once successfully attached, the paperclip is replaced by a larger thumbnail within the reminder text area.

Where possible, Reminderly displays an actual preview of the attachment.

Where a preview cannot be generated, one of two supplied generic assets is used:

* **Image icon** for image attachments.
* **File icon** for other attachments.

## Viewing an attachment

Tapping the attachment thumbnail opens the attachment for viewing.

Viewing behaviour by type:

* **Images** — display directly within a Reminderly centred overlay.
* **PDF** — display in-app using existing WebView/browser capabilities where this can be achieved simply and reliably.
* **Other supported documents** — hand off to the appropriate native OS open/share mechanism.

There are no custom document viewers for Word, Excel, PowerPoint etc.

Attachments are also accessible from the read-only ReminderInfoOverlay:

* The attachment thumbnail/representation is displayed.
* Tapping it opens/views the attachment.
* The X/delete control is **not** shown in the read-only overlay.
* Adding/removing attachments remains part of editing the reminder.

## Removing an attachment

An **X** appears in the top-right of the attachment thumbnail (in the edit view only).

Tapping it opens a standard centred overlay:

**Title:** Delete attachment

**Button:** Delete

Selecting Delete:

* Removes the attachment from the reminder.
* Deletes the locally stored attachment file.
* Restores the paperclip so another attachment can be added.

There is no separate replace function. An existing attachment must first be deleted.

## Deletion and cleanup

* Soft-deleting a reminder retains the attachment. If the reminder is restored, the attachment is also restored.
* Only permanently deleting/purging a reminder deletes its associated local attachment file.

## Storage & file handling

Attachment binary files are stored locally within Reminderly's native app filesystem sandbox using `@capacitor/filesystem`.

Attachment metadata (file reference, not the binary) is stored alongside the reminder data in existing localStorage persistence.

There is:

* No Reminderly cloud attachment storage.
* No attachment synchronisation between devices.
* No multi-device persistence requirement for this version.

Reminderly retains its own local copy so the attachment does not depend on the original file remaining in Photos or Files.

The maximum attachment size is **25 MB**.

### Supported file types (V1)

**Images:** JPG/JPEG, PNG, GIF, HEIC/HEIF, WebP

**Documents:** PDF, TXT, RTF, DOC/DOCX, XLS/XLSX, CSV, PPT/PPTX

Video, audio, archives and executable files are excluded.

Validation uses MIME type information with sensible extension handling rather than relying purely on the filename extension.

## Error handling

Errors remain short, human and consistent with Reminderly's tone.

| Situation          | Title             | Message                                 |
| ------------------ | ----------------- | --------------------------------------- |
| File too large     | **Too big!**      | Choose a file under 25 MB.              |
| Unsupported type   | **Not this one**  | Try a different file.                   |
| Can't read/copy    | **Oops!**         | Give it another go.                     |
| Not enough storage | **Low on space**  | Free up some space and try again.       |
| Permission denied  | **Access needed** | Allow access in Settings and try again. |

Cancelling a photo, camera or file selection simply returns the user to their reminder without displaying an error.

An attachment failure must never affect the reminder itself.

## Feature gating

Reminder Attachments will initially be feature-gated.

A **Reminder attachments** toggle will be added to:

**Dev Tools > Reminders > Features**

It will sit directly below **Repeat reminders** and use the same `ToggleRow` with info (`i`) treatment as the other feature toggles on the Reminders sub-page.

The toggle is disabled when Enable reminders is OFF.

When the feature is OFF:

* All attachment UI is hidden.
* Reminderly otherwise behaves exactly as it does today.
* Existing attachments are retained locally and are not deleted.

If subsequently switched back ON, previously attached files become available again.

## iOS permissions

The following Info.plist permissions are required:

* **Camera:** "Reminderly needs camera access so you can take a photo to attach to your reminder."
* **Photos:** "Reminderly needs photo access so you can choose an image to attach to your reminder."

## UI specification

Detailed UI visuals, dimensions, positioning and final icons will be supplied separately.

These designs should be treated as authoritative and followed exactly during implementation.

UI implementation should not begin until the visual specification is available, particularly given the existing NLC textarea architecture.

## Product principles

Reminder Attachments should remain a small, additive feature.

The priorities are:

* **Simple** – one attachment, straightforward add/view/delete behaviour.
* **Local** – no unnecessary cloud infrastructure.
* **Native** – use device capabilities for picking, capturing and previewing files wherever appropriate.
* **Safe** – attachment failures must not affect reminder functionality.
* **Reversible** – feature gating hides the capability without destroying attachment data.
* **No regression** – existing Reminderly behaviour must remain unchanged when the feature is disabled.

The objective is to add a useful capability without introducing unnecessary complexity into an already stable application.
