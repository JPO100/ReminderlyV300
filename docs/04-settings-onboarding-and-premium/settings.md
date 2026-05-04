# Settings

See [Settings Overlay](../01-core-surfaces/settings-overlay.md) for the current surface structure.

## Current User-Facing Settings

The current settings surface exposes one live user setting:

### Show date and time subtitles

- persistence key: `reminderly.showDateAndTimeSubtitles`
- default: `true`
- only changes reminder row subtitle visibility when grouped reminder filters are active
- automatically resets to `true` when grouped filters are no longer active

## Tutorial Access

The settings surface can also expose tutorial re-entry:

- row label: `Reminderly tutorial`
- shown only when the onboarding tutorial feature is enabled
- opens the tutorial bottom sheet

## Premium Presentation

When lists are enabled, settings also shows the premium marketing section:

- `Unlimited reminders`
- `Natural Language Capture`
- `Repeat reminders`
- CTA button pricing copy

These controls are currently presentation only and do not unlock product state.

## Related Documentation

- [Settings Overlay](../01-core-surfaces/settings-overlay.md)
- [Premium UI](./premium-ui.md)
- [Onboarding and Tutorial](./onboarding-and-tutorial.md)
