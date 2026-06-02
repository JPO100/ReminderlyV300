import type { Check } from './check-system';
import type { Reminder } from '../reminder-utils';
import { computeBadgeCount, getNextTimeRefreshBoundary } from '../reminder-utils';
import { buildScheduledNotifications } from '../notifications';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function yesterdayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function todayDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function tomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function futureDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function makeReminder(overrides: Partial<Reminder> = {}): Reminder {
  return {
    id: 'test-1',
    originalText: 'Test reminder',
    displayText: 'Test reminder',
    createdAt: Date.now(),
    schedule: { kind: 'scheduled', date: '2026-06-01', time: '10:00' },
    ...overrides,
  };
}

export function getNotificationChecks(): Check[] {
  return [
    {
      id: 'notif-badge-counts-overdue',
      name: 'Badge count: counts overdue reminders',
      run: () => {
        const now = new Date();
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'scheduled', date: yesterdayDate(), time: '08:00' } }),
        ];
        const count = computeBadgeCount(reminders, false, now);
        assert(count === 1, `Expected 1, got ${count}`);
      },
    },
    {
      id: 'notif-badge-includes-today-when-enabled',
      name: 'Badge count: includes today reminders when includeTodayInBadge is true',
      run: () => {
        const now = new Date();
        now.setHours(6, 0, 0, 0);
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'scheduled', date: todayDate(), time: '14:00' } }),
        ];
        const count = computeBadgeCount(reminders, true, now);
        assert(count === 1, `Expected 1, got ${count}`);
      },
    },
    {
      id: 'notif-badge-excludes-today-when-disabled',
      name: 'Badge count: excludes today reminders when includeTodayInBadge is false',
      run: () => {
        const now = new Date();
        now.setHours(6, 0, 0, 0);
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'scheduled', date: todayDate(), time: '14:00' } }),
        ];
        const count = computeBadgeCount(reminders, false, now);
        assert(count === 0, `Expected 0, got ${count}`);
      },
    },
    {
      id: 'notif-badge-excludes-completed',
      name: 'Badge count: excludes completed reminders',
      run: () => {
        const now = new Date();
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'scheduled', date: yesterdayDate(), time: '08:00' }, completedAt: Date.now() }),
        ];
        const count = computeBadgeCount(reminders, false, now);
        assert(count === 0, `Expected 0, got ${count}`);
      },
    },
    {
      id: 'notif-badge-excludes-deleted',
      name: 'Badge count: excludes deleted reminders',
      run: () => {
        const now = new Date();
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'scheduled', date: yesterdayDate(), time: '08:00' }, deletedAt: Date.now() }),
        ];
        const count = computeBadgeCount(reminders, false, now);
        assert(count === 0, `Expected 0, got ${count}`);
      },
    },
    {
      id: 'notif-badge-excludes-sometime',
      name: 'Badge count: excludes sometime reminders',
      run: () => {
        const now = new Date();
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'sometime' } }),
        ];
        const count = computeBadgeCount(reminders, true, now);
        assert(count === 0, `Expected 0, got ${count}`);
      },
    },
    {
      id: 'notif-badge-zero-when-empty',
      name: 'Badge count: returns 0 when no reminders match',
      run: () => {
        const now = new Date();
        const count = computeBadgeCount([], false, now);
        assert(count === 0, `Expected 0, got ${count}`);
      },
    },
    {
      id: 'notif-payload-badge-computed',
      name: 'Notification payload: sets badge to computed count at fire time',
      run: () => {
        const overdue = makeReminder({
          id: 'overdue-1',
          schedule: { kind: 'scheduled', date: yesterdayDate(), time: '08:00' },
        });
        const future = makeReminder({
          id: 'future-1',
          schedule: { kind: 'scheduled', date: tomorrowDate(), time: '10:00' },
        });
        const result = buildScheduledNotifications([overdue, future], true, false);
        const futureNotif = result.find((n) => n.extra.reminderId === 'future-1');
        assert(futureNotif !== undefined, 'Expected future notification');
        assert(futureNotif!.badge >= 1, `Expected badge >= 1, got ${futureNotif!.badge}`);
      },
    },
    {
      id: 'notif-payload-badge-zero-when-disabled',
      name: 'Notification payload: sets badge to 0 when notifAppBadge is false',
      run: () => {
        const future = makeReminder({
          id: 'future-1',
          schedule: { kind: 'scheduled', date: tomorrowDate(), time: '10:00' },
        });
        const result = buildScheduledNotifications([future], false, false);
        const notif = result.find((n) => n.extra.reminderId === 'future-1');
        assert(notif !== undefined, 'Expected notification');
        assert(notif!.badge === 0, `Expected badge 0, got ${notif!.badge}`);
      },
    },
    {
      id: 'notif-delta-positive-when-badge',
      name: 'Badge delta: sets badgeDeltaOnAction to 1 when badge > 0',
      run: () => {
        const overdue = makeReminder({
          id: 'overdue-1',
          schedule: { kind: 'scheduled', date: yesterdayDate(), time: '08:00' },
        });
        const future = makeReminder({
          id: 'future-1',
          schedule: { kind: 'scheduled', date: tomorrowDate(), time: '10:00' },
        });
        const result = buildScheduledNotifications([overdue, future], true, false);
        const futureNotif = result.find((n) => n.extra.reminderId === 'future-1');
        assert(futureNotif!.badge > 0, `Expected badge > 0, got ${futureNotif!.badge}`);
        assert(futureNotif!.extra.badgeDeltaOnAction === 1, `Expected delta 1, got ${futureNotif!.extra.badgeDeltaOnAction}`);
      },
    },
    {
      id: 'notif-delta-zero-when-no-badge',
      name: 'Badge delta: sets badgeDeltaOnAction to 0 when badge is 0',
      run: () => {
        const future = makeReminder({
          id: 'future-1',
          schedule: { kind: 'scheduled', date: tomorrowDate(), time: '10:00' },
        });
        const result = buildScheduledNotifications([future], false, false);
        const notif = result.find((n) => n.extra.reminderId === 'future-1');
        assert(notif!.badge === 0, `Expected badge 0, got ${notif!.badge}`);
        assert(notif!.extra.badgeDeltaOnAction === 0, `Expected delta 0, got ${notif!.extra.badgeDeltaOnAction}`);
      },
    },
    {
      id: 'notif-limit-64-no-midnight',
      name: 'Scheduling limits: limits to 64 notifications when no midnight needed',
      run: () => {
        const reminders: Reminder[] = [];
        for (let i = 0; i < 70; i++) {
          const date = futureDate(Math.floor(i / 24) + 1);
          const hour = String(i % 24).padStart(2, '0');
          reminders.push(makeReminder({
            id: `r-${i}`,
            displayText: `Reminder ${i}`,
            schedule: { kind: 'scheduled', date, time: `${hour}:00` },
          }));
        }
        const result = buildScheduledNotifications(reminders, true, false);
        assert(result.length === 64, `Expected 64, got ${result.length}`);
        assert(result.every((n) => n.title === 'Reminderly'), 'Expected all titles to be Reminderly');
      },
    },
    {
      id: 'notif-limit-63-plus-midnight',
      name: 'Scheduling limits: 63 reminder notifications plus midnight when date-only exists',
      run: () => {
        const reminders: Reminder[] = [
          makeReminder({ id: 'date-only', schedule: { kind: 'scheduled', date: todayDate() } }),
        ];
        for (let i = 0; i < 70; i++) {
          const date = futureDate(Math.floor(i / 24) + 1);
          const hour = String(i % 24).padStart(2, '0');
          reminders.push(makeReminder({
            id: `r-${i}`,
            displayText: `Reminder ${i}`,
            schedule: { kind: 'scheduled', date, time: `${hour}:00` },
          }));
        }
        const result = buildScheduledNotifications(reminders, true, false);
        const midnightNotif = result.find((n) => n.id === 2147483647);
        const reminderNotifs = result.filter((n) => n.id !== 2147483647);
        assert(midnightNotif !== undefined, 'Expected midnight notification');
        assert(reminderNotifs.length === 63, `Expected 63 reminder notifs, got ${reminderNotifs.length}`);
        assert(result.length === 64, `Expected 64 total, got ${result.length}`);
      },
    },
    {
      id: 'notif-midnight-included-date-only',
      name: 'Midnight notification: included when active date-only reminder exists',
      run: () => {
        const reminders = [
          makeReminder({ id: 'date-only', schedule: { kind: 'scheduled', date: todayDate() } }),
        ];
        const result = buildScheduledNotifications(reminders, true, false);
        const midnight = result.find((n) => n.id === 2147483647);
        assert(midnight !== undefined, 'Expected midnight notification');
      },
    },
    {
      id: 'notif-midnight-excluded-timed-only',
      name: 'Midnight notification: excluded when all reminders have times',
      run: () => {
        const reminders = [
          makeReminder({ id: 'timed', schedule: { kind: 'scheduled', date: tomorrowDate(), time: '10:00' } }),
        ];
        const result = buildScheduledNotifications(reminders, true, false);
        const midnight = result.find((n) => n.id === 2147483647);
        assert(midnight === undefined, 'Unexpected midnight notification');
      },
    },
    {
      id: 'notif-midnight-excluded-badge-disabled',
      name: 'Midnight notification: excluded when badge is disabled',
      run: () => {
        const reminders = [
          makeReminder({ id: 'date-only', schedule: { kind: 'scheduled', date: todayDate() } }),
        ];
        const result = buildScheduledNotifications(reminders, false, false);
        const midnight = result.find((n) => n.id === 2147483647);
        assert(midnight === undefined, 'Unexpected midnight notification when badge disabled');
      },
    },
    {
      id: 'notif-midnight-empty-title-body',
      name: 'Midnight notification: has empty title and body',
      run: () => {
        const reminders = [
          makeReminder({ id: 'date-only', schedule: { kind: 'scheduled', date: todayDate() } }),
        ];
        const result = buildScheduledNotifications(reminders, true, false);
        const midnight = result.find((n) => n.id === 2147483647);
        assert(midnight !== undefined, 'Expected midnight notification');
        assert(midnight!.title === '', `Expected empty title, got '${midnight!.title}'`);
        assert(midnight!.body === '', `Expected empty body, got '${midnight!.body}'`);
      },
    },
    {
      id: 'notif-midnight-excludes-completed',
      name: 'Midnight notification: excludes completed date-only reminders',
      run: () => {
        const reminders = [
          makeReminder({ id: 'date-only', schedule: { kind: 'scheduled', date: todayDate() }, completedAt: Date.now() }),
        ];
        const result = buildScheduledNotifications(reminders, true, false);
        const midnight = result.find((n) => n.id === 2147483647);
        assert(midnight === undefined, 'Unexpected midnight notification for completed reminder');
      },
    },
    {
      id: 'notif-midnight-excludes-deleted',
      name: 'Midnight notification: excludes deleted date-only reminders',
      run: () => {
        const reminders = [
          makeReminder({ id: 'date-only', schedule: { kind: 'scheduled', date: todayDate() }, deletedAt: Date.now() }),
        ];
        const result = buildScheduledNotifications(reminders, true, false);
        const midnight = result.find((n) => n.id === 2147483647);
        assert(midnight === undefined, 'Unexpected midnight notification for deleted reminder');
      },
    },
    {
      id: 'notif-all-64-slots-no-midnight',
      name: 'Scheduling limits: all 64 slots for reminders when no midnight needed',
      run: () => {
        const reminders: Reminder[] = [];
        for (let i = 0; i < 70; i++) {
          const date = futureDate(Math.floor(i / 24) + 1);
          const hour = String(i % 24).padStart(2, '0');
          reminders.push(makeReminder({
            id: `r-${i}`,
            displayText: `Reminder ${i}`,
            schedule: { kind: 'scheduled', date, time: `${hour}:00` },
          }));
        }
        const result = buildScheduledNotifications(reminders, true, false);
        assert(result.length === 64, `Expected 64, got ${result.length}`);
        assert(result.find((n) => n.id === 2147483647) === undefined, 'Unexpected midnight notification');
      },
    },
    {
      id: 'notif-refresh-boundary-midnight',
      name: 'Refresh boundary: returns ms to midnight when no timed reminders today',
      run: () => {
        const now = new Date();
        now.setHours(22, 0, 0, 0);
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const expectedMs = tomorrow.getTime() - now.getTime();
        const result = getNextTimeRefreshBoundary([], now);
        assert(result === expectedMs, `Expected ${expectedMs}, got ${result}`);
      },
    },
    {
      id: 'notif-refresh-boundary-next-timed',
      name: 'Refresh boundary: returns ms to next timed reminder when sooner than midnight',
      run: () => {
        const now = new Date();
        now.setHours(9, 0, 0, 0);
        const reminders = [
          makeReminder({ id: 'r1', schedule: { kind: 'scheduled', date: todayDate(), time: '10:00' } }),
        ];
        const expected = new Date(now);
        expected.setHours(10, 0, 0, 0);
        const expectedMs = expected.getTime() - now.getTime();
        const result = getNextTimeRefreshBoundary(reminders, now);
        assert(result === expectedMs, `Expected ${expectedMs}, got ${result}`);
      },
    },
  ];
}
