/**
 * Canonical Reminder Data Model
 * 
 * This defines the persisted shape for reminders.
 * All schedule fields are nullable and deterministic.
 * No JS Date objects. No derived flags.
 */

/**
 * RepeatRule (v0) - Minimal placeholder for basic recurrence
 * 
 * Supports phase 4 without committing to advanced recurrence features.
 * Explicitly does NOT include: end dates, occurrence counts, complex monthly rules,
 * exceptions, or timezone-specific recurrence.
 */
export interface RepeatRule {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // default 1
  byDay: Array<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'> | null; // only relevant for weekly
}

/**
 * ScheduleSources - Per-field provenance tracking
 * 
 * Tracks the provenance of the currently applied non-null value.
 * Does NOT track history.
 * 
 * Rules:
 * - If applied field is null, source must be 'none'
 * - Manual user input sets source to 'manual'
 * - NLC application sets source to 'text'
 * - Removal (value → null) resets source to 'none'
 */
export interface ScheduleSources {
  date: 'none' | 'manual' | 'text';
  time: 'none' | 'manual' | 'text';
  repeat: 'none' | 'manual' | 'text';
}

/**
 * Schedule - Canonical persisted schedule shape
 * 
 * All fields are nullable (null = unset is first-class).
 * date is a date-only string (yyyy-mm-dd), interpreted as local calendar date.
 * No timezone field - operations use user's local timezone at runtime.
 */
export interface Schedule {
  date: string | null; // yyyy-mm-dd format
  time: { hour: number; minute: number } | null;
  repeatRule: RepeatRule | null;
  scheduleSources: ScheduleSources;
}

/**
 * Reminder - Top-level canonical reminder shape
 */
export interface Reminder {
  id: string;
  text: string;
  createdAt: string; // ISO 8601 timestamp
  completed: boolean;
  schedule: Schedule;
}

/**
 * SuggestedScheduleEvidence - Optional per-field metadata placeholder
 * 
 * Reserved for future NLC phase. Not persisted. Not currently used.
 * Allows NLC to attach rationale without schema refactor.
 */
export interface SuggestedScheduleEvidence {
  date?: { rawText?: string } | null;
  time?: { rawText?: string } | null;
  repeat?: { rawText?: string } | null;
}

/**
 * SuggestedSchedule - Draft schedule values inside editor
 * 
 * Used during editing. May optionally include evidence metadata.
 * Not persisted to Reminder.
 */
export interface SuggestedSchedule extends Schedule {
  evidence?: SuggestedScheduleEvidence;
}