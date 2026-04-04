import { useEffect } from "react";
import type { Reminder, ReminderCategory, ViewMode } from "./reminder-utils";
import { NOTIFICATION_TAP_EVENT, PENDING_NOTIFICATION_REMINDER_ID_KEY } from "./notifications";

type NotificationTapHandlerOptions = {
    reminders: Reminder[];
    setIsTutorialOpen: (value: boolean) => void;
    setIsOverlayOpen: (value: boolean) => void;
    setIsListsOverlayOpen: (value: boolean) => void;
    setIsRepeatsOverlayOpen: (value: boolean) => void;
    setIsSettingsOpen: (value: boolean) => void;
    setViewMode: (value: ViewMode) => void;
    setActiveFilter: (value: ReminderCategory | "all") => void;
    setInfoReminder: (reminder: Reminder | null) => void;
};

export function useNotificationTapHandler({
    reminders,
    setIsTutorialOpen,
    setIsOverlayOpen,
    setIsListsOverlayOpen,
    setIsRepeatsOverlayOpen,
    setIsSettingsOpen,
    setViewMode,
    setActiveFilter,
    setInfoReminder,
}: NotificationTapHandlerOptions) {
    useEffect(() => {
        let openTimer: number | null = null;

        const openTappedReminder = () => {
            const reminderId = localStorage.getItem(PENDING_NOTIFICATION_REMINDER_ID_KEY);
            if (!reminderId) return;

            const tappedReminder = reminders.find((reminder) => reminder.id === reminderId);
            if (!tappedReminder) return;

            setIsTutorialOpen(false);
            setIsOverlayOpen(false);
            setIsListsOverlayOpen(false);
            setIsRepeatsOverlayOpen(false);
            setIsSettingsOpen(false);
            setViewMode("list");
            setActiveFilter("all");

            if (openTimer !== null) {
                clearTimeout(openTimer);
            }
            openTimer = window.setTimeout(() => {
                setInfoReminder(tappedReminder);
            }, 300);

            localStorage.removeItem(PENDING_NOTIFICATION_REMINDER_ID_KEY);
        };

        openTappedReminder();
        window.addEventListener(NOTIFICATION_TAP_EVENT, openTappedReminder);

        return () => {
            window.removeEventListener(NOTIFICATION_TAP_EVENT, openTappedReminder);
            if (openTimer !== null) {
                clearTimeout(openTimer);
            }
        };
    }, [
        reminders,
        setActiveFilter,
        setInfoReminder,
        setIsListsOverlayOpen,
        setIsOverlayOpen,
        setIsRepeatsOverlayOpen,
        setIsSettingsOpen,
        setIsTutorialOpen,
        setViewMode,
    ]);
}
