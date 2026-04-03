The documentation restructure is partially complete. The new numbered documentation structure exists, but the migration was not completed and duplicate documentation remains.

Your task is to complete the migration and verification exactly as described below.

This is a documentation migration and verification task only.

You must not introduce new documentation structures, folders, or documents beyond what is explicitly described.

You must not redesign the documentation architecture.

You must not add new documentation topics unless a feature exists in the codebase and is completely undocumented.

Follow the steps below exactly.

Scope

Step 1 - Verify existing canonical documentation

Open every file located in the following directories:

/docs/00-overview
/docs/01-core-surfaces
/docs/02-reminder-behaviour
/docs/03-natural-language-and-scheduling
/docs/04-settings-onboarding-and-premium
/docs/05-design-and-layout
/docs/06-quality-and-dev

For each document:

Verify that the described behaviour matches the current codebase implementation.

If a document contains incorrect behaviour descriptions, correct only the inaccurate text.

Do not restructure the document.

Do not add sections unless a behaviour already implemented in the codebase is missing from the document.

No new documentation files should be created during this step unless an implemented feature has zero documentation anywhere in the repository.

Step 2 - Archive legacy root documentation

The numbered documentation structure is the canonical documentation.

All original documentation files currently located at the root of /docs must be moved to an archive.

Create the following directories if they do not already exist:

/docs/archive/original-docs
/docs/archive/notes

Move the following files from /docs into /docs/archive/original-docs:

README.md
build-guide.md
calendar-module.md
colour-styles.md
component-hierarchy.md
content-overlay-responsive.md
dev-tools.md
done-delete-system.md
done-reminders.md
editing-reminders.md
filter-system.md
new-reminder-overlay.md
nlc.md
reminder-logic.md
responsive-design.md
settings.md
sizing-spacing.md

Do not modify these files. Only move them.

Step 3 - Archive notes

Move all files currently located in:

/docs/notes

into:

/docs/archive/notes

After moving all files, remove the empty /docs/notes directory.

No files in /docs/archive should be edited.

Step 4 - Validate final documentation structure

After migration, the root /docs directory must contain only the following:

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

No legacy documentation files must remain at the root.

Step 5 - Validate migration map

Open /docs/MIGRATION-MAP.md.

Confirm that each archived document maps to the correct canonical document.

If a mapping is incorrect or missing, correct the mapping.

Do not introduce new mappings beyond the files listed above.

Step 6 - Final verification

Confirm all of the following:

No documentation duplication remains.

The numbered documentation structure is the single canonical documentation system.

All legacy documentation is archived.

No documentation files were deleted.

Canonical documents accurately reflect the codebase behaviour.

Output required

Provide the following information only:

A list of files moved to /docs/archive/original-docs

A list of files moved to /docs/archive/notes

Confirmation that no legacy documentation files remain at /docs

A list of canonical documentation files that required behavioural corrections

Do not provide summaries or commentary beyond the requested output.