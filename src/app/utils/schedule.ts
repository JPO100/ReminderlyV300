/**
 * Schedule Logic Utilities
 * 
 * Pure functions for schedule operations.
 * No side effects. No memoization. Minimal surface area.
 * 
 * Responsibilities:
 * - Canonical date parsing and formatting
 * - Semantic equality checking
 * - Delta detection between applied and suggested schedules
 */

import type { Schedule, RepeatRule } from '../types/reminder';

/**
 * Canonical Date Utilities
 * 
 * All operations assume user's local timezone at runtime.
 * No UTC-midnight semantics. No timezone identifiers.
 */
export const dateUtils = {
  /**
   * Formats a Date object to canonical yyyy-mm-dd string (local date)
   */
  toCanonicalString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * Parses a canonical yyyy-mm-dd string to Date object (local midnight)
   */
  fromCanonicalString(dateString: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
    if (!match) return null;
    
    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    // Validate the date is real (e.g., not Feb 30)
    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }
    
    return date;
  },

  /**
   * Checks if a canonical date string is valid
   */
  isValid(dateString: string): boolean {
    return dateUtils.fromCanonicalString(dateString) !== null;
  }
};

/**
 * Semantic Equality Helpers
 * 
 * Compare schedule field values for semantic equivalence.
 */
export const scheduleEquality = {
  /**
   * Checks if two date strings are semantically equal
   * Handles null equality
   */
  areDatesEqual(a: string | null, b: string | null): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return a === b;
  },

  /**
   * Checks if two time objects are semantically equal
   * Handles null equality
   */
  areTimesEqual(
    a: { hour: number; minute: number } | null,
    b: { hour: number; minute: number } | null
  ): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return a.hour === b.hour && a.minute === b.minute;
  },

  /**
   * Checks if two RepeatRule objects are semantically equal
   * Handles null equality and byDay array comparison
   */
  areRepeatsEqual(a: RepeatRule | null, b: RepeatRule | null): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    
    if (a.frequency !== b.frequency || a.interval !== b.interval) {
      return false;
    }
    
    // Compare byDay arrays
    if (a.byDay === null && b.byDay === null) return true;
    if (a.byDay === null || b.byDay === null) return false;
    if (a.byDay.length !== b.byDay.length) return false;
    
    // Sort and compare (order shouldn't matter semantically)
    const aSorted = [...a.byDay].sort();
    const bSorted = [...b.byDay].sort();
    return aSorted.every((day, i) => day === bSorted[i]);
  }
};

/**
 * Schedule Field Delta Type
 * 
 * Represents a single field change between applied and suggested schedules.
 * Removal (applied non-null → suggested null) is symmetrical to addition.
 */
export type ScheduleFieldDelta =
  | { field: 'date'; type: 'add' | 'change' | 'remove'; from: string | null; to: string | null }
  | { field: 'time'; type: 'add' | 'change' | 'remove'; from: { hour: number; minute: number } | null; to: { hour: number; minute: number } | null }
  | { field: 'repeat'; type: 'add' | 'change' | 'remove'; from: RepeatRule | null; to: RepeatRule | null };

/**
 * Delta Detection
 * 
 * Compares applied (source of truth) vs suggested (draft) schedules.
 * Returns array of field deltas.
 * 
 * Rules:
 * - null → non-null = add
 * - non-null → different non-null = change
 * - non-null → null = remove
 * - null → null = no delta
 * - same value → same value = no delta
 */
export function detectScheduleDeltas(
  applied: Schedule,
  suggested: Schedule
): ScheduleFieldDelta[] {
  const deltas: ScheduleFieldDelta[] = [];

  // Date delta
  if (!scheduleEquality.areDatesEqual(applied.date, suggested.date)) {
    let type: 'add' | 'change' | 'remove';
    if (applied.date === null) type = 'add';
    else if (suggested.date === null) type = 'remove';
    else type = 'change';

    deltas.push({ field: 'date', type, from: applied.date, to: suggested.date });
  }

  // Time delta
  if (!scheduleEquality.areTimesEqual(applied.time, suggested.time)) {
    let type: 'add' | 'change' | 'remove';
    if (applied.time === null) type = 'add';
    else if (suggested.time === null) type = 'remove';
    else type = 'change';

    deltas.push({ field: 'time', type, from: applied.time, to: suggested.time });
  }

  // Repeat delta
  if (!scheduleEquality.areRepeatsEqual(applied.repeatRule, suggested.repeatRule)) {
    let type: 'add' | 'change' | 'remove';
    if (applied.repeatRule === null) type = 'add';
    else if (suggested.repeatRule === null) type = 'remove';
    else type = 'change';

    deltas.push({ field: 'repeat', type, from: applied.repeatRule, to: suggested.repeatRule });
  }

  return deltas;
}

/**
 * Derived Schedule Properties
 * 
 * Compute display/behavioral properties from canonical schedule.
 * These are NOT persisted - always derived at runtime.
 */
export const scheduleDerived = {
  /**
   * Checks if schedule has a time component set
   */
  hasTime(schedule: Schedule): boolean {
    return schedule.time !== null;
  },

  /**
   * Checks if schedule has a repeat rule set
   */
  isRecurring(schedule: Schedule): boolean {
    return schedule.repeatRule !== null;
  }
};