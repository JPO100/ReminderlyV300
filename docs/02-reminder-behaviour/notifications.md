# Notifications

## Overview

Reminderly currently uses local notifications for scheduled reminders that still have a future date and a time. Notification scheduling, cancellation, and tap handling are all derived from the current reminder collection.

## Scheduling Source

Notification scheduling is derived from the reminders array, not from a separate notification model.

Current implementation files:

- `src/app/notifications.ts`
- `src/main.tsx`
- `src/app/useNotificationTapHandler.ts`

## Which Reminders Become Notifications

`buildScheduledNotifications(reminders)` currently includes only reminders that are:

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

Each scheduled notification currently contains:

- deterministic numeric notification id derived from the reminder id
- title: `Reminderly`
- body: `reminder.displayText`
- `schedule.at`: JavaScript `Date`
- `extra.reminderId`: original reminder id

## Sync Behaviour

`syncReminderNotifications(reminders)` currently:

1. requests local notification permissions
2. builds the desired notification set from the current reminders array
3. reads pending notifications from the local notifications plugin
4. compares pending vs desired by a normalised signature
5. does nothing if they already match
6. otherwise cancels all pending notifications
7. schedules the newly desired notifications

The signature comparison currently includes:

- notification id
- title
- body
- scheduled ISO timestamp
- `extra.reminderId`

## When Sync Runs

`App.tsx` currently calls:

```ts
void syncReminderNotifications(reminders);
```

after reminder-state changes, so notification state stays derived from the current persisted reminder list.

## Tap-to-Open Flow

### Native/web bridge handoff

`main.tsx` listens for:

- `localNotificationActionPerformed`

When a notification is tapped:

1. `event.notification.extra.reminderId` is read
2. that id is stored under `reminderly.pendingNotificationReminderId`
3. the browser event `reminderly:notification-tap` is dispatched

## In-App Open Behaviour

`useNotificationTapHandler(...)` handles both:

- the pending reminder id already in localStorage on load
- subsequent `reminderly:notification-tap` events

When a valid tapped reminder is found, the handler currently:

1. closes the tutorial overlay
2. closes the reminder editor
3. closes the lists overlay
4. closes the repeats overlay
5. closes the settings overlay
6. switches to the `reminders` main tab
7. sets `viewMode` to `list`
8. sets `activeFilter` to `all`
9. waits `300ms`
10. opens the reminder info overlay for the tapped reminder
11. removes `reminderly.pendingNotificationReminderId`

## Tracking Keys and Events

- localStorage key: `reminderly.pendingNotificationReminderId`
- window event: `reminderly:notification-tap`

## Notes

- notification scheduling is reminder-driven, not list-driven
- smart reminders can produce notifications because they are stored as reminders when they have a scheduled date/time
- there is no separate persisted notification registry in app storage
