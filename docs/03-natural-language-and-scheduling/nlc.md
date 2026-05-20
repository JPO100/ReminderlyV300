# Natural Language Capture (NLC)

Content from `/docs/nlc.md` (comprehensive existing documentation - copying verbatim).

## Overview

Natural Language Capture extracts structured scheduling information from free-text reminder input. As the user types a reminder, NLC recognises date, time, and repeat patterns in the text and highlights them. The user can then apply those recognised values to the reminder's schedule — either by clicking the highlighted tokens or, in auto mode, having them applied automatically.

NLC is deterministic and regex-based. There is no AI or NLP involved.

## User-visible behaviour

### Recognition

As text is typed into the reminder input, recognised patterns appear in Reminderly blue (`#4784F8`). These highlighted spans are called tokens. Tokens fall into three categories: date, time, and repeats.

Recognition is passive. Highlighting a token does not change any toggle or schedule value. The reminder remains in its current state until the user acts on a token.

### Applying tokens (click mode)

In click mode (the default), the user clicks a highlighted token to apply it. Clicking a token:

- Turns on the corresponding toggle (date, time, or repeats).
- Sets the structured value (date picker date, time picker time, or repeat configuration).
- Does not open any drawer or picker.

If the text contains multiple tokens in the same category (e.g. two weekday names), clicking one hides the others. Only the applied token remains highlighted.

### Applying tokens (auto mode)

In auto mode, tokens are applied automatically 200ms after parsing completes, subject to these conditions:

- Exactly one token exists in the category.
- The corresponding toggle is off.

If multiple tokens exist in a category, none are auto-applied (ambiguous). If the toggle is already on (set manually or by a previous apply), auto-apply does not overwrite it.

Auto mode is toggled via the DevTools NLC page.

#### Auto-apply in edit mode

When the overlay opens in edit mode, auto-apply behaviour differs from create mode:

1. **Initial suppression**: The first auto-apply cycle is suppressed on mount. This prevents the parser from re-deriving and overwriting the prepopulated toggle and value state that was loaded from the saved reminder.

2. **Token baseline**: On mount, the original reminder text is parsed and a snapshot of its tokens is stored (keyed by `category:lowercasedText`). This snapshot is called the initial token set.

3. **Unlock on new token**: After the initial suppression has passed, if the user edits the text and a parsed token is not present in the initial token set, the corresponding category is treated as eligible for auto-apply — even if that category's toggle is already on from prepopulation. Each category is unlocked independently.

4. **Unchanged tokens are not re-applied**: Tokens that match entries in the initial token set (same category and same lowercased text) do not unlock their category. This prevents unchanged tokens from re-applying over manually adjusted values.

5. **Standard rules still apply**: The single-token-per-category ambiguity rule and the 200ms debounce apply identically in edit mode. Only the toggle eligibility gate is overridden for categories with new tokens.

This mechanism ensures that typing "at 3pm" in an edit session updates the time field even when time was prepopulated to 2pm, without re-applying an unchanged "tomorrow" date token.

### Invalidation

If the user edits text after applying a token, NLC re-validates the applied token on every re-parse:

1. If the same text exists at the same position, the token remains valid.
2. If the same text exists exactly once at a different position (e.g. the user inserted characters before it), the token's range is silently updated.
3. If the same text no longer exists, the token is invalidated: the toggle turns off and the value is cleared.
4. If the same text exists at multiple different positions (ambiguity), the token is invalidated.

Invalidation does not close drawers. Drawer state is user-controlled only.

When a repeats token is invalidated, its implied date is also cleared — unless an independent date token is still applied.

When a repeats token with an implied time (e.g. "every morning") is invalidated, its implied time is also cleared and the time toggle turns off — unless an independent time token is still applied. If the repeats token is later re-applied (e.g. user re-types it), the implied time reactivates.

### Save behaviour

If no tokens have been applied (or all have been invalidated), the reminder saves as "sometime" with no structured schedule. Applying a date or repeats token produces a "scheduled" reminder with a date.

## Supported terms

### Date tokens

