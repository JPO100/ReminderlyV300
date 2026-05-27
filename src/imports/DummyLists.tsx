import svgPaths from "./svg-enpj30u9ti";
import { useState, useEffect, useRef } from "react";
import { isListsEnabled } from "../app/utils/featureFlags";
import { generateDummyLists } from "../app/utils/dummy-list-generator";
import type { GeneratedDummyListsPayload } from "../app/utils/dummy-list-generator";

function Header({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="header">
      <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
        <button onClick={onBack} className="cursor-pointer shrink-0" aria-label="Back">
          <div className="h-[17px] relative shrink-0 w-[9px]" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 17">
              <path d={svgPaths.p347e8980} fill="var(--fill-0, #1C2C42)" id="Union" />
            </svg>
          </div>
        </button>
        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] whitespace-nowrap">
          <p className="leading-[normal]">Dummy lists</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex items-center justify-center relative shrink-0 size-[25.456px] cursor-pointer"
        aria-label="Close dev tools"
        style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}
      >
        <div className="flex-none rotate-45">
          <div className="relative size-[18px]" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p1cbc7100} fill="var(--fill-0, #1C2C42)" id="Union" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function DummyLists({ onBack, onClose, onClearLists, onGenerateLists }: { onBack: () => void; onClose: () => void; onClearLists: () => void; onGenerateLists: (payload: GeneratedDummyListsPayload) => void }) {
  const [numberOfLists, setNumberOfLists] = useState("11");
  const [maxListItems, setMaxListItems] = useState("15");
  const [includeDone, setIncludeDone] = useState(true);
  const [includeSmartReminderLists, setIncludeSmartReminderLists] = useState(true);
  const [includeSavedLists, setIncludeSavedLists] = useState(true);
  const [showDone, setShowDone] = useState(false);
  const [clearState, setClearState] = useState<'idle' | 'confirming' | 'cleared'>('idle');
  const clearBtnRef = useRef<HTMLButtonElement>(null);

  const listsEnabled = isListsEnabled();

  useEffect(() => {
    if (clearState !== 'confirming') return;
    const handleClickOutside = (e: MouseEvent) => {
      if (clearBtnRef.current && !clearBtnRef.current.contains(e.target as Node)) {
        setClearState('idle');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearState]);

  const handleClear = () => {
    if (clearState === 'idle') {
      setClearState('confirming');
    } else if (clearState === 'confirming') {
      onClearLists();
      setClearState('cleared');
      setTimeout(() => setClearState('idle'), 2000);
    }
  };

  const clearLabel =
    clearState === 'idle' ? 'Clear lists' :
    clearState === 'confirming' ? 'Are you sure?' :
    'Cleared!';

  const clearBgColor =
    clearState === 'cleared' ? '#2A4466' :
    clearState === 'confirming' ? '#35506E' : '#4784F8';

  const parseCount = (val: string): number => {
    const n = parseInt(val, 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const handleGenerate = () => {
    if (showDone) return;
    const lists = generateDummyLists(
      parseCount(numberOfLists),
      parseCount(maxListItems),
      includeDone,
      includeSmartReminderLists,
      includeSavedLists,
    );
    onGenerateLists(lists);
    setShowDone(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="bg-white content-stretch flex flex-col gap-[30px] items-start pb-[30px] pt-[30px] px-[20px] relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="dummy lists">
      <Header onBack={onBack} onClose={onClose} />
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center min-h-px min-w-px relative w-full" style={!listsEnabled ? { opacity: 0.5, pointerEvents: 'none' } : undefined}>
        <div className="content-stretch flex flex-col gap-[30px] items-start relative w-full" data-name="Scrollable List Area" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <div className="content-stretch flex flex-col gap-[10px] items-start relative w-full">
            {/* Number of lists */}
            <div className="h-[51px] relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-px py-[13px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                    <p className="leading-[normal]">Number of lists</p>
                  </div>
                  <div className="bg-white content-stretch flex h-[36px] items-center justify-center p-[13px] relative rounded-[4px] shrink-0 w-[60px]" data-name="text-box">
                    <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={numberOfLists}
                      onChange={(e) => setNumberOfLists(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-center font-['Lato:SemiBold',sans-serif] leading-[26px] not-italic text-[#1C2C42] text-[17px] p-0 m-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Max number of list items */}
            <div className="h-[51px] relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-px py-[13px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                    <p className="leading-[normal]">Max number of list items</p>
                  </div>
                  <div className="bg-white content-stretch flex h-[36px] items-center justify-center p-[13px] relative rounded-[4px] shrink-0 w-[60px]" data-name="text-box">
                    <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={maxListItems}
                      onChange={(e) => setMaxListItems(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-center font-['Lato:SemiBold',sans-serif] leading-[26px] not-italic text-[#1C2C42] text-[17px] p-0 m-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIncludeDone(!includeDone)}
            className="flex h-[30px] items-center justify-between w-full"
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center gap-[16px]">
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: includeDone ? '#1C2C42' : '#C9C9C9' }}
              >
                Include done list items
              </p>
              <svg width="16.5" height="16.5" viewBox="0 0 17 17" fill="none" className="shrink-0">
                <path d="M7.6875 6.75C7.84307 6.75 8.03551 6.7485 8.19922 6.77051C8.36125 6.79232 8.5773 6.84631 8.77441 7.00488L8.8584 7.0791L8.93262 7.16309C9.09119 7.36019 9.14517 7.57625 9.16699 7.73828C9.189 7.90198 9.1875 8.09443 9.1875 8.25V12C9.1875 12.4142 8.85171 12.75 8.4375 12.75C8.02329 12.75 7.6875 12.4142 7.6875 12V8.25C7.27329 8.25 6.9375 7.91421 6.9375 7.5C6.93751 7.08579 7.27329 6.75 7.6875 6.75Z" fill={includeDone ? '#939393' : '#D9D9D9'}/>
                <path d="M8.24902 4.5C8.66312 4.50013 8.99902 4.83587 8.99902 5.25C8.99902 5.66413 8.66312 5.99987 8.24902 6H8.24219C7.82798 6 7.4922 5.66421 7.49219 5.25C7.49219 4.83579 7.82797 4.5 8.24219 4.5H8.24902Z" fill={includeDone ? '#939393' : '#D9D9D9'}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.25 0C12.8063 0 16.5 3.69365 16.5 8.25C16.5 12.8063 12.8063 16.5 8.25 16.5C3.69365 16.5 0 12.8063 0 8.25C0 3.69365 3.69365 0 8.25 0ZM8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5Z" fill={includeDone ? '#939393' : '#D9D9D9'}/>
              </svg>
            </div>
            <div
              className={`flex h-[30px] items-center p-[3.75px] rounded-[37.5px] shrink-0 w-[56px] transition-colors ${includeDone ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
            >
              <div className="relative shrink-0 size-[22.5px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                </svg>
              </div>
            </div>
          </button>
          <button
            onClick={() => setIncludeSmartReminderLists(!includeSmartReminderLists)}
            className="flex h-[30px] items-center justify-between w-full"
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center gap-[16px]">
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: includeSmartReminderLists ? '#1C2C42' : '#C9C9C9' }}
              >
                Include smart reminder lists
              </p>
              <svg width="16.5" height="16.5" viewBox="0 0 17 17" fill="none" className="shrink-0">
                <path d="M7.6875 6.75C7.84307 6.75 8.03551 6.7485 8.19922 6.77051C8.36125 6.79232 8.5773 6.84631 8.77441 7.00488L8.8584 7.0791L8.93262 7.16309C9.09119 7.36019 9.14517 7.57625 9.16699 7.73828C9.189 7.90198 9.1875 8.09443 9.1875 8.25V12C9.1875 12.4142 8.85171 12.75 8.4375 12.75C8.02329 12.75 7.6875 12.4142 7.6875 12V8.25C7.27329 8.25 6.9375 7.91421 6.9375 7.5C6.93751 7.08579 7.27329 6.75 7.6875 6.75Z" fill={includeSmartReminderLists ? '#939393' : '#D9D9D9'}/>
                <path d="M8.24902 4.5C8.66312 4.50013 8.99902 4.83587 8.99902 5.25C8.99902 5.66413 8.66312 5.99987 8.24902 6H8.24219C7.82798 6 7.4922 5.66421 7.49219 5.25C7.49219 4.83579 7.82797 4.5 8.24219 4.5H8.24902Z" fill={includeSmartReminderLists ? '#939393' : '#D9D9D9'}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.25 0C12.8063 0 16.5 3.69365 16.5 8.25C16.5 12.8063 12.8063 16.5 8.25 16.5C3.69365 16.5 0 12.8063 0 8.25C0 3.69365 3.69365 0 8.25 0ZM8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5Z" fill={includeSmartReminderLists ? '#939393' : '#D9D9D9'}/>
              </svg>
            </div>
            <div
              className={`flex h-[30px] items-center p-[3.75px] rounded-[37.5px] shrink-0 w-[56px] transition-colors ${includeSmartReminderLists ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
            >
              <div className="relative shrink-0 size-[22.5px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                </svg>
              </div>
            </div>
          </button>
          <button
            onClick={() => setIncludeSavedLists(!includeSavedLists)}
            className="flex h-[30px] items-center justify-between w-full"
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center gap-[16px]">
              <p
                className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic text-[17px] whitespace-nowrap"
                style={{ color: includeSavedLists ? '#1C2C42' : '#C9C9C9' }}
              >
                Include List templates
              </p>
              <svg width="16.5" height="16.5" viewBox="0 0 17 17" fill="none" className="shrink-0">
                <path d="M7.6875 6.75C7.84307 6.75 8.03551 6.7485 8.19922 6.77051C8.36125 6.79232 8.5773 6.84631 8.77441 7.00488L8.8584 7.0791L8.93262 7.16309C9.09119 7.36019 9.14517 7.57625 9.16699 7.73828C9.189 7.90198 9.1875 8.09443 9.1875 8.25V12C9.1875 12.4142 8.85171 12.75 8.4375 12.75C8.02329 12.75 7.6875 12.4142 7.6875 12V8.25C7.27329 8.25 6.9375 7.91421 6.9375 7.5C6.93751 7.08579 7.27329 6.75 7.6875 6.75Z" fill={includeSavedLists ? '#939393' : '#D9D9D9'}/>
                <path d="M8.24902 4.5C8.66312 4.50013 8.99902 4.83587 8.99902 5.25C8.99902 5.66413 8.66312 5.99987 8.24902 6H8.24219C7.82798 6 7.4922 5.66421 7.49219 5.25C7.49219 4.83579 7.82797 4.5 8.24219 4.5H8.24902Z" fill={includeSavedLists ? '#939393' : '#D9D9D9'}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.25 0C12.8063 0 16.5 3.69365 16.5 8.25C16.5 12.8063 12.8063 16.5 8.25 16.5C3.69365 16.5 0 12.8063 0 8.25C0 3.69365 3.69365 0 8.25 0ZM8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5Z" fill={includeSavedLists ? '#939393' : '#D9D9D9'}/>
              </svg>
            </div>
            <div
              className={`flex h-[30px] items-center p-[3.75px] rounded-[37.5px] shrink-0 w-[56px] transition-colors ${includeSavedLists ? 'bg-[#4784f8] justify-end' : 'bg-[#C9C9C9] justify-start'}`}
            >
              <div className="relative shrink-0 size-[22.5px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <circle cx="11.25" cy="11.25" fill="white" r="11.25" />
                </svg>
              </div>
            </div>
          </button>
        </div>
        {/* Clear lists and Generate lists buttons */}
        <div className="flex gap-[30px] items-center relative shrink-0 w-full">
          <button
            ref={clearBtnRef}
            onClick={handleClear}
            className="relative rounded-[100px] flex-1 cursor-pointer"
            data-name="clear-btn"
            style={{ height: 'clamp(40px, calc(20vh - 73.6px), 60px)', backgroundColor: clearBgColor }}
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
                <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                  <p className="leading-[normal]">{clearLabel}</p>
                </div>
              </div>
            </div>
          </button>
          <button
            onClick={handleGenerate}
            className={`${showDone ? 'bg-[#6AB016]' : 'bg-[#7EC91C]'} relative rounded-[100px] flex-1 cursor-pointer`}
            data-name="generate-btn"
            style={{ height: 'clamp(40px, calc(20vh - 73.6px), 60px)' }}
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
                <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                  <p className="leading-[normal]">{showDone ? 'Done' : 'Generate lists'}</p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
