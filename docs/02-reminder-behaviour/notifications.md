# Notifications

## Overview

Reminderly uses local notifications for scheduled reminders that have a future date and time. Notification scheduling, cancellation, and tap handling are all derived from the current reminder collection. Notifications also carry badge payloads so the app icon badge stays correct when the app is closed.

## Scheduling Source

Notification scheduling is derived from the reminders array, not from a separate notification model.

Implementation files:

- `src/app/notifications.ts` — scheduling, badge computation, sync
- `src/main.tsx` — notification listener bridge
- `src/app/useNotificationTapHandler.ts` — tap/action processing

## Which Reminders Become Notifications

`buildScheduledNotifications(reminders, notifAppBadge, notifIncludeTodayInBadge)` includes only reminders that are:

- not completed
- not deleted
- `schedule.kind === "scheduled"`
- have a `schedule.time`
- scheduled for a future moment

Reminders are excluded when:

- they are `sometime`
- they have a date but no time
- they are already completed
- they are deleted
- their scheduled date/time is already in the past

## Notification Payload

Each scheduled notification contains:

- deterministic numeric notification id derived from the reminder id
- title: `Reminderly`
- body: `reminder.displayText`
- `schedule.at`: JavaScript `Date`
- `extra.reminderId`: original reminder id
- `extra.badgeDeltaOnAction`: `1` when badge > 0, `0` otherwise
- `actionTypeId`: `reminder-actions`
- `badge`: computed overdue/today count at notification fire time

## Badge Payload

Each notification carries a `badge` value computed by `computeBadgeCount` evaluated at the notification's fire time (plus 1ms so the firing reminder counts as overdue).

- When `notifAppBadge` is enabled: badge reflects the overdue count (plus today count if `notifIncludeTodayInBadge` is on)
- When `notifAppBadge` is disabled: badge is `0`

iOS natively sets the app icon badge from `content.badge` when the notification fires, including when the app is backgrounded or force-closed.

## Badge Delta on Action

Each notification's `extra.badgeDeltaOnAction` tells the native handler how much to decrement the badge when the user acts on a notification without opening the app.

- `1` when the notification has badge > 0 (the acted-upon reminder will be resolved, reducing the count by one)
- `0` when badge is disabled

## Notification Action Types

Registered action types for `reminder-actions`:

- `mark-done` — marks the reminder as completed
- `move-tomorrow` — reschedules the reminder to tomorrow

## Native Badge Correction

When a user acts on a notification via long-press (mark-done or move-tomorrow), the native `LocalNotificationsHandler` in `didReceive`:

1. Reads `badgeDeltaOnAction` from the notification's `cap_extra` userInfo
2. If delta > 0:
   - Reads the current badge from `UIApplication.shared.applicationIconBadgeNumber`
   - Decrements by delta, clamped to 0
   - Writes the corrected value to `UserDefaults` under `reminderly.nativeBadgeCount`
   - Sets the app icon badge to the corrected value
   - Reschedules all pending notifications with their badge values decremented by delta
3. If delta is 0: no badge change; existing JS event flow handles reconciliation on app open

The pending notification rescheduling uses `beginBackgroundTask` as a safety net to ensure completion.

## Silent Midnight Badge Notification

A silent badge-only notification is scheduled for the next midnight to handle day-boundary badge transitions (e.g. a date-only reminder becoming overdue at midnight).

This notification is only scheduled when:

- `notifAppBadge` is enabled
- at least one active date-only scheduled reminder exists (not completed, not deleted, `kind === "scheduled"`, no time)

The midnight notification:

- has empty title and body (no visible Notification Centre entry)
- has `silent: true` flag
- uses a stable dedicated id (`2147483647`) that does not conflict with reminder notification ids
- carries the computed badge count for immediately after midnight

When no active date-only reminders exist, the midnight notification is not scheduled and all 64 slots are available for timed reminder notifications.

## Scheduling Limits

iOS allows a maximum of 64 pending local notifications per app.

- When no midnight badge notification is needed: up to 64 timed reminder notifications are scheduled, sorted by fire time ascending
- When midnight badge notification is needed: 1 slot is reserved for it, leaving 63 slots for timed reminder notifications

## Signature-Based Dedup

`syncReminderNotifications` compares pending notifications against desired notifications using a normalised signature that includes:

- notification id
- title
- body
- scheduled ISO timestamp
- `extra.reminderId`
- `extra.badgeDeltaOnAction`
- `actionTypeId`
- `badge`

If signatures match, no cancel/reschedule cycle occurs.

## When Sync Runs

`App.tsx` calls:

```ts
void syncReminderNotifications(reminders, notifAppBadge, notifIncludeTodayInBadge);
```

as an effect dependent on `reminders`, `notifAppBadge`, and `notifIncludeTodayInBadge`, so notification state stays derived from the current persisted reminder list and badge settings.

## App Foreground Badge Refresh

When the app is in the foreground, badge count is kept current by:

- `computeBadgeCount` evaluated on reminder changes
- `getNextTimeRefreshBoundary` timer that re-evaluates at midnight or when the next timed reminder becomes overdue
- Resume refresh via `visibilitychange` and `appStateChange` events

## Closed-App Badge Behaviour

When the app is not open:

- Notification badge payloads update the app icon badge when notifications fire
- Notification action badge correction updates the badge without opening the app
- Silent midnight notification updates the badge at day boundaries (when date-only reminders exist)
- Full reconciliation occurs when the app is next opened

Limitations:

- Badge is only updated at notification fire times and midnight — not continuously
- If all 64 notification slots are used and more reminders exist, later reminders will not have scheduled notifications
- Midnight badge notification only covers one day boundary; multi-day gaps require app open for reconciliation

## Native Badge Support

The `@capacitor/local-notifications` plugin does not natively support the `badge` field on notification content. A patch via `patch-package` adds this support:

- `LocalNotificationsPlugin.swift`: reads `badge` from notification payload and sets `content.badge`
- `LocalNotificationsHandler.swift`: stores badge to UserDefaults on foreground delivery, corrects badge on notification actions, reschedules pending notification badges

Patch file: `patches/@capacitor+local-notifications+8.0.2.patch`

The `postinstall` script in `package.json` runs `patch-package` to apply the patch on `npm install`.

## Tap-to-Open Flow

### Native/web bridge handoff

`main.tsx` listens for `localNotificationActionPerformed`.

When a notification is tapped:

1. `event.notification.extra.reminderId` is read
2. that id is stored under `reminderly.pendingNotificationReminderId`
3. the browser event `reminderly:notification-tap` is dispatched

## In-App Open Behaviour

`useNotificationTapHandler(...)` handles both:

- the pending reminder id already in localStorage on load
- subsequent `reminderly:notification-tap` events

When a valid tapped reminder is found, the handler:

1. closes open overlays
2. switches to the `reminders` main tab
3. sets `viewMode` to `list`
4. sets `activeFilter` to `all`
5. waits 300ms
6. opens the reminder info overlay for the tapped reminder
7. removes `reminderly.pendingNotificationReminderId`

## Tracking Keys and Events

- localStorage key: `reminderly.pendingNotificationReminderId`
- localStorage key: `reminderly.pendingNotificationAction`
- UserDefaults key: `reminderly.nativeBadgeCount`
- window event: `reminderly:notification-tap`

## Notes

- notification scheduling is reminder-driven, not list-driven
- smart reminders can produce notifications because they are stored as reminders when they have a scheduled date/time
- there is no separate persisted notification registry in app storage
