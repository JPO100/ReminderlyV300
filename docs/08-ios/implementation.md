# iOS Implementation

## Overview

Reminderly’s iOS app is a Capacitor-hosted shell around the web application. The native layer is intentionally thin and primarily provides app packaging, launch configuration, and local notification integration.

## Current File Structure

Key iOS wrapper files:

- `App/App/AppDelegate.swift`
- `App/App/Info.plist`
- `App/App/capacitor.config.json`
- `App/App/config.xml`
- `App/App/public/index.html`

## AppDelegate

`App/App/AppDelegate.swift` is currently a minimal Capacitor app delegate.

Current behaviour:

- imports `UIKit` and `Capacitor`
- uses `@UIApplicationMain`
- conforms to `UIApplicationDelegate` and `UIWindowSceneDelegate`
- returns `true` from `didFinishLaunchingWithOptions`
- forwards URL open handling to `ApplicationDelegateProxy.shared`
- forwards `NSUserActivity` continuation to `ApplicationDelegateProxy.shared`

There is no project-specific startup logic in the current app delegate.

## Info.plist

`App/App/Info.plist` currently defines the native shell configuration.

Current implementation includes:

- app display name `Reminderly`
- single-scene app configuration
- launch storyboard: `LaunchScreen`
- storyboard-backed main scene: `Main`
- `UIViewControllerBasedStatusBarAppearance = true`

### Orientation

The current iOS wrapper supports portrait only:

- `UISupportedInterfaceOrientations`
  - `UIInterfaceOrientationPortrait`

### Scene model

The current scene manifest explicitly disables multiple scenes:

- `UIApplicationSupportsMultipleScenes = false`

## Capacitor Config

`App/App/capacitor.config.json` currently contains:

- `appId: "com.reminderly.app"`
- `appName: "Reminderly"`
- `webDir: "dist"`
- `loggingBehavior: "none"`
- `packageClassList: ["LocalNotificationsPlugin"]`

This means the iOS wrapper loads the built web output from `dist` and includes Capacitor local notifications support.

## Cordova Config

`App/App/config.xml` currently contains:

- `<access origin="*" />`

No additional Cordova-specific rules are currently defined in this file.

## Web Shell

`App/App/public/index.html` is the web container entrypoint used by the iOS app bundle.

Current structure:

- standard root HTML scaffold
- `<div id="root"></div>` mount node
- current built JS asset reference
- current built CSS asset reference

The iOS app therefore serves the built web client inside the native wrapper rather than maintaining a separate native UI implementation.

## Local Notifications Integration

The current iOS shell participates in local notification support through Capacitor.

### Native/plugin side

- `LocalNotificationsPlugin` is registered in `capacitor.config.json`

### Web/app side

- `src/main.tsx` registers the `localNotificationActionPerformed` listener
- tapped notification ids are written to `reminderly.pendingNotificationReminderId`
- the app dispatches `reminderly:notification-tap`
- `src/app/useNotificationTapHandler.ts` resolves that id back into the app UI

### Scheduling side

`src/app/notifications.ts` derives local notifications from the current reminder set and syncs them through the Capacitor local notifications API.

## Relationship Between Native and Web Layers

The current relationship is:

- native iOS provides the app container, scene lifecycle, launch screen, orientation rules, and plugin bridge
- the web app provides the full product UI and business logic
- notification scheduling and tap handling are implemented in the web app, but delivered through the native Capacitor plugin bridge

There is no duplicated native Swift feature implementation for reminders, lists, filters, overlays, or settings.
