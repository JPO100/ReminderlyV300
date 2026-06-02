import { LocalNotifications } from "@capacitor/local-notifications";
import type { Reminder } from "./reminder-utils";

export const PENDING_NOTIFICATION_REMINDER_ID_KEY = "reminderly.pendingNotificationReminderId";
export const PENDING_NOTIFICATION_ACTION_KEY = "reminderly.pendingNotificationAction";
export const NOTIFICATION_TAP_EVENT = "reminderly:notification-tap";

type ScheduledNotificationPayload = {
    id: number;
    title: string;
    body: string;
    schedule: { at: Date };
    extra: { reminderId: string };
    actionTypeId: string;
};

export async function registerNotificationActionTypes() {
    try {
        await LocalNotifications.registerActionTypes({
            types: [
                {
                    id: "reminder-actions",
                    actions: [
                        { id: "mark-done", title: "Mark as done" },
                        { id: "move-tomorrow", title: "Move to tomorrow" },
                    ],
                },
            ],
        });
    } catch {
        // Not available on web
    }
}

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
    actionTypeId?: string;
}): string {
    return JSON.stringify({
        id: notification.id ?? null,
        title: notification.title ?? "",
        body: notification.body ?? "",
        at: toNotificationAtIso(notification.schedule?.at) ?? null,
        reminderId: typeof notification.extra?.reminderId === "string" ? notification.extra.reminderId : null,
        actionTypeId: notification.actionTypeId ?? "",
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
                actionTypeId: "reminder-actions",
            };
        });
}

// TEMPORARY SPIKE — Stage 2 badge tests. Remove after testing.
export async function scheduleBadgeSpike() {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== "granted") return;

    const now = Date.now();

    // Spike A: visible notification with badge=5, fires in 2 minutes
    const spikeA = {
        id: 999901,
        title: "Spike A",
        body: "Badge should be 5",
        schedule: { at: new Date(now + 2 * 60 * 1000) },
        extra: { reminderId: "spike-a" },
        actionTypeId: "reminder-actions",
        badge: 5,
    };

    // Spike B: silent badge-only notification with badge=7, fires in 3 minutes
    const spikeB = {
        id: 999902,
        title: "",
        body: "",
        schedule: { at: new Date(now + 3 * 60 * 1000) },
        extra: { reminderId: "spike-b" },
        badge: 7,
    };

    await LocalNotifications.schedule({ notifications: [spikeA, spikeB] as any });
    console.log("[SPIKE] Spike A scheduled for", new Date(now + 2 * 60 * 1000).toLocaleTimeString());
    console.log("[SPIKE] Spike B scheduled for", new Date(now + 3 * 60 * 1000).toLocaleTimeString());
}

export async function syncReminderNotifications(reminders: Reminder[]) {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== "granted") return;

    const notifications = buildScheduledNotifications(reminders);
    const pending = await LocalNotifications.getPending();

    // TEMPORARY SPIKE — exclude spike IDs from signature comparison
    const SPIKE_IDS_SIG = new Set([999901, 999902]);
    const pendingSignatures = pending.notifications
        .filter((notification) => !SPIKE_IDS_SIG.has(notification.id))
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

    // TEMPORARY SPIKE — preserve spike notification IDs during cancel
    const SPIKE_IDS = new Set([999901, 999902]);
    const toCancel = pending.notifications.filter((notification) => !SPIKE_IDS.has(notification.id));
    if (toCancel.length > 0) {
        await LocalNotifications.cancel({
            notifications: toCancel.map((notification) => ({
                id: notification.id,
            })),
        });
    }

    if (notifications.length > 0) {
        await LocalNotifications.schedule({ notifications });
    }
}