| Input | Meaning |
|---|---|
| `today` | Today's date |
| `tomorrow` | Tomorrow's date |
| `Monday` ... `Sunday` | Next occurrence of that weekday (including today if it matches) |
| `next Monday` ... `next Sunday` | The weekday at least 7 days from now |
| `February 28th`, `Feb 28` | Month-name date (month then day, optional ordinal suffix) |
| `28 Feb`, `28th February` | Day-first month-name date (day then month, optional ordinal suffix) |
| `Feb 28 2027`, `28th February 2027` | Month-name date with explicit 4-digit year |

- Weekday names are case-insensitive. The displayed text preserves the user's original casing.
- Month names accept both full and abbreviated forms (e.g. `February` / `Feb`). Case-insensitive.
- Month-name dates without a year resolve to the next occurrence of that date (this year if it hasn't passed, otherwise next year).
- Month-name dates with an explicit year resolve to that exact date.
- "on Friday" is recognised — the token is the weekday only, not the word "on".

### Time tokens

| Input | Meaning |
|---|---|
| `7pm`, `7am` | Hour with am/pm (1-12) |
| `7:30pm`, `7:30am` | Hour and minutes with am/pm |
| `7 pm`, `7:30 pm` | Space before am/pm is accepted |
| `19:00`, `07:30` | 24-hour format (hour 0-23) |
| `morning` | 07:00 |
| `lunchtime`, `noon` | 12:00 |
| `afternoon` | 15:00 |
| `evening` | 18:00 |
| `night` | 21:00 |
| `this morning` | 07:00 + implies date = today |
| `this afternoon` | 15:00 + implies date = today |
| `this evening` | 18:00 + implies date = today |
| `tonight` | 21:00 + implies date = today |

- Minutes must be on a quarter-hour: `00`, `15`, `30`, or `45`. Non-quarter-hour times (e.g. `7:10pm`) are not recognised.
- 12-hour hours must be 1-12. `13pm` is rejected.
- Standalone time-of-day tokens (`morning`, `afternoon`, etc.) map to fixed clock times.
- Compound tokens (`this morning`, `this afternoon`, `this evening`, `tonight`) also turn on the date toggle and set date to today.
- If any explicit clock time token exists (12h or 24h), all time-of-day tokens are suppressed — they do not highlight, become eligible, or become clickable.
- `"this night"` is not recognised as a compound token (only `tonight` is).

### Repeats tokens

| Input | Resulting frequency | Resulting config | Implied time |
|---|---|---|---|
| `every day` | Daily | interval 1 | — |
| `every week` | Weekly | interval 1 | — |
| `every month` | Monthly | interval 1 | — |
| `every year` | Yearly | interval 1 | — |
| `every hour` | Hourly | interval 1 | — |
| `every N days` | Daily | interval N | — |
| `every N weeks` | Weekly | interval N | — |
| `every N months` | Monthly | interval N | — |
| `every N years` | Yearly | interval N | — |
| `every N hours` | Hourly | interval N | — |
| `every Monday` ... `every Sunday` | Custom-days | selected day, interval 1 | — |
| `every morning` | Daily | interval 1 | 07:00 |
| `every afternoon` | Daily | interval 1 | 15:00 |
| `every evening` | Daily | interval 1 | 18:00 |
| `every night` | Daily | interval 1 | 21:00 |
| `weekdays` | Custom-days | Mon-Fri, interval 5 | — |
| `Mon, Wed, Fri` (comma-separated short names, 2+ items) | Custom-days | listed days, interval = count | — |

- Short day names accepted in comma lists: `Mon`, `Tue`, `Wed`, `Thu`, `Thur`, `Fri`, `Sat`, `Sun`.
- Singular and plural unit forms are both accepted (e.g. `every 1 day`, `every 3 days`).
- `everyday` (no space) is not recognised — must be `every day`.
- `every other` is not recognised.
- When a repeats token is present, all date-category tokens are suppressed. Explicit time tokens are NOT suppressed by repeat tokens.
- "every morning/afternoon/evening/night" tokens carry an implied time. Applying them also turns on the time toggle and sets the implied time value. If the implied time is later invalidated (e.g. repeat token removed), the time toggle is also turned off — unless an independent time token is still applied.

## System behaviour

### Parsing

`parseTokens(text)` scans the input text using regex patterns and returns an array of `ParsedToken` objects, each with a category (`date` | `time` | `repeats`), start/end character indices, and the matched text.

Repeats patterns are checked first. If a weekday appears inside a repeats token (e.g. "Wednesday" in "every Wednesday"), the overlap resolver suppresses the bare weekday date token. Overlap resolution is greedy left-to-right: longer matches win, and no character range appears in more than one token.

### Eligibility filtering

`computeEligibleTokens()` determines which parsed tokens are shown to the user. Before any token is applied, all tokens are eligible. Once a token is applied in a category, only that specific token (matched by position and text) remains eligible — all other tokens in that category are hidden.

### Token application

`applyToken(token)` is the single shared path for both click and auto-apply. It:

1. Records the token in `appliedTokens` for its category.
2. Parses the token text into a structured value (date, time, or repeat config).
3. Silently turns on the relevant toggle(s).
4. Sets the corresponding value (selected date, selected time, or repeat config).

Repeats application also turns on the date toggle and sets an anchor date. The anchor date is the next upcoming occurrence of the specified day(s), or today for interval-based repeats.

Repeats tokens without an implied time (e.g. "every week", "every Monday") also turn on the time toggle and set time to 12:00pm as a default — but only when the time toggle is currently off. This does not apply when the repeats token carries its own implied time (e.g. "every morning" sets 07:00 instead).

### Invalidation flow

A `useEffect` keyed on `parsedTokens` runs `computeInvalidation()` on every re-parse. For each invalidated category, the component turns off the toggle and clears the value via `applyToggleStateSilently`. Range-updated tokens are silently tracked without any visible effect.

### Auto-apply flow

A separate `useEffect` keyed on `[parsedTokens, nlcMode]` runs `computeAutoApplyResult()` after a 200ms debounce when `nlcMode === 'auto'`. It reads current toggle state from refs (to avoid stale closures) and calls `applyToken` for each action returned. The debounce timer is cleared on unmount and on every re-trigger.

In edit mode, the effect computes effective toggle states before calling `computeAutoApplyResult`. For each parsed token, if that token's `category:lowercasedText` key is absent from the initial token set (captured on mount), the corresponding category's toggle is overridden to `false` for the purpose of that auto-apply evaluation. This allows new tokens to auto-apply while leaving unchanged tokens inert.

### Repeats anchor date race fix

When auto-applying multiple actions, a race condition can occur where time-token actions overwrite `selectedDate` via stale refs before React re-renders. To prevent this, the auto-apply effect pre-computes the repeats anchor date before applying actions, then re-applies the correct anchor date after all actions complete. This ensures repeats tokens set the correct date even when time tokens are also applied in the same cycle.

### Rendering

The text input area uses a 3-layer architecture:

- **Textarea**: the real input element. Text is transparent so the mirror shows through.
- **Mirror layer**: a `div` behind the textarea with identical layout. Token spans render in `#4784F8`; non-token text is styled identically to the textarea. `pointer-events: none`.
- **Hit layer**: a `div` overlaying the textarea with identical layout. Token spans have `pointer-events: auto` and `cursor: pointer`; all other content is invisible and non-interactive.

Both mirror and hit layers are rendered by a single `renderLayerContent(mode)` function to prevent text segmentation drift. Scroll positions are synchronised via `onScroll`.

## Edit mode vs create mode

| Aspect | Create mode | Edit mode |
|---|---|---|
| Initial text | Empty | Prepopulated from `editReminder.originalText` |
| Initial toggles | All off | Derived from saved reminder fields |
| Initial values | All null | Derived from saved reminder fields (not re-parsed from text) |
| Auto-apply on mount | Runs normally (first parse triggers auto-apply after 200ms) | Suppressed on first cycle via `suppressAutoApplyRef` |
| Auto-apply after text change | Toggle must be off for category | Toggle overridden to off for categories with new tokens not in initial token set |
| Token highlighting | All eligible tokens highlighted | All eligible tokens highlighted (same logic) |
| Token click | Applies normally | Applies normally |
| Invalidation | Runs on every re-parse | Runs on every re-parse (same logic) |
| Save | Creates new reminder | Updates existing reminder in place (id unchanged) |
| Cancel | Discards draft, overlay closes | Discards all changes, overlay closes, no persistence write |

## Date/time invariant

The system enforces the invariant that time requires a date. This invariant is enforced in the manual toggle handlers only — not in `applyToggleStateSilently` or NLC token application.

### Rules

1. **Date OFF cascades to time OFF**: Toggling date off also turns time off, clears both `selectedDate` and `selectedTime`, and closes the time drawer if open.

2. **Time ON auto-enables date**: Toggling time on when date is off automatically turns date on. If no date exists, it defaults to today. The date drawer does not open (only the time drawer opens).

3. **Time OFF clears time only**: Toggling time off clears `selectedTime` and closes the time drawer. Date remains unchanged.

4. **Repeats unaffected**: Date and time toggle changes do not affect the repeats toggle or repeat configuration.

## Constraints and rules

- Time recognition is restricted to quarter-hour intervals. This is by design; the time picker only supports these values.
- Standalone time tokens (both clock times like `7pm` and time-of-day words like `morning`) set date to today when no explicit date token exists in the parsed text and the date toggle is off. Compound tokens (`this morning`, `tonight`, etc.) always set date to today when no explicit date token exists, regardless of toggle state.
- Repeats always implies date. Applying a repeats token turns on both the repeats and date toggles.
- Auto-apply requires unambiguous input (exactly one token per category) and an off toggle (with the edit-mode override described above). It is conservative by design.
- Auto-apply of repeats requires both repeats AND date toggles to be off, to avoid overwriting a manually set date.
- Invalidation does not cascade across categories, with one exception: invalidating a repeats token also clears the date it implied, unless an independent date token is still applied.
- Drawers never open as a result of token application (click or auto). Drawers are user-controlled only.
- All parsing and interaction logic is implemented as pure functions in `nlc-parser.ts` and `nlc-interaction.ts`. The component layer handles React state and side effects only.

## Dependencies and interactions

- **New Reminder Overlay**: NLC is integrated into the new reminder overlay's text input. It reads from and writes to the overlay's toggle and value state (date, time, repeats).
- **Toggle state**: NLC uses `applyToggleStateSilently` to change toggles without triggering drawer-open or manual-toggle side effects. The date/time invariant is not enforced through this path.
- **Repeat configuration**: Repeats tokens produce a `RepeatConfig` object passed to the parent via `onRepeatConfigChange`.
- **Schedule kind**: At save time, `computeScheduleKind` uses the date toggle and selected date to determine whether the reminder is "scheduled" or "sometime". NLC does not directly set the schedule kind — it sets the inputs that the save logic reads.
- **DevTools**: The NLC mode (click vs auto) is controlled via a segmented control on the DevTools NLC page. The mode is stored as React state in `App.tsx` and threaded through to `NewReminderElements`.
- **Self-checks**: 53 parser checks and 45 interaction checks (including auto-apply, time-of-day, repeat-trigger, implied-time reactivation, month-name date resolution, and explicit year resolution checks) run via the DevTools self-checks page.

## Non-goals

- NLC does not perform fuzzy matching, spelling correction, or synonym expansion.
- NLC does not recognise numeric-only date formats (e.g. "15/03", "2026-03-15").
- NLC does not recognise relative date phrases beyond "today", "tomorrow", weekday names, and month-name dates (e.g. "in 3 days", "next week" without a weekday).
- NLC does not set the reminder title. The full text the user types becomes the reminder text; tokens are scheduling metadata extracted from it.
- NLC does not open drawers or pickers. It sets values silently.
- NLC does not support undo. Editing the text to remove or change a token triggers invalidation, but there is no explicit "unapply" action.
- Auto mode is an A/B test mechanism, not a user-facing setting. It is only accessible via DevTools.

## File Locations

- Parser: `/src/app/utils/nlc-parser.ts`
- Interaction logic: `/src/app/utils/nlc-interaction.ts`
- Integration: `/src/imports/NewReminderOverlay.tsx`

## Self-Check Coverage

- 53 parser checks (`/src/app/dev/nlc-parser-checks.ts`)
- 45 interaction checks (`/src/app/dev/nlc-interaction-checks.ts`)
- Total: 98 NLC checks

See [Self-Check System](../../06-quality-and-dev/self-check-system.md) for details.
