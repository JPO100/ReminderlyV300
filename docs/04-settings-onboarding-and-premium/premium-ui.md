# Premium UI

## Overview

The premium features section is a display-only UI component within the Settings overlay. It showcases three premium features with locked toggles and a call-to-action button.

## Location

Bottom section of SettingsOverlay, below user settings. Background `#FAFAFA` with grey keyline separator.

## Visibility

The entire premium-features container is controlled by the Paywall feature flag (see Feature Flag section below). When the flag is disabled, the container does not render at all.

## Features Displayed

### 1. Unlimited Reminders
- **Icon**: Stacked reminders icon (hidden at 667px)
- **Title**: "Unlimited reminders"
- **Description**: "No limit on reminders you create" / "No limit on reminders" (667px)
- **Bullet**: "Unlock the 10 reminder limit" (hidden at 667px)
- **Toggle**: Locked OFF state (grey track, white thumb left)

### 2. Natural Language Capture
- **Icon**: Chat bubble icon (hidden at 667px)
- **Title**: "Natural Language Capture"
- **Description**: "Capture dates and times as you type;" / "Capture dates and times" (667px)
- **Bullets**: Example phrases with blue highlights (hidden at 667px)
- **Toggle**: Locked OFF state

Note: NLC is actually implemented and functional in the app. This premium UI is display-only.

### 3. Repeat Reminders
- **Icon**: Circular arrows icon (hidden at 667px)
- **Title**: "Repeat reminders"
- **Description**: "Set it once and leave it to run"
- **Bullets**: "Daily, weekly, monthly or custom", "Ideal for bills and meetings etc." (hidden at 667px)
- **Toggle**: Locked OFF state

Note: Repeats are actually implemented and functional in the app. This premium UI is display-only.

## CTA Button

- **Label**: "Get premium features for £9 a year!" / "Get premium for £9 a year!" (667px)
- **Styling**: Blue `#4784F8`, white text, Lato Bold 17px
- **Height**: `clamp(40px, calc(20vh - 73.6px), 60px)` (viewport-responsive)
- **Action**: Display-only, no functional integration

## State

All premium features are non-functional UI elements:
- Toggles are locked and not interactive
- CTA button has no click handler
- Features displayed regardless of actual app capabilities

## Responsive Behaviour (iPhone SE 667px)

At 667px viewport height or below:
- Left icons hidden
- Bullet points hidden
- Shorter description text variants
- Reduced gap between rows (24px vs 30px)
- Shorter CTA button text

## Feature Flag

The Paywall feature flag controls visibility of the entire premium-features container.

**Control**: Dev Tools → Paywall toggle (Features section)
- Accessible via Dev Tools (triple-tap Reminderly logo)
- Follows the same confirmation pop-up pattern as NLC and Onboarding Tutorial toggles

**Confirmation behaviour**:

When enabling:
- Title: "Turn on paywall?"
- Description: "This will show paywall-related UI that is currently gated behind the Paywall feature flag."
- Buttons: "Cancel" (grey) and "Yes, turn on" (dark blue)

When disabling:
- Title: "Turn off paywall?"
- Description: "This will hide paywall-related UI that is currently gated behind the Paywall feature flag."
- Buttons: "Cancel" (grey) and "Yes, turn off" (dark blue)

Interaction:
- Cancel dismisses the pop-up without changing state
- Confirm applies the pending state change
- Clicking backdrop dismisses the pop-up without changing state

**Implementation**:
- State: `isPaywallEnabled: boolean` (in App.tsx)
- Storage key: `reminderly-ff-paywall`
- Default: `true` (paywall UI visible)
- Persistence: localStorage

**Current scope**:
- Controls visibility of the premium-features container in Settings overlay
- When ON: container is rendered
- When OFF: container is not rendered at all

**Future scope**:
- Additional paywall-related UI may be gated by this flag in future

## Related Documentation

- [Settings Overlay](../01-core-surfaces/settings-overlay.md) - Full settings overlay documentation
- [NLC](../03-natural-language-and-scheduling/nlc.md) - Actual NLC implementation (already functional)
- [Repeats](../03-natural-language-and-scheduling/repeats.md) - Actual repeats implementation (already functional)
- [Dev Tools Overlay](../01-core-surfaces/dev-tools-overlay.md) - Developer tools documentation