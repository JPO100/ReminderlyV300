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
- builds
- npm or vitest commands
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

## Required sign-off format

All implementation sign-off output must follow this template exactly:

```bash
cd "/Users/john/Personal/Reminderly/Reminderly app build v2/FINAL builds/ReminderlyV300"
git add <relevant files>
git commit -m "<commit message>"
```

Current short ref: <short-ref>

```bash
npm run build
npx cap sync ios
```

Rules:

- This placeholder layout and ordering is the canonical project sign-off template.
- `Current short ref:` must remain on its own line between the two terminal blocks.
- When a real sign-off is produced, `<short-ref>` must be replaced with the real current `HEAD` short hash.
- The visual structure should not drift from this template.

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

Every implementation must end with a standardised build and commit sign-off. This is mandatory.

1. Always include command block

At the end of every completed implementation, output the exact command block below, with relevant files and message filled in:

```bash
cd "/Users/john/Personal/Reminderly/Reminderly app build v2/FINAL builds/ReminderlyV300"

git add <relevant files>
git commit -m "<commit message>"
```

Followed by:

```bash
Current short ref: <short-ref>

npm run build
npx cap sync ios
```

2. Commit scope rules

* Only include files that were actually changed
* Do not include generated files (e.g. dist, ios build output) unless explicitly required
* Do not use `git add .`

3. Commit message rules

* Must be concise and specific
* Must describe exactly what changed
* No generic messages like “fix stuff” or “update code”

4. Short ref requirement

* Always include a short reference label after the commit block
* Format: a short, human-readable identifier for the change
* Example: `refresh-on-resume` or `fix-reminder-status-stale`

5. Build requirement

* Always include:

  * `npm run build`
  * `npx cap sync ios`
* Do not skip build steps
* Do not replace with alternatives

6. No omission

* This sign-off must be present on every implementation
* Do not omit even for small changes

7. Failure handling

* If build fails:

  * still include the command block
  * explicitly state the failure after it
* Do not skip sign-off due to errors

8. No additional commentary inside block

* Do not add explanations inside the command blocks
* Keep them clean and copy-paste ready

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

* Every implementation sign-off must include a `git status` summary.
* Report: files modified, files untracked, files staged.
* State whether a commit is recommended (yes/no) with a one-line reason.
* State whether the branch is ahead of origin and by how many commits.
* State whether `git push` is still required.

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
