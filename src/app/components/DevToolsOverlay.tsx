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
import { getListChecks } from "../dev/list-checks";
import type { Check } from "../dev/check-system";
import type { GeneratedDummyListsPayload, GeneratedList } from "../utils/dummy-list-generator";
import DevToolsHome from "../../imports/DevTools";
import DummyRemindersPage from "../../imports/DummyReminders";
import DummyListsPage from "../../imports/DummyLists";
import nlcTogglePaths from "../../imports/svg-cg3s3ktbqw";
import type { Reminder } from "../reminder-utils";
import svgPathsDummy from "../../imports/svg-enpj30u9ti";
import type { NlcMode } from "../utils/nlc-interaction";
import type { NlcRecognitionConfig } from "../utils/nlc-parser";
import type { FiltersMenuVariant } from "../reminder-utils";
import svgPathsGear from "../../imports/svg-rl6qtmr1a6";
import svgPathsHex from "../../imports/svg-8hjr6ht2yw";
import firstLaunchIconPaths from "../../imports/svg-cybycm9ooj";
import everyStartIconPaths from "../../imports/svg-j7fklgsdp0";
import loginSvgPaths from "../../imports/svg-xgk7qm25s1";
import passwordPageSvgPaths from "../../imports/svg-y29dfn20l5";
import passwordResetSvgPaths from "../../imports/svg-p8ebad7jx7";

const DEV_TOOLS_PASSWORD = '123';

type DevToolsPage = 'home' | 'tests' | 'test-data' | 'dummy-reminders' | 'dummy-lists' | 'nlc' | 'filters-menu' | 'onboarding-tutorial' | 'dev-tools-password' | 'reminder-settings' | 'list-settings' | 'paywall' | 'notifications' | 'system' | 'natural-language' | 'onboarding' | 'notifications-area' | 'testing' | 'reminders' | 'lists';

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
        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] whitespace-nowrap">
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
        const listChecks = getListChecks().map(c => ({ ...c, name: `[Lists and smart reminders] ${c.name}` }));
        const devToolsChecks = getDevToolsChecks().map(c => ({ ...c, name: `[Dev tools and feature flags] ${c.name}` }));
        return [...scheduleChecks, ...reminderChecks, ...nlcParserChecks, ...nlcInteractionChecks, ...doneDeletedChecks, ...completionChecks, ...listChecks, ...devToolsChecks];
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
          <div className="font-['Lato',sans-serif] text-[14px] text-[#1C2C42] shrink-0">
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
                      <div className="font-['Lato',sans-serif] text-[14px] text-[#1C2C42] font-bold mt-[8px] mb-[4px]">
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
                          <span className="font-['Lato',sans-serif] text-[14px] text-[#1C2C42]">
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
                      <span className="font-['Lato',sans-serif] text-[14px] text-[#1C2C42]">
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

