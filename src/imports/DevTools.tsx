import svgPaths from "./svg-7kpmedzeqd";
import { useState, useEffect, useRef } from "react";

function ToggleBtn({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <div className="h-[30px] relative shrink-0 w-[56px]" data-name="toggle-btn" onClick={(e) => { e.stopPropagation(); onToggle(); }} style={{ cursor: 'pointer' }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
        <g id="toggle-btn">
          <rect fill={isOn ? "#4784F8" : "#C9C9C9"} height="30" rx="15" width="56" />
          <circle cx={isOn ? "41" : "15"} cy="15" fill="white" id="btn" r="11.25" style={{ transition: 'cx 0.2s ease' }} />
        </g>
      </svg>
    </div>
  );
}

function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="header">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] whitespace-nowrap">
        <p className="leading-[normal]">Dev tools</p>
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

function NavRow({ label, onClick, plain }: { label: string; onClick: () => void; plain?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`${plain ? 'h-[60px]' : 'h-[50px] bg-[#f5f5f5] rounded-[100px]'} relative shrink-0 w-full cursor-pointer`}
    >
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center ${plain ? 'pr-[30px]' : 'px-[30px]'} py-[15px] relative size-full`}>
          <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
            <div className={`flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 ${plain ? 'text-[#1C2C42] text-[17px]' : 'text-[#939393] text-[17px]'} whitespace-nowrap`}>
              <p className="leading-[normal] truncate">{label}</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="h-[13px] relative w-[7px]" data-name="Union">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                    <path d={svgPaths.p1b692f00} fill="var(--fill-0, #939393)" id="Union" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function ClearButton({ onClick }: { onClick: () => void }) {
  const [confirmState, setConfirmState] = useState<'idle' | 'confirming' | 'cleared'>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmState !== 'confirming') return;
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setConfirmState('idle');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [confirmState]);

  const handleClick = () => {
    if (confirmState === 'idle') {
      setConfirmState('confirming');
    } else if (confirmState === 'confirming') {
      onClick();
      setConfirmState('cleared');
      setTimeout(() => setConfirmState('idle'), 2000);
    }
  };

  const label =
    confirmState === 'idle' ? 'Clear reminders list' :
    confirmState === 'confirming' ? 'Are you sure?' :
    'Cleared!';

  const bgColor =
    confirmState === 'cleared' ? '#16a34a' :
    confirmState === 'confirming' ? '#cc0000' : 'red';

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="h-[50px] relative rounded-[100px] shrink-0 w-full cursor-pointer"
      style={{ backgroundColor: bgColor, height: 'clamp(40px, calc(20vh - 73.6px), 60px)' }}
      data-name="clear-btn"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal] truncate">{label}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function DevTools({
  onClose,
  onNavigateTests,
  onNavigateTestData,
  onNavigateNlc,
  onNavigateFiltersMenu,
  onNavigateOnboardingTutorial,
  onNavigateDevToolsPassword,
  onNavigateReminderSettings,
  onNavigateListSettings,
  onNavigatePaywall,
  onNavigateNotifications,
  settingsMenuEnabled,
  onSettingsMenuEnabledChange,
  nlcEnabled,
  onNlcEnabledChange,
  isOnboardingTutorialEnabled,
  onOnboardingTutorialEnabledChange,
  isListsEnabled,
  onListsEnabledChange,
}: {
  onClose: () => void;
  onNavigateTests: () => void;
  onNavigateTestData: () => void;
  onNavigateNlc: () => void;
  onNavigateFiltersMenu: () => void;
  onNavigateOnboardingTutorial: () => void;
  onNavigateDevToolsPassword: () => void;
  onNavigateReminderSettings: () => void;
  onNavigateListSettings: () => void;
  onNavigatePaywall: () => void;
  onNavigateNotifications: () => void;
  settingsMenuEnabled: boolean;
  onSettingsMenuEnabledChange: (enabled: boolean) => void;
  nlcEnabled: boolean;
  onNlcEnabledChange: (enabled: boolean) => void;
  isOnboardingTutorialEnabled: boolean;
  onOnboardingTutorialEnabledChange: (next: boolean) => void;
  isListsEnabled: boolean;
  onListsEnabledChange: (enabled: boolean) => void;
}) {
  const [repeatToggle, setRepeatToggle] = useState(true);
  const [pendingNlcState, setPendingNlcState] = useState<boolean | null>(null);
  const [pendingOnboardingState, setPendingOnboardingState] = useState<boolean | null>(null);
  const [pendingListsState, setPendingListsState] = useState<boolean | null>(null);

  return (
    <div className="bg-white content-stretch flex flex-col gap-[30px] items-start pb-[30px] pt-[26px] px-[20px] relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="dev-tools">
      <Header onClose={onClose} />
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center min-h-px min-w-px relative w-full">
        <div className="content-stretch flex flex-col gap-[50px] items-start relative w-full" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
              <p className="leading-[normal]">Testing and QA</p>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
              <NavRow label="Automated tests" onClick={onNavigateTests} plain />
              <NavRow label="Test data" onClick={onNavigateTestData} plain />
              <div />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
              <p className="leading-[normal]">Feature flags</p>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
              <button
                onClick={nlcEnabled ? onNavigateNlc : undefined}
                className={`h-[60px] relative shrink-0 w-full ${nlcEnabled ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                      <div className="flex items-center gap-[16px] min-w-0">
                        <ToggleBtn isOn={nlcEnabled} onToggle={() => setPendingNlcState(!nlcEnabled)} />
                        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[17px] whitespace-nowrap" style={{ color: nlcEnabled ? '#1C2C42' : '#C9C9C9' }}>
                          <p className="leading-[normal] truncate">Natural Language Capture</p>
                        </div>
                      </div>
                      <div className="ml-[10px] flex items-center justify-center relative shrink-0">
                        <div className="-scale-y-100 flex-none rotate-180">
                          <div className="h-[13px] relative w-[7px]" data-name="Union">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                              <path d={svgPaths.p1b692f00} fill={nlcEnabled ? '#939393' : '#C9C9C9'} id="Union" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div
                className="h-[60px] relative shrink-0 w-full"
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center py-[15px] relative size-full">
                    <div className="flex items-center gap-[16px]">
                      <ToggleBtn isOn={repeatToggle} onToggle={() => setRepeatToggle(prev => !prev)} />
                      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
                        <p className="leading-[normal] truncate">Repeat reminders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={isOnboardingTutorialEnabled ? onNavigateOnboardingTutorial : undefined}
                className={`h-[60px] relative shrink-0 w-full ${isOnboardingTutorialEnabled ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                      <div className="flex items-center gap-[16px] min-w-0">
                        <ToggleBtn isOn={isOnboardingTutorialEnabled} onToggle={() => setPendingOnboardingState(!isOnboardingTutorialEnabled)} />
                        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[#1C2C42] text-[17px] whitespace-nowrap" style={{ color: isOnboardingTutorialEnabled ? '#1C2C42' : '#C9C9C9' }}>
                          <p className="leading-[normal] truncate">Onboarding tutorial</p>
                        </div>
                      </div>
                      <div className="ml-[10px] flex items-center justify-center relative shrink-0">
                        <div className="-scale-y-100 flex-none rotate-180">
                          <div className="h-[13px] relative w-[7px]" data-name="Union">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                              <path d={svgPaths.p1b692f00} fill={isOnboardingTutorialEnabled ? '#939393' : '#C9C9C9'} id="Union" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={isListsEnabled ? onNavigatePaywall : undefined}
                className={`h-[60px] relative shrink-0 w-full ${isListsEnabled ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                      <div className="flex items-center gap-[16px] min-w-0">
                        <ToggleBtn isOn={isListsEnabled} onToggle={() => setPendingListsState(!isListsEnabled)} />
                        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[17px] whitespace-nowrap" style={{ color: isListsEnabled ? '#1C2C42' : '#C9C9C9' }}>
                          <p className="leading-[normal] truncate">Lists</p>
                        </div>
                      </div>
                      <div className="ml-[10px] flex items-center justify-center relative shrink-0">
                        <div className="-scale-y-100 flex-none rotate-180">
                          <div className="h-[13px] relative w-[7px]" data-name="Union">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                              <path d={svgPaths.p1b692f00} fill={isListsEnabled ? '#939393' : '#C9C9C9'} id="Union" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div
                className="h-[60px] relative shrink-0 w-full"
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center py-[15px] relative size-full">
                    <div className="flex items-center gap-[16px]">
                      <ToggleBtn isOn={settingsMenuEnabled} onToggle={() => onSettingsMenuEnabledChange(!settingsMenuEnabled)} />
                      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[17px] whitespace-nowrap" style={{ color: settingsMenuEnabled ? '#1C2C42' : '#C9C9C9' }}>
                        <p className="leading-[normal] truncate">Settings menu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[17px] whitespace-nowrap">
              <p className="leading-[normal]">Developer settings</p>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
              <NavRow label="Filters menu" onClick={onNavigateFiltersMenu} plain />
              <NavRow label="Reminder settings" onClick={onNavigateReminderSettings} plain />
              <button
                onClick={isListsEnabled ? onNavigateListSettings : undefined}
                className={`h-[60px] relative shrink-0 w-full ${isListsEnabled ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center pr-[30px] py-[15px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative min-w-0 text-[17px] whitespace-nowrap" style={{ color: isListsEnabled ? '#1C2C42' : '#C9C9C9' }}>
                        <p className="leading-[normal] truncate">List settings</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <div className="-scale-y-100 flex-none rotate-180">
                          <div className="h-[13px] relative w-[7px]" data-name="Union">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                              <path d={svgPaths.p1b692f00} fill={isListsEnabled ? '#939393' : '#C9C9C9'} id="Union" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <NavRow label="Dev tools password" onClick={onNavigateDevToolsPassword} plain />
              <NavRow label="Notifications" onClick={onNavigateNotifications} plain />
              <div />
            </div>
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
