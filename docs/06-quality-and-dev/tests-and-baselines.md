# Tests and Baselines

## Current Test Coverage

Reminderly currently has **425 self-checks across 8 suites**.

| Suite | Checks | Focus |
| --- | ---: | --- |
| Schedule and reminder logic | 37 | Schedule helpers and derived schedule state |
| Persistence and hydration | 143 | Reminder validation, migration, persistence, categorisation, sorting, labels, overdue logic, and rendering |
| Natural language parsing | 53 | Parser token recognition and hardening |
| Natural language interaction | 45 | Token application and auto-apply behaviour |
| Done, deleted, and completion | 27 | Done/deleted views, restore paths, ordering, and cleanup |
| Done, deleted, and completion | 36 | Completion logic and repeat rescheduling |
| Lists and smart reminders | 38 | Lists, templates, smart reminders, pinning, and list state rules |
| Dev tools and feature flags | 46 | Developer settings and feature-flag behaviour |

## Baseline Output

Expected clean-run output is tracked in `src/app/dev/BASELINE.md`.

### Clean Run Characteristics

- all 425 checks pass
- failed count is 0
- run invocation id varies per execution
- duration varies per execution
- output ordering is stable because the suite aggregation order is fixed

## Test Shape

The current self-checks are:

- pure-function driven
- in-memory only
- synchronous from the point of view of the UI runner
- grouped into labelled sections for reporting

The tests do not mount React components and do not directly verify:

- gesture handling
- animations
- overlay transitions
- responsive layout behaviour
- native iOS shell behaviour

## Running Tests

### Via Dev Tools

1. Open Dev tools from the header logo gesture.
2. Open `Automated tests`.
3. Run `Run self-checks`.
4. Review grouped results or copy the report text.

### Result Output

The page currently displays:

- run invocation id
- passed count
- failed count
- run duration
- grouped result sections
- per-check error text when a check throws

## Baseline Maintenance

When the implementation changes, the baseline and documentation must stay aligned with:

- suite count
- total check count
- section labels shown in the automated tests page
- current focus of each suite

## Related Documentation

- [Self-Check System](./self-check-system.md)
- [Dev Tools](./dev-tools.md)
- [Dev Tools Overlay](../01-core-surfaces/dev-tools-overlay.md)
