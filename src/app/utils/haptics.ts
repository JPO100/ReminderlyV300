import { Haptics, ImpactStyle } from '@capacitor/haptics';

/** Single tap feedback for all user actions */
export const hapticTap = () => {
  Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
};
