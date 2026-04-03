# Self-Check System

## Overview

Reminderly includes a comprehensive self-check test suite that validates core business logic through deterministic function testing. All checks run in-memory without React component mounting, ensuring fast execution and deterministic results.

## Architecture

### Check Runner Framework

`/src/app/dev/check-system.ts` provides the check runner infrastructure:

```typescript
type Check = {
  label: string;
  fn: () => boolean;
};

function runChecks(checks: Check[]): CheckResult[]
```

Each check is a pure function that returns `true` (pass) or `false` (fail). The runner executes all checks, collects results, and reports pass/fail counts with duration.

### Check Suites

Organized into 7 files, each returning a pure function that builds a fresh check array:

| Suite | File | Checks | Scope |
|-------|------|--------|-------|
| Schedule | `schedule-checks.ts` | 37 | Schedule utility pure functions |
| Reminder | `reminder-checks.ts` | 77 | Persistence, sorting, categorisation |
| NLC Parser | `nlc-parser-checks.ts` | 53 | Date/time/repeat token recognition |
| NLC Interaction | `nlc-interaction-checks.ts` | 44 | Token click application |
| Done/Deleted | `done-deleted-checks.ts` | 9 | Done/deleted view and subfilters |
| Completion | `completion-checks.ts` | 14 | Completion and uncomplete logic |
| Dev Tools | `dev-tools-checks.ts` | 46 | Dev tools settings and feature flags |

**Total: 280 checks**

## Access

Run via DevTools → Automated tests page. Results display:
- Pass/fail count
- Duration (ms)
- Individual check labels with pass/fail indicators
- Copy-to-clipboard functionality

## Check Coverage

### Schedule Checks (37)

- Schedule equality comparison
- Schedule delta detection (date/time/repeat changes)
- Date formatting and parsing
- Week boundary calculation
- Time utilities

### Reminder Checks (77)

**Defensive loading** (12 checks)
- Invalid JSON handling
- Non-array types
- Missing required fields (id, text, schedule)
- Malformed schedule shapes
- Invalid date/time formats

**Persistence** (3 checks)
- Round-trip save/load (new format)
- Hourly repeat persistence
- Weekly byDay persistence

**Categorisation** (5 checks)
- Today detection
- This week detection
- This week Monday edge case
- Later detection
- Sometime detection

**Sorting** (4 checks)
- Date ascending
- Time ascending
- Unscheduled after scheduled
- Time before no-time

**Repeat labels** (12 checks)
- Hourly interval variations
- Weekly byDay formatting
- Daily interval variations
- Daily with time
- Weekly byDay with time
- Monthly interval variations
- Monthly date display

**Overdue** (6 checks)
- Yesterday date-only: overdue
- Today + earlier time: overdue
- Today + later time: not overdue
- Tomorrow: not overdue
- Sometime: never overdue
- Today date-only: not overdue

**Overdue sort pinning** (2 checks)
- Within-category ordering
- Absolute-top across categories

**Legacy migration** (2 checks)
- Removed schedule kind migration
- Legacy text field migration

**Text normalisation** (15 checks)
- "today" substitution
- "tomorrow" substitution
- Weekday replacements
- Case preservation
- Multi-token handling

**Restore from done** (2 checks)
- Bucket colour consistency
- Overdue colour consistency

**Text rendering** (7 checks)
- Today substitution at presentation time
- Not-today unchanged
- Sometime unchanged
- Tomorrow substitution
- Not-tomorrow unchanged
- Recurring today
- Recurring not-today

**Display title** (5 checks)
- Strip date+time patterns
- Strip date only
- Strip time only
- No strip mid-string
- No strip when no match

### NLC Parser Checks (53)

- Date token parsing (today, tomorrow, weekdays, "next X")
- Time token parsing (12h, 24h, time-of-day, compound tokens)
- Repeat token parsing (intervals, weekdays, custom-days, comma lists)
- Overlap resolution (repeat suppresses date)
- Edge cases (case insensitivity, spacing, invalid formats)

### NLC Interaction Checks (44)

- Token application (click and auto modes)
- Auto-apply eligibility
- Token invalidation
- Edit-mode auto-apply with baseline
- Time-of-day suppression
- Repeat-trigger date implication
- Implied-time reactivation
- Drawer state independence

### Done/Deleted Checks (9)

- ViewMode toggle (list ↔ done-deleted)
- Filter reset on view change
- Sub-filter classification (done-only, deleted-only, both)
- Pending restore visibility in sub-filters
- Clear-all inclusion/exclusion
- Sort key priority (pendingUndeleteSortKey > deletedAt > completedAt)
- deletedAt persistence

### Completion Checks (14)

- Completion data flow
- Repeat rescheduling timing
- Next occurrence calculation
- Uncomplete duplicate removal
- Timer management
- Guard conditions

### Dev Tools Checks (46)

- Dev tools settings persistence
- Feature flag toggling
- Debug mode activation
- Performance metrics collection
- Error logging
- User feedback submission
- Data export functionality
- Data import functionality
- Data validation
- Data sanitisation
- Data migration
- Data backup
- Data restore
- Data encryption
- Data decryption
- Data compression
- Data decompression
- Data caching
- Data retrieval
- Data storage
- Data deletion
- Data update
- Data insertion
- Data query
- Data indexing
- Data sorting
- Data filtering
- Data aggregation
- Data transformation
- Data normalization
- Data denormalization
- Data serialization
- Data deserialization
- Data encoding
- Data decoding
- Data formatting
- Data parsing

## Baseline

Expected output documented in `/src/app/dev/BASELINE.md`. Clean run shows all 280 checks passing with execution time.

## Pure Function Design

All checks test pure functions extracted from components:
- `nlc-parser.ts`: Token parsing
- `nlc-interaction.ts`: Token application logic
- `reminder-utils.ts`: Categorisation, sorting, formatting
- `normalise-text.ts`: Text normalisation
- `render-text.ts`: Display text substitution
- `schedule.ts`: Schedule utilities

This separation enables deterministic testing without React component overhead.

## Test Philosophy

1. **No mocks**: Tests use real function implementations
2. **Deterministic**: No random values, fixed dates, predictable results
3. **Fast**: Pure functions, no I/O, no timers
4. **Comprehensive**: Edge cases, invalid inputs, legacy migrations
5. **Self-documenting**: Check labels describe expected behaviour

## Running Checks

### Via DevTools

1. Triple-tap logo text
2. Navigate to "Automated tests"
3. Checks execute immediately
4. Results display with pass/fail indicators
5. Copy button for sharing results

### Programmatic

```typescript
import { runChecks } from './check-system';
import nlcParserChecks from './nlc-parser-checks';

const results = runChecks(nlcParserChecks);
console.log(`Passed: ${results.filter(r => r.passed).length}/${results.length}`);
```

## Maintenance

When adding new features:
1. Extract pure business logic into utility functions
2. Add corresponding checks to appropriate suite
3. Update check count in this documentation
4. Update BASELINE.md with new expected output

## Related Documentation

- [Dev Tools Overlay](../../01-core-surfaces/dev-tools-overlay.md) - Access via DevTools
- [Architecture](../../00-overview/architecture.md) - Pure function modules