import type { RepeatConfig } from '../reminder-utils';
import type { RepeatRule } from '../types/reminder';

const DAY_ABBREV: Record<string, 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'> = {
  'Monday': 'mo',
  'Tuesday': 'tu',
  'Wednesday': 'we',
  'Thursday': 'th',
  'Friday': 'fr',
  'Saturday': 'sa',
  'Sunday': 'su',
};

export function repeatConfigToRule(config: RepeatConfig): RepeatRule | null {
  if (!config) return null;
  if (config.frequency === 'custom-days') {
    const byDay = (config.selectedDays ?? [])
      .map(d => DAY_ABBREV[d])
      .filter((d): d is NonNullable<typeof d> => d != null);
    if (byDay.length > 0) {
      return { frequency: 'weekly', interval: 1, byDay };
    }
    return null;
  }
  return {
    frequency: config.frequency,
    interval: config.interval ?? 1,
    byDay: null,
  };
}
