# Dev Tools

See [Dev Tools Overlay](../01-core-surfaces/dev-tools-overlay.md) for complete developer tools documentation.

## Overview

Built-in developer diagnostic and testing system accessible via triple-tap on the Reminderly logo text.

## Features

- **Automated tests**: Run full self-check suite (280 checks)
- **Dummy reminders**: Generate test data across all categories
- **Dummy lists**: Dev-only page for lists testing

## Dev-Only State

State that only affects dev tools, not production behaviour:

- `nlcMode`: `'click' | 'auto'` (default: 'auto')
- `filtersMenuVariant`: `'standard' | 'grouped'` (default: 'standard')
- `hideOverdue`: `boolean` (default: false)

None of these states are persisted to localStorage.

## Self-Check Suite

See [Self-Check System](./self-check-system.md) for complete test coverage documentation.

## Related Documentation

- [Dev Tools Overlay](../01-core-surfaces/dev-tools-overlay.md) - Complete UI and feature documentation
- [Self-Check System](./self-check-system.md) - Test suite details