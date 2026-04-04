import { useState, useRef, useEffect } from "react";
import { runChecks, formatReportAsText, groupResultsBySection } from "../dev/check-system";
import type { RunReport } from "../dev/check-system";
import { getScheduleChecks } from "../dev/schedule-checks";
import { getReminderChecks } from "../dev/reminder-checks";
import { getNlcParserChecks } from "../dev/nlc-parser-checks";
import { getNlcInteractionChecks } from "../dev/nlc-interaction-checks";
import { getDoneDeletedChecks } from "../dev/done-deleted-checks";
import { getCompletionChecks } from "../dev/completion-checks";
import { getDevToolsChecks } from "../dev/dev-tools-checks";
import type { Check } from "../dev/check-system";
import DevToolsHome from "../../imports/DevTools";
import DummyRemindersPage from "../../imports/DummyReminders";
import DummyListsPage from "../../imports/DummyLists";
import nlcTogglePaths from "../../imports/svg-cg3s3ktbqw";
import type { Reminder } from "../reminder-utils";
import type { GeneratedList } from "../utils/dummy-list-generator";
import svgPathsDummy from "../../imports/svg-enpj30u9ti";
import type { NlcMode } from "../utils/nlc-interaction";
import type { FiltersMenuVariant } from "../reminder-utils";
import svgPathsGear from "../../imports/svg-rl6qtmr1a6";
import svgPathsHex from "../../imports/svg-8hjr6ht2yw";
import firstLaunchIconPaths from "../../imports/svg-cybycm9ooj";
import everyStartIconPaths from "../../imports/svg-j7fklgsdp0";
import loginSvgPaths from "../../imports/svg-xgk7qm25s1";
import passwordPageSvgPaths from "../../imports/svg-y29dfn20l5";
import passwordResetSvgPaths from "../../imports/svg-p8ebad7jx7";

const DEV_TOOLS_PASSWORD = '123';

type DevToolsPage = 'home' | 'tests' | 'dummy-reminders' | 'dummy-lists' | 'nlc' | 'filters-menu' | 'onboarding-tutorial' | 'dev-tools-password' | 'reminder-settings' | 'paywall';

function BackHeader({ title, onBack, onClose }: { title: string; onBack: () => void; onClose: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="header">
      <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
        <button
          onClick={onBack}
          className="cursor-pointer shrink-0"
          aria-label="Back"
        >
          <div className="h-[17px] relative shrink-0 w-[9px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 17">
              <path d={svgPathsDummy.p347e8980} fill="var(--fill-0, #1C2C42)" id="Union" />
            </svg>
          </div>
        </button>
        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2c42] text-[20px] whitespace-nowrap">
          <p className="leading-[normal]">{title}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex items-center justify-center relative shrink-0 size-[25.456px] cursor-pointer"
        aria-label="Close dev tools"
      >
        <div className="flex-none rotate-45">
          <div className="relative size-[18px]" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPathsDummy.p1cbc7100} fill="var(--fill-0, #1C2C42)" id="Union" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

