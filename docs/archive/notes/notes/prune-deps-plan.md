Claude, execute Ticket 3: prune unused dependencies incrementally (prove first, then remove). Keep this strictly minimal.

Scope

* package.json dependency pruning only.
* No app code changes.
* No docs changes.
* No refactors or formatting changes.

Non-scope

* Do not touch src/app/components/ui (platform-managed).
* Do not remove anything unless you prove it is unused by imports outside src/app/components/ui.

Step 1: Prove usage (required before any removal)

1. Search for MUI usage outside the ui suite

* Repo-wide search (excluding src/app/components/ui):

  * "@mui/"
  * "from '@mui"
  * "from \"@mui"
* Output:

  * If matches: list file path + line numbers + exact import lines.
  * If zero: state "0 matches outside src/app/components/ui".

2. Search for Radix usage outside the ui suite

* Repo-wide search (excluding src/app/components/ui):

  * "@radix-ui/"
  * "from '@radix-ui"
  * "from \"@radix-ui"
* Output:

  * If matches: list file path + line numbers + exact import lines.
  * If zero: state "0 matches outside src/app/components/ui".

Step 2: Remove dependencies (only those proven unused)
Increment A: Remove unused MUI dependencies

* If step 1 proves 0 MUI matches outside src/app/components/ui:

  * Remove @mui/material and @mui/icons-material from package.json.
  * Do not remove anything else in this increment.

Verification A

* Run npm run build.
* Report success or failure with exact error output if it fails.

Increment B: Remove unused Radix dependencies

* Only if step 1 proves 0 Radix matches outside src/app/components/ui and Increment A build passed:

  * Remove all @radix-ui/* entries from package.json.
  * Do not remove any non-@radix dependency in this increment.

Verification B

* Run npm run build.
* Report success or failure with exact error output if it fails.

Output requirements

* List exactly which dependencies were removed in each increment.
* Confirm no other package.json lines changed.
* Provide diff summary.
* Include the step 1 search evidence (or explicit 0 matches statements).
* Stop after Increment B (or earlier if blocked by evidence or build failure).
