# Settings

See [Settings Overlay](../01-core-surfaces/settings-overlay.md) for complete settings documentation.

## Settings System

The settings system provides user-facing configuration options accessible from the Settings overlay.

### Current Settings

**Show date and time subtitles**
- Toggle visibility of subtitle line in reminder rows
- Only effective in grouped filters mode
- Default: true
- Persisted to localStorage under `reminderly.showDateAndTimeSubtitles`
- Auto-resets to true when leaving grouped filters mode

### Feature Flag System

**Tutorial Access** (`isOnboardingTutorialEnabled`)
- Controls visibility of "Reminderly tutorial" row
- Feature flag in App.tsx

## Related Documentation

- [Settings Overlay](../01-core-surfaces/settings-overlay.md) - Complete settings UI documentation
