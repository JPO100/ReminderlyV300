# Self-Check Baseline Report

Last updated: 2026-03-12

> **Stale**: this baseline reflects 280 checks from 2026-03-12. The current suite total is 425 checks across 8 suites. Re-run self-checks and replace the output below to bring this baseline current.

## Clean Run (Expected)

```
Reminderly Self-Checks Report
Run invocation id: [varies]
Ran at: [varies]
Duration: [varies]ms
Passed: 280 | Failed: 0

Schedule and reminder logic

✓ Date equality: null equals null
✓ Date equality: null does not equal value
✓ Date equality: value does not equal null
✓ Date equality: same date string equals same
✓ Date equality: different date strings not equal
✓ Time equality: null equals null
✓ Time equality: null does not equal value
✓ Time equality: value does not equal null
✓ Time equality: same hour/minute equals
✓ Time equality: different hour not equal
✓ Time equality: different minute not equal
✓ RepeatRule equality: null equals null
✓ RepeatRule equality: null does not equal value
✓ RepeatRule equality: same frequency + interval equals
✓ RepeatRule equality: different frequency not equal
✓ RepeatRule equality: different interval not equal
✓ RepeatRule equality: byDay is order-insensitive
✓ RepeatRule equality: byDay null equals null
✓ RepeatRule equality: byDay null does not equal value
✓ Delta detection: date add (null → value)
✓ Delta detection: date remove (value → null)
✓ Delta detection: date change (value A → value B)
✓ Delta detection: date no change (value A → value A)
✓ Delta detection: time add (null → value)
✓ Delta detection: time remove (value → null)
✓ Delta detection: time change (value A → value B)
✓ Delta detection: time no change (value A → value A)
✓ Delta detection: repeat add (null → value)
✓ Delta detection: repeat remove (value → null)
✓ Delta detection: repeat change (value A → value B)
✓ Delta detection: repeat no change (value A → value A)
✓ Delta detection: date changed, time removed
✓ Delta detection: no changes across all fields
✓ Derived: hasTime is true when time is non-null
✓ Derived: hasTime is false when time is null
✓ Derived: isRecurring is true when repeatRule is non-null
✓ Derived: isRecurring is false when repeatRule is null
✓ Persistence: loadReminders returns [] for invalid JSON
✓ Persistence: loadReminders returns [] for JSON object
✓ Persistence: loadReminders returns [] for JSON string
✓ Persistence: loadReminders returns [] for JSON number
✓ Persistence: record with missing schedule is dropped
✓ Persistence: record with unknown schedule.kind is dropped
✓ Persistence: scheduled with invalid date/time is dropped
✓ Persistence: scheduled with malformed time (non-HH:mm) is dropped
✓ Persistence: record with missing/empty id is dropped
✓ Persistence: record where both text paths fail is dropped
✓ Persistence: invalid createdAt defaults to a finite number
✓ Persistence: invalid repeatRule becomes null
✓ Persistence: write then load preserves reminders (new format)
✓ Categorisation: scheduled on same day returns "today"
✓ Categorisation: scheduled later in same Mon-Sun week returns "this-week"
✓ Categorisation: scheduled on Monday of current week returns "this-week"
✓ Categorisation: scheduled after end of week returns "later"
✓ Categorisation: schedule.kind "sometime" returns "sometime"
✓ Sorting: scheduled reminders sort by date ascending
✓ Sorting: same-date scheduled reminders sort by time ascending
✓ Sorting: unscheduled come after scheduled, ordered by createdAt asc
✓ Sorting: same-date reminder with time sorts before one without time
✓ Persistence: round trip preserves hourly repeatRule
✓ Persistence: round trip preserves weekly repeatRule with byDay (custom-days mapping)
✓ formatRepeatLabel: hourly interval 1 returns "Repeats every hour"
✓ formatRepeatLabel: hourly interval 3 returns "Repeats every 3 hours"
✓ formatRepeatLabel: weekly with byDay (mo, we, fr) interval 1
✓ formatRepeatLabel: daily interval 2 returns "Repeats every 2 days"
✓ formatRepeatLabel: daily with time includes "at 5pm"
✓ formatRepeatLabel: weekly with byDay and time includes day and "at 4pm"
✓ formatRepeatLabel: daily without time returns "Repeats every day"
✓ formatRepeatLabel: monthly interval 1 with time returns "Repeats every month at 12pm"
✓ formatRepeatLabel: monthly interval 3 with time returns "Repeats every 3 months at 12pm"
✓ formatRepeatLabel: monthly interval 1 + date + time → "Repeats every month on 12th at 12pm"
✓ formatRepeatLabel: monthly interval 2 + date + time → "Repeats every 2 months on 12th at 12pm"
✓ formatRepeatLabel: monthly with no schedule date omits "on …"
✓ Overdue: yesterday (date only) is overdue
✓ Overdue: today + earlier time is overdue
✓ Overdue: today + later time is NOT overdue
✓ Overdue: tomorrow is NOT overdue
✓ Overdue: sometime schedule is never overdue
✓ Overdue: today (date only, no time) is NOT overdue
✓ Overdue sorting: overdue items appear above ALL non-overdue items regardless of category
✓ Hydration: legacy localStorage with removed schedule kind loads as "sometime"
✓ Hydration: legacy localStorage with "text" migrates to originalText + displayText

Persistence and hydration

✓ Normalise: "Call mum tomorrow night at 7:30pm" → "Call mum on Friday at 7:30pm"
✓ Normalise: "Pay rent next Monday" → "Pay rent on Monday" (within 6 days uses weekday)
✓ Normalise: "Dinner tonight" → "Dinner on Thursday at 7pm"
✓ Normalise: "Buy milk" with no date returns unchanged
✓ Normalise: scheduled date-only does not inject "at" time
✓ Normalise: recurring "Call mum every wednesday at 7pm" does not inject "on Wednesday"
✓ Normalise: "Call mum Feb 28 at 7pm" strips month-name date phrase
✓ Normalise: "Call mum February 28th" strips month-name date phrase
✓ Normalise: "Car MOT March 7th 2027 at 12pm" strips phrase and injects year
✓ Normalise: "Car MOT March 7th at 12pm" same year omits year
✓ Normalise: "Call mum March 1 in the morning" → "Call mum at 7am"
✓ Normalise: "Call mum March 1 in morning" → "Call mum at 7am"
✓ Normalise: "Call mum on speaker March 1 in the morning" keeps "on speaker"
✓ Normalise: manual date selection (skipDateInjection) does not alter text
✓ Normalise: bare weekday after stripping is replaced in-place, not duplicated
✓ Restore: bucket colour after clearing completedAt matches repeat reinsertion derivation
✓ Restore: overdue restored reminder gets OVERDUE colour (same as repeat reinsertion)
✓ renderReminderText: scheduled date equals today → output contains "today"
✓ renderReminderText: scheduled date not today/tomorrow → output equals displayText
✓ renderReminderText: non-scheduled reminder → output equals displayText
✓ renderReminderText: scheduled date equals tomorrow → output contains "tomorrow"
✓ renderReminderText: scheduled date 2+ days away → output equals displayText
✓ renderReminderText: recurring reminder due today → "Meditate today at 7am"
✓ renderReminderText: recurring reminder not due today → unchanged displayText
✓ Date indicator: same year → "Mar 7th" (no year)
✓ Date indicator: different year → "Mar 7th, 2027"
✓ getDisplayTitle: strips exact trailing " on <date> at <time>"
✓ getDisplayTitle: strips exact trailing " on <date>"
✓ getDisplayTitle: strips exact trailing " at <time>"
✓ getDisplayTitle: does NOT strip when same text appears mid-string
✓ getDisplayTitle: does NOT strip when no exact match exists

Natural language parsing

✓ NLC parser: recognises "today" as date token
✓ NLC parser: recognises "tomorrow" as date token
✓ NLC parser: recognises bare weekday as date token
✓ NLC parser: recognises "next Friday" as single date token
✓ NLC parser: recognises two weekdays as separate date tokens
✓ NLC parser: weekday matching is case-insensitive
✓ NLC parser: recognises "7pm" as time token
✓ NLC parser: recognises "7:30pm" as time token
✓ NLC parser: recognises "7 pm" as time token
✓ NLC parser: rejects "7:10pm" (non-quarter-hour)
✓ NLC parser: accepts :00, :15, :30, :45 only
✓ NLC parser: rejects "13pm" (invalid 12h hour)
✓ NLC parser: "every Wednesday" is repeats (not date)
✓ NLC parser: recognises "every day" as repeats
✓ NLC parser: recognises "every 3 days" as repeats
✓ NLC parser: recognises "every 2 weeks" as repeats
✓ NLC parser: recognises "weekdays" as repeats
✓ NLC parser: recognises "Mon, Wed, Fri" as repeats
✓ NLC parser: recognises date + time + repeats in one sentence
✓ NLC parser: returns empty for plain text with no patterns
✓ NLC parser: returns empty for empty string
✓ NLC parser: recognises "morning" as time token
✓ NLC parser: recognises "night" as time token
✓ NLC parser: time-of-day tokens are case-insensitive
✓ NLC parser: "Goodnight" does not match "night"
✓ NLC parser: "this morning" is a single compound time token
✓ NLC parser: "tonight" is a time token
✓ NLC parser: explicit clock time suppresses time-of-day tokens
✓ NLC parser: "tomorrow at 8pm tomorrow night" — night never tokenises
✓ NLC parser: "this night" is not a compound — "night" is standalone
✓ NLC parser: "tomorrow morning" produces date + time tokens
✓ NLC parser: "every morning" is a repeats token
✓ NLC parser: "every night" is a repeats token
✓ NLC parser: "every year" is a repeats token
✓ NLC parser: "everyday" does not tokenise (no space)
✓ NLC parser: "every other day" does not tokenise
✓ NLC parser: "every weekday" does not tokenise
✓ NLC parser: repeat token suppresses date tokens
✓ NLC parser: "every morning at 6am" produces repeats + time tokens
✓ NLC parser: token start/end match exact substring position
✓ NLC parser hardening: rejects month+year (Feb 2027)
✓ NLC parser hardening: rejects 2-digit year (23 Feb 27)
✓ NLC parser hardening: rejects comma format (Feb 23, 2027)
✓ NLC parser hardening: rejects year-first (2027 Feb 23)
✓ NLC parser hardening: rejects invalid date with year (31 February 2027)
✓ NLC parser: recognises "February 28" as date token
✓ NLC parser: recognises "February 28th" as date token
✓ NLC parser: recognises "Feb 28" as date token
✓ NLC parser: recognises "Feb 28th" as date token
✓ NLC parser: recognises "28 Feb" as date token
✓ NLC parser: recognises "28th Feb" as date token
✓ NLC parser: recognises "28 February" as date token
✓ NLC parser: recognises "28th February" as date token
✓ NLC parser: recognises "28 February" as date token
✓ NLC parser: recognises "28th February" as date token
✓ NLC interaction A: recognition-only does not apply toggles or schedule
✓ NLC interaction B: clicking time token sets time only, not date
✓ NLC interaction C: clicking date token sets date only
✓ NLC interaction D: clicking repeats token sets repeats + date
✓ NLC interaction E: applying one date token makes others ineligible
✓ NLC interaction F: deleting applied token invalidates and re-enables alternatives
✓ NLC interaction G: ambiguous duplicate tokens cause invalidation
✓ NLC interaction H: non-quarter-hour time (7:10pm) produces no time token
✓ NLC interaction I: "every Wednesday" anchor is next upcoming Wednesday (or today)
✓ NLC interaction I: "every 3 days" anchor is today
✓ NLC interaction J: two identical time tokens after edit cause invalidation, not relocation
✓ NLC interaction K: no token clicks means schedule is "sometime"
✓ NLC interaction AL: "23 Feb 2027" resolves to 2027-02-23
✓ NLC interaction AM: "Feb 23 2027" resolves to 2027-02-23
✓ NLC interaction AN: "23 Feb 2025" resolves to 2025-02-23 (past year allowed)
✓ NLC interaction AO: "29 Feb 2028" resolves correctly (leap year valid)
✓ NLC interaction AP: "29 Feb 2027" does not tokenise (invalid date)
✓ NLC interaction AQ: NLC feature flag off disables all NLC tokens
✓ NLC auto parsing: applies time when exactly one time token exists and time toggle is off
✓ NLC auto parsing: does not apply date when two date tokens exist
✓ NLC auto parsing: applies repeats+date when exactly one repeats token exists
✓ NLC auto parsing: does not overwrite when toggle already on
✓ NLC auto parsing: after invalidation clears toggle, new text can re-trigger auto-apply
✓ NLC interaction Q: standalone "morning" returns time 07:00
✓ NLC interaction R: "this morning" returns time 07:00 + date today
✓ NLC interaction S: "tonight" returns time 21:00 + date today
✓ NLC interaction T: all time-of-day tokens return correct fixed times
✓ NLC interaction U: "tomorrow morning" auto-applies date=tomorrow, time=morning
✓ NLC interaction V: "every morning" → repeat daily, time 07:00
✓ NLC interaction W: "every evening" → repeat daily, time 18:00
✓ NLC interaction X: "every day" → repeat daily, no implied time
✓ NLC interaction Y: "every year" → repeat yearly
✓ NLC interaction Z: "every Monday" → weekly on Monday, no time
✓ NLC interaction AA: repeat token suppresses date tokens
✓ NLC interaction AB: getRepeatsImpliedTime returns correct values
✓ NLC interaction AC: "every morning" auto-applies as single repeats action
✓ NLC interaction AD: deleting explicit time while "every morning" survives → implied time reactivates
✓ NLC interaction AE: "tomorrow night" → date=tomorrow, time-of-day must not imply today
✓ NLC interaction AF: "every wednesday at 7pm" on Thursday → anchor is next Wednesday
✓ NLC interaction AG: "every thursday at 7pm" on Thursday → anchor is today
✓ NLC interaction AH: "Feb 28" resolves to 2026-02-28 (future date in same year)
✓ NLC interaction AI: "Feb 26" resolves to next year when date is past
✓ NLC interaction AJ: "28 Feb" resolves to 2026-02-28
✓ NLC interaction AK: "26 Feb" resolves to next year when date is past
✓ ViewMode: list -> done-deleted on tick click
✓ ViewMode: done-deleted -> list on tick click
✓ ViewMode: Today filter -> done-deleted on tick click (resets filter)
✓ Navigation: tick click area (0-22%) does not overlap text area (25%-100%)
✓ Subfilter derivation: Done/Deleted/All computed from completedAt + deletedAt
✓ Subfilter visibility: Pending restore items visible only in "Deleted" subfilter
✓ Clear all scope: "Clear all" in Done subfilter clears only done items
✓ Sort precedence: Mixed done+deleted list sorts by status then deletedAt/completedAt
✓ Persistence: deletedAt field survives save/load cycle
✓ Derivation: active list excludes reminders with completedAt != null
✓ Derivation: done/deleted list includes reminders with completedAt != null
✓ Derivation: done list sorted by completedAt descending
✓ Derivation: done list derived only from completedAt, no transient state
✓ Field: completedAt undefined treated as active
✓ Field: completedAt null treated as active
✓ Field: completedAt number treated as done
✓ Concurrency: timer map prevents duplicate timers for same id
✓ Concurrency: two different reminders can complete simultaneously
✓ Persistence: completedAt survives save/load cycle
✓ Uncomplete: setting completedAt to null returns item to active list
✓ Uncomplete: no-op when completedAt is already null
✓ Uncomplete: only clears completedAt, preserves all other fields
✓ Repeat: second click during in-flight window cancels completion and prevents spawn
```

