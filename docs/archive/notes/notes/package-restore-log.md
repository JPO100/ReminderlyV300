Claude, stop. We are resetting to regain control.

Context (non-negotiable constraint)

* This is a Figma Make environment.
* src/app/components/ui is platform-managed, protected from deletion, and contains imports of @radix-ui/*.
* We cannot run npm run build or npm run dev here.

Rule of engagement (from now on)

* Do not remove any dependency from package.json unless both are true:

  1. You can prove there are zero references repo-wide, including inside src/app/components/ui, and
  2. The dependency is not required by any platform-managed/protected file.
* If you cannot satisfy both, do not remove it.

Immediate corrective action (required)

1. Revert the Radix dependency removal now

* Restore all @radix-ui/* dependencies exactly as they were before (same 26 entries, same versions).
* Do not touch any other dependencies as part of this revert.

2. Validate the current MUI removal is safe under the rule

* Perform a repo-wide search including src/app/components/ui for:

  * "@mui/"
  * "from '@mui"
  * "from \"@mui"
* If any match exists anywhere (including inside src/app/components/ui), immediately re-add the removed MUI dependencies exactly as they were.
* If there are zero matches repo-wide, keep MUI removed.

Non-scope

* No app code changes.
* No docs changes.
* No refactors or formatting changes.
* No other dependency changes beyond the corrective actions above.

Output requirements

* Confirm package.json is the only file changed.
* List:

  * whether Radix deps are restored (26 entries) and confirm versions match prior state
  * whether MUI deps remain removed or were restored, based on the repo-wide evidence
* Provide search evidence:

  * either "0 matches repo-wide for @mui" or list the exact file paths and line numbers for matches
* Diff summary.
