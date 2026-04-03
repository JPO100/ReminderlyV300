# Tests and Baselines

## Test Coverage

### Total Coverage

**280 checks** across 7 test suites:

| Suite | Checks | Focus |
|-------|--------|-------|
| Schedule | 37 | Schedule utility pure functions |
| Reminder | 77 | Persistence, sorting, categorisation |
| NLC Parser | 53 | Date/time/repeat token recognition |
| NLC Interaction | 44 | Token click application |
| Done/Deleted | 9 | Done/deleted view and subfilters |
| Completion | 14 | Completion and uncomplete logic |
| Dev Tools | 46 | Dev tools settings and feature flags |

## Baseline Output

Expected clean run output documented in `/src/app/dev/BASELINE.md`.

### Clean Run Characteristics

- All 280 checks pass
- Execution time: typically < 100ms
- No errors or warnings
- Deterministic results (same output every run)

## Test Philosophy

### Pure Functions

All tests validate pure functions:
- No React components
- No DOM manipulation
- No async operations
- No external dependencies

### Deterministic

- Fixed dates (no Date.now() in tests)
- Predictable inputs
- Consistent outputs
- No randomness

### Fast Execution

- In-memory only
- No I/O operations
- No network calls
- No timers

### Comprehensive Coverage

- Happy paths
- Edge cases
- Invalid inputs
- Legacy migration
- Boundary conditions

## Test Organization

### Check Structure

```typescript
type Check = {
  label: string; // Describes expected behaviour
  fn: () => boolean; // Returns true (pass) or false (fail)
};
```

### Suite Organization

Each suite is a self-contained module exporting an array of checks:

```typescript
export default [
  { label: "Today detection", fn: () => { /* test */ } },
  { label: "This week detection", fn: () => { /* test */ } },
  // ...
];
```

## Running Tests

### Via DevTools

1. Triple-tap logo
2. Navigate to "Automated tests"
3. Tests execute immediately
4. Results display with pass/fail indicators

### Programmatic

```typescript
import { runChecks } from './check-system';
import allChecks from './all-checks'; // Aggregated

const results = runChecks(allChecks);
```

## Baseline Maintenance

When adding features:
1. Add corresponding checks to appropriate suite
2. Run full suite to verify all pass
3. Update BASELINE.md with new check count
4. Update this documentation

## Coverage Gaps

Areas without automated checks:
- UI interactions (clicks, gestures)
- Animation timing
- localStorage persistence (partially covered)
- Responsive layout breakpoints
- Overlay positioning
- Error handling edge cases

These require manual verification.

## Related Documentation

- [Self-Check System](./self-check-system.md) - Complete test system documentation
- [Dev Tools Overlay](../../01-core-surfaces/dev-tools-overlay.md) - How to run tests
- [Architecture](../../00-overview/architecture.md) - Pure function design