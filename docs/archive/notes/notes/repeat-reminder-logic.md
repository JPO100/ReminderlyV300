Good. Claude is thinking correctly - but there are two places we must tighten to prevent scope creep.

I'll answer directly and lock this down.

---

## 1️⃣ Importing repeat equality helper

Yes - adding a single import line at the top of `App.tsx` for the existing repeat equality helper is acceptable.

This is **not** over-engineering.

It is:

* Using an existing utility
* Avoiding duplicated logic
* Avoiding subtle comparison bugs

So:

✔ Add one import.
✖ Do not create new helpers.
✖ Do not modify the helper.
✖ Do not refactor schedule.ts.

One import line is fine.

---

## 2️⃣ ReminderSchedule equality

Your proposed inline comparison is exactly correct.

Do NOT create a new equality helper.
Do NOT extract utility logic.
Do NOT import anything new.

Use:

```
kind === kind
date === date
time === time
```

That is sufficient for this app.

Keep it boring.

---

## 3️⃣ The flagged race condition (this is important)

Claude is absolutely correct about the race.

Scenario:

1. User completes repeat reminder.
2. 1000ms RESCHEDULE_DELAY timer scheduled.
3. User immediately uncompletes before timer fires.
4. Undo logic runs, finds zero matches (because next instance not yet inserted).
5. Then timer fires and inserts a new instance anyway.
6. Duplicate.

Now — this is where we must decide carefully.

If we ignore this, your duplicate prevention logic is incomplete and will feel flaky.

But we must NOT over-engineer.

The minimal, clean fix is:

Inside `handleUncompleteClick`, if the reminder being undone has a pending reschedule timer, cancel it.

That means:

* Access `rescheduleTimersRef.current`
* If it contains reminderId:

  * clearTimeout(timer)
  * delete entry from the map

That's it.

No new timers.
No refactor.
No redesign.
Just cancel an already-scheduled callback.

This is NOT a timer change.
It is cleanup of an existing timer.

It stays fully inside the uncomplete handler.
It introduces no new architecture.
It removes a real correctness bug.

This is still lightweight and clean.

If you do NOT do this, your "Option 2" fix is logically incomplete.

---

# Final directive

We slightly tighten the spec:

### Add this before computing expectedNextSchedule:

If `rescheduleTimersRef.current` has an entry for the reminder being uncompleted:

* clearTimeout(timer)
* delete it from the map

Do this before any schedule matching.

Nothing else changes.

---

# Why this is still simple

We are:

* Not adding timers
* Not modifying timing
* Not changing behaviour
* Not creating new state
* Not redesigning repeat logic

We are only preventing a stale scheduled callback from firing after undo.

That is defensive correctness, not over-engineering.

---

# Final instruction to Claude (delta)

Add this to the top of the uncomplete handler:

1. If repeatRule exists:

   * If rescheduleTimersRef.current.has(reminderId):

     * clearTimeout(storedTimer)
     * delete it

Then proceed with the duplicate prevention logic as previously specified.

No other changes.

---

This keeps the implementation:

* Correct
* Deterministic
* Lightweight
* Non-architectural
* Boring

And it prevents the race without expanding scope.

Approve this tightened direction and proceed.
