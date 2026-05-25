import svgPaths from "./svg-7kpmedzeqd";
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

export default function DevTools({
  onClose,
  onNavigateReminders,
  onNavigateLists,
  onNavigateNlc,
  onNavigateNotifications,
  onNavigateOnboarding,
  onNavigateTesting,
  onNavigateSystem,
}: {
  onClose: () => void;
  onNavigateReminders: () => void;
  onNavigateLists: () => void;
  onNavigateNlc: () => void;
  onNavigateNotifications: () => void;
  onNavigateOnboarding: () => void;
  onNavigateTesting: () => void;
  onNavigateSystem: () => void;
}) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[30px] items-start pb-[30px] pt-[30px] px-[20px] relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="dev-tools">
      <Header onClose={onClose} />
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center min-h-px min-w-px relative w-full">
        <div className="content-stretch flex flex-col items-start relative w-full" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#E4E4E4]">
            <NavRow label="Reminders" onClick={onNavigateReminders} plain />
            <NavRow label="Lists" onClick={onNavigateLists} plain />
            <NavRow label="Natural Language" onClick={onNavigateNlc} plain />
            <NavRow label="Notifications" onClick={onNavigateNotifications} plain />
            <NavRow label="Onboarding" onClick={onNavigateOnboarding} plain />
            <NavRow label="Testing" onClick={onNavigateTesting} plain />
            <NavRow label="System" onClick={onNavigateSystem} plain />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
