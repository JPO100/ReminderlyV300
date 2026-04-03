# Data Model and Persistence

## Reminder Schema

```typescript
export type Reminder = {
  id: string;
  originalText: string;
  displayText: string;
  createdAt: number;
  schedule: ReminderSchedule;
  repeatRule?: RepeatRule | null;
  completedAt?: number | null;
  deletedAt?: number | null;
};
```

### Fields

**id**
- Type: `string`
- Generated via `crypto.randomUUID()` at creation time
- Immutable

**originalText**
- Type: `string`
- The raw text as entered by the user
- Persisted without modification
- Used for edit-mode prepopulation and duplicate detection

**displayText**
- Type: `string`
- Normalised version of originalText
- Relative date phrases ("today", "tomorrow") replaced with absolute equivalents ("Monday 3 March", "Tuesday 4 March") at save time
- Rendered in the list view with optional today/tomorrow substitution applied at presentation time

**createdAt**
- Type: `number` (epoch timestamp)
- Set to `Date.now()` at creation time
- Used for tie-breaking in sort order
- Immutable

**schedule**
- Type: `ReminderSchedule` (discriminated union)
- `{ kind: "scheduled"; date: string; time?: string }` or `{ kind: "sometime" }`
- date format: `yyyy-mm-dd` (e.g. "2026-03-11")
- time format: `HH:mm` (24-hour, e.g. "14:30")
- time is optional; date-only scheduled reminders have no time field

**repeatRule**
- Type: `RepeatRule | null | undefined`
- Optional field
- See RepeatRule schema below

**completedAt**
- Type: `number | null | undefined`
- Epoch timestamp set when reminder is marked as done
- `null` or `undefined` means not done
- Non-null means done (visible in done/deleted view)

**deletedAt**
- Type: `number | null | undefined`
- Epoch timestamp set when reminder is soft-deleted
- `null` or `undefined` means not deleted
- Non-null means deleted (visible in done/deleted view)

## RepeatRule Schema

```typescript
export interface RepeatRule {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // default 1
  byDay: Array<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'> | null;
}
```

### Fields

**frequency**
- One of: `'hourly'`, `'daily'`, `'weekly'`, `'monthly'`, `'yearly'`
- Determines base repeat period

**interval**
- Type: `number`
- Multiplier for frequency (e.g. interval=2, frequency=daily means "every 2 days")
- Default: 1

**byDay**
- Type: `Array<string> | null`
- Only relevant for weekly frequency
- Specifies which days of the week the reminder repeats on
- Day abbreviations: `'mo'`, `'tu'`, `'we'`, `'th'`, `'fr'`, `'sa'`, `'su'`
- `null` for non-weekly frequencies or simple weekly repeats

## ReminderCategory (Derived)

```typescript
export type ReminderCategory = "today" | "this-week" | "later" | "sometime" | "other";
```

Categories are derived at render time from the reminder's schedule field:

- **today**: `schedule.kind === "scheduled"` and date equals today
- **this-week**: `schedule.kind === "scheduled"` and date is within current Monday-Sunday week but not today
- **later**: `schedule.kind === "scheduled"` and date is after the current week's Sunday
- **sometime**: `schedule.kind === "sometime"`
- **other**: virtual category used in grouped filters mode, maps to "later" OR "sometime"

## ViewMode

```typescript
export type ViewMode = "list" | "done-deleted";
```

- **list**: Standard active reminders view (where `completedAt == null` and `deletedAt == null`)
- **done-deleted**: Archive view (where `completedAt != null` or `deletedAt != null`)

## Persistence

### Storage Key

```typescript
export const STORAGE_KEY = "reminderly.reminders.v1";
```

### Load Behaviour

`loadReminders()` function in `reminder-utils.ts`:

1. Reads from `localStorage.getItem(STORAGE_KEY)`
2. Parses JSON
3. Validates each reminder:
   - Must have valid `id` (non-empty string)
   - Must have `originalText` or legacy `text` field
   - Must have valid `schedule` shape
   - `schedule.kind` must be "scheduled" or "sometime"
   - If scheduled: date must match `yyyy-mm-dd` format
   - If scheduled with time: time must match `HH:mm` format and be valid (hour 00-23, minute 00-59)
4. Migrates legacy fields:
   - `text` → `originalText` and `displayText`
   - `schedule.kind === "inbox"` → `schedule.kind === "sometime"`
   - Empty time string `""` → `undefined`
5. Drops corrupt or invalid reminders
6. Returns validated array

### Save Behaviour

On every reminder state change, App.tsx writes the full reminders array to localStorage:

```typescript
localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
```

### Settings Persistence

User settings are persisted under separate keys:

- `reminderly.showDateAndTimeSubtitles` (boolean, default true)

### Migration Support

The loader supports two legacy formats:

1. **Text field migration**: Old reminders with `text` field are migrated to `originalText` and `displayText`
2. **Inbox schedule kind**: Old `schedule.kind === "inbox"` is migrated to `schedule.kind === "sometime"`

## Data Invariants

1. **id uniqueness**: All reminders must have unique IDs (enforced at creation via UUID)
2. **Schedule validity**: Schedule must be either "scheduled" with valid date, or "sometime"
3. **Time requires date**: Time can only exist on scheduled reminders (cannot have time without date)
4. **Epoch timestamps**: All timestamps (createdAt, completedAt, deletedAt) are epoch milliseconds
5. **No nullish schedule**: Every reminder must have a schedule object (never null/undefined)
6. **RepeatRule optional**: repeatRule can be null, undefined, or a valid RepeatRule object
7. **Legacy support**: Loader handles both current and legacy formats without data loss

## Type Definitions

Core types are defined in:

- `/src/app/reminder-utils.ts`: Reminder, ReminderCategory, ReminderSchedule, ViewMode, FiltersMenuVariant, RepeatConfig
- `/src/app/types/reminder.ts`: RepeatRule, Schedule, ScheduleSources (alternative schema, not currently used in main app)

## Hydration Flow

1. App.tsx mounts
2. `useState(() => loadReminders())` executes during initial render
3. `loadReminders()` reads from localStorage
4. Validation and migration applied
5. State initialized with loaded reminders
6. Component renders with hydrated data
7. Any subsequent changes trigger localStorage write

## Performance Considerations

- Full array serialization on every change (acceptable for <1000 reminders)
- No debouncing or batching on writes
- Defensive parsing prevents corrupt data from breaking the app
- Validation drops invalid entries rather than throwing errors

### Lists

Lists are stored in localStorage.
Lists use a separate data structure from reminders.
No shared schema exists between lists and reminders.