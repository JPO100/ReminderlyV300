Good catch.

We need to handle this carefully so we do **not** introduce model creep or derived logic.

Here is the tightened instruction to send to Claude.

---

Title: Include day-of-month for monthly repeats (derived from schedule date only)

Problem
Monthly repeats with interval > 1 are currently rendering as:

Repeats every 2 months at 12pm

But the user expects:

Repeats every 2 months on 12th at 12pm

Scope
Display-only enhancement inside formatRepeatLabel.
No data model changes.
No new repeat fields.
No parsing changes.
No scheduling logic changes.

Rule for monthly repeats

For frequency === monthly:

1. Keep existing interval wording:

   * interval = 1 → Repeats every month
   * interval > 1 → Repeats every {n} months

2. Append day-of-month using the existing scheduled date ONLY:

   * If reminder.schedule.date exists, extract the day number from that date.
   * Format it as ordinal (1st, 2nd, 3rd, 4th… 11th/12th/13th = th).
   * Append: on {ordinalDay}

3. Then append time (already implemented):

   * If schedule.time exists → append " at {time}"

Example outputs

* Repeats every month on 12th at 12pm
* Repeats every 2 months on 12th at 12pm

Important guardrails

* Do not add byMonthDay to RepeatRule.
* Do not derive anything from next occurrence calculations.
* Do not create a new utility file.
* Implement ordinal formatting inline inside formatRepeatLabel as a tiny helper function (local to that file).
* If schedule.date is missing, do not show "on …".

Implementation location

* Update formatRepeatLabel to accept the schedule date (if not already available).
* App.tsx should pass reminder.schedule.date alongside time (just like time was passed previously).
* Keep changes minimal and contained.

Tests

Add minimal unit tests:

* Monthly interval 1 + date + time → includes "on {ordinal} at …"
* Monthly interval 2 + date + time → includes "every 2 months on {ordinal} at …"
* Monthly with no schedule.date → no "on …"

Non-scope

* No weekly changes
* No daily changes
* No yearly changes
* No changes to repeat logic

---

This approach:

* Uses already-existing schedule data
* Avoids modifying RepeatRule
* Avoids introducing dead fields
* Keeps everything in one formatter
* Avoids over-engineering

Clean, surgical, and aligned with your "reminders app, not Mars rocket" rule.
