/**
 * NLC Parser Checks
 *
 * Deterministic checks for parseTokens().
 * No side effects, no DOM, no Date.now.
 *
 * STATELESS: Returns fresh check array on each call.
 */

import type { Check } from './check-system';
import { parseTokens } from '../utils/nlc-parser';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export function getNlcParserChecks(): Check[] {
  return [
    // ========================================================================
    // 1. Date tokens
    // ========================================================================

    {
      id: 'nlc-date-today',
      name: 'NLC parser: recognises "today" as date token',
      run: () => {
        const tokens = parseTokens('Buy milk today');
        const dateTokens = tokens.filter(t => t.category === 'date');
        assert(dateTokens.length === 1, `Expected 1 date token, got ${dateTokens.length}`);
        assert(dateTokens[0].text.toLowerCase() === 'today', `Expected "today", got "${dateTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-date-tomorrow',
      name: 'NLC parser: recognises "tomorrow" as date token',
      run: () => {
        const tokens = parseTokens('Call dentist tomorrow');
        const dateTokens = tokens.filter(t => t.category === 'date');
        assert(dateTokens.length === 1, `Expected 1 date token, got ${dateTokens.length}`);
        assert(dateTokens[0].text.toLowerCase() === 'tomorrow', `Expected "tomorrow", got "${dateTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-date-weekday',
      name: 'NLC parser: recognises bare weekday as date token',
      run: () => {
        const tokens = parseTokens('Meet Mary on Friday');
        const dateTokens = tokens.filter(t => t.category === 'date');
        assert(dateTokens.length === 1, `Expected 1 date token, got ${dateTokens.length}`);
        assert(dateTokens[0].text.toLowerCase() === 'friday', `Expected "friday", got "${dateTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-date-next-weekday',
      name: 'NLC parser: recognises "next Friday" as single date token',
      run: () => {
        const tokens = parseTokens('Dentist next Friday');
        const dateTokens = tokens.filter(t => t.category === 'date');
        assert(dateTokens.length === 1, `Expected 1 date token, got ${dateTokens.length}`);
        assert(dateTokens[0].text.toLowerCase() === 'next friday', `Expected "next friday", got "${dateTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-date-multiple-weekdays',
      name: 'NLC parser: recognises two weekdays as separate date tokens',
      run: () => {
        const tokens = parseTokens('Meet Mary on Friday and on Sunday');
        const dateTokens = tokens.filter(t => t.category === 'date');
        assert(dateTokens.length === 2, `Expected 2 date tokens, got ${dateTokens.length}`);
        assert(dateTokens[0].text.toLowerCase() === 'friday', `Expected "friday", got "${dateTokens[0].text}"`);
        assert(dateTokens[1].text.toLowerCase() === 'sunday', `Expected "sunday", got "${dateTokens[1].text}"`);
      },
    },

    {
      id: 'nlc-date-case-insensitive',
      name: 'NLC parser: weekday matching is case-insensitive',
      run: () => {
        const tokens = parseTokens('meeting MONDAY');
        const dateTokens = tokens.filter(t => t.category === 'date');
        assert(dateTokens.length === 1, `Expected 1 date token, got ${dateTokens.length}`);
        assert(dateTokens[0].text === 'MONDAY', `Expected original case "MONDAY", got "${dateTokens[0].text}"`);
      },
    },

    // ── Month-name date token recognition ──

    {
      id: 'nlc-month-date-full-name',
      name: 'NLC parser: recognises "February 28" as date token',
      run: () => {
        const tokens = parseTokens('Call mum February 28');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === 'February 28', `Expected "February 28", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-month-date-full-name-ordinal',
      name: 'NLC parser: recognises "February 28th" as date token',
      run: () => {
        const tokens = parseTokens('Call mum February 28th');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === 'February 28th', `Expected "February 28th", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-month-date-short-name',
      name: 'NLC parser: recognises "Feb 28" as date token',
      run: () => {
        const tokens = parseTokens('Call mum Feb 28');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === 'Feb 28', `Expected "Feb 28", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-month-date-short-name-ordinal',
      name: 'NLC parser: recognises "Feb 28th" as date token',
      run: () => {
        const tokens = parseTokens('Call mum Feb 28th');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === 'Feb 28th', `Expected "Feb 28th", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-day-first-month-date-short',
      name: 'NLC parser: recognises "28 Feb" as date token',
      run: () => {
        const tokens = parseTokens('Call mum 28 Feb');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === '28 Feb', `Expected "28 Feb", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-day-first-month-date-short-ordinal',
      name: 'NLC parser: recognises "28th Feb" as date token',
      run: () => {
        const tokens = parseTokens('Call mum 28th Feb');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === '28th Feb', `Expected "28th Feb", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-day-first-month-date-full',
      name: 'NLC parser: recognises "28 February" as date token',
      run: () => {
        const tokens = parseTokens('Call mum 28 February');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === '28 February', `Expected "28 February", got "${dates[0].text}"`);
      },
    },

    {
      id: 'nlc-day-first-month-date-full-ordinal',
      name: 'NLC parser: recognises "28th February" as date token',
      run: () => {
        const tokens = parseTokens('Call mum 28th February');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 1, `Expected 1 date token, got ${dates.length}`);
        assert(dates[0].text === '28th February', `Expected "28th February", got "${dates[0].text}"`);
      },
    },

    // Month-name date hardening — negative cases
    {
      id: 'nlc-hardening-month-year-only',
      name: 'NLC parser hardening: rejects month+year (Feb 2027)',
      run: () => {
        const tokens = parseTokens('Car MOT Feb 2027');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 0, `Expected 0 date tokens, got ${dates.length}: ${dates.map(d => `"${d.text}"`).join(', ')}`);
      },
    },

    {
      id: 'nlc-hardening-two-digit-year',
      name: 'NLC parser hardening: rejects 2-digit year (23 Feb 27)',
      run: () => {
        const tokens = parseTokens('Car MOT 23 Feb 27');
        const dates = tokens.filter(t => t.category === 'date');
        // "23 Feb" is a valid date token, but "23 Feb 27" must not be a single token
        for (const d of dates) {
          assert(!d.text.includes('27'), `Date token "${d.text}" must not include 2-digit year "27"`);
        }
      },
    },

    {
      id: 'nlc-hardening-comma-format',
      name: 'NLC parser hardening: rejects comma format (Feb 23, 2027)',
      run: () => {
        const tokens = parseTokens('Car MOT Feb 23, 2027');
        const dates = tokens.filter(t => t.category === 'date');
        // "Feb 23" may tokenise, but "Feb 23, 2027" must not be a single token
        for (const d of dates) {
          assert(!d.text.includes('2027'), `Date token "${d.text}" must not include year from comma format`);
        }
      },
    },

    {
      id: 'nlc-hardening-year-first',
      name: 'NLC parser hardening: rejects year-first (2027 Feb 23)',
      run: () => {
        const tokens = parseTokens('Car MOT 2027 Feb 23');
        const dates = tokens.filter(t => t.category === 'date');
        // "Feb 23" may tokenise, but no token should include "2027"
        for (const d of dates) {
          assert(!d.text.includes('2027'), `Date token "${d.text}" must not include year-first format`);
        }
      },
    },

    {
      id: 'nlc-hardening-invalid-date-with-year',
      name: 'NLC parser hardening: rejects invalid date with year (31 February 2027)',
      run: () => {
        const tokens = parseTokens('Car MOT 31 February 2027');
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 0, `Expected 0 date tokens for invalid date, got ${dates.length}: ${dates.map(d => `"${d.text}"`).join(', ')}`);
      },
    },

    // ========================================================================
    // 2. Time tokens
    // ========================================================================

    {
      id: 'nlc-time-simple-pm',
      name: 'NLC parser: recognises "7pm" as time token',
      run: () => {
        const tokens = parseTokens('Call at 7pm');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === '7pm', `Expected "7pm", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-time-with-minutes',
      name: 'NLC parser: recognises "7:30pm" as time token',
      run: () => {
        const tokens = parseTokens('Call at 7:30pm');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === '7:30pm', `Expected "7:30pm", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-time-with-space',
      name: 'NLC parser: recognises "7 pm" as time token',
      run: () => {
        const tokens = parseTokens('Call at 7 pm');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
      },
    },

    {
      id: 'nlc-time-rejects-bad-minutes',
      name: 'NLC parser: rejects "7:10pm" (non-quarter-hour)',
      run: () => {
        const tokens = parseTokens('Call at 7:10pm');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 0, `Expected 0 time tokens for 7:10pm, got ${timeTokens.length}`);
      },
    },

    {
      id: 'nlc-time-quarter-hours-only',
      name: 'NLC parser: accepts :00, :15, :30, :45 only',
      run: () => {
        const valid = ['3:00pm', '3:15pm', '3:30pm', '3:45pm'];
        const invalid = ['3:05pm', '3:10pm', '3:20pm', '3:25pm', '3:35pm', '3:40pm', '3:50pm', '3:55pm'];
        for (const v of valid) {
          const tokens = parseTokens(`at ${v}`);
          assert(tokens.filter(t => t.category === 'time').length === 1, `Expected "${v}" to be recognised`);
        }
        for (const iv of invalid) {
          const tokens = parseTokens(`at ${iv}`);
          assert(tokens.filter(t => t.category === 'time').length === 0, `Expected "${iv}" to be rejected`);
        }
      },
    },

    {
      id: 'nlc-time-rejects-hour-13',
      name: 'NLC parser: rejects "13pm" (invalid 12h hour)',
      run: () => {
        const tokens = parseTokens('Call at 13pm');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 0, `Expected 0 time tokens for 13pm, got ${timeTokens.length}`);
      },
    },

    // ========================================================================
    // 3. Repeats tokens
    // ========================================================================

    {
      id: 'nlc-repeats-every-weekday',
      name: 'NLC parser: "every Wednesday" is repeats (not date)',
      run: () => {
        const tokens = parseTokens('Put bins out every Wednesday');
        const repeats = tokens.filter(t => t.category === 'repeats');
        const dates = tokens.filter(t => t.category === 'date');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text.toLowerCase() === 'every wednesday', `Expected "every wednesday", got "${repeats[0].text}"`);
        assert(dates.length === 0, `Expected 0 date tokens (Wednesday consumed by repeats), got ${dates.length}`);
      },
    },

    {
      id: 'nlc-repeats-every-day',
      name: 'NLC parser: recognises "every day" as repeats',
      run: () => {
        const tokens = parseTokens('Take vitamins every day');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
      },
    },

    {
      id: 'nlc-repeats-every-n-days',
      name: 'NLC parser: recognises "every 3 days" as repeats',
      run: () => {
        const tokens = parseTokens('Water plants every 3 days');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text.toLowerCase() === 'every 3 days', `Expected "every 3 days", got "${repeats[0].text}"`);
      },
    },

    {
      id: 'nlc-repeats-every-n-weeks',
      name: 'NLC parser: recognises "every 2 weeks" as repeats',
      run: () => {
        const tokens = parseTokens('Payroll every 2 weeks');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
      },
    },

    {
      id: 'nlc-repeats-weekdays',
      name: 'NLC parser: recognises "weekdays" as repeats',
      run: () => {
        const tokens = parseTokens('Standup weekdays');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text.toLowerCase() === 'weekdays', `Expected "weekdays", got "${repeats[0].text}"`);
      },
    },

    {
      id: 'nlc-repeats-comma-list',
      name: 'NLC parser: recognises "Mon, Wed, Fri" as repeats',
      run: () => {
        const tokens = parseTokens('Gym Mon, Wed, Fri');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text === 'Mon, Wed, Fri', `Expected "Mon, Wed, Fri", got "${repeats[0].text}"`);
      },
    },

    // ========================================================================
    // 4. Cross-category and overlap
    // ========================================================================

    {
      id: 'nlc-cross-all-three',
      name: 'NLC parser: recognises date + time + repeats in one sentence',
      run: () => {
        const tokens = parseTokens('Put the bins out every Wednesday at 7pm');
        const repeats = tokens.filter(t => t.category === 'repeats');
        const times = tokens.filter(t => t.category === 'time');
        assert(repeats.length === 1, `Expected 1 repeats, got ${repeats.length}`);
        assert(times.length === 1, `Expected 1 time, got ${times.length}`);
        // "Wednesday" should NOT appear as a separate date token
        const dates = tokens.filter(t => t.category === 'date');
        assert(dates.length === 0, `Expected 0 date tokens, got ${dates.length}`);
      },
    },

    {
      id: 'nlc-no-tokens-plain-text',
      name: 'NLC parser: returns empty for plain text with no patterns',
      run: () => {
        const tokens = parseTokens('Buy milk and eggs');
        assert(tokens.length === 0, `Expected 0 tokens, got ${tokens.length}`);
      },
    },

    {
      id: 'nlc-empty-string',
      name: 'NLC parser: returns empty for empty string',
      run: () => {
        const tokens = parseTokens('');
        assert(tokens.length === 0, `Expected 0 tokens, got ${tokens.length}`);
      },
    },

    // ========================================================================
    // 5. Time-of-day tokens
    // ========================================================================

    {
      id: 'nlc-tod-standalone-morning',
      name: 'NLC parser: recognises "morning" as time token',
      run: () => {
        const tokens = parseTokens('Walk the dog morning');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === 'morning', `Expected "morning", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-standalone-night',
      name: 'NLC parser: recognises "night" as time token',
      run: () => {
        const tokens = parseTokens('Pick up tomorrow night');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === 'night', `Expected "night", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-case-insensitive',
      name: 'NLC parser: time-of-day tokens are case-insensitive',
      run: () => {
        const tokens = parseTokens('Call AFTERNOON');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text === 'AFTERNOON', `Expected original case "AFTERNOON", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-goodnight-no-match',
      name: 'NLC parser: "Goodnight" does not match "night"',
      run: () => {
        const tokens = parseTokens('Goodnight sweetheart');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 0, `Expected 0 time tokens for "Goodnight", got ${timeTokens.length}`);
      },
    },

    {
      id: 'nlc-tod-compound-this-morning',
      name: 'NLC parser: "this morning" is a single compound time token',
      run: () => {
        const tokens = parseTokens('Pick up milk this morning');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === 'this morning', `Expected "this morning", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-compound-tonight',
      name: 'NLC parser: "tonight" is a time token',
      run: () => {
        const tokens = parseTokens('Dinner tonight');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === 'tonight', `Expected "tonight", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-suppression-explicit-time',
      name: 'NLC parser: explicit clock time suppresses time-of-day tokens',
      run: () => {
        const tokens = parseTokens('Pick mum up tomorrow night at 8pm');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token (8pm only), got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === '8pm', `Expected "8pm", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-suppression-multiple-explicit',
      name: 'NLC parser: "tomorrow at 8pm tomorrow night" — night never tokenises',
      run: () => {
        const tokens = parseTokens('Tomorrow at 8pm tomorrow night');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === '8pm', `Expected "8pm", got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-this-night-not-compound',
      name: 'NLC parser: "this night" is not a compound — "night" is standalone',
      run: () => {
        const tokens = parseTokens('Do this night');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(timeTokens[0].text.toLowerCase() === 'night', `Expected "night" (standalone), got "${timeTokens[0].text}"`);
      },
    },

    {
      id: 'nlc-tod-tomorrow-morning-combo',
      name: 'NLC parser: "tomorrow morning" produces date + time tokens',
      run: () => {
        const tokens = parseTokens('Call dentist tomorrow morning');
        const dateTokens = tokens.filter(t => t.category === 'date');
        const timeTokens = tokens.filter(t => t.category === 'time');
        assert(dateTokens.length === 1, `Expected 1 date token, got ${dateTokens.length}`);
        assert(timeTokens.length === 1, `Expected 1 time token, got ${timeTokens.length}`);
        assert(dateTokens[0].text.toLowerCase() === 'tomorrow', `Expected "tomorrow", got "${dateTokens[0].text}"`);
        assert(timeTokens[0].text.toLowerCase() === 'morning', `Expected "morning", got "${timeTokens[0].text}"`);
      },
    },

    // ========================================================================
    // 6. "Every …" repeat tokens (v1.2)
    // ========================================================================

    {
      id: 'nlc-every-morning-repeats',
      name: 'NLC parser: "every morning" is a repeats token',
      run: () => {
        const tokens = parseTokens('Take vitamins every morning');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text.toLowerCase() === 'every morning', `Expected "every morning", got "${repeats[0].text}"`);
      },
    },

    {
      id: 'nlc-every-night-repeats',
      name: 'NLC parser: "every night" is a repeats token',
      run: () => {
        const tokens = parseTokens('Lock doors every night');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text.toLowerCase() === 'every night', `Expected "every night", got "${repeats[0].text}"`);
      },
    },

    {
      id: 'nlc-every-year-repeats',
      name: 'NLC parser: "every year" is a repeats token',
      run: () => {
        const tokens = parseTokens('Renew passport every year');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(repeats[0].text.toLowerCase() === 'every year', `Expected "every year", got "${repeats[0].text}"`);
      },
    },

    {
      id: 'nlc-everyday-no-match',
      name: 'NLC parser: "everyday" does not tokenise (no space)',
      run: () => {
        const tokens = parseTokens('everyday is a good day');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 0, `Expected 0 repeats tokens for "everyday", got ${repeats.length}`);
      },
    },

    {
      id: 'nlc-every-other-no-match',
      name: 'NLC parser: "every other day" does not tokenise',
      run: () => {
        const tokens = parseTokens('Water plants every other day');
        // "every other day" should NOT match as a single repeats token
        // "every other" is not a supported pattern
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 0, `Expected 0 repeats tokens for "every other day", got ${repeats.length}`);
      },
    },

    {
      id: 'nlc-every-weekday-no-match',
      name: 'NLC parser: "every weekday" does not tokenise',
      run: () => {
        const tokens = parseTokens('Standup every weekday');
        const repeats = tokens.filter(t => t.category === 'repeats');
        assert(repeats.length === 0, `Expected 0 repeats tokens for "every weekday", got ${repeats.length}`);
      },
    },

    {
      id: 'nlc-repeat-suppresses-date',
      name: 'NLC parser: repeat token suppresses date tokens',
      run: () => {
        const tokens = parseTokens('every morning tomorrow');
        const repeats = tokens.filter(t => t.category === 'repeats');
        const dates = tokens.filter(t => t.category === 'date');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(dates.length === 0, `Expected 0 date tokens (suppressed by repeat), got ${dates.length}`);
      },
    },

    {
      id: 'nlc-every-morning-at-6am',
      name: 'NLC parser: "every morning at 6am" produces repeats + time tokens',
      run: () => {
        const tokens = parseTokens('Wake up every morning at 6am');
        const repeats = tokens.filter(t => t.category === 'repeats');
        const times = tokens.filter(t => t.category === 'time');
        assert(repeats.length === 1, `Expected 1 repeats token, got ${repeats.length}`);
        assert(times.length === 1, `Expected 1 time token (6am), got ${times.length}`);
        assert(times[0].text.toLowerCase() === '6am', `Expected "6am", got "${times[0].text}"`);
      },
    },

    {
      id: 'nlc-token-ranges-accurate',
      name: 'NLC parser: token start/end match exact substring position',
      run: () => {
        const input = 'Call John tomorrow at 3pm';
        const tokens = parseTokens(input);
        for (const token of tokens) {
          const extracted = input.slice(token.start, token.end);
          assert(
            extracted === token.text,
            `Token text "${token.text}" does not match slice "${extracted}" at [${token.start},${token.end})`
          );
        }
      },
    },
  ];
}