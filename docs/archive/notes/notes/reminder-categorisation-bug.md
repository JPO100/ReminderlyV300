This is not a label or pill issue. If a "This week" reminder is showing the later colour (orange) in the list, that means the reminder is being categorised as later at runtime.

Row colour is driven by categoriseReminder output (category -> CATEGORY_COLOURS). So the only two realistic causes are:

1. categoriseReminder is returning "later" for dates that should be "this-week"
2. The date being stored/parsed for that reminder is not what you think it is (timezone or date-only parsing pushing it outside the week window)

Either way, the fix is in categoriseReminder (and its date boundary logic), not in the filters menu A/B toggle.

Copy and paste this to Claude. It is deliberately surgical and forces a deterministic, test-backed fix:

```text
Bug persists: this-week reminders are being categorised as "later" (orange) in the list

Observation:
- A reminder with subtitle like "Mar 3rd" is displaying with later colour (orange) and not appearing under This week.
- This confirms categoriseReminder is returning "later" for that reminder.
- This is categorisation/date-boundary logic, not filter menu UI.

Scope (minimal):
- Fix categoriseReminder behaviour in /src/app/reminder-utils.ts only (plus minimal tests).
- Do not touch A/B filters menu code, dev tools, pill rendering, done/deleted, styling.

Required behaviour (authoritative):
- today: due date is same local calendar date as now
- this-week: due date is within the current calendar week containing now, where week starts Monday (ISO)
- later: due date is after end of the current calendar week
- sometime: no date/time

Implementation (simple, local - no libraries):
1) In categoriseReminder(now):
   - Compute startOfWeekMondayLocal (Monday 00:00:00.000 local)
   - Compute endOfWeekSundayLocal (Sunday 23:59:59.999 local)
   - If due is same local date as now -> "today"
   - Else if due >= startOfWeekMondayLocal AND due <= endOfWeekSundayLocal -> "this-week"
   - Else -> "later"
   - If no due -> "sometime"
2) Do NOT use rolling 7-day windows.
3) Ensure comparisons are done in local time (Date objects) and do not accidentally compare strings.

Critical debugging step (remove after):
- Add a temporary console.log (then remove) when categorising the specific reminder:
  - now (ISO + local date parts)
  - due (ISO + local date parts)
  - startOfWeek, endOfWeek (ISO)
  - returned category
This will immediately reveal if the due date is being interpreted as a different day (timezone) or if the week bounds are wrong.

Tests (must add/update, minimal):
- Use a fixed now: 2026-03-01T12:00:00 local
- Due dates:
  - 2026-03-01 -> "today"
  - 2026-03-03 -> "this-week"
  - 2026-03-08 -> "later" (next Sunday is next week when week starts Monday)
Keep tests deterministic. No new helpers unless already present.

Verification in app:
- Hard refresh.
- Create:
  - "Test this week" due Mar 3
- Confirm:
  - Row colour is this-week colour (Reminderly pink)
  - Appears under This week filter
  - Does not appear under Later/Other

Report back with:
- Exact lines changed in categoriseReminder
- Test cases added/updated
- Root cause in one sentence (week bounds wrong vs timezone shift vs date parsing issue)
```

If Claude comes back saying categoriseReminder already does this, then the second cause becomes the likely one: date-only parsing is creating a Date at UTC midnight which becomes "previous day" locally, or vice versa. The temporary log will reveal that immediately.

If you can share one extra detail to speed this up: when you create "Mar 3rd", does it store a date-only schedule or date+time? But even without that, the logging step forces the answer.
