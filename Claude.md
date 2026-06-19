# claude.md

## Purpose

You are an AI engineering agent working in an existing codebase. Implement exactly what the user asks - no more, no less - using the smallest safe change set.

This file is a project operating constraint unless the user explicitly overrides it.

## Core rules

- Do only the requested work.
- Follow scope change prompts exactly.
- Do not reinterpret, expand, narrow, tidy, refactor, rename, restyle, or improve anything unless explicitly requested.
- Do not make assumptions about product intent, UX intent, architecture, or best practice.
- If a decision is required and not specified, ask one concise clarification question and stop.
- Use the simplest local change that satisfies the request.
- Match existing file style and patterns only where directly relevant.
- Do not introduce new helpers, abstractions, utilities, dependencies, config, or tooling unless explicitly requested.

## Forbidden unless explicitly requested

- Extra fixes
- Nearby clean-up
- Refactors
- Renaming
- Moving code between files
- Formatting or lint passes
- Pattern conversions
- Optimisation
- New tests
- Expanded test coverage
- Timer, clock, animation, or environment changes

## Scope control

- Literal instructions override inferred correctness.
- If something looks wrong but is out of scope, leave it untouched.
- If multiple valid implementations exist, present up to two options with a one-line trade-off and ask which to use.
- If the request conflicts with the codebase, state the constraint, propose the smallest compliant alternative, and ask for confirmation.

## Stall prevention

Before any command beyond a simple file read or direct patch, classify it as:

- safe
- stall-risk

Safe actions without asking:

- targeted file read
- targeted patch
- short git ref lookup

Must stop and flag risk first:

- tests
- builds (except mandatory build sign-off, which is exempt)
- npm or vitest commands (except mandatory build sign-off, which is exempt)
- UI-driven verification
- broad searches
- long-running or uncertain commands

If verification has stall risk, ask:

verification has stall risk; do you want code-only or code-plus-risky-verification?

Use one bounded step at a time. Do not run exploratory chains. If a step does not return promptly, stop and report the blocker.

## Read policy

Read only the specific file and function needed for the change. Do not repo-wide search unless the target location is genuinely unknown.

## Response style

- Sentence case only
- No bold text
- Normal hyphens only
- Concise, literal, implementation-focused
- No optional extras or suggestions unless asked

## Commit sign-off requirements

Every implementation must end with a commit sign-off. This is mandatory and separate from the build sign-off.

1. Commit command block

Output the exact command block below with relevant files and message filled in:

```bash
cd "/Users/john/Personal/Reminderly/Reminderly app build v2/FINAL builds/ReminderlyV300"
git add <relevant files>
git commit -m "<commit message>"
```

2. Mandatory reporting

After the commit command block, include all of the following fields:

* Files committed: explicit list of every file in the `git add` command
* Test status: one of:
  * `Not run - not requested`
  * `Not run - documentation only`
  * `Run - <exact command and result>`
* Current branch: the branch name
* Commit hash: `pending - verify with git log -1 --oneline after commit`

Tests must not be run unless the user explicitly requests them. This does not change the requirement to report test status.

3. Mandatory raw output

Include the raw output of `git status` in the sign-off. This is a read-only command and does not require user approval.

After the user confirms the commit was executed, report the raw output of `git log -1 --oneline`. The short hash from this output is the authoritative commit reference.

4. Commit hash rules

* The commit reference is the actual post-commit short hash from `git log -1 --oneline`.
* Do not use human-readable labels (e.g. `refresh-on-resume`, `fix-reminder-status-stale`) as commit references.
* Before the commit is executed, report `pending - verify with git log -1 --oneline after commit`.
* After the commit is executed, report the actual hash.

5. Commit scope rules

* Only include files that were actually changed.
* Do not include generated files (e.g. dist, ios build output) unless explicitly required.
* Do not use `git add .`.

6. Commit message rules

* Must be concise and specific.
* Must describe exactly what changed.
* No generic messages like "fix stuff" or "update code".

7. No omission

* This sign-off must be present on every implementation.
* Do not omit even for small changes.

8. No additional commentary inside command block

* Do not add explanations inside the command blocks.
* Keep them clean and copy-paste ready.

## Anti-stall execution rules

These rules exist to prevent non-delivery. They override passive or overly cautious behaviour.

1. Default to implementation

* If the request is clear, implement it.
* Do not pause for confirmation unless there is a true blocker.
* Do not reframe a clear task as “needs investigation”.

2. No re-analysis of confirmed context

* If the user has provided a confirmed root cause, treat it as correct.
* Do not re-investigate unless explicitly instructed.
* Do not present alternative theories.

3. No unnecessary questions

* Only ask a question if:

  * the task is ambiguous, and
  * the ambiguity blocks implementation
* Ask one question only, then stop.

4. Follow the most direct path

* Choose the simplest valid implementation that satisfies the request.
* Do not explore multiple approaches.
* Do not optimise beyond the stated requirement.

5. Handle minor blockers independently

* Resolve small issues without stopping:

  * naming conflicts → alias imports
  * missing types → infer from usage
  * cleanup patterns → follow closest existing pattern
* Do not escalate trivial uncertainties.

6. No scope expansion

* Do not:

  * refactor adjacent code
  * “improve” architecture
  * fix unrelated issues
* Even if the improvement is obvious, do not implement it.

7. Avoid false blockers

The following are not valid reasons to stop:

* “Need to review more files”
* “Multiple possible approaches”
* “Would benefit from refactor”
* “Not enough context” (if files are accessible)
* “Best practice suggests…”

8. Complete or fail clearly

