You are Claude working in the Reminderly repo.

Goal
Harden the entire done / deleted functionality and lock current behaviour down with tests. This is stabilisation only.

Non-negotiables
- Hardening only. No feature changes. No UX changes. No styling/motion changes unless required to fix a bug.
- Keep the implementation simple. No over engineering. No broad refactors.
- Do not restructure files, create new abstractions, or "clean up" unrelated code.
- Any behavioural change must have a regression test.
- Always check whether our self tests are up to date and sufficient, and say clearly what is missing.

First - fix one factual mismatch in your report
You said /src/app/__tests__/delete.test.ts has 9 tests but you listed more than 9 items. Resolve this precisely:
- State the exact number of describe blocks and tests in that file.
- Paste the exact test names as they exist today (no paraphrasing).

Now - do not change code yet.
Run tests and paste output.

Run and report tests (no guessing)
Run:
1) The delete test file: /src/app/__tests__/delete.test.ts
2) The core self tests suite that prints "Reminderly Self-Checks Report"

Paste:
- Exact commands run
- Pass/fail counts and durations
- Any failures with root cause notes

If you cannot run tests, stop and tell me exactly what is blocking you and what I need to do.

After test results are pasted (only then), proceed with hardening.

Hardening scope
Only address real risks tied to:
- behaviour you observed in code
- failing tests
- missing coverage that could plausibly regress
No speculative improvements.

Coverage gaps to close (minimum)
Add tests for these areas, using the smallest practical approach each time:
- Done flow (handleCompleteClick): commit timing and state effects
- Timer cross-cancellation between done/uncomplete/delete/undelete/reschedule
- loadReminders: deletedAt sanitisation/migration behaviour
- Repeat duplicate removal on uncomplete: exactly-one-match rule, no false deletes
- Reschedule deletedAt guard: proven by timer sequencing (not just a comment-level test)
- pendingUncompleteIds inclusion in done filter during the 350ms window
- "done" filter excluding items where both completedAt and deletedAt are set
- Reduce "test drift": avoid tests that re-implement large chunks of App.tsx logic

Rule about refactors for testability
Do not refactor "to make tests nicer".
Only make a code change for testability if there is no other simple way, and keep it tiny:
- At most extract 1-2 small pure functions (no new patterns) OR export an existing small pure helper that already exists.
- No moving large blocks of logic out of App.tsx.
- No new architecture layers, state machines, or utilities.

Hardening invariants to verify (and protect with tests where feasible)
- Items do not end up in both active and done/deleted after final commits (pending windows aside)
- pendingUncompleteIds / pendingUndeleteIds only affect list membership during the 350ms window, then cleanly disappear
- No orphan timers or stuck pending ids after any cross-action sequence
- Reschedule never inserts from a deleted source, even with timing
- Clear all only affects done/deleted items and resets doneDeletedFilter and clearListStep correctly
- AnimatePresence keying prevents cross-filter exit artefacts (only verify, do not change animation code unless a bug is proven)

Deliverables format (after tests are run)
1) Test run output (commands + summary)
2) A short hardening plan (bullet list) mapping each change to a specific risk and the test that covers it
3) Implementation in small batches:
- Files touched
- What changed (concise)
- Tests added/updated and what they assert
- Re-run test output summary

Start now by running tests only. Do not modify code until you have pasted the test output.