function TestDataPage({ onBack, onClose, onNavigateReminders, onNavigateLists }: { onBack: () => void; onClose: () => void; onNavigateReminders: () => void; onNavigateLists: () => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="test-data-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Test data" onBack={onBack} onClose={onClose} />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateReminders}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Dummy reminders</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={onNavigateLists}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Dummy lists</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

function NlcToggleRow({ label, isOn, onClick, disabled = false }: { label: string; isOn: boolean; onClick: () => void; disabled?: boolean }) {
  const activeColor = disabled ? '#C9C9C9' : (isOn ? '#1C2C42' : '#C9C9C9');
  const trackColor = disabled ? '#E4E4E4' : (isOn ? '#4784f8' : '#C9C9C9');
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full"
      style={{ cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1 }}
    >
      <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: activeColor }}>{label}</p>
      <div
        className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors`}
        style={{ backgroundColor: trackColor, justifyContent: isOn && !disabled ? 'flex-end' : 'flex-start' }}
      >
        <div className="relative shrink-0 size-[22.5px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
            <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function NlcPage({ onBack, onClose, nlcMode, onNlcModeChange, recognition, onRecognitionChange }: { onBack: () => void; onClose: () => void; nlcMode: NlcMode; onNlcModeChange: (mode: NlcMode) => void; recognition: NlcRecognitionConfig; onRecognitionChange: (config: NlcRecognitionConfig) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="nlc-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
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

          {/* Separator */}
          <div className="w-full h-[1px] bg-[#D9D9D9]" />

          {/* Recognition toggles */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <NlcToggleRow label="Date recognition" isOn={recognition.date} onClick={() => onRecognitionChange({ ...recognition, date: !recognition.date })} />
            <NlcToggleRow label="Time recognition" isOn={recognition.time} onClick={() => onRecognitionChange({ ...recognition, time: !recognition.time })} />
            <NlcToggleRow label="Repeats recognition" isOn={recognition.repeats} onClick={() => onRecognitionChange({ ...recognition, repeats: !recognition.repeats })} />
            <NlcToggleRow label="Phone number recognition" isOn={false} onClick={() => {}} disabled />
            <NlcToggleRow label="Contact recognition" isOn={false} onClick={() => {}} disabled />
          </div>

        </div>
      </div>
    </div>
  );
}

function FiltersMenuPage({ onBack, onClose, filtersMenuVariant, onFiltersMenuVariantChange, isListsEnabled }: { onBack: () => void; onClose: () => void; filtersMenuVariant: FiltersMenuVariant; onFiltersMenuVariantChange: (variant: FiltersMenuVariant) => void; isListsEnabled: boolean }) {
  const displayVariant = isListsEnabled ? 'standard' : filtersMenuVariant;
  return (
    <div className="flex flex-col h-full relative w-full" data-name="filters-menu-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
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
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
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
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
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
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap" style={{ color: passwordRequired ? '#1C2C42' : '#C9C9C9' }}>Password required</p>
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
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1C2C42] text-[17px] whitespace-nowrap">Password reset</p>
              </div>

              {/* New password row */}
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="w-[85px] shrink-0">
                  <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1C2C42] text-[17px] whitespace-nowrap">Password</p>
                </div>
                <div className="content-stretch flex items-center px-[20px] relative rounded-[100px] flex-1 min-w-0 h-[40px] group">
                  <div aria-hidden="true" className="absolute border border-[#BABABA] group-focus-within:border-[#939393] border-solid inset-0 pointer-events-none rounded-[100px]" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Password..."
                    className="flex-1 bg-transparent outline-none font-['Lato:SemiBold',sans-serif] not-italic text-[16px] text-[#1C2C42] placeholder:text-[#C9C9C9] focus:placeholder:text-transparent placeholder-lato-semibold leading-[26px]"
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
                  <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1C2C42] text-[17px] whitespace-nowrap">Confirm</p>
                </div>
                <div className="content-stretch flex items-center px-[20px] relative rounded-[100px] flex-1 min-w-0 h-[40px] group">
                  <div aria-hidden="true" className="absolute border border-[#BABABA] group-focus-within:border-[#939393] border-solid inset-0 pointer-events-none rounded-[100px]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Password..."
                    className="flex-1 bg-transparent outline-none font-['Lato:SemiBold',sans-serif] not-italic text-[16px] text-[#1C2C42] placeholder:text-[#C9C9C9] focus:placeholder:text-transparent placeholder-lato-semibold leading-[26px]"
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
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
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
                  style={{ color: useOneMinuteIncrements ? '#1C2C42' : '#C9C9C9' }}
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

function ListSettingsPage({ onBack, onClose, useDefaultTemplatesInCleanState, onUseDefaultTemplatesInCleanStateChange }: { onBack: () => void; onClose: () => void; useDefaultTemplatesInCleanState: boolean; onUseDefaultTemplatesInCleanStateChange: (value: boolean) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="list-settings-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="List settings" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => onUseDefaultTemplatesInCleanStateChange(!useDefaultTemplatesInCleanState)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: useDefaultTemplatesInCleanState ? '#1C2C42' : '#C9C9C9' }}
                >
                  Use default templates in clean state
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${useDefaultTemplatesInCleanState ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
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

function SystemPage({ onBack, onClose, siriShortcutsEnabled, onSiriShortcutsEnabledChange, settingsMenuEnabled, onSettingsMenuEnabledChange, onNavigateFiltersMenu, onNavigateDevToolsPassword }: { onBack: () => void; onClose: () => void; siriShortcutsEnabled: boolean; onSiriShortcutsEnabledChange: (value: boolean) => void; settingsMenuEnabled: boolean; onSettingsMenuEnabledChange: (value: boolean) => void; onNavigateFiltersMenu: () => void; onNavigateDevToolsPassword: () => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="system-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="System" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => onSiriShortcutsEnabledChange(!siriShortcutsEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: siriShortcutsEnabled ? '#1C2C42' : '#C9C9C9' }}
                >
                  Siri Shortcuts
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${siriShortcutsEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSettingsMenuEnabledChange(!settingsMenuEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: settingsMenuEnabled ? '#1C2C42' : '#C9C9C9' }}
                >
                  Settings menu
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${settingsMenuEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateFiltersMenu}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Filters menu</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={onNavigateDevToolsPassword}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Dev tools password</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

function NaturalLanguagePage({ onBack, onClose, nlcEnabled, onNlcEnabledChange, onNavigateNlcSettings }: { onBack: () => void; onClose: () => void; nlcEnabled: boolean; onNlcEnabledChange: (enabled: boolean) => void; onNavigateNlcSettings: () => void }) {
  const [pendingNlcState, setPendingNlcState] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col h-full relative w-full" data-name="natural-language-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Natural Language" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => setPendingNlcState(!nlcEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: nlcEnabled ? '#1C2C42' : '#C9C9C9' }}
                >
                  Enable Natural Language Capture
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${nlcEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateNlcSettings}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">NLC settings</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
      {pendingNlcState !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setPendingNlcState(null)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
            <div
              className="bg-white relative flex flex-col gap-[35px] items-center py-[40px] px-[34px] rounded-[32px] pointer-events-auto"
              style={{ width: 322 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] text-center">
                <p className="leading-[normal] whitespace-pre-wrap">
                  {pendingNlcState
                    ? 'Turn on NLC?'
                    : 'Turn off NLC?'}
                </p>
              </div>
              <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center">
                <p className="leading-[normal] whitespace-pre-wrap">
                  {pendingNlcState
                    ? 'Dates and times will be recognised automatically as you type. Existing reminders remain unchanged until edited.'
                    : 'Reminders will be saved exactly as typed. Dates and times will only be set manually.'}
                </p>
              </div>
              <div className="flex gap-[16px] w-full justify-between">
                <button
                  onClick={() => setPendingNlcState(null)}
                  className="h-[50px] rounded-[100px] cursor-pointer px-[16px]"
                  style={{ backgroundColor: '#BABABA' }}
                >
                  <div className="flex items-center justify-center size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">Cancel</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onNlcEnabledChange(pendingNlcState);
                    setPendingNlcState(null);
                  }}
                  className="h-[50px] rounded-[100px] cursor-pointer px-[16px]"
                  style={{ backgroundColor: '#4784F8' }}
                >
                  <div className="flex items-center justify-center size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">
                        {pendingNlcState ? 'Yes, turn on' : 'Yes, turn off'}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function OnboardingPage({ onBack, onClose, isOnboardingTutorialEnabled, onOnboardingTutorialEnabledChange, onNavigateOnboardingTutorial }: { onBack: () => void; onClose: () => void; isOnboardingTutorialEnabled: boolean; onOnboardingTutorialEnabledChange: (next: boolean) => void; onNavigateOnboardingTutorial: () => void }) {
  const [pendingOnboardingState, setPendingOnboardingState] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col h-full relative w-full" data-name="onboarding-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Onboarding" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => setPendingOnboardingState(!isOnboardingTutorialEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: isOnboardingTutorialEnabled ? '#1C2C42' : '#C9C9C9' }}
                >
                  Enable onboarding tutorial
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${isOnboardingTutorialEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateOnboardingTutorial}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Onboarding tutorial settings</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
      {pendingOnboardingState !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setPendingOnboardingState(null)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
            <div
              className="bg-white relative flex flex-col gap-[35px] items-center py-[40px] px-[34px] rounded-[32px] pointer-events-auto"
              style={{ width: 322 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] text-center">
                <p className="leading-[normal] whitespace-pre-wrap">
                  {pendingOnboardingState
                    ? 'Turn on onboarding tutorial?'
                    : 'Turn off onboarding tutorial?'}
                </p>
              </div>
              <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center">
                <p className="leading-[normal] whitespace-pre-wrap">
                  {pendingOnboardingState
                    ? 'The onboarding tutorial will be accessible from Settings and shown to new users on first launch.'
                    : 'The onboarding tutorial will be hidden from Settings and will not be shown to new users.'}
                </p>
              </div>
              <div className="flex gap-[16px] w-full justify-between">
                <button
                  onClick={() => setPendingOnboardingState(null)}
                  className="h-[50px] rounded-[100px] cursor-pointer px-[16px]"
                  style={{ backgroundColor: '#BABABA' }}
                >
                  <div className="flex items-center justify-center size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">Cancel</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onOnboardingTutorialEnabledChange(pendingOnboardingState);
                    setPendingOnboardingState(null);
                  }}
                  className="h-[50px] rounded-[100px] cursor-pointer px-[16px]"
                  style={{ backgroundColor: '#4784F8' }}
                >
                  <div className="flex items-center justify-center size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">
                        {pendingOnboardingState ? 'Yes, turn on' : 'Yes, turn off'}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NotificationsSettingsPage({ onBack, onClose, reminderAlerts, onReminderAlertsChange, appBadge, onAppBadgeChange, includeTodayInBadge, onIncludeTodayInBadgeChange }: { onBack: () => void; onClose: () => void; reminderAlerts: boolean; onReminderAlertsChange: (value: boolean) => void; appBadge: boolean; onAppBadgeChange: (value: boolean) => void; includeTodayInBadge: boolean; onIncludeTodayInBadgeChange: (value: boolean) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="notifications-settings-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Notifications" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => onReminderAlertsChange(!reminderAlerts)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: reminderAlerts ? '#1C2C42' : '#C9C9C9' }}
                >
                  Reminder alerts
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${reminderAlerts ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
            <button
              onClick={() => onAppBadgeChange(!appBadge)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: appBadge ? '#1C2C42' : '#C9C9C9' }}
                >
                  App badge
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${appBadge ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
            <button
              onClick={appBadge ? () => onIncludeTodayInBadgeChange(!includeTodayInBadge) : undefined}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full"
              style={{ cursor: appBadge ? 'pointer' : 'default', opacity: appBadge ? 1 : 0.45 }}
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: appBadge && includeTodayInBadge ? '#1C2C42' : '#C9C9C9' }}
                >
                  Include today in badge count
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${appBadge && includeTodayInBadge ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
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

function NotificationsAreaPage({ onBack, onClose, onNavigateNotificationSettings }: { onBack: () => void; onClose: () => void; onNavigateNotificationSettings: () => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="notifications-area-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Notifications" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateNotificationSettings}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Notification settings</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

function TestingPage({ onBack, onClose, onNavigateAutomatedTests, onNavigateTestData }: { onBack: () => void; onClose: () => void; onNavigateAutomatedTests: () => void; onNavigateTestData: () => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="testing-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Testing" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateAutomatedTests}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Automated tests</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={onNavigateTestData}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Test data</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

function RemindersPage({ onBack, onClose, onNavigateReminderSettings, onNavigateDummyReminders }: { onBack: () => void; onClose: () => void; onNavigateReminderSettings: () => void; onNavigateDummyReminders: () => void }) {
  const [repeatToggle, setRepeatToggle] = useState(true);

  return (
    <div className="flex flex-col h-full relative w-full" data-name="reminders-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Reminders" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => setRepeatToggle(prev => !prev)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: repeatToggle ? '#1C2C42' : '#C9C9C9' }}
                >
                  Repeat reminders
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${repeatToggle ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <div />
            <button
              onClick={onNavigateReminderSettings}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Reminder settings</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={onNavigateDummyReminders}
              className="h-[60px] relative shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                      <p className="leading-[normal] truncate">Dummy reminders</p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="h-[13px] relative w-[7px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                            <path d={svgPathsDummy.p1b692f00} fill="#939393" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListsAreaPage({ onBack, onClose, isListsEnabled, onListsEnabledChange, smartRemindersEnabled, onSmartRemindersEnabledChange, savedListsEnabled, onSavedListsEnabledChange, pinnedListsEnabled, onPinnedListsEnabledChange, useDefaultTemplatesInCleanState, onUseDefaultTemplatesInCleanStateChange, onNavigateDummyLists }: { onBack: () => void; onClose: () => void; isListsEnabled: boolean; onListsEnabledChange: (enabled: boolean) => void; smartRemindersEnabled: boolean; onSmartRemindersEnabledChange: (value: boolean) => void; savedListsEnabled: boolean; onSavedListsEnabledChange: (value: boolean) => void; pinnedListsEnabled: boolean; onPinnedListsEnabledChange: (value: boolean) => void; useDefaultTemplatesInCleanState: boolean; onUseDefaultTemplatesInCleanStateChange: (value: boolean) => void; onNavigateDummyLists: () => void }) {
  const [pendingListsState, setPendingListsState] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col h-full relative w-full" data-name="lists-area-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0" style={{ overflowY: 'auto' }}>
        <div className="flex flex-col gap-[30px] w-full shrink-0">
          <BackHeader title="Lists" onBack={onBack} onClose={onClose} />

          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => setPendingListsState(!isListsEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <p
                  className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[17px] whitespace-nowrap"
                  style={{ color: isListsEnabled ? '#1C2C42' : '#C9C9C9' }}
                >
                  Enable lists
                </p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${isListsEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="w-full h-px bg-[#E4E4E4]" />

          <div className="flex flex-col gap-[20px] w-full">
            <p className="font-['Lato:SemiBold',sans-serif] text-[14px] text-[#939393] leading-[normal]">Features</p>

            <button
              onClick={() => onSmartRemindersEnabledChange(!smartRemindersEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: smartRemindersEnabled ? '#1C2C42' : '#C9C9C9' }}
              >
                Smart reminders
              </p>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${smartRemindersEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSavedListsEnabledChange(!savedListsEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: savedListsEnabled ? '#1C2C42' : '#C9C9C9' }}
              >
                List templates
              </p>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${savedListsEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => onPinnedListsEnabledChange(!pinnedListsEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: pinnedListsEnabled ? '#1C2C42' : '#C9C9C9' }}
              >
                Pinned lists
              </p>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${pinnedListsEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="w-full h-px bg-[#E4E4E4]" />

          <div className="flex flex-col gap-[20px] w-full">
            <p className="font-['Lato:SemiBold',sans-serif] text-[14px] text-[#939393] leading-[normal]">Settings</p>

            <button
              onClick={() => { if (savedListsEnabled) onUseDefaultTemplatesInCleanStateChange(!useDefaultTemplatesInCleanState); }}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full"
              style={{ cursor: savedListsEnabled ? 'pointer' : 'default', opacity: savedListsEnabled ? 1 : 1 }}
            >
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: !savedListsEnabled ? '#C9C9C9' : (useDefaultTemplatesInCleanState ? '#1C2C42' : '#C9C9C9') }}
              >
                Use default template set in clean state
              </p>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${!savedListsEnabled ? 'bg-[#C9C9C9] justify-start' : (useDefaultTemplatesInCleanState ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start')}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="w-full h-px bg-[#E4E4E4]" />

          <button
            onClick={onNavigateDummyLists}
            className="h-[60px] relative shrink-0 w-full cursor-pointer"
          >
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center py-[15px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                    <p className="leading-[normal] truncate">Dummy lists</p>
                  </div>
                  <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="shrink-0">
                    <path d="M1.92753 0.349745C1.50716 -0.116582 0.82549 -0.116582 0.405113 0.349745C-0.0151913 0.816064 -0.0152062 1.57198 0.405113 2.03828L4.38238 6.45L0.315234 10.9617C-0.10508 11.428 -0.105076 12.1839 0.315234 12.6503C0.735611 13.1166 1.41728 13.1166 1.83766 12.6503L6.4969 7.48173C6.5635 7.43513 6.62678 7.37992 6.68481 7.31555C7.10508 6.84926 7.10505 6.09333 6.68481 5.62701L1.92753 0.349745Z" fill="#939393" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      {pendingListsState !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setPendingListsState(null)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
            <div
              className="bg-white relative flex flex-col gap-[35px] items-center py-[40px] px-[34px] rounded-[32px] pointer-events-auto"
              style={{ width: 322 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] text-center">
                <p className="leading-[normal] whitespace-pre-wrap">
                  {pendingListsState
                    ? 'Turn on Lists?'
                    : 'Turn off Lists?'}
                </p>
              </div>
              <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center">
                <p className="leading-[normal] whitespace-pre-wrap">
                  {pendingListsState
                    ? 'The Lists feature will be enabled, allowing full access to all features.'
                    : 'The Lists feature will be disabled, restricting access to certain features.'}
                </p>
              </div>
              <div className="flex gap-[16px] w-full justify-between">
                <button
                  onClick={() => setPendingListsState(null)}
                  className="h-[50px] rounded-[100px] cursor-pointer px-[16px]"
                  style={{ backgroundColor: '#BABABA' }}
                >
                  <div className="flex items-center justify-center size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">Cancel</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onListsEnabledChange(pendingListsState);
                    setPendingListsState(null);
                  }}
                  className="h-[50px] rounded-[100px] cursor-pointer px-[16px]"
                  style={{ backgroundColor: '#4784F8' }}
                >
                  <div className="flex items-center justify-center size-full">
                    <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                      <p className="leading-[normal]">
                        {pendingListsState ? 'Yes, turn on' : 'Yes, turn off'}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ListsPage({ onBack, onClose, smartRemindersEnabled, onSmartRemindersEnabledChange, savedListsEnabled, onSavedListsEnabledChange, pinnedListsEnabled, onPinnedListsEnabledChange }: { onBack: () => void; onClose: () => void; smartRemindersEnabled: boolean; onSmartRemindersEnabledChange: (value: boolean) => void; savedListsEnabled: boolean; onSavedListsEnabledChange: (value: boolean) => void; pinnedListsEnabled: boolean; onPinnedListsEnabledChange: (value: boolean) => void }) {
  return (
    <div className="flex flex-col h-full relative w-full" data-name="lists-page">
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <div className="flex flex-col gap-[30px] w-full flex-1 min-h-0">
          <BackHeader title="Lists" onBack={onBack} onClose={onClose} />
          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            <button
              onClick={() => onSmartRemindersEnabledChange(!smartRemindersEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="h-[21.5px] relative shrink-0 w-[24px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21.5002">
                    <g>
                      <path clipRule="evenodd" d={nlcTogglePaths.pa3f6300} fill={smartRemindersEnabled ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path clipRule="evenodd" d={nlcTogglePaths.p299691f0} fill={smartRemindersEnabled ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                      <path clipRule="evenodd" d={nlcTogglePaths.p16049180} fill={smartRemindersEnabled ? '#1C2C42' : '#C9C9C9'} fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: smartRemindersEnabled ? '#1C2C42' : '#C9C9C9' }}>Smart reminders</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${smartRemindersEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
            <button
              onClick={() => onSavedListsEnabledChange(!savedListsEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="h-[20px] relative shrink-0 w-[20px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d="M14.4152 18.1609C14.854 18.1609 15.2098 18.5167 15.2098 18.9555C15.2098 19.3943 14.854 19.75 14.4152 19.75H11.6911C11.2523 19.75 10.8966 19.3943 10.8966 18.9555C10.8966 18.5167 11.2523 18.1609 11.6911 18.1609H14.4152Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                    <path d="M6.99479 16.3608C7.42491 16.2746 7.84305 16.5532 7.92944 16.9833C8.01327 17.4004 8.14468 17.6113 8.34179 17.7734C8.55972 17.9527 8.88081 18.0883 9.48837 18.168C9.92328 18.2251 10.2297 18.6234 10.173 19.0583C10.1159 19.4934 9.71684 19.8 9.28176 19.7429C8.53098 19.6445 7.87526 19.4462 7.33265 18.9998C6.78118 18.5461 6.50747 17.9685 6.37229 17.2954C6.28606 16.8653 6.56467 16.4472 6.99479 16.3608Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                    <path d="M18.1769 16.9833C18.2633 16.5532 18.6814 16.2746 19.1115 16.3608C19.5417 16.4472 19.8203 16.8653 19.734 17.2954C19.5989 17.9685 19.3251 18.5461 18.7737 18.9998C18.2311 19.4462 17.5753 19.6445 16.8246 19.7429C16.3895 19.8 15.9904 19.4934 15.9334 19.0583C15.8766 18.6234 16.183 18.2251 16.618 18.168C17.2255 18.0883 17.5466 17.9527 17.7645 17.7734C17.9616 17.6113 18.0931 17.4004 18.1769 16.9833Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                    <path d="M7.60489 1.44977e-06C9.07801 1.55801e-06 10.2527 -0.00166324 11.1821 0.108187C12.129 0.220112 12.9241 0.457041 13.5914 1.0047C13.8156 1.18865 14.0211 1.3942 14.2051 1.61835C14.724 2.2507 14.964 2.99778 15.083 3.88048C15.1995 4.74551 15.2087 5.82103 15.2098 7.14998C15.2098 7.38362 15.1078 7.59341 14.9473 7.73879C14.926 7.75812 14.9041 7.77682 14.8808 7.79377C14.7912 7.85875 14.6881 7.90641 14.5757 7.92944C14.5242 7.94003 14.4708 7.94534 14.4161 7.9454L14.4152 7.94452L11.6911 7.9454C11.2523 7.9454 10.8966 7.58968 10.8966 7.15086C10.8966 6.71205 11.2523 6.35632 11.6911 6.35632H13.6171C13.6101 5.40556 13.587 4.67936 13.5081 4.0933C13.4108 3.37144 13.2394 2.94651 12.9769 2.6266C12.859 2.48291 12.7269 2.35079 12.5832 2.23287C12.246 1.9562 11.7924 1.78081 10.9959 1.68663C10.1815 1.59036 9.11694 1.58908 7.60489 1.58908C6.09283 1.58908 5.0283 1.59036 4.2139 1.68663C3.4174 1.78081 2.96381 1.9562 2.6266 2.23287C2.48291 2.35079 2.35079 2.48291 2.23287 2.6266C1.9562 2.96381 1.78081 3.4174 1.68663 4.2139C1.59036 5.0283 1.58908 6.09283 1.58908 7.60489C1.58908 9.11694 1.59036 10.1815 1.68663 10.9959C1.78081 11.7924 1.9562 12.246 2.23287 12.5832C2.35079 12.7269 2.48291 12.859 2.6266 12.9769C2.94651 13.2394 3.37144 13.4108 4.0933 13.5081C4.67936 13.587 5.40556 13.6092 6.35632 13.6163V11.6911C6.35632 11.2523 6.71205 10.8966 7.15086 10.8966C7.58968 10.8966 7.9454 11.2523 7.9454 11.6911V14.4152C7.9454 14.5523 7.91075 14.6813 7.84963 14.7939C7.81927 14.8498 7.78115 14.9005 7.73879 14.9473C7.7146 14.974 7.68922 14.9994 7.66164 15.0227C7.65471 15.0285 7.64748 15.0339 7.64036 15.0395C7.50532 15.1455 7.33587 15.2098 7.15086 15.2098L7.14998 15.2089C5.82102 15.2078 4.74552 15.1995 3.88048 15.083C2.99778 14.964 2.2507 14.724 1.61835 14.2051C1.3942 14.0211 1.18865 13.8156 1.0047 13.5914C0.457041 12.9241 0.220112 12.129 0.108187 11.1821C-0.00166323 10.2527 1.34081e-06 9.07801 1.44956e-06 7.60489C1.55651e-06 6.13177 -0.00166326 4.95702 0.108187 4.02768C0.220112 3.0808 0.457041 2.28568 1.0047 1.61835C1.18865 1.3942 1.3942 1.18865 1.61835 1.0047C2.28568 0.457041 3.0808 0.220112 4.02768 0.108187C4.95703 -0.00166331 6.13177 1.34101e-06 7.60489 1.44977e-06Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                    <path d="M18.9555 10.8966C19.3943 10.8966 19.75 11.2523 19.75 11.6911V14.4152C19.75 14.854 19.3943 15.2098 18.9555 15.2098C18.5167 15.2098 18.1609 14.854 18.1609 14.4152V11.6911C18.1609 11.2523 18.5167 10.8966 18.9555 10.8966Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                    <path d="M9.28176 6.36342C9.71684 6.30636 10.1159 6.61291 10.173 7.048C10.2297 7.48289 9.92328 7.88125 9.48837 7.93831C8.88081 8.01798 8.55973 8.15367 8.34179 8.33292C8.14468 8.49507 8.01327 8.7059 7.92944 9.12303C7.84305 9.55315 7.42491 9.83176 6.99479 9.74553C6.56467 9.65914 6.28606 9.241 6.37229 8.81089C6.50747 8.13783 6.78118 7.56022 7.33265 7.10653C7.87526 6.66015 8.53099 6.46187 9.28176 6.36342Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                    <path d="M16.8246 6.36342C17.5753 6.46187 18.2311 6.66015 18.7737 7.10653C19.3251 7.56022 19.5989 8.13783 19.734 8.81089C19.8203 9.241 19.5417 9.65914 19.1115 9.74553C18.6814 9.83176 18.2633 9.55315 18.1769 9.12303C18.0931 8.7059 17.9616 8.49507 17.7645 8.33292C17.5466 8.15367 17.2255 8.01798 16.618 7.93831C16.183 7.88125 15.8766 7.48289 15.9334 7.048C15.9904 6.61291 16.3895 6.30636 16.8246 6.36342Z" fill={savedListsEnabled ? '#1C2C42' : '#C9C9C9'} />
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: savedListsEnabled ? '#1C2C42' : '#C9C9C9' }}>List templates</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${savedListsEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
              >
                <div className="relative shrink-0 size-[22.5px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                    <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                  </svg>
                </div>
              </div>
            </button>
            <button
              onClick={() => onPinnedListsEnabledChange(!pinnedListsEnabled)}
              className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full cursor-pointer"
            >
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                <div className="h-[20px] relative shrink-0 w-[20px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 22 22">
                    <path d="M1 21L6.55436 15.4446" stroke={pinnedListsEnabled ? '#1C2C42' : '#C9C9C9'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.3967 18.6345C8.23842 17.6902 4.30958 13.7606 3.36544 9.6015C3.21598 8.94311 3.14125 8.61392 3.35775 8.07983C3.57424 7.54575 3.83871 7.38049 4.36764 7.04998C5.56332 6.30284 6.85803 6.06532 8.20168 6.18419C10.0871 6.35098 11.0298 6.43438 11.5 6.18932C11.9703 5.94425 12.2899 5.37122 12.929 4.22515L13.7386 2.77334C14.272 1.81696 14.5386 1.33877 15.1659 1.11335C15.7932 0.887927 16.1708 1.02444 16.9258 1.29745C18.6915 1.93593 20.0608 3.30556 20.6992 5.07157C20.9722 5.82676 21.1087 6.20435 20.8833 6.83178C20.6579 7.4592 20.1798 7.72593 19.2236 8.25939L17.7386 9.08783C16.5949 9.72587 16.0231 10.0449 15.7782 10.5198C15.5332 10.9948 15.6222 11.9171 15.8001 13.7618C15.9309 15.1184 15.7054 16.4219 14.9484 17.6326C14.6177 18.1617 14.4523 18.4262 13.9184 18.6425C13.3846 18.8588 13.0553 18.7841 12.3967 18.6345Z" stroke={pinnedListsEnabled ? '#1C2C42' : '#C9C9C9'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px]" style={{ color: pinnedListsEnabled ? '#1C2C42' : '#C9C9C9' }}>Pinned lists</p>
              </div>
              <div
                className={`content-stretch flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px] transition-colors ${pinnedListsEnabled ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
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

function LoginScreen({ onUnlock, passwordRequired }: { onUnlock: () => void; passwordRequired: boolean }) {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [revealVisible, setRevealVisible] = useState(false);
  const [revealFading, setRevealFading] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
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

  const handlePasswordPointerDown = (event: React.PointerEvent<HTMLInputElement>) => {
    if (document.activeElement === passwordInputRef.current) return;
    event.preventDefault();
    passwordInputRef.current?.focus({ preventScroll: true });
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
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center whitespace-nowrap">
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
                  ref={passwordInputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setShowError(false); }}
                  onKeyDown={handleKeyDown}
                  onPointerDown={handlePasswordPointerDown}
                  placeholder="Password..."
                  className="flex-1 bg-transparent outline-none font-['Lato:Bold',sans-serif] not-italic text-[20px] text-[#1C2C42] placeholder:text-[#C9C9C9] focus:placeholder:text-transparent placeholder-lato-semibold text-center leading-[60px] h-full"
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
                className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-[#1C2C42] text-center whitespace-nowrap"
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

function DevToolsContent({ onClose, onClearReminders, addReminder, addReminders, nlcMode, onNlcModeChange, nlcEnabled, onNlcEnabledChange, nlcRecognition, onNlcRecognitionChange, filtersMenuVariant, onFiltersMenuVariantChange, hideOverdue, onHideOverdueChange, isOnboardingTutorialEnabled, onOnboardingTutorialEnabledChange, isListsEnabled, onListsEnabledChange, showTutorialOnFirstLaunch, onShowTutorialOnFirstLaunchChange, showTutorialOnEveryStart, onShowTutorialOnEveryStartChange, isDevToolsUnlocked, onDevToolsUnlock, isDevToolsPasswordRequired, onDevToolsPasswordRequiredChange, useOneMinuteIncrements, onUseOneMinuteIncrementsChange, smartRemindersEnabled, onSmartRemindersEnabledChange, savedListsEnabled, onSavedListsEnabledChange, pinnedListsEnabled, onPinnedListsEnabledChange, settingsMenuEnabled, onSettingsMenuEnabledChange, notifReminderAlerts, onNotifReminderAlertsChange, notifAppBadge, onNotifAppBadgeChange, notifIncludeTodayInBadge, onNotifIncludeTodayInBadgeChange, siriShortcutsEnabled, onSiriShortcutsEnabledChange, useDefaultTemplatesInCleanState, onUseDefaultTemplatesInCleanStateChange, onClearLists, onGenerateLists }: { onClose: () => void; onClearReminders: () => void; addReminder: (reminder: Reminder) => void; addReminders: (reminders: Reminder[]) => void; nlcMode: NlcMode; onNlcModeChange: (mode: NlcMode) => void; nlcEnabled: boolean; onNlcEnabledChange: (enabled: boolean) => void; nlcRecognition: NlcRecognitionConfig; onNlcRecognitionChange: (config: NlcRecognitionConfig) => void; filtersMenuVariant: FiltersMenuVariant; onFiltersMenuVariantChange: (variant: FiltersMenuVariant) => void; hideOverdue: boolean; onHideOverdueChange: (value: boolean) => void; isOnboardingTutorialEnabled: boolean; onOnboardingTutorialEnabledChange: (next: boolean) => void; isListsEnabled: boolean; onListsEnabledChange: (enabled: boolean) => void; showTutorialOnFirstLaunch: boolean; onShowTutorialOnFirstLaunchChange: (value: boolean) => void; showTutorialOnEveryStart: boolean; onShowTutorialOnEveryStartChange: (value: boolean) => void; isDevToolsUnlocked: boolean; onDevToolsUnlock: () => void; isDevToolsPasswordRequired: boolean; onDevToolsPasswordRequiredChange: (value: boolean) => void; useOneMinuteIncrements: boolean; onUseOneMinuteIncrementsChange: (value: boolean) => void; smartRemindersEnabled: boolean; onSmartRemindersEnabledChange: (value: boolean) => void; savedListsEnabled: boolean; onSavedListsEnabledChange: (value: boolean) => void; pinnedListsEnabled: boolean; onPinnedListsEnabledChange: (value: boolean) => void; settingsMenuEnabled: boolean; onSettingsMenuEnabledChange: (value: boolean) => void; notifReminderAlerts: boolean; onNotifReminderAlertsChange: (value: boolean) => void; notifAppBadge: boolean; onNotifAppBadgeChange: (value: boolean) => void; notifIncludeTodayInBadge: boolean; onNotifIncludeTodayInBadgeChange: (value: boolean) => void; siriShortcutsEnabled: boolean; onSiriShortcutsEnabledChange: (value: boolean) => void; useDefaultTemplatesInCleanState: boolean; onUseDefaultTemplatesInCleanStateChange: (value: boolean) => void; onClearLists: (useDefaultTemplatesInCleanState: boolean) => void; onGenerateLists: (payload: GeneratedDummyListsPayload) => void }) {
  const [page, setPage] = useState<DevToolsPage>('home');

  let content;
  if (!isDevToolsUnlocked) {
    content = (
      <div className="flex flex-col items-start pt-[30px] px-[30px] pb-[30px] relative w-full flex-1 min-h-0">
        <LoginScreen onUnlock={onDevToolsUnlock} passwordRequired={isDevToolsPasswordRequired} />
      </div>
    );
  } else if (page === 'home') {
    content = (
      <DevToolsHome
        onClose={onClose}
        onNavigateReminders={() => setPage('reminders')}
        onNavigateLists={() => setPage('lists')}
        onNavigateNlc={() => setPage('natural-language')}
        onNavigateNotifications={() => setPage('notifications-area')}
        onNavigateOnboarding={() => setPage('onboarding')}
        onNavigateTesting={() => setPage('testing')}
        onNavigateSystem={() => setPage('system')}
      />
    );
  } else if (page === 'testing') {
    content = (
      <TestingPage onBack={() => setPage('home')} onClose={onClose} onNavigateAutomatedTests={() => setPage('tests')} onNavigateTestData={() => setPage('test-data')} />
    );
  } else if (page === 'reminders') {
    content = (
      <RemindersPage onBack={() => setPage('home')} onClose={onClose} onNavigateReminderSettings={() => setPage('reminder-settings')} onNavigateDummyReminders={() => setPage('dummy-reminders')} />
    );
  } else if (page === 'test-data') {
    content = (
      <TestDataPage
        onBack={() => setPage('testing')}
        onClose={onClose}
        onNavigateReminders={() => setPage('reminders')}
        onNavigateLists={() => setPage('lists')}
      />
    );
  } else if (page === 'dummy-reminders') {
    content = (
      <DummyRemindersPage onBack={() => setPage('reminders')} onClose={onClose} addReminders={addReminders} hideOverdue={hideOverdue} onHideOverdueChange={onHideOverdueChange} onClearReminders={onClearReminders} />
    );
  } else if (page === 'lists') {
    content = (
      <ListsAreaPage onBack={() => setPage('home')} onClose={onClose} isListsEnabled={isListsEnabled} onListsEnabledChange={onListsEnabledChange} smartRemindersEnabled={smartRemindersEnabled} onSmartRemindersEnabledChange={onSmartRemindersEnabledChange} savedListsEnabled={savedListsEnabled} onSavedListsEnabledChange={onSavedListsEnabledChange} pinnedListsEnabled={pinnedListsEnabled} onPinnedListsEnabledChange={onPinnedListsEnabledChange} useDefaultTemplatesInCleanState={useDefaultTemplatesInCleanState} onUseDefaultTemplatesInCleanStateChange={onUseDefaultTemplatesInCleanStateChange} onNavigateDummyLists={() => setPage('dummy-lists')} />
    );
  } else if (page === 'dummy-lists') {
    content = (
      <DummyListsPage onBack={() => setPage('lists')} onClose={onClose} onClearLists={() => onClearLists(useDefaultTemplatesInCleanState)} onGenerateLists={onGenerateLists} />
    );
  } else if (page === 'natural-language') {
    content = (
      <NaturalLanguagePage onBack={() => setPage('home')} onClose={onClose} nlcEnabled={nlcEnabled} onNlcEnabledChange={onNlcEnabledChange} onNavigateNlcSettings={() => setPage('nlc')} />
    );
  } else if (page === 'nlc') {
    content = (
      <NlcPage onBack={() => setPage('natural-language')} onClose={onClose} nlcMode={nlcMode} onNlcModeChange={onNlcModeChange} recognition={nlcRecognition} onRecognitionChange={onNlcRecognitionChange} />
    );
  } else if (page === 'filters-menu') {
    content = (
      <FiltersMenuPage onBack={() => setPage('system')} onClose={onClose} filtersMenuVariant={filtersMenuVariant} onFiltersMenuVariantChange={onFiltersMenuVariantChange} isListsEnabled={isListsEnabled} />
    );
  } else if (page === 'onboarding') {
    content = (
      <OnboardingPage onBack={() => setPage('home')} onClose={onClose} isOnboardingTutorialEnabled={isOnboardingTutorialEnabled} onOnboardingTutorialEnabledChange={onOnboardingTutorialEnabledChange} onNavigateOnboardingTutorial={() => setPage('onboarding-tutorial')} />
    );
  } else if (page === 'onboarding-tutorial') {
    content = (
      <OnboardingTutorialPage onBack={() => setPage('onboarding')} onClose={onClose} showTutorialOnFirstLaunch={showTutorialOnFirstLaunch} onShowTutorialOnFirstLaunchChange={onShowTutorialOnFirstLaunchChange} showTutorialOnEveryStart={showTutorialOnEveryStart} onShowTutorialOnEveryStartChange={onShowTutorialOnEveryStartChange} />
    );
  } else if (page === 'system') {
    content = (
      <SystemPage onBack={() => setPage('home')} onClose={onClose} siriShortcutsEnabled={siriShortcutsEnabled} onSiriShortcutsEnabledChange={onSiriShortcutsEnabledChange} settingsMenuEnabled={settingsMenuEnabled} onSettingsMenuEnabledChange={onSettingsMenuEnabledChange} onNavigateFiltersMenu={() => setPage('filters-menu')} onNavigateDevToolsPassword={() => setPage('dev-tools-password')} />
    );
  } else if (page === 'dev-tools-password') {
    content = (
      <DevToolsPasswordPage onBack={() => setPage('system')} onClose={onClose} passwordRequired={isDevToolsPasswordRequired} onPasswordRequiredChange={onDevToolsPasswordRequiredChange} />
    );
  } else if (page === 'reminder-settings') {
    content = (
      <ReminderSettingsPage onBack={() => setPage('reminders')} onClose={onClose} useOneMinuteIncrements={useOneMinuteIncrements} onUseOneMinuteIncrementsChange={onUseOneMinuteIncrementsChange} />
    );
  } else if (page === 'list-settings') {
    content = (
      <ListSettingsPage onBack={() => setPage('lists')} onClose={onClose} useDefaultTemplatesInCleanState={useDefaultTemplatesInCleanState} onUseDefaultTemplatesInCleanStateChange={onUseDefaultTemplatesInCleanStateChange} />
    );
  } else if (page === 'paywall') {
    content = (
      <ListsPage onBack={() => setPage('lists')} onClose={onClose} smartRemindersEnabled={smartRemindersEnabled} onSmartRemindersEnabledChange={onSmartRemindersEnabledChange} savedListsEnabled={savedListsEnabled} onSavedListsEnabledChange={onSavedListsEnabledChange} pinnedListsEnabled={pinnedListsEnabled} onPinnedListsEnabledChange={onPinnedListsEnabledChange} />
    );
  } else if (page === 'notifications-area') {
    content = (
      <NotificationsAreaPage onBack={() => setPage('home')} onClose={onClose} onNavigateNotificationSettings={() => setPage('notifications')} />
    );
  } else if (page === 'notifications') {
    content = (
      <NotificationsSettingsPage onBack={() => setPage('notifications-area')} onClose={onClose} reminderAlerts={notifReminderAlerts} onReminderAlertsChange={onNotifReminderAlertsChange} appBadge={notifAppBadge} onAppBadgeChange={onNotifAppBadgeChange} includeTodayInBadge={notifIncludeTodayInBadge} onIncludeTodayInBadgeChange={onNotifIncludeTodayInBadgeChange} />
    );
  } else {
    content = (
      <div className="flex flex-col gap-[32px] items-start pt-[30px] px-[20px] pb-[32px] relative w-full flex-1 min-h-0">
        <SelfChecks onBack={() => setPage('testing')} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative w-full max-w-[768px]" data-name="dev-tools-content">
      {content}
    </div>
  );
}

export default function DevToolsOverlay({ onClose, onClearReminders, addReminder, addReminders, nlcMode, onNlcModeChange, nlcEnabled, onNlcEnabledChange, nlcRecognition, onNlcRecognitionChange, filtersMenuVariant, onFiltersMenuVariantChange, hideOverdue, onHideOverdueChange, isOnboardingTutorialEnabled, onOnboardingTutorialEnabledChange, isListsEnabled, onListsEnabledChange, showTutorialOnFirstLaunch, onShowTutorialOnFirstLaunchChange, showTutorialOnEveryStart, onShowTutorialOnEveryStartChange, isDevToolsUnlocked, onDevToolsUnlock, isDevToolsPasswordRequired, onDevToolsPasswordRequiredChange, useOneMinuteIncrements, onUseOneMinuteIncrementsChange, smartRemindersEnabled, onSmartRemindersEnabledChange, savedListsEnabled, onSavedListsEnabledChange, pinnedListsEnabled, onPinnedListsEnabledChange, settingsMenuEnabled, onSettingsMenuEnabledChange, notifReminderAlerts, onNotifReminderAlertsChange, notifAppBadge, onNotifAppBadgeChange, notifIncludeTodayInBadge, onNotifIncludeTodayInBadgeChange, siriShortcutsEnabled, onSiriShortcutsEnabledChange, useDefaultTemplatesInCleanState, onUseDefaultTemplatesInCleanStateChange, onClearLists, onGenerateLists }: { onClose: () => void; onClearReminders: () => void; addReminder: (reminder: Reminder) => void; addReminders: (reminders: Reminder[]) => void; nlcMode: NlcMode; onNlcModeChange: (mode: NlcMode) => void; nlcEnabled: boolean; onNlcEnabledChange: (enabled: boolean) => void; nlcRecognition: NlcRecognitionConfig; onNlcRecognitionChange: (config: NlcRecognitionConfig) => void; filtersMenuVariant: FiltersMenuVariant; onFiltersMenuVariantChange: (variant: FiltersMenuVariant) => void; hideOverdue: boolean; onHideOverdueChange: (value: boolean) => void; isOnboardingTutorialEnabled: boolean; onOnboardingTutorialEnabledChange: (next: boolean) => void; isListsEnabled: boolean; onListsEnabledChange: (enabled: boolean) => void; showTutorialOnFirstLaunch: boolean; onShowTutorialOnFirstLaunchChange: (value: boolean) => void; showTutorialOnEveryStart: boolean; onShowTutorialOnEveryStartChange: (value: boolean) => void; isDevToolsUnlocked: boolean; onDevToolsUnlock: () => void; isDevToolsPasswordRequired: boolean; onDevToolsPasswordRequiredChange: (value: boolean) => void; useOneMinuteIncrements: boolean; onUseOneMinuteIncrementsChange: (value: boolean) => void; smartRemindersEnabled: boolean; onSmartRemindersEnabledChange: (value: boolean) => void; savedListsEnabled: boolean; onSavedListsEnabledChange: (value: boolean) => void; pinnedListsEnabled: boolean; onPinnedListsEnabledChange: (value: boolean) => void; settingsMenuEnabled: boolean; onSettingsMenuEnabledChange: (value: boolean) => void; notifReminderAlerts: boolean; onNotifReminderAlertsChange: (value: boolean) => void; notifAppBadge: boolean; onNotifAppBadgeChange: (value: boolean) => void; notifIncludeTodayInBadge: boolean; onNotifIncludeTodayInBadgeChange: (value: boolean) => void; siriShortcutsEnabled: boolean; onSiriShortcutsEnabledChange: (value: boolean) => void; useDefaultTemplatesInCleanState: boolean; onUseDefaultTemplatesInCleanStateChange: (value: boolean) => void; onClearLists: (useDefaultTemplatesInCleanState: boolean) => void; onGenerateLists: (payload: GeneratedDummyListsPayload) => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="dev-tools-overlay">
      <DevToolsContent onClose={onClose} onClearReminders={onClearReminders} addReminder={addReminder} addReminders={addReminders} nlcMode={nlcMode} onNlcModeChange={onNlcModeChange} nlcEnabled={nlcEnabled} onNlcEnabledChange={onNlcEnabledChange} nlcRecognition={nlcRecognition} onNlcRecognitionChange={onNlcRecognitionChange} filtersMenuVariant={filtersMenuVariant} onFiltersMenuVariantChange={onFiltersMenuVariantChange} hideOverdue={hideOverdue} onHideOverdueChange={onHideOverdueChange} isOnboardingTutorialEnabled={isOnboardingTutorialEnabled} onOnboardingTutorialEnabledChange={onOnboardingTutorialEnabledChange} isListsEnabled={isListsEnabled} onListsEnabledChange={onListsEnabledChange} showTutorialOnFirstLaunch={showTutorialOnFirstLaunch} onShowTutorialOnFirstLaunchChange={onShowTutorialOnFirstLaunchChange} showTutorialOnEveryStart={showTutorialOnEveryStart} onShowTutorialOnEveryStartChange={onShowTutorialOnEveryStartChange} isDevToolsUnlocked={isDevToolsUnlocked} onDevToolsUnlock={onDevToolsUnlock} isDevToolsPasswordRequired={isDevToolsPasswordRequired} onDevToolsPasswordRequiredChange={onDevToolsPasswordRequiredChange} useOneMinuteIncrements={useOneMinuteIncrements} onUseOneMinuteIncrementsChange={onUseOneMinuteIncrementsChange} smartRemindersEnabled={smartRemindersEnabled} onSmartRemindersEnabledChange={onSmartRemindersEnabledChange} savedListsEnabled={savedListsEnabled} onSavedListsEnabledChange={onSavedListsEnabledChange} pinnedListsEnabled={pinnedListsEnabled} onPinnedListsEnabledChange={onPinnedListsEnabledChange} settingsMenuEnabled={settingsMenuEnabled} onSettingsMenuEnabledChange={onSettingsMenuEnabledChange} notifReminderAlerts={notifReminderAlerts} onNotifReminderAlertsChange={onNotifReminderAlertsChange} notifAppBadge={notifAppBadge} onNotifAppBadgeChange={onNotifAppBadgeChange} notifIncludeTodayInBadge={notifIncludeTodayInBadge} onNotifIncludeTodayInBadgeChange={onNotifIncludeTodayInBadgeChange} siriShortcutsEnabled={siriShortcutsEnabled} onSiriShortcutsEnabledChange={onSiriShortcutsEnabledChange} useDefaultTemplatesInCleanState={useDefaultTemplatesInCleanState} onUseDefaultTemplatesInCleanStateChange={onUseDefaultTemplatesInCleanStateChange} onClearLists={onClearLists} onGenerateLists={onGenerateLists} />
    </div>
  );
}
