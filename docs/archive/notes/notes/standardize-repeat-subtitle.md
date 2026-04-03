Send this revised prompt to Claude instead. It tightens scope and removes any paths that could encourage over-engineering.

---

Title: Standardise repeat subtitle wording in list view

Goal
Make the repeat subtitle strings consistent and more informative, without changing any repeat logic.

This is display-only. No changes to parsing, scheduling, next-occurrence calculation, or data model.

Do this in one place
Update the existing repeat label formatter (formatRepeatLabel in /src/app/reminder-utils.ts) and keep App.tsx changes to passing existing inputs only (repeatRule + schedule.time).

Do not add new utilities, new abstractions, or new derived data. Keep the changes surgical.

New wording rules (list subtitles only)

1. Always start with:
   Repeats every …

2. Daily

* If interval is 1: Repeats every day
* If interval > 1: Repeats every {n} days
* If time exists: append " at {time}"

Examples

* Repeats every day at 3pm
* Repeats every 2 days at 3pm

3. Weekly

* If interval is 1: Repeats every week
* If interval > 1: Repeats every {n} weeks
* If byDay exists: append " on {weekday}" (or existing byDay formatting)
* If time exists: append " at {time}"

Important: do not invent a weekday. If byDay is missing, do not add "on …".

Example

* Repeats every week (Wed) at 12pm
  (or if you already render weekdays differently today, keep that weekday formatting but move to the "Repeats every …" structure)

4. Monthly

* If interval is 1: Repeats every month
* If interval > 1: Repeats every {n} months
* Only include " on {day}" if a day-of-month value already exists on the repeat rule (byMonthDay or equivalent).
* Do not derive day-of-month from selectedDate. If the repeat rule does not explicitly carry it, omit "on …". This avoids guessing and avoids scope creep.
* If time exists: append " at {time}"

Examples

* Repeats every month on 12th at 12pm
* Repeats every 2 months at 12pm (if day-of-month is not explicitly available)

Time formatting
Use the existing time formatter already used in the codebase (the same one used in the previous change). No new formatting logic.

Tests
Update or add minimal unit tests in reminder-checks.ts for:

* Daily interval 1 with time -> "Repeats every day at …"
* Weekly interval 1 with byDay and time -> "Repeats every week … at …"
* Monthly interval 1 with byMonthDay and time -> includes "every month on {ordinal} at …"
* Interval > 1 case stays accurate (eg every 2 weeks, every 3 months)

Non-scope

* No rewording beyond the repeat subtitle strings
* No changes to overlays unless they already reuse this formatter
* No new helpers unless there is already an ordinal helper in place (if none exists, implement the ordinal inline in the formatter with a tiny local function, not a new shared utility)

Notes on two specific examples seen

* If the reminder truly has interval = 2 months, it must remain "every 2 months". Do not change to "every month".
* If you are seeing "every 2 months" but expect monthly, that is a data issue outside this scope. Do not fix data in this change.

---