## Check Count Breakdown

- **Schedule checks** (schedule-checks.ts): 37
  - Date equality: 5
  - Time equality: 6
  - RepeatRule equality: 8
  - Delta detection: 14
  - Derived properties: 4
  - Integrity (runner duplicate-id guard): 1 synthetic
- **Reminder checks** (reminder-checks.ts): 77
  - Persistence (defensive load): 12
  - Persistence (round trip): 3
  - Categorisation: 5
  - Sorting: 4
  - formatRepeatLabel: 12
  - Overdue detection: 6
  - Overdue sorting: 2
  - Legacy hydration migration: 2
  - Text normalisation (normaliseReminderText): 14
  - Text normalisation — recurring guard: 1
  - Restore from done — bucket colour: 2
  - Render text (renderReminderText): 7
  - Date indicator label: 2
  - getDisplayTitle: 5
- **NLC parser checks** (nlc-parser-checks.ts): 53
  - Date token recognition: 6
  - Time token recognition: 6
  - Repeats token recognition: 6
  - Cross-category: 2
  - Edge cases (empty/plain text): 2
  - Time-of-day tokens: 10
  - "every" pattern tokens: 6
  - Token range accuracy: 1
  - Repeat-date suppression: 1
  - Month-name date recognition: 8
  - Month-name date hardening (negative): 5
