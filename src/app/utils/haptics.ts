import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/** Light tap — good for toggles and selections */
export const hapticsLight = () => {
  Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
};

/** Medium tap — good for button presses */
export const hapticsMedium = () => {
  Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
};

/** Success notification — good for completing/creating reminders */
export const hapticsSuccess = () => {
  Haptics.notification({ type: NotificationType.Success }).catch(() => {});
};

/** Warning notification — good for delete actions */
export const hapticsWarning = () => {
  Haptics.notification({ type: NotificationType.Warning }).catch(() => {});
};

/** Error notification — good for destructive or error states */
export const hapticsError = () => {
  Haptics.notification({ type: NotificationType.Error }).catch(() => {});
};

/** Selection tick — good for swipe threshold reached */
export const hapticsSelection = () => {
  Haptics.selectionStart().catch(() => {});
};
