Claude, implement Ticket 6: move non-runtime markdown notes out of src/imports. This must be a pure docs hygiene change with zero behavioural impact.

Scope

* Move markdown note/spec/prompt files out of src/imports into docs/notes.
* File moves only.

Non-scope (non-negotiable)

* Do not change any .tsx or .ts files anywhere.
* Do not change any code imports.
* Do not change any file contents.
* Do not delete anything in this ticket.
* Do not change dependencies, config, or scripts.
* Zero behavioural changes.

Step 1: Identify exactly which files to move (investigation only)

1. In src/imports, list all .md files.
2. For each .md file, prove it is not imported by runtime code:

* Search for the exact filename (for example "ui-reference-check.md") across the repo excluding src/imports itself.
* If any match indicates a real import or runtime reference, stop and report it (do not move anything).

Step 1 definition of done

* You have a final list of .md files in src/imports that have zero repo-wide references outside src/imports.

Step 2: Perform the move (file operations only)

1. Create docs/notes/ if it does not already exist.
2. Move every .md file from src/imports to docs/notes/ preserving filenames exactly.

* Do not edit content.
* Do not rename files.
* Do not move any non-.md files.

Verification (required)

* Confirm src/imports now contains zero .md files.
* Confirm docs/notes contains the moved files.
* Confirm no other files changed (only moves and the new folder if required).

Output requirements

* List moved files (from → to).
* Provide the "0 matches outside src/imports" evidence per file (or a statement that all searched filenames had 0 matches).
* Diff summary.

Stop

* Stop after the moves. No follow-on cleanups.
