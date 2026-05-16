# Text Normalisation and Rendering

## Overview

Reminderly processes reminder text at two distinct times: save-time normalisation and presentation-time rendering. This two-phase approach ensures persistent absolute dates while displaying contextual labels when appropriate.

## Save-Time Normalisation

`normaliseReminderText()` function in `/src/app/utils/normalise-text.ts` transforms text before saving.

### Purpose

Replace relative date phrases with absolute equivalents so stored text remains accurate across days.

### Transformations

**"today"** → **"Monday 3 March"** (full weekday + date)
**"tomorrow"** → **"Tuesday 4 March"** (full weekday + date)
**"tonight"** → stripped (schedule carries the date)
**"next Monday"** etc → stripped
**Weekday names** → Unchanged (already absolute)
**Month-name dates** → stripped (e.g. "February 28th", "28 Feb", "Feb 28 2027")

### Storage

- **originalText**: Raw user input, unchanged
- **displayText**: Normalised version with absolute dates

### Example

User types: "Buy milk today at 5pm"
- originalText: "Buy milk today at 5pm"
- displayText: "Buy milk Monday 3 March at 5pm"

## Presentation-Time Rendering

`renderReminderText()` and `getDisplayTitle()` functions in `/src/app/utils/render-text.ts` process text for display.

### Purpose

Show "today" and "tomorrow" contextually when the stored absolute date matches today or tomorrow's date.

### Reverse Substitution

When reminder's date equals today: Replace stored weekday+date with "today"
When reminder's date equals tomorrow: Replace stored weekday+date with "tomorrow"

### Example

Stored displayText: "Buy milk Monday 3 March at 5pm"
If today is Monday 3 March: Displays as "Buy milk today at 5pm"
If today is Sunday 2 March: Displays as "Buy milk tomorrow at 5pm"
If today is Tuesday 4 March: Displays as "Buy milk Monday 3 March at 5pm"

## Display Title Extraction

`getDisplayTitle()` removes date/time portions from text for compact display in certain contexts.

### Patterns Removed

- Date + time: "Monday 3 March at 5pm"
- Date only: "Monday 3 March"
- Time only: "at 5pm"
- "today at 5pm", "tomorrow at 5pm"
- Month-name dates: "February 28th", "28 Feb", "Feb 28 2027"
- Time-of-day phrases: "in the morning", "in the afternoon", "at night", etc. (stripped when a concrete clock time exists)
- Time-of-day words: "morning", "afternoon", "evening", "night" (stripped when a concrete clock time exists, unless protected by "every" prefix)

### Example

Input: "Buy milk Monday 3 March at 5pm"
Output: "Buy milk"

## Constraints

- Normalisation only applies to scheduled reminders
- Sometime reminders: displayText = originalText (no normalisation)
- Render substitution only applies when dates match exactly
- Normalisation is irreversible (original text preserved separately)

## Self-Checks

**Normalisation checks** (15 checks)
- Today substitution
- Tomorrow substitution
- Weekday replacements
- Case preservation
- Multi-token handling

**Rendering checks** (7 checks)
- Today substitution at presentation time
- Not-today unchanged
- Sometime unchanged
- Tomorrow substitution
- Not-tomorrow unchanged
- Recurring today
- Recurring not-today

**Display title checks** (5 checks)
- Strip date+time patterns
- Strip date only
- Strip time only
- No strip mid-string
- No strip when no match

See [Self-Check System](../../06-quality-and-dev/self-check-system.md) for details.

## Related Documentation

- [NLC](./nlc.md) - Natural language token parsing
- [New Reminder Overlay](../../01-core-surfaces/new-reminder-overlay.md) - Save behaviour
- [Active List](../../01-core-surfaces/active-list.md) - Display behaviour
