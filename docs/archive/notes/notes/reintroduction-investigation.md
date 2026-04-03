Claude, do steps 1 and 2 now. Do not start Ticket 2 until I explicitly say so.

Step 1: Prove the reintroduction mechanism (investigation only)
Scope

Investigation only. Do not change any files.

Goal

Produce evidence for why src/app/components/ui keeps getting reintroduced.

Do this

Doc and script audit

Scan these files for any mention of shadcn, radix, components/ui, ui suite, "add component", init, generate, scaffold, codegen, or imports:

README.md

docs/README.md (and any setup/build/import docs it links to)

Claude.md

guidelines/Guidelines.md

package.json (scripts section)

For every relevant mention, output:

exact file path

exact line number(s)

the exact line(s) of text

Repo-wide search

Search the entire repo for these literal strings and report matches (or explicitly report zero matches):

"src/app/components/ui"

"components/ui"

"@/components/ui"

"@/app/components/ui"

"shadcn"

"radix"

"codegen"

"scaffold"

"generate"

For each match, output:

exact file path

exact line number(s)

the exact matching line(s)

Git history (only if available)

If git history is available, identify commits that add or re-add src/app/components/ui.

For each such commit, output:

commit hash

commit date

commit message

whether it is a merge commit

If git history is not available, state: "Git history not available in this environment."

Step 1 definition of done

Conclude with exactly one of these outcomes:

"Proven cause: [one sentence]. Evidence: [file:line or commit]."

"Cause not proven from repo contents. Evidence inspected: [list]. Most likely causes (ranked): [list]."

Step 2: Add a minimal guardrail (smallest possible change set)
Scope

Do not delete or move src/app/components/ui in this step.

Do not add any dependencies.

Do not add CI, coverage, linting, or other tooling.

Make exactly these changes
A) Documentation guardrail (one place only)

Add this exact sentence to docs/README.md (single source of truth, no duplication):

"Do not add a shared ui component suite under src/app/components/ui. UI primitives must be added locally when needed."

B) Script guardrail (one script, one npm script)

Create scripts/guard-no-ui-suite.mjs

Behaviour:

If src/app/components/ui exists, print a clear error and exit with code 1.

Otherwise exit with code 0.

Use only node built-ins (fs, path). No dependencies.

Update package.json scripts

Add exactly one script:

"guard:repo": "node scripts/guard-no-ui-suite.mjs"

Do not change any other package.json lines.

Verification (required)

Run npm run guard:repo and confirm it fails right now (because the folder currently exists).

State explicitly: "This will pass once Ticket 2 deletes the folder."

Output requirements

Step 1: evidence list + conclusion.

Step 2: files changed list + diff summary + verification results.

Stop

After step 2, stop. Do not proceed to deleting the ui suite until I instruct you to start Ticket 2.
