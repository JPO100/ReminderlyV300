import { LocalNotifications } from "@capacitor/local-notifications";
import type { Reminder } from "./reminder-utils";

export const PENDING_NOTIFICATION_REMINDER_ID_KEY = "reminderly.pendingNotificationReminderId";
export const NOTIFICATION_TAP_EVENT = "reminderly:notification-tap";

type ScheduledNotificationPayload = {
    id: number;
    title: string;
    body: string;
    schedule: { at: Date };
    extra: { reminderId: string };
};

function toNotificationAtIso(value: unknown): string | null {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string") {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    return null;
}

function getNotificationSignature(notification: {
    id?: number;
    title?: string;
    body?: string;
    schedule?: { at?: unknown };
    extra?: { reminderId?: unknown };
}): string {
    return JSON.stringify({
        id: notification.id ?? null,
        title: notification.title ?? "",
        body: notification.body ?? "",
        at: toNotificationAtIso(notification.schedule?.at) ?? null,
        reminderId: typeof notification.extra?.reminderId === "string" ? notification.extra.reminderId : null,
    });
}

export function buildScheduledNotifications(reminders: Reminder[]): ScheduledNotificationPayload[] {
    return reminders
        .filter((reminder) => {
            if (reminder.completedAt != null) return false;
            if (reminder.deletedAt != null) return false;
            if (reminder.schedule.kind !== "scheduled") return false;
            if (!reminder.schedule.time) return false;

            const [year, month, day] = reminder.schedule.date.split("-").map(Number);
            const [hour, minute] = reminder.schedule.time.split(":").map(Number);
            const at = new Date(year, month - 1, day, hour, minute, 0, 0);

            return at.getTime() > Date.now();
        })
        .map((reminder) => {
            const [year, month, day] = reminder.schedule.date.split("-").map(Number);
            const [hour, minute] = reminder.schedule.time!.split(":").map(Number);
            const at = new Date(year, month - 1, day, hour, minute, 0, 0);

            const notificationId = Array.from(reminder.id).reduce(
                (acc, char) => ((acc * 31) + char.charCodeAt(0)) % 2147483647,
                1
            );

            return {
                id: notificationId,
                title: "Reminderly",
                body: reminder.displayText,
                schedule: { at },
                extra: { reminderId: reminder.id },
            };
        });
}

export async function syncReminderNotifications(reminders: Reminder[]) {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== "granted") return;

    const notifications = buildScheduledNotifications(reminders);
    const pending = await LocalNotifications.getPending();

    const pendingSignatures = pending.notifications
        .map((notification) => getNotificationSignature(notification))
        .sort();
    const desiredSignatures = notifications
        .map((notification) => getNotificationSignature(notification))
        .sort();

    if (
        pendingSignatures.length === desiredSignatures.length &&
        pendingSignatures.every((signature, index) => signature === desiredSignatures[index])
    ) {
        return;
    }

    if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({
            notifications: pending.notifications.map((notification) => ({
                id: notification.id,
            })),
        });
    }

    if (notifications.length > 0) {
        await LocalNotifications.schedule({ notifications });
    }
}
