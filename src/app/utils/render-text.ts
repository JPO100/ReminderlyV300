/**
 * Presentation-only text substitution for the reminder list.
 *
 * If a scheduled reminder is due today, replaces the first
 * "on <weekday>" or "on <d Mon>" phrase with "today".
 * If due tomorrow, replaces the same phrase with "tomorrow".
 *
 * Never mutates stored data — returns a derived string for rendering only.
 */

import type { Reminder } from '../reminder-utils';
import { formatTime12h } from './normalise-text';

/**
 * Return display text with "today"/"tomorrow" substituted for the date phrase
 * when the reminder is scheduled for the same or next calendar day as `now`.
 */
export function renderReminderText(reminder: Reminder, now: Date): string {
  if (reminder.schedule.kind !== 'scheduled') return reminder.displayText;

  const dateStr = reminder.schedule.date; // "YYYY-MM-DD"
  if (!dateStr) return reminder.displayText;

  // Parse schedule date components (avoid timezone shift from new Date(string))
  const [y, m, d] = dateStr.split('-').map(Number);

  // Check today
  const isToday =
    now.getFullYear() === y &&
    now.getMonth() + 1 === m &&
    now.getDate() === d;

  // Check tomorrow (local calendar math, no Date string parsing)
  const tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const isTomorrow =
    !isToday &&
    tomorrowDate.getFullYear() === y &&
    tomorrowDate.getMonth() + 1 === m &&
    tomorrowDate.getDate() === d;

  if (!isToday && !isTomorrow) return reminder.displayText;

  const label = isToday ? 'today' : 'tomorrow';

  // ── Recurring reminders due today ──
  // Strip everything from "every …" onward, render as "{base} today at {time}"
  if (isToday && reminder.repeatRule) {
    const everyIdx = reminder.displayText.search(/\bevery\b/i);
    if (everyIdx !== -1) {
      const base = reminder.displayText.slice(0, everyIdx).trim();
      // Format time from schedule if present
      if (reminder.schedule.kind === 'scheduled' && reminder.schedule.time) {
        const [hh, mm] = reminder.schedule.time.split(':').map(Number);
        const suffix = hh >= 12 ? 'pm' : 'am';
        const hour12 = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
        const timeStr = mm === 0 ? `${hour12}${suffix}` : `${hour12}:${String(mm).padStart(2, '0')}${suffix}`;
        return `${base} today at ${timeStr}`;
      }
      return `${base} today`;
    }
  }

  // Substitute first "on <weekday>" or "on <d Mon>"
  // Pattern: " on " followed by either a weekday name or a short-date like "26 Feb"
  const weekdays = '(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)';
  const shortDate = '(?:\\d{1,2}\\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))';
  const pattern = new RegExp(`\\son\\s+(?:${weekdays}|${shortDate})`, 'i');

  const match = reminder.displayText.match(pattern);
  if (!match || match.index === undefined) return reminder.displayText;

  const result =
    reminder.displayText.slice(0, match.index) +
    ` ${label}` +
    reminder.displayText.slice(match.index + match[0].length);

  return result.trim();
}

const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** Deterministic absolute date label. Input: "YYYY-MM-DD". Output: "D Mon". */
function formatAbsoluteDate(dateStr: string): string {
  const [, m, d] = dateStr.split('-').map(Number);
  return `${d} ${SHORT_MONTHS[m - 1]}`;
}

/**
 * Strip trailing injected schedule suffix from reminder.displayText.
 * Uses a deterministic absolute date label (no today/tomorrow/weekday).
 * Checks endsWith only. Under-stripping is acceptable; over-stripping is not.
 */
export function getDisplayTitle(reminder: Reminder): string {
  const s = reminder.displayText;
  const sched = reminder.schedule;
  if (!s || sched.kind !== 'scheduled') return s;

  const timeLabel = sched.time ? formatTime12h(sched.time) : null;
  const dateLabel = sched.date ? formatAbsoluteDate(sched.date) : null;

  if (dateLabel && timeLabel) {
    const suffix = ` on ${dateLabel} at ${timeLabel}`;
    if (s.endsWith(suffix)) return s.slice(0, -suffix.length).trimEnd();
  }
  if (dateLabel) {
    const suffix = ` on ${dateLabel}`;
    if (s.endsWith(suffix)) return s.slice(0, -suffix.length).trimEnd();
  }
  if (timeLabel) {
    const suffix = ` at ${timeLabel}`;
    if (s.endsWith(suffix)) return s.slice(0, -suffix.length).trimEnd();
  }

  return s;
}