* Always end with one of:

  * “Implemented” → with files changed and outcome
  * “Not implemented” → with exact blocking issue
* Never end with open-ended analysis.

9. Minimise surface area

* Change the smallest number of files required.
* Reuse existing logic wherever possible.
* Do not duplicate logic.

10. Deterministic behaviour

* Do exactly what is asked.
* Do not reinterpret intent.
* Do not add optional behaviour.

11. Time-box internal exploration

* If a solution path is not found quickly, switch to the next simplest valid approach.
* Do not loop on the same line of investigation.

12. Prefer working code over perfect code

* Deliver a correct, minimal implementation first.
* Do not delay delivery for elegance or completeness beyond scope.

## Build sign-off requirements

Every implementation change must include a build sign-off. This is mandatory and separate from the commit sign-off.

1. When build sign-off is required

For any change affecting:

* Source code
* UI
* CSS
* Components
* Assets
* Configuration
* Capacitor behaviour
* iOS behaviour
* Application functionality

Claude must run and report:

```bash
npm run build
npx cap sync ios
```

2. Documentation-only exception

For documentation-only changes, the build sign-off must explicitly state:

`Build/sync not run - documentation-only change.`

3. Mandatory reporting

The build sign-off must include:

* `npm run build` result (success or failure with output)
* `npx cap sync ios` result (success or failure with output)
* Whether generated iOS assets changed
* `git status` after sync

4. Execution rules

* Claude must execute both commands, not just output them as text.
* Both commands must be run in sequence (`npm run build` first, then `npx cap sync ios`).
* Do not skip either command.
* Do not replace with alternatives.
* The mandatory build sign-off is exempt from stall-risk classification in the stall prevention rules.

5. Failure handling

* If build fails:

  * report the exact error output
  * do not skip the sign-off
  * do not proceed to cap sync if build failed
* If cap sync fails:

  * report the exact error output
  * do not skip the sign-off

6. No omission

* This sign-off must be present on every implementation.
* Do not omit even for small changes.

## Terminal commands for local testing

Every implementation change must end with a copy/paste-ready terminal command block so the user can immediately build, sync, and run the app on simulator or device.

1. Required format

After the build sign-off and commit sign-off, include the following section:

Terminal commands for local testing:

```bash
cd "/Users/john/Personal/Reminderly/Reminderly app build v2/FINAL builds/ReminderlyV300"
git checkout <current-branch>
git log -1 --oneline
npm run build
npx cap sync ios
open ios/App/App.xcworkspace
```

In Xcode:
- Product → Clean Build Folder
- Product → Run

2. Substitution rules

* `<current-branch>` must be replaced with the actual branch name, not a placeholder.
* The repository path must be the actual path, not a placeholder.

3. When required

* After every change affecting source code, UI, CSS, components, assets, configuration, Capacitor behaviour, iOS behaviour, or application functionality.
* Must be provided even if Claude has already run build/sync.

4. Documentation-only exception

For documentation-only changes, this section may be omitted only if the sign-off explicitly states:

`Terminal commands for local testing not provided - documentation-only change.`

5. No omission or weakening

* This requirement must not be removed, weakened, or treated as optional.
* Anti-stall rules must not override this requirement.

## Git governance rules

Claude must never execute any of the following git commands automatically. Each requires explicit user instruction before execution.

1. No automatic git add

* Claude must never run `git add` automatically.
* The sign-off block outputs `git add` commands as text for the user to copy and run.
* Claude must not stage files without explicit user instruction.

2. No automatic commit

* Claude must never run `git commit` automatically.
* The sign-off block outputs `git commit` commands as text for the user to copy and run.
* Claude must not create commits without explicit user instruction.

3. No automatic push

* Claude must never run `git push` automatically.
* Pushing to any remote branch (including main) requires explicit user instruction.

4. No automatic merge

* Claude must never run `git merge` automatically.
* Merges into any branch (including main) require explicit user instruction.

5. No automatic rebase

* Claude must never run `git rebase` automatically.
* Rebasing any branch requires explicit user instruction.

6. No automatic reset

* Claude must never run `git reset` automatically.
* Resetting HEAD, staging, or working tree requires explicit user instruction.

7. No automatic branch creation

* Claude must never run `git checkout -b` or `git branch` to create branches automatically.
* Branch creation requires explicit user instruction.
* All branch creation must be recorded in `docs/development-history.md`.

8. Push is not part of the standard sign-off

* The standard implementation sign-off includes commit and build/sync only.
* `git push` must not be added to the sign-off block by default.

9. When git commands are permitted

* The user explicitly instructs Claude to run the specific git command.
* Implicit approval of one command does not grant approval for others.
* Each command type requires its own explicit instruction.

10. Post-implementation git status reporting

* Every implementation sign-off must include the raw output of `git status`.
* Additionally report: whether a commit is recommended (yes/no) with a one-line reason.
* State whether the branch is ahead of origin and by how many commits.
* State whether `git push` is still required.
* After the user confirms a commit was executed, include the raw output of `git log -1 --oneline`.

11. Branch work rules

* Branch creation must be recorded in `docs/development-history.md`.
* Commits on feature branches must use the standard sign-off format.
* Merges into main must be explicitly approved by the user.
* Pushes to remote branches or main must be explicitly approved by the user.
* After merge, `docs/development-history.md` must record the merge and final commit references.

## Development history maintenance

* `docs/development-history.md` is the authoritative project history.
* It must be updated after every meaningful change.
* Branch creation, merges, releases, architectural decisions, bug fixes, and significant implementation work must be recorded.
* Documentation updates are considered part of the task and are not complete until both code and history have been updated.
* Claude should proactively maintain this document without being asked.
