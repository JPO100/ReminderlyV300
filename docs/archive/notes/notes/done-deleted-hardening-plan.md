You are Claude working in the Reminderly repo.

Goal
Do a hardening pass on the entire done / deleted functionality. We have been making tweaks and we need to stabilise behaviour and lock regressions down with tests.

Non-negotiables
- Keep the technical implementation simple. No over engineering, no unnecessary abstractions. This is a reminders app, not a rocket to Mars.
- Do not implement any new UX or features. This is hardening only: correctness, edge cases, and tests.
- Do not change unrelated parts of the app.
- You must always check whether self tests are up to date and sufficient, and you must explicitly say what is missing and what you will add.
- Any change must be backed by at least one regression test (or a clearly justified reason why not).
- Prefer small, surgical diffs. Prefer readability and determinism.

Step 1 - Confirm scope
Reply with:
- "Confirmed: hardening pass only, no feature changes."
- A bullet list of what you consider "done / deleted functionality" to include (views, filters, transitions, storage, timers, animations, undo/uncomplete, etc.)
- A bullet list of what is explicitly out of scope.

Step 2 - Provide the current implementation map (what I need to understand where things are at)
Give me a structured report with the following headings. Each heading must include file paths and the exact function / component names, plus key lines of logic paraphrased (no long code dumps unless essential).

1. Entry points and UI surface
- Where the done/deleted list view is defined and rendered
- How the user navigates into and out of it (logo toggle, viewMode, filters, etc.)
- Any special icon states or styling behaviour for the logo

2. Data model and storage
- Reminder fields involved (completedAt, any deleted flag, etc.)
- How localStorage is read, sanitised, and written back (and what legacy fields are dropped)
- Any migration/sanitisation logic relevant to done/deleted

3. Done flow
- Exact path when user marks a reminder done (state change order, any delays, animations)
- Any "departing" tracking, layout gating, AnimatePresence behaviours
- How "done" items move between active list and done/deleted list

4. Uncomplete / undo flow (including the 350ms behaviour)
- pendingUncompleteIds usage and where it affects filtering/rendering
- timers, cleanup, and any click-guard logic
- what the user sees during the completion delay window and why

5. Deleted flow (if separate from done)
- How delete is represented and where the item ends up
- Any undo / restore behaviour
- Any differences from done behaviour

6. Filters and categorisation interactions
- How done/deleted interacts with ALL/TODAY/THIS WEEK/LATER/SOMETIME filters
- How overdue logic interacts (if relevant)
- Any known edge cases (eg: repeating reminders, rescheduling, reminders without date/time)

7. Animation and layout
- Where AnimatePresence is keyed (or should be keyed)
- Where layout is enabled and why
- Any known issues we previously fixed and how they are prevented from regressing

8. Test coverage inventory
- List all relevant test files and what they cover
- Identify any self test runners involved (unit/self-check suites/E2E hooks) and where they live
- State clearly whether the existing tests are up to date with the current behaviour, and why

Step 3 - Run and report tests (no guessing)
You must run the full relevant test suites locally and paste:
- The command(s) you ran
- The pass/fail summary (counts, duration)
- Any failures with root cause notes
If you cannot run tests for any reason, stop and explain precisely what is blocking you and what I need to do.

Step 4 - Hardening plan (simple, surgical)
Produce a prioritised hardening plan. For each item:
- Risk it addresses (specific, real failure mode)
- The smallest possible code change to mitigate it
- The exact test(s) you will add or update, and what they assert
- Any "do not change" constraints to avoid scope creep

Do not include speculative refactors. Only include items tied to observed behaviour, code inspection, or missing tests.

Step 5 - Execute hardening in small batches
Implement the hardening plan in batches. For each batch:
- List files touched
- Provide a concise diff summary
- Add/update tests alongside the change
- Re-run the relevant tests and paste the results
- Explicitly confirm: no UI changes beyond bug fixes, no new features, no broad refactors

Quality bar
- Deterministic tests (fixed "now" where time is involved)
- Clear naming and comments only where they prevent future regressions
- No new shared utilities unless absolutely unavoidable (and justify if you do)

Start now with Step 1 and Step 2 only. Do not change code yet.