function SelfChecks({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<RunReport | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleRunChecks = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setReport(null);
    setCopyStatus('idle');
    try {
      const result = await runChecks(() => {
        const scheduleChecks = getScheduleChecks().map(c => ({ ...c, name: `[Schedule and reminder logic] ${c.name}` }));
        const reminderChecks = getReminderChecks().map(c => ({ ...c, name: `[Persistence and hydration] ${c.name}` }));
        const nlcParserChecks = getNlcParserChecks().map(c => ({ ...c, name: `[Natural language parsing] ${c.name}` }));
        const nlcInteractionChecks = getNlcInteractionChecks().map(c => ({ ...c, name: `[Natural language interaction] ${c.name}` }));
        const doneDeletedChecks = getDoneDeletedChecks().map(c => ({ ...c, name: `[Done, deleted, and completion] ${c.name}` }));
        const completionChecks = getCompletionChecks().map(c => ({ ...c, name: `[Done, deleted, and completion] ${c.name}` }));
        const devToolsChecks = getDevToolsChecks().map(c => ({ ...c, name: `[Dev tools and feature flags] ${c.name}` }));
        return [...scheduleChecks, ...reminderChecks, ...nlcParserChecks, ...nlcInteractionChecks, ...doneDeletedChecks, ...completionChecks, ...devToolsChecks];
      });
      setReport(result);
    } catch (error) {
      console.error('Failed to run checks:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyResults = () => {
    if (!report || !textAreaRef.current) return;
    
    try {
      textAreaRef.current.select();
      document.execCommand('copy');
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleReset = () => {
    setReport(null);
    setCopyStatus('idle');
  };

  return (
    <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
      <BackHeader title="Automated tests" onBack={onBack} onClose={onClose} />

      <div className="flex flex-col gap-[12px] shrink-0">
        <div className="flex gap-[12px]">
          <button
            onClick={handleRunChecks}
            disabled={isRunning}
            className="bg-[#4784f8] text-white font-['Lato',sans-serif] font-bold text-[14px] px-[20px] py-[10px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running...' : 'Run self-checks'}
          </button>
          
          <button
            onClick={handleCopyResults}
            disabled={!report}
            className="bg-[#4784f8] text-white font-['Lato',sans-serif] font-bold text-[14px] px-[20px] py-[10px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copyStatus === 'copied' ? 'Copied!' : 'Copy results'}
          </button>

          <button
            onClick={handleReset}
            disabled={!report}
            className="bg-[#6b7280] text-white font-['Lato',sans-serif] font-bold text-[14px] px-[20px] py-[10px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </div>

      {report && (
        <div className="flex flex-col gap-[8px] flex-1 min-h-0">
          <div className="font-['Lato',sans-serif] text-[14px] text-[#1c2c42] shrink-0">
            <span className="font-bold">Run invocation id: {report.runId}</span>
            {' | '}
            <span className="font-bold">Passed: {report.passCount}</span>
            {' | '}
            <span className="font-bold">Failed: {report.failCount}</span>
            {' | '}
            <span className="font-bold">Duration: {report.durationMs}ms</span>
          </div>
          
          <div className="flex flex-col gap-[4px] flex-1 overflow-y-auto min-h-0">
            {(() => {
              const grouped = groupResultsBySection(report.results);
              if (grouped.hasAnySections) {
                return grouped.sections.map((section) => (
                  <div key={section.sectionName || 'unsectioned'} className="flex flex-col gap-[4px]">
                    {section.sectionName !== '' && (
                      <div className="font-['Lato',sans-serif] text-[14px] text-[#1c2c42] font-bold mt-[8px] mb-[4px]">
                        {section.sectionName}
                      </div>
                    )}
                    {section.results.map((result) => (
                      <div
                        key={result.id}
                        className={`flex flex-col gap-[4px] p-[8px] rounded-[4px] ${
                          result.passed ? 'bg-[#e8f5e9]' : 'bg-[#ffebee]'
                        }`}
                      >
                        <div className="flex items-center gap-[8px]">
                          <span className="font-['Lato',sans-serif] text-[16px]">
                            {result.passed ? '✓' : '✗'}
                          </span>
                          <span className="font-['Lato',sans-serif] text-[14px] text-[#1c2c42]">
                            {result.name.replace(/^\[.+?\] /, '')}
                          </span>
                        </div>
                        {result.error && (
                          <div className="font-['Lato',sans-serif] text-[12px] text-[#c62828] ml-[24px]">
                            {result.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ));
              } else {
                return report.results.map((result) => (
                  <div
                    key={result.id}
                    className={`flex flex-col gap-[4px] p-[8px] rounded-[4px] ${
                      result.passed ? 'bg-[#e8f5e9]' : 'bg-[#ffebee]'
                    }`}
                  >
                    <div className="flex items-center gap-[8px]">
                      <span className="font-['Lato',sans-serif] text-[16px]">
                        {result.passed ? '✓' : '✗'}
                      </span>
                      <span className="font-['Lato',sans-serif] text-[14px] text-[#1c2c42]">
                        {result.name}
                      </span>
                    </div>
                    {result.error && (
                      <div className="font-['Lato',sans-serif] text-[12px] text-[#c62828] ml-[24px]">
                        {result.error}
                      </div>
                    )}
                  </div>
                ));
              }
            })()}
          </div>

          {/* Hidden textarea for copy fallback */}
          <textarea
            ref={textAreaRef}
            value={formatReportAsText(report)}
            readOnly
            className="absolute opacity-0 pointer-events-none"
            style={{ top: -9999, left: -9999 }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

function NlcPage({ onBack, onClose, nlcMode, onNlcModeChange }: { onBack: () => void; onClose: () => void; nlcMode: NlcMode; onNlcModeChange: (mode: NlcMode) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="nlc-page">
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Natural Language Capture" onBack={onBack} onClose={onClose} />

          {/* NLC Mode toggles */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            {/* Auto-parsing toggle */}
            <button
              onClick={() => onNlcModeChange('auto')}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="h-[21.5px] relative shrink-0 w-[24px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21.5002">
                    <g>
                      <path clipRule="evenodd" d={nlcTogglePaths.pa3f6300} fill={nlcMode === 'auto' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path clipRule="evenodd" d={nlcTogglePaths.p299691f0} fill={nlcMode === 'auto' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path clipRule="evenodd" d={nlcTogglePaths.p16049180} fill={nlcMode === 'auto' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: nlcMode === 'auto' ? '#1C2C42' : '#C9C9C9' }}>Auto-parsing</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${nlcMode === 'auto' ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Click-parsing toggle */}
            <button
              onClick={() => onNlcModeChange('click')}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[24px]" data-name="click-icon">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.0003">
                    <g>
                      <path clipRule="evenodd" d={nlcTogglePaths.p11e6a80} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path d={nlcTogglePaths.p30203000} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                      <path d={nlcTogglePaths.p2738c500} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                      <path d={nlcTogglePaths.p1012d780} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                      <path d={nlcTogglePaths.p6124c70} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                      <path d={nlcTogglePaths.p32aaa280} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                      <path d={nlcTogglePaths.p35ba42f2} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                      <path d={nlcTogglePaths.pa3ccb80} fill={nlcMode === 'click' ? '#1C2C42' : '#C9C9C9'} />
                    </g>
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: nlcMode === 'click' ? '#1C2C42' : '#C9C9C9' }}>Click-parsing</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${nlcMode === 'click' ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Description text */}
          {/* ... remove this code ... */}

        </div>
      </div>
    </div>
  );
}

function FiltersMenuPage({ onBack, onClose, filtersMenuVariant, onFiltersMenuVariantChange, isListsEnabled }: { onBack: () => void; onClose: () => void; filtersMenuVariant: FiltersMenuVariant; onFiltersMenuVariantChange: (variant: FiltersMenuVariant) => void; isListsEnabled: boolean }) {
  const displayVariant = isListsEnabled ? 'standard' : filtersMenuVariant;
  return (
    <div className="flex flex-col h-full relative w-full" data-name="filters-menu-page">
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Filters menu" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full" style={isListsEnabled ? { opacity: 0.5, pointerEvents: 'none' } : undefined}>
            <button
              onClick={() => onFiltersMenuVariantChange('grouped')}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="relative w-[24px] h-[22px] shrink-0">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
                    <g>
                      <path clipRule="evenodd" d={svgPathsGear.peea5400} fill={displayVariant === 'grouped' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPathsGear.p3dec100} fill={displayVariant === 'grouped' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: displayVariant === 'grouped' ? '#1C2C42' : '#C9C9C9' }}>Grouped filters</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${displayVariant === 'grouped' ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
            <button
              onClick={() => onFiltersMenuVariantChange('standard')}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="relative w-[24px] h-[22px] shrink-0">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.2227 22">
                    <g>
                      <path clipRule="evenodd" d={svgPathsHex.p13390100} fill={displayVariant === 'standard' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPathsHex.p2e5bc040} fill={displayVariant === 'standard' ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: displayVariant === 'standard' ? '#1C2C42' : '#C9C9C9' }}>Standard filters</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${displayVariant === 'standard' ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingTutorialPage({ onBack, onClose, showTutorialOnFirstLaunch, onShowTutorialOnFirstLaunchChange, showTutorialOnEveryStart, onShowTutorialOnEveryStartChange }: { onBack: () => void; onClose: () => void; showTutorialOnFirstLaunch: boolean; onShowTutorialOnFirstLaunchChange: (value: boolean) => void; showTutorialOnEveryStart: boolean; onShowTutorialOnEveryStartChange: (value: boolean) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="onboarding-tutorial-page">
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Onboarding tutorial" onBack={onBack} onClose={onClose} />

          {/* Show tutorial on first launch toggle */}
          <button
            onClick={() => { const next = !showTutorialOnFirstLaunch; onShowTutorialOnFirstLaunchChange(next); if (next) onShowTutorialOnEveryStartChange(false); }}
            className="content-stretch flex h-[40px] items-center justify-between gap-[20px] relative shrink-0 w-full cursor-pointer"
          >
            <div className="content-stretch flex gap-[16px] items-center relative min-w-0 flex-1">
              <div className="h-[21.75px] relative shrink-0 w-[21.75px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.7502 21.75">
                  <g>
                    <path d={firstLaunchIconPaths.p6ee0680} fill={showTutorialOnFirstLaunch ? '#1C2C42' : '#C9C9C9'} />
                    <path d={firstLaunchIconPaths.p1bcb00} fill={showTutorialOnFirstLaunch ? '#1C2C42' : '#C9C9C9'} />
                    <path d={firstLaunchIconPaths.p3f2c8a80} fill={showTutorialOnFirstLaunch ? '#1C2C42' : '#C9C9C9'} />
                    <path clipRule="evenodd" d={firstLaunchIconPaths.p12360180} fill={showTutorialOnFirstLaunch ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                    <path d={firstLaunchIconPaths.p1ec41300} fill={showTutorialOnFirstLaunch ? '#1C2C42' : '#C9C9C9'} />
                  </g>
                </svg>
              </div>
              <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] truncate" style={{ color: showTutorialOnFirstLaunch ? '#1C2C42' : '#C9C9C9' }}>Show tutorial on first launch</p>
            </div>
            <div
              className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${showTutorialOnFirstLaunch ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
            >
              <div className="relative shrink-0 size-[22.5px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                </svg>
              </div>
            </div>
          </button>

          {/* Show tutorial on every app start toggle */}
          <button
            onClick={() => { const next = !showTutorialOnEveryStart; onShowTutorialOnEveryStartChange(next); if (next) onShowTutorialOnFirstLaunchChange(false); }}
            className="content-stretch flex h-[40px] items-center justify-between gap-[20px] relative shrink-0 w-full cursor-pointer"
          >
            <div className="content-stretch flex gap-[16px] items-center relative min-w-0 flex-1">
              <div className="h-[21.75px] relative shrink-0 w-[26.605px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6054 21.7499">
                  <g>
                    <path d={everyStartIconPaths.p399d1980} fill={showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9'} />
                    <path d={everyStartIconPaths.p1a246800} fill={showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9'} />
                    <path d={everyStartIconPaths.pd0d1180} fill={showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9'} />
                    <path d={everyStartIconPaths.p222e6c80} fill={showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9'} />
                    <path clipRule="evenodd" d={everyStartIconPaths.p3c26b000} fill={showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                    <path d={everyStartIconPaths.p32b75700} fill={showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9'} />
                  </g>
                </svg>
              </div>
              <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] truncate" style={{ color: showTutorialOnEveryStart ? '#1C2C42' : '#C9C9C9' }}>Show tutorial on every app start</p>
            </div>
            <div
              className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${showTutorialOnEveryStart ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
            >
              <div className="relative shrink-0 size-[22.5px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function DevToolsPasswordPage({ onBack, onClose, passwordRequired, onPasswordRequiredChange }: { onBack: () => void; onClose: () => void; passwordRequired: boolean; onPasswordRequiredChange: (value: boolean) => void }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col h-full relative w-full" data-name="dev-tools-password-page">
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Dev tools password" onBack={onBack} onClose={onClose} />

          {/* Content from Figma */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            {/* Password required toggle */}
            <button
              onClick={() => onPasswordRequiredChange(!passwordRequired)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="h-[21.75px] relative shrink-0 w-[17.75px]" data-name="Union">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.75 21.75">
                    {passwordRequired ? (
                      <g id="Union">
                        <path d={passwordPageSvgPaths.p1114c80} fill="#1C2C42" />
                        <path d={passwordPageSvgPaths.p2688cce0} fill="#1C2C42" />
                        <path clipRule="evenodd" d={passwordPageSvgPaths.pfc9c80} fill="#1C2C42" fillRule="evenodd" />
                      </g>
                    ) : (
                      <g id="Union">
                        <path d={passwordPageSvgPaths.p15d2f900} fill="#C9C9C9" />
                        <path clipRule="evenodd" d={passwordPageSvgPaths.p1717ce00} fill="#C9C9C9" fillRule="evenodd" />
                      </g>
                    )}
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap" style={{ color: passwordRequired ? '#1c2c42' : '#C9C9C9' }}>Password required</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${passwordRequired ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Password reset section */}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
              {/* Password reset label with unlock icon */}
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="h-[21.75px] relative shrink-0 w-[19.75px]" data-name="Union">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.75 21.75">
                    <g id="Union">
                      <path clipRule="evenodd" d={passwordResetSvgPaths.pa8c9570} fill="#1C2C42" fillRule="evenodd" />
                      <path d={passwordResetSvgPaths.p36396780} fill="#1C2C42" />
                      <path clipRule="evenodd" d={passwordResetSvgPaths.p3c103600} fill="#1C2C42" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] whitespace-nowrap">Password reset</p>
              </div>

              {/* New password row */}
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="w-[85px] shrink-0">
                  <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] whitespace-nowrap">Password</p>
                </div>
                <div className="content-stretch flex items-center px-[20px] relative rounded-[100px] flex-1 min-w-0 h-[40px] group">
                  <div aria-hidden="true" className="absolute border border-[#BABABA] group-focus-within:border-[#939393] border-solid inset-0 pointer-events-none rounded-[100px]" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Password..."
                    className="flex-1 bg-transparent outline-none font-['Lato:SemiBold',sans-serif] not-italic text-[16px] text-[#1c2c42] placeholder:text-[#C9C9C9] focus:placeholder:text-transparent placeholder-lato-semibold leading-[26px]"
                  />
                  {/* Eye icon - toggles password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-[20px] top-0 bottom-0 my-auto h-[15.5px] w-[21.5px] cursor-pointer flex items-center justify-center"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
                      <g>
                        <path clipRule="evenodd" d={loginSvgPaths.p11ad9280} fill={showNewPassword ? "#1C2C42" : "#C9C9C9"} fillRule="evenodd" />
                        <path clipRule="evenodd" d={loginSvgPaths.pb9ed400} fill={showNewPassword ? "#1C2C42" : "#C9C9C9"} fillRule="evenodd" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Confirm password row */}
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="w-[85px] shrink-0">
                  <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] whitespace-nowrap">Confirm</p>
                </div>
                <div className="content-stretch flex items-center px-[20px] relative rounded-[100px] flex-1 min-w-0 h-[40px] group">
                  <div aria-hidden="true" className="absolute border border-[#BABABA] group-focus-within:border-[#939393] border-solid inset-0 pointer-events-none rounded-[100px]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Password..."
                    className="flex-1 bg-transparent outline-none font-['Lato:SemiBold',sans-serif] not-italic text-[16px] text-[#1c2c42] placeholder:text-[#C9C9C9] focus:placeholder:text-transparent placeholder-lato-semibold leading-[26px]"
                  />
                  {/* Eye icon - toggles password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-[20px] top-0 bottom-0 my-auto h-[15.5px] w-[21.5px] cursor-pointer flex items-center justify-center"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
                      <g>
                        <path clipRule="evenodd" d={loginSvgPaths.p11ad9280} fill={showConfirmPassword ? "#1C2C42" : "#C9C9C9"} fillRule="evenodd" />
                        <path clipRule="evenodd" d={loginSvgPaths.pb9ed400} fill={showConfirmPassword ? "#1C2C42" : "#C9C9C9"} fillRule="evenodd" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Reset button */}
              <div className="bg-[#4784f8] h-[40px] relative rounded-[100px] shrink-0 w-full cursor-pointer">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">Reset</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderSettingsPage({ onBack, onClose, useOneMinuteIncrements, onUseOneMinuteIncrementsChange }: { onBack: () => void; onClose: () => void; useOneMinuteIncrements: boolean; onUseOneMinuteIncrementsChange: (value: boolean) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="reminder-settings-page">
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Reminder settings" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => onUseOneMinuteIncrementsChange(!useOneMinuteIncrements)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: useOneMinuteIncrements ? '#1c2c42' : '#C9C9C9' }}
                >
                  Display 1 minute time increments
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${useOneMinuteIncrements ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaywallPage({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="paywall-page">
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Lists" onBack={onBack} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onUnlock, passwordRequired }: { onUnlock: () => void; passwordRequired: boolean }) {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [revealVisible, setRevealVisible] = useState(false);
  const [revealFading, setRevealFading] = useState(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRevealTimers = () => {
    if (revealTimerRef.current !== null) { clearTimeout(revealTimerRef.current); revealTimerRef.current = null; }
    if (fadeTimerRef.current !== null) { clearTimeout(fadeTimerRef.current); fadeTimerRef.current = null; }
  };

  useEffect(() => {
    return () => { clearRevealTimers(); };
  }, []);

  useEffect(() => {
    if (password !== 'GILBURN' && revealVisible) {
      clearRevealTimers();
      setRevealVisible(false);
      setRevealFading(false);
    }
  }, [password, revealVisible]);

  const handleSubmit = () => {
    if (password === 'GILBURN') {
      clearRevealTimers();
      setRevealVisible(true);
      setRevealFading(false);
      revealTimerRef.current = setTimeout(() => {
        setRevealFading(true);
        fadeTimerRef.current = setTimeout(() => {
          setRevealVisible(false);
          setRevealFading(false);
          setPassword('');
        }, 300);
      }, 2700);
    }
    if (!passwordRequired) {
      onUnlock();
      return;
    }
    if (password === DEV_TOOLS_PASSWORD) {
      onUnlock();
    } else {
      if (password !== 'GILBURN') {
        setShowError(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[60px] items-center pt-[80px] relative size-full">
          {/* Logo and title */}
          <div className="content-stretch flex flex-col gap-[29px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[50px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
                <g>
                  <path d={loginSvgPaths.p340e8d80} fill="var(--fill-0, #4784F8)" />
                  <g>
                    <path d={loginSvgPaths.p3f8c3b80} fill="var(--fill-0, #4784F8)" />
                    <path d={loginSvgPaths.p1babae00} fill="var(--fill-0, #4784F8)" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2c42] text-[22px] text-center whitespace-nowrap">
              <p className="leading-[normal]">Log-in to Reminderly</p>
            </div>
          </div>

          {/* Password input, button, error */}
          <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full">
            {/* Password input */}
            <div className="h-[60px] relative rounded-[100px] shrink-0 w-full group">
              <div aria-hidden="true" className="absolute border border-[#BABABA] group-focus-within:border-[#939393] border-solid inset-0 pointer-events-none rounded-[100px]" />
              <div className="flex items-center justify-center px-[30px] relative size-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setShowError(false); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Password..."
                  className="flex-1 bg-transparent outline-none font-['Lato:Bold',sans-serif] not-italic text-[20px] text-[#1c2c42] placeholder:text-[#C9C9C9] focus:placeholder:text-transparent placeholder-lato-semibold text-center leading-[60px] h-full"
                />
                {/* Eye icon - toggles password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[30px] top-0 bottom-0 my-auto h-[15.5px] w-[21.5px] cursor-pointer flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
                    <g>
                      <path clipRule="evenodd" d={loginSvgPaths.p11ad9280} fill={showPassword ? "#1C2C42" : "#C9C9C9"} fillRule="evenodd" />
                      <path clipRule="evenodd" d={loginSvgPaths.pb9ed400} fill={showPassword ? "#1C2C42" : "#C9C9C9"} fillRule="evenodd" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>

            {/* Log-in button */}
            <button
              onClick={handleSubmit}
              disabled={passwordRequired && password.length === 0}
              className={`content-stretch flex gap-[16px] h-[60px] items-center justify-center px-[30px] py-[22px] relative rounded-[100px] shrink-0 w-full ${(passwordRequired && password.length === 0) ? 'bg-[#939393] cursor-default' : 'bg-[#4784f8] cursor-pointer'}`}
            >
              <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">
                <p className="leading-[normal]">Log-in</p>
              </div>
            </button>

            {/* Revealed password */}
            {revealVisible && (
              <div
                className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-[#1c2c42] text-center whitespace-nowrap"
                style={{ opacity: revealFading ? 0 : 1, transition: revealFading ? 'opacity 300ms ease' : 'none' }}
              >
                <p className="leading-[normal]">{DEV_TOOLS_PASSWORD}</p>
              </div>
            )}

            {/* Error message */}
            {showError && (
              <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-[red] text-center whitespace-nowrap">
                <p className="leading-[normal]">That password doesn't look right?</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DevToolsContent({ onClose, onClearReminders, addReminder, addReminders, nlcMode, onNlcModeChange, nlcEnabled, onNlcEnabledChange, filtersMenuVariant, onFiltersMenuVariantChange, hideOverdue, onHideOverdueChange, isOnboardingTutorialEnabled, onOnboardingTutorialEnabledChange, isListsEnabled, onListsEnabledChange, showTutorialOnFirstLaunch, onShowTutorialOnFirstLaunchChange, showTutorialOnEveryStart, onShowTutorialOnEveryStartChange, isDevToolsUnlocked, onDevToolsUnlock, isDevToolsPasswordRequired, onDevToolsPasswordRequiredChange, useOneMinuteIncrements, onUseOneMinuteIncrementsChange, onClearLists, onGenerateLists }: { onClose: () => void; onClearReminders: () => void; addReminder: (reminder: Reminder) => void; addReminders: (reminders: Reminder[]) => void; nlcMode: NlcMode; onNlcModeChange: (mode: NlcMode) => void; nlcEnabled: boolean; onNlcEnabledChange: (enabled: boolean) => void; filtersMenuVariant: FiltersMenuVariant; onFiltersMenuVariantChange: (variant: FiltersMenuVariant) => void; hideOverdue: boolean; onHideOverdueChange: (value: boolean) => void; isOnboardingTutorialEnabled: boolean; onOnboardingTutorialEnabledChange: (next: boolean) => void; isListsEnabled: boolean; onListsEnabledChange: (enabled: boolean) => void; showTutorialOnFirstLaunch: boolean; onShowTutorialOnFirstLaunchChange: (value: boolean) => void; showTutorialOnEveryStart: boolean; onShowTutorialOnEveryStartChange: (value: boolean) => void; isDevToolsUnlocked: boolean; onDevToolsUnlock: () => void; isDevToolsPasswordRequired: boolean; onDevToolsPasswordRequiredChange: (value: boolean) => void; useOneMinuteIncrements: boolean; onUseOneMinuteIncrementsChange: (value: boolean) => void; onClearLists: () => void; onGenerateLists: (lists: GeneratedList[]) => void }) {
  const [page, setPage] = useState<DevToolsPage>('home');

  let content;
  if (!isDevToolsUnlocked) {
    content = (
      <div className="flex flex-col items-start pt-[26px] px-[30px] pb-[30px] relative w-full flex-1 min-h-0">
        <LoginScreen onUnlock={onDevToolsUnlock} passwordRequired={isDevToolsPasswordRequired} />
      </div>
    );
  } else if (page === 'home') {
    content = (
      <DevToolsHome
        onClose={onClose}
        onNavigateTests={() => setPage('tests')}
        onNavigateDummyReminders={() => setPage('dummy-reminders')}
        onNavigateDummyLists={() => setPage('dummy-lists')}
        onNavigateNlc={() => setPage('nlc')}
        onNavigateFiltersMenu={() => setPage('filters-menu')}
        onNavigateOnboardingTutorial={() => setPage('onboarding-tutorial')}
        onNavigateDevToolsPassword={() => setPage('dev-tools-password')}
        onNavigateReminderSettings={() => setPage('reminder-settings')}
        onNavigatePaywall={() => setPage('paywall')}
        nlcEnabled={nlcEnabled}
        onNlcEnabledChange={onNlcEnabledChange}
        isOnboardingTutorialEnabled={isOnboardingTutorialEnabled}
        onOnboardingTutorialEnabledChange={onOnboardingTutorialEnabledChange}
        isListsEnabled={isListsEnabled}
        onListsEnabledChange={onListsEnabledChange}
      />
    );
  } else if (page === 'dummy-reminders') {
    content = (
      <DummyRemindersPage onBack={() => setPage('home')} onClose={onClose} addReminders={addReminders} hideOverdue={hideOverdue} onHideOverdueChange={onHideOverdueChange} onClearReminders={onClearReminders} />
    );
  } else if (page === 'dummy-lists') {
    content = (
      <DummyListsPage onBack={() => setPage('home')} onClose={onClose} onClearLists={onClearLists} onGenerateLists={onGenerateLists} />
    );
  } else if (page === 'nlc') {
    content = (
      <NlcPage onBack={() => setPage('home')} onClose={onClose} nlcMode={nlcMode} onNlcModeChange={onNlcModeChange} />
    );
  } else if (page === 'filters-menu') {
    content = (
      <FiltersMenuPage onBack={() => setPage('home')} onClose={onClose} filtersMenuVariant={filtersMenuVariant} onFiltersMenuVariantChange={onFiltersMenuVariantChange} isListsEnabled={isListsEnabled} />
    );
  } else if (page === 'onboarding-tutorial') {
    content = (
      <OnboardingTutorialPage onBack={() => setPage('home')} onClose={onClose} showTutorialOnFirstLaunch={showTutorialOnFirstLaunch} onShowTutorialOnFirstLaunchChange={onShowTutorialOnFirstLaunchChange} showTutorialOnEveryStart={showTutorialOnEveryStart} onShowTutorialOnEveryStartChange={onShowTutorialOnEveryStartChange} />
    );
  } else if (page === 'dev-tools-password') {
    content = (
      <DevToolsPasswordPage onBack={() => setPage('home')} onClose={onClose} passwordRequired={isDevToolsPasswordRequired} onPasswordRequiredChange={onDevToolsPasswordRequiredChange} />
    );
  } else if (page === 'reminder-settings') {
    content = (
      <ReminderSettingsPage onBack={() => setPage('home')} onClose={onClose} useOneMinuteIncrements={useOneMinuteIncrements} onUseOneMinuteIncrementsChange={onUseOneMinuteIncrementsChange} />
    );
  } else if (page === 'paywall') {
    content = (
      <PaywallPage onBack={() => setPage('home')} onClose={onClose} />
    );
  } else {
    content = (
      <div className="flex flex-col gap-[32px] items-start pt-[26px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <SelfChecks onBack={() => setPage('home')} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative w-full max-w-[768px]" data-name="dev-tools-content">
      {content}
    </div>
  );
}

export default function DevToolsOverlay({ onClose, onClearReminders, addReminder, addReminders, nlcMode, onNlcModeChange, nlcEnabled, onNlcEnabledChange, filtersMenuVariant, onFiltersMenuVariantChange, hideOverdue, onHideOverdueChange, isOnboardingTutorialEnabled, onOnboardingTutorialEnabledChange, isListsEnabled, onListsEnabledChange, showTutorialOnFirstLaunch, onShowTutorialOnFirstLaunchChange, showTutorialOnEveryStart, onShowTutorialOnEveryStartChange, isDevToolsUnlocked, onDevToolsUnlock, isDevToolsPasswordRequired, onDevToolsPasswordRequiredChange, useOneMinuteIncrements, onUseOneMinuteIncrementsChange, onClearLists, onGenerateLists }: { onClose: () => void; onClearReminders: () => void; addReminder: (reminder: Reminder) => void; addReminders: (reminders: Reminder[]) => void; nlcMode: NlcMode; onNlcModeChange: (mode: NlcMode) => void; nlcEnabled: boolean; onNlcEnabledChange: (enabled: boolean) => void; filtersMenuVariant: FiltersMenuVariant; onFiltersMenuVariantChange: (variant: FiltersMenuVariant) => void; hideOverdue: boolean; onHideOverdueChange: (value: boolean) => void; isOnboardingTutorialEnabled: boolean; onOnboardingTutorialEnabledChange: (next: boolean) => void; isListsEnabled: boolean; onListsEnabledChange: (enabled: boolean) => void; showTutorialOnFirstLaunch: boolean; onShowTutorialOnFirstLaunchChange: (value: boolean) => void; showTutorialOnEveryStart: boolean; onShowTutorialOnEveryStartChange: (value: boolean) => void; isDevToolsUnlocked: boolean; onDevToolsUnlock: () => void; isDevToolsPasswordRequired: boolean; onDevToolsPasswordRequiredChange: (value: boolean) => void; useOneMinuteIncrements: boolean; onUseOneMinuteIncrementsChange: (value: boolean) => void; onClearLists: () => void; onGenerateLists: (lists: GeneratedList[]) => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="dev-tools-overlay">
      <DevToolsContent onClose={onClose} onClearReminders={onClearReminders} addReminder={addReminder} addReminders={addReminders} nlcMode={nlcMode} onNlcModeChange={onNlcModeChange} nlcEnabled={nlcEnabled} onNlcEnabledChange={onNlcEnabledChange} filtersMenuVariant={filtersMenuVariant} onFiltersMenuVariantChange={onFiltersMenuVariantChange} hideOverdue={hideOverdue} onHideOverdueChange={onHideOverdueChange} isOnboardingTutorialEnabled={isOnboardingTutorialEnabled} onOnboardingTutorialEnabledChange={onOnboardingTutorialEnabledChange} isListsEnabled={isListsEnabled} onListsEnabledChange={onListsEnabledChange} showTutorialOnFirstLaunch={showTutorialOnFirstLaunch} onShowTutorialOnFirstLaunchChange={onShowTutorialOnFirstLaunchChange} showTutorialOnEveryStart={showTutorialOnEveryStart} onShowTutorialOnEveryStartChange={onShowTutorialOnEveryStartChange} isDevToolsUnlocked={isDevToolsUnlocked} onDevToolsUnlock={onDevToolsUnlock} isDevToolsPasswordRequired={isDevToolsPasswordRequired} onDevToolsPasswordRequiredChange={onDevToolsPasswordRequiredChange} useOneMinuteIncrements={useOneMinuteIncrements} onUseOneMinuteIncrementsChange={onUseOneMinuteIncrementsChange} onClearLists={onClearLists} onGenerateLists={onGenerateLists} />
    </div>
  );
}
