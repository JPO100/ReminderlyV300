Instruction for Claude

You must perform a documentation cleanup task.
This task consists only of moving specific files and one directory into an archive location.

You must not modify documentation content.
You must not create new documentation files.
You must not rename files.
You must not restructure the documentation system.

Perform only the actions explicitly listed below.

---

Step 1 - Ensure archive directories exist

Ensure the following directories exist. If they already exist, do not recreate them.

/docs/archive/original-docs
/docs/archive/notes

Do not create any other directories.

---

Step 2 - Move legacy documentation files

Move the following files from `/docs` into `/docs/archive/original-docs`.

/docs/README.md
/docs/build-guide.md
/docs/calendar-module.md
/docs/colour-styles.md
/docs/component-hierarchy.md
/docs/content-overlay-responsive.md
/docs/dev-tools.md
/docs/done-delete-system.md
/docs/done-reminders.md
/docs/editing-reminders.md
/docs/filter-system.md
/docs/new-reminder-overlay.md
/docs/nlc.md
/docs/reminder-logic.md
/docs/responsive-design.md
/docs/settings.md
/docs/sizing-spacing.md

Each file must be moved.
Do not copy the files.
After the move, none of these files may remain in `/docs`.

---

Step 3 - Move the notes directory

Move the entire directory:

/docs/notes

to:

/docs/archive/notes/notes

All files that were inside `/docs/notes` must end up inside `/docs/archive/notes/notes`.

After the move is complete, the directory `/docs/notes` must not exist.

Do not modify any files inside the notes directory.

---

Step 4 - Verify the final structure

After completing the moves, the root `/docs` directory must contain only the following:

/docs
00-overview
01-core-surfaces
02-reminder-behaviour
03-natural-language-and-scheduling
04-settings-onboarding-and-premium
05-design-and-layout
06-quality-and-dev
archive
MIGRATION-MAP.md
RESTRUCTURE-SUMMARY.md

No other files or directories may remain in `/docs`.

---

Step 5 - Output required

After completing the moves, output only the following information.

1. A list of the files now located in `/docs/archive/original-docs`.
2. Confirmation that `/docs/notes` no longer exists.
3. Confirmation that the root `/docs` directory now contains only the canonical folders and files listed in Step 4.

Do not provide commentary, explanation, or additional actions.