- **NLC interaction checks** (nlc-interaction-checks.ts): 44
  - Token click behaviour (A-K): 12
  - Auto-apply behaviour (L-P): 5
  - Time-of-day interaction (Q-T): 4
  - Compound patterns (U-Z): 6
  - Advanced patterns (AA-AE): 5
  - Repeats anchor auto-apply (AF-AG): 2
  - Month-name date resolution (AH-AI): 2
  - Day-first month-name date resolution (AJ-AK): 2
  - Explicit year resolution (AL-AP): 5
  - Feature flag control (AQ): 1
- **Done/deleted checks** (done-deleted-checks.ts): 9
  - ViewMode toggling: 3
  - Navigation (click areas): 1
  - Subfilter derivation: 1
  - Pending restore visibility: 1
  - Clear all scope: 1
  - Sort precedence (mixed done+deleted): 1
  - Persistence (deletedAt): 1
- **Completion checks** (completion-checks.ts): 14
  - Derivation (active/done lists): 4
  - Field semantics (completedAt): 3
  - Concurrency: 2
  - Persistence: 1
  - Uncomplete: 3
  - Repeat double-click cancellation: 1
- **Dev tools and feature flags checks** (dev-tools-checks.ts): 46
  - Dev tools password: 5 (default, persist true/false, hydrate true/false)
  - Paywall toggle: 5 (default, persist true/false, hydrate true/false)
  - Onboarding tutorial enabled: 5 (default, persist true/false, hydrate true/false)
  - Tutorial first-launch: 5 (default, persist true/false, hydrate true/false)
  - Tutorial every-start: 5 (default, persist true/false, hydrate true/false)
  - Tutorial sentinel: 4 (default absent, written, check absent, check present)
  - Filters menu: 5 (default, persist standard/grouped, hydrate standard/grouped)
  - Show date/time subtitles: 8 (default, persist true/false, hydrate true/false, grouped-to-standard reset, no reset when grouped, no reset when already true)
  - Hide overdue: 4 (default false, state change true, state change false, reinit resets)
- **Total**: 280 checks

## Runner Integrity Check

If duplicate check IDs are detected, the system will fail fast with:

```
Passed: 0 | Failed: 1

✗ Runner integrity: duplicate check ids detected
  Error: Duplicate ids: [comma-separated list of duplicate ids]
```

No other checks will execute when duplicates are detected.

## Usage

When making changes to any utility or component:

1. Run the self-checks
2. Compare output against this baseline
3. If check count changes, update this document
4. If any checks fail unexpectedly, investigate before committing