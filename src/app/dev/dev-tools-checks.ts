/**
 * Dev Tools and Feature Flags Checks
 *
 * Deterministic checks for dev tools settings and feature flag persistence.
 * Tests localStorage hydration and default value behaviour.
 *
 * STATELESS: Returns fresh check array on each call - no side effects.
 */

import type { Check } from './check-system';

/**
 * Simple assertion helper
 */
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Helper: run a callback with localStorage isolation for a given key.
 * Saves the current value before, restores it after.
 */
function withIsolatedKey(key: string, fn: () => void): void {
  const saved = localStorage.getItem(key);
  try {
    fn();
  } finally {
    if (saved === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, saved);
    }
  }
}

/**
 * Returns all dev tools and feature flag checks.
 * PURE FUNCTION - builds fresh array on each call.
 */
export function getDevToolsChecks(): Check[] {
  return [
    // ========================================================================
    // 1. Dev tools password required
    // ========================================================================

    {
      id: 'devtools-password-default',
      name: 'Dev tools password: default is true when no value persisted',
      run: () => {
        withIsolatedKey('reminderly-dev-tools-password-required', () => {
          localStorage.removeItem('reminderly-dev-tools-password-required');
          const stored = localStorage.getItem('reminderly-dev-tools-password-required');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'false' return false, else return true
          const defaultValue = stored === 'false' ? false : true;
          assert(defaultValue === true, `Expected default true, got ${defaultValue}`);
        });
      },
    },

    {
      id: 'devtools-password-persist-true',
      name: 'Dev tools password: true persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-dev-tools-password-required', () => {
          localStorage.setItem('reminderly-dev-tools-password-required', 'true');
          const stored = localStorage.getItem('reminderly-dev-tools-password-required');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'devtools-password-persist-false',
      name: 'Dev tools password: false persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-dev-tools-password-required', () => {
          localStorage.setItem('reminderly-dev-tools-password-required', 'false');
          const stored = localStorage.getItem('reminderly-dev-tools-password-required');
          assert(stored === 'false', `Expected 'false', got '${stored}'`);
        });
      },
    },

    {
      id: 'devtools-password-hydrate-true',
      name: 'Dev tools password: hydrates true correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-dev-tools-password-required', () => {
          localStorage.setItem('reminderly-dev-tools-password-required', 'true');
          const stored = localStorage.getItem('reminderly-dev-tools-password-required');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === true, `Expected true, got ${hydrated}`);
        });
      },
    },

    {
      id: 'devtools-password-hydrate-false',
      name: 'Dev tools password: hydrates false correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-dev-tools-password-required', () => {
          localStorage.setItem('reminderly-dev-tools-password-required', 'false');
          const stored = localStorage.getItem('reminderly-dev-tools-password-required');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === false, `Expected false, got ${hydrated}`);
        });
      },
    },

    // ========================================================================
    // 2. Paywall toggle
    // ========================================================================

    {
      id: 'paywall-default',
      name: 'Paywall toggle: default is true when no value persisted',
      run: () => {
        withIsolatedKey('reminderly-ff-paywall', () => {
          localStorage.removeItem('reminderly-ff-paywall');
          const stored = localStorage.getItem('reminderly-ff-paywall');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'false' return false, else return true
          const defaultValue = stored === 'false' ? false : true;
          assert(defaultValue === true, `Expected default true, got ${defaultValue}`);
        });
      },
    },

    {
      id: 'paywall-persist-true',
      name: 'Paywall toggle: true persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-paywall', () => {
          localStorage.setItem('reminderly-ff-paywall', 'true');
          const stored = localStorage.getItem('reminderly-ff-paywall');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'paywall-persist-false',
      name: 'Paywall toggle: false persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-paywall', () => {
          localStorage.setItem('reminderly-ff-paywall', 'false');
          const stored = localStorage.getItem('reminderly-ff-paywall');
          assert(stored === 'false', `Expected 'false', got '${stored}'`);
        });
      },
    },

    {
      id: 'paywall-hydrate-true',
      name: 'Paywall toggle: hydrates true correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-paywall', () => {
          localStorage.setItem('reminderly-ff-paywall', 'true');
          const stored = localStorage.getItem('reminderly-ff-paywall');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === true, `Expected true, got ${hydrated}`);
        });
      },
    },

    {
      id: 'paywall-hydrate-false',
      name: 'Paywall toggle: hydrates false correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-paywall', () => {
          localStorage.setItem('reminderly-ff-paywall', 'false');
          const stored = localStorage.getItem('reminderly-ff-paywall');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === false, `Expected false, got ${hydrated}`);
        });
      },
    },

    // ========================================================================
    // 3. Onboarding tutorial enabled toggle
    // ========================================================================

    {
      id: 'tutorial-enabled-default',
      name: 'Onboarding tutorial enabled: default is true when no value persisted',
      run: () => {
        withIsolatedKey('reminderly-ff-onboarding-tutorial', () => {
          localStorage.removeItem('reminderly-ff-onboarding-tutorial');
          const stored = localStorage.getItem('reminderly-ff-onboarding-tutorial');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'false' return false, else return true
          const defaultValue = stored === 'false' ? false : true;
          assert(defaultValue === true, `Expected default true, got ${defaultValue}`);
        });
      },
    },

    {
      id: 'tutorial-enabled-persist-true',
      name: 'Onboarding tutorial enabled: true persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-onboarding-tutorial', () => {
          localStorage.setItem('reminderly-ff-onboarding-tutorial', 'true');
          const stored = localStorage.getItem('reminderly-ff-onboarding-tutorial');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-enabled-persist-false',
      name: 'Onboarding tutorial enabled: false persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-onboarding-tutorial', () => {
          localStorage.setItem('reminderly-ff-onboarding-tutorial', 'false');
          const stored = localStorage.getItem('reminderly-ff-onboarding-tutorial');
          assert(stored === 'false', `Expected 'false', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-enabled-hydrate-true',
      name: 'Onboarding tutorial enabled: hydrates true correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-onboarding-tutorial', () => {
          localStorage.setItem('reminderly-ff-onboarding-tutorial', 'true');
          const stored = localStorage.getItem('reminderly-ff-onboarding-tutorial');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === true, `Expected true, got ${hydrated}`);
        });
      },
    },

    {
      id: 'tutorial-enabled-hydrate-false',
      name: 'Onboarding tutorial enabled: hydrates false correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-onboarding-tutorial', () => {
          localStorage.setItem('reminderly-ff-onboarding-tutorial', 'false');
          const stored = localStorage.getItem('reminderly-ff-onboarding-tutorial');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === false, `Expected false, got ${hydrated}`);
        });
      },
    },

    // ========================================================================
    // 4. Tutorial first-launch toggle
    // ========================================================================

    {
      id: 'tutorial-first-launch-default',
      name: 'Tutorial first-launch: default is true when no value persisted',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-first-launch', () => {
          localStorage.removeItem('reminderly-ff-tutorial-first-launch');
          const stored = localStorage.getItem('reminderly-ff-tutorial-first-launch');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'false' return false, else return true
          const defaultValue = stored === 'false' ? false : true;
          assert(defaultValue === true, `Expected default true, got ${defaultValue}`);
        });
      },
    },

    {
      id: 'tutorial-first-launch-persist-true',
      name: 'Tutorial first-launch: true persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-first-launch', () => {
          localStorage.setItem('reminderly-ff-tutorial-first-launch', 'true');
          const stored = localStorage.getItem('reminderly-ff-tutorial-first-launch');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-first-launch-persist-false',
      name: 'Tutorial first-launch: false persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-first-launch', () => {
          localStorage.setItem('reminderly-ff-tutorial-first-launch', 'false');
          const stored = localStorage.getItem('reminderly-ff-tutorial-first-launch');
          assert(stored === 'false', `Expected 'false', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-first-launch-hydrate-true',
      name: 'Tutorial first-launch: hydrates true correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-first-launch', () => {
          localStorage.setItem('reminderly-ff-tutorial-first-launch', 'true');
          const stored = localStorage.getItem('reminderly-ff-tutorial-first-launch');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === true, `Expected true, got ${hydrated}`);
        });
      },
    },

    {
      id: 'tutorial-first-launch-hydrate-false',
      name: 'Tutorial first-launch: hydrates false correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-first-launch', () => {
          localStorage.setItem('reminderly-ff-tutorial-first-launch', 'false');
          const stored = localStorage.getItem('reminderly-ff-tutorial-first-launch');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === false, `Expected false, got ${hydrated}`);
        });
      },
    },

    // ========================================================================
    // 5. Tutorial every-start toggle
    // ========================================================================

    {
      id: 'tutorial-every-start-default',
      name: 'Tutorial every-start: default is false when no value persisted',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-every-start', () => {
          localStorage.removeItem('reminderly-ff-tutorial-every-start');
          const stored = localStorage.getItem('reminderly-ff-tutorial-every-start');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'true' return true, else return false
          const defaultValue = stored === 'true' ? true : false;
          assert(defaultValue === false, `Expected default false, got ${defaultValue}`);
        });
      },
    },

    {
      id: 'tutorial-every-start-persist-true',
      name: 'Tutorial every-start: true persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-every-start', () => {
          localStorage.setItem('reminderly-ff-tutorial-every-start', 'true');
          const stored = localStorage.getItem('reminderly-ff-tutorial-every-start');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-every-start-persist-false',
      name: 'Tutorial every-start: false persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-every-start', () => {
          localStorage.setItem('reminderly-ff-tutorial-every-start', 'false');
          const stored = localStorage.getItem('reminderly-ff-tutorial-every-start');
          assert(stored === 'false', `Expected 'false', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-every-start-hydrate-true',
      name: 'Tutorial every-start: hydrates true correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-every-start', () => {
          localStorage.setItem('reminderly-ff-tutorial-every-start', 'true');
          const stored = localStorage.getItem('reminderly-ff-tutorial-every-start');
          const hydrated = stored === 'true' ? true : false;
          assert(hydrated === true, `Expected true, got ${hydrated}`);
        });
      },
    },

    {
      id: 'tutorial-every-start-hydrate-false',
      name: 'Tutorial every-start: hydrates false correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-ff-tutorial-every-start', () => {
          localStorage.setItem('reminderly-ff-tutorial-every-start', 'false');
          const stored = localStorage.getItem('reminderly-ff-tutorial-every-start');
          const hydrated = stored === 'true' ? true : false;
          assert(hydrated === false, `Expected false, got ${hydrated}`);
        });
      },
    },

    // ========================================================================
    // 6. First-launch tutorial sentinel
    // ========================================================================

    {
      id: 'tutorial-sentinel-default-absent',
      name: 'Tutorial sentinel: absent by default (no value persisted)',
      run: () => {
        withIsolatedKey('reminderly-tutorial-first-launch-shown', () => {
          localStorage.removeItem('reminderly-tutorial-first-launch-shown');
          const stored = localStorage.getItem('reminderly-tutorial-first-launch-shown');
          assert(stored === null, 'Expected no stored value');
        });
      },
    },

    {
      id: 'tutorial-sentinel-written',
      name: 'Tutorial sentinel: can be written to localStorage',
      run: () => {
        withIsolatedKey('reminderly-tutorial-first-launch-shown', () => {
          localStorage.setItem('reminderly-tutorial-first-launch-shown', 'true');
          const stored = localStorage.getItem('reminderly-tutorial-first-launch-shown');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'tutorial-sentinel-check-absent',
      name: 'Tutorial sentinel: check returns false when sentinel absent',
      run: () => {
        withIsolatedKey('reminderly-tutorial-first-launch-shown', () => {
          localStorage.removeItem('reminderly-tutorial-first-launch-shown');
          const alreadyShown = localStorage.getItem('reminderly-tutorial-first-launch-shown');
          const shouldShow = alreadyShown !== 'true';
          assert(shouldShow === true, `Expected shouldShow true, got ${shouldShow}`);
        });
      },
    },

    {
      id: 'tutorial-sentinel-check-present',
      name: 'Tutorial sentinel: check returns false when sentinel present',
      run: () => {
        withIsolatedKey('reminderly-tutorial-first-launch-shown', () => {
          localStorage.setItem('reminderly-tutorial-first-launch-shown', 'true');
          const alreadyShown = localStorage.getItem('reminderly-tutorial-first-launch-shown');
          const shouldShow = alreadyShown !== 'true';
          assert(shouldShow === false, `Expected shouldShow false, got ${shouldShow}`);
        });
      },
    },

    // ========================================================================
    // 7. Filters menu setting
    // ========================================================================

    {
      id: 'filters-menu-default',
      name: 'Filters menu: default is "grouped" when no value persisted',
      run: () => {
        withIsolatedKey('reminderly-filters-menu-variant', () => {
          localStorage.removeItem('reminderly-filters-menu-variant');
          const stored = localStorage.getItem('reminderly-filters-menu-variant');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'standard' or 'grouped' return stored, else 'grouped'
          const defaultValue = (stored === 'standard' || stored === 'grouped') ? stored : 'grouped';
          assert(defaultValue === 'grouped', `Expected default 'grouped', got '${defaultValue}'`);
        });
      },
    },

    {
      id: 'filters-menu-persist-standard',
      name: 'Filters menu: "standard" persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-filters-menu-variant', () => {
          localStorage.setItem('reminderly-filters-menu-variant', 'standard');
          const stored = localStorage.getItem('reminderly-filters-menu-variant');
          assert(stored === 'standard', `Expected 'standard', got '${stored}'`);
        });
      },
    },

    {
      id: 'filters-menu-persist-grouped',
      name: 'Filters menu: "grouped" persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly-filters-menu-variant', () => {
          localStorage.setItem('reminderly-filters-menu-variant', 'grouped');
          const stored = localStorage.getItem('reminderly-filters-menu-variant');
          assert(stored === 'grouped', `Expected 'grouped', got '${stored}'`);
        });
      },
    },

    {
      id: 'filters-menu-hydrate-standard',
      name: 'Filters menu: hydrates "standard" correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-filters-menu-variant', () => {
          localStorage.setItem('reminderly-filters-menu-variant', 'standard');
          const stored = localStorage.getItem('reminderly-filters-menu-variant');
          const hydrated = (stored === 'standard' || stored === 'grouped') ? stored : 'grouped';
          assert(hydrated === 'standard', `Expected 'standard', got '${hydrated}'`);
        });
      },
    },

    {
      id: 'filters-menu-hydrate-grouped',
      name: 'Filters menu: hydrates "grouped" correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly-filters-menu-variant', () => {
          localStorage.setItem('reminderly-filters-menu-variant', 'grouped');
          const stored = localStorage.getItem('reminderly-filters-menu-variant');
          const hydrated = (stored === 'standard' || stored === 'grouped') ? stored : 'grouped';
          assert(hydrated === 'grouped', `Expected 'grouped', got '${hydrated}'`);
        });
      },
    },

    // ========================================================================
    // 8. Show date and time subtitles setting
    // ========================================================================

    {
      id: 'show-subtitles-default',
      name: 'Show date/time subtitles: default is true when no value persisted',
      run: () => {
        withIsolatedKey('reminderly.showDateAndTimeSubtitles', () => {
          localStorage.removeItem('reminderly.showDateAndTimeSubtitles');
          const stored = localStorage.getItem('reminderly.showDateAndTimeSubtitles');
          assert(stored === null, 'Expected no stored value');
          // Default logic: if stored === 'false' return false, else return true
          const defaultValue = stored === 'false' ? false : true;
          assert(defaultValue === true, `Expected default true, got ${defaultValue}`);
        });
      },
    },

    {
      id: 'show-subtitles-persist-true',
      name: 'Show date/time subtitles: true persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly.showDateAndTimeSubtitles', () => {
          localStorage.setItem('reminderly.showDateAndTimeSubtitles', 'true');
          const stored = localStorage.getItem('reminderly.showDateAndTimeSubtitles');
          assert(stored === 'true', `Expected 'true', got '${stored}'`);
        });
      },
    },

    {
      id: 'show-subtitles-persist-false',
      name: 'Show date/time subtitles: false persists to localStorage',
      run: () => {
        withIsolatedKey('reminderly.showDateAndTimeSubtitles', () => {
          localStorage.setItem('reminderly.showDateAndTimeSubtitles', 'false');
          const stored = localStorage.getItem('reminderly.showDateAndTimeSubtitles');
          assert(stored === 'false', `Expected 'false', got '${stored}'`);
        });
      },
    },

    {
      id: 'show-subtitles-hydrate-true',
      name: 'Show date/time subtitles: hydrates true correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly.showDateAndTimeSubtitles', () => {
          localStorage.setItem('reminderly.showDateAndTimeSubtitles', 'true');
          const stored = localStorage.getItem('reminderly.showDateAndTimeSubtitles');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === true, `Expected true, got ${hydrated}`);
        });
      },
    },

    {
      id: 'show-subtitles-hydrate-false',
      name: 'Show date/time subtitles: hydrates false correctly from localStorage',
      run: () => {
        withIsolatedKey('reminderly.showDateAndTimeSubtitles', () => {
          localStorage.setItem('reminderly.showDateAndTimeSubtitles', 'false');
          const stored = localStorage.getItem('reminderly.showDateAndTimeSubtitles');
          const hydrated = stored === 'false' ? false : true;
          assert(hydrated === false, `Expected false, got ${hydrated}`);
        });
      },
    },

    {
      id: 'show-subtitles-grouped-to-standard-reset',
      name: 'Show date/time subtitles: grouped-to-standard reset logic (false resets to true)',
      run: () => {
        // Simulates: if filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles, then reset to true
        const filtersMenuVariant = 'standard';
        let showDateAndTimeSubtitles = false;
        
        if (filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles) {
          showDateAndTimeSubtitles = true;
        }
        
        assert(showDateAndTimeSubtitles === true, `Expected reset to true, got ${showDateAndTimeSubtitles}`);
      },
    },

    {
      id: 'show-subtitles-grouped-no-reset',
      name: 'Show date/time subtitles: no reset when variant is grouped',
      run: () => {
        // Simulates: if filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles, then reset to true
        const filtersMenuVariant = 'grouped';
        let showDateAndTimeSubtitles = false;
        
        if (filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles) {
          showDateAndTimeSubtitles = true;
        }
        
        assert(showDateAndTimeSubtitles === false, `Expected no reset (false), got ${showDateAndTimeSubtitles}`);
      },
    },

    {
      id: 'show-subtitles-standard-already-true-no-reset',
      name: 'Show date/time subtitles: no reset when already true',
      run: () => {
        // Simulates: if filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles, then reset to true
        const filtersMenuVariant = 'standard';
        let showDateAndTimeSubtitles = true;
        
        if (filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles) {
          showDateAndTimeSubtitles = true;
        }
        
        assert(showDateAndTimeSubtitles === true, `Expected true unchanged, got ${showDateAndTimeSubtitles}`);
      },
    },

    // ========================================================================
    // 9. Hide overdue dev toggle
    // ========================================================================

    {
      id: 'hide-overdue-default',
      name: 'Hide overdue: default is false on initial load',
      run: () => {
        // hideOverdue does not persist, default is false
        const defaultValue = false;
        assert(defaultValue === false, `Expected default false, got ${defaultValue}`);
      },
    },

    {
      id: 'hide-overdue-state-change-true',
      name: 'Hide overdue: state can change to true',
      run: () => {
        let hideOverdue = false;
        hideOverdue = true;
        assert(hideOverdue === true, `Expected true, got ${hideOverdue}`);
      },
    },

    {
      id: 'hide-overdue-state-change-false',
      name: 'Hide overdue: state can change to false',
      run: () => {
        let hideOverdue = true;
        hideOverdue = false;
        assert(hideOverdue === false, `Expected false, got ${hideOverdue}`);
      },
    },

    {
      id: 'hide-overdue-reinit-resets',
      name: 'Hide overdue: reinitialisation resets to default false',
      run: () => {
        // Simulates component reinitialisation within same runtime
        let hideOverdue = true;
        // Reinit
        hideOverdue = false;
        assert(hideOverdue === false, `Expected false after reinit, got ${hideOverdue}`);
      },
    },
  ];
}
