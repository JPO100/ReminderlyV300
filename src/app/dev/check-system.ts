/**
 * Individual check definition
 */
export interface Check {
  id: string;
  name: string;
  run: () => void | Promise<void>;
  section?: string;
}

/**
 * Result of a single check execution
 */
export interface CheckResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
}

/**
 * Complete run report
 */
export interface RunReport {
  ranAtIso: string;
  runId: number;
  durationMs: number;
  passCount: number;
  failCount: number;
  results: CheckResult[];
}

/**
 * Grouped section data
 */
export interface SectionGroup {
  sectionName: string;
  results: CheckResult[];
}

/**
 * Result of grouping checks by section
 */
export interface GroupedResults {
  hasAnySections: boolean;
  sections: SectionGroup[];
}

/**
 * Run invocation counter for diagnostics
 */
let runInvocationId = 0;

/**
 * Executes all checks sequentially and produces a run report
 * Builds check list fresh on each run to avoid accumulation
 */
export async function runChecks(getChecks: () => Check[]): Promise<RunReport> {
  runInvocationId++;
  const currentRunId = runInvocationId;
  
  const startTime = performance.now();
  const ranAtIso = new Date().toISOString();
  
  // Build checks fresh - no global state
  const checks = getChecks();
  
  // Validate: detect duplicate IDs
  const seenIds = new Set<string>();
  const duplicates: string[] = [];
  for (const check of checks) {
    if (seenIds.has(check.id)) {
      duplicates.push(check.id);
    }
    seenIds.add(check.id);
  }
  
  const results: CheckResult[] = [];
  
  // If duplicates exist, fail fast with synthetic failure
  if (duplicates.length > 0) {
    // Deduplicate and sort for stable, readable error message
    const uniqueDuplicates = Array.from(new Set(duplicates)).sort();
    
    results.push({
      id: 'runner_integrity_duplicate_ids',
      name: 'Runner integrity: duplicate check ids detected',
      passed: false,
      error: `Duplicate ids: ${uniqueDuplicates.join(', ')}`,
    });
    
    const endTime = performance.now();
    const durationMs = Math.round(endTime - startTime);
    
    return {
      ranAtIso,
      runId: currentRunId,
      durationMs,
      passCount: 0,
      failCount: 1,
      results,
    };
  }
  
  // Run checks
  for (const check of checks) {
    try {
      await check.run();
      results.push({
        id: check.id,
        name: check.name,
        passed: true,
      });
    } catch (error) {
      results.push({
        id: check.id,
        name: check.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const endTime = performance.now();
  const durationMs = Math.round(endTime - startTime);
  const passCount = results.filter(r => r.passed).length;
  const failCount = results.filter(r => !r.passed).length;

  return {
    ranAtIso,
    runId: currentRunId,
    durationMs,
    passCount,
    failCount,
    results,
  };
}

/**
 * Groups check results by section prefix in check names
 * Extracts sections from names following the pattern "[Section] checkname"
 */
export function groupResultsBySection(results: CheckResult[]): GroupedResults {
  const sections = new Map<string, CheckResult[]>();
  let hasAnySections = false;
  
  for (const result of results) {
    // Extract section from result name if it follows "[Section] " pattern
    const sectionMatch = result.name.match(/^\[(.+?)\] /);
    if (sectionMatch) {
      hasAnySections = true;
      const sectionName = sectionMatch[1];
      if (!sections.has(sectionName)) {
        sections.set(sectionName, []);
      }
      sections.get(sectionName)!.push(result);
    } else {
      if (!sections.has('')) {
        sections.set('', []);
      }
      sections.get('')!.push(result);
    }
  }
  
  return {
    hasAnySections,
    sections: Array.from(sections.entries()).map(([sectionName, results]) => ({
      sectionName,
      results,
    })),
  };
}

/**
 * Formats a run report as plain text for clipboard copy
 */
export function formatReportAsText(report: RunReport): string {
  const lines: string[] = [];
  
  lines.push('Reminderly Self-Checks Report');
  lines.push(`Run invocation id: ${report.runId}`);
  lines.push(`Ran at: ${report.ranAtIso}`);
  lines.push(`Duration: ${report.durationMs}ms`);
  lines.push(`Passed: ${report.passCount} | Failed: ${report.failCount}`);
  lines.push('');
  
  const grouped = groupResultsBySection(report.results);
  
  if (grouped.hasAnySections) {
    // Output with sections
    for (const section of grouped.sections) {
      if (section.sectionName !== '') {
        lines.push(section.sectionName);
        lines.push('');
      }
      for (const result of section.results) {
        const status = result.passed ? '✓' : '✗';
        // Remove section prefix from name when displaying
        const displayName = result.name.replace(/^\[.+?\] /, '');
        lines.push(`${status} ${displayName}`);
        if (result.error) {
          lines.push(`  Error: ${result.error}`);
        }
      }
      if (section.sectionName !== '') {
        lines.push('');
      }
    }
  } else {
    // Output without sections (original format)
    for (const result of report.results) {
      const status = result.passed ? '✓' : '✗';
      lines.push(`${status} ${result.name}`);
      if (result.error) {
        lines.push(`  Error: ${result.error}`);
      }
    }
  }
  
  return lines.join('\n');
}
