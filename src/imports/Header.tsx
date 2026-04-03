import svgPaths from "./svg-z3vqooufv8";
import gearPaths from "./svg-2owmcw62lt";
import backChevronPaths from "./svg-7vys4qis03";
import { useRef, useState } from "react";

function AddTickBtn({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <button className={`block relative shrink-0 size-[50px] ${active ? 'cursor-pointer' : 'cursor-default'}`} data-name="add-tick-btn" disabled={!active} onClick={active ? onClick : undefined}>
      <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g id="add-tick-btn">
          <rect fill={active ? "#1C2C42" : "#F5F5F5"} height="50" rx="25" width="50" />
          <path d={svgPaths.p1635b2f0} fill={active ? "#F0FAFE" : "#D5D5D5"} id="tick-icon" />
        </g>
      </svg>
    </button>
  );
}

function GearBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button className="cursor-pointer relative shrink-0 size-[24px] p-0 m-0 border-none bg-transparent flex items-center justify-center" data-name="gear-btn" onClick={onClick}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.1994 23.75">
        <path clipRule="evenodd" d={gearPaths.p1100a300} fill="#1C2C42" fillRule="evenodd" />
        <path clipRule="evenodd" d={gearPaths.p11234300} fill="#1C2C42" fillRule="evenodd" />
      </svg>
    </button>
  );
}

function BackChevronBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button className="cursor-pointer relative shrink-0 p-0 m-0 border-none bg-transparent flex items-center justify-center" style={{ width: '22px', height: '26px' }} data-name="back-chevron-btn" onClick={onClick}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 26">
        <path d={backChevronPaths.p11888f80} fill="#1C2C42" />
      </svg>
    </button>
  );
}

export default function Header({ value, onChange, active, onSubmit, isEditMode, onGearClick }: { value: string; onChange: (v: string) => void; active: boolean; onSubmit: () => void; isEditMode?: boolean; onGearClick?: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasTypedSinceFocus, setHasTypedSinceFocus] = useState(false);

  const showGrey = isEditMode && isFocused && !hasTypedSinceFocus;
  const textColor = showGrey ? '#B7B7B7' : '#1c2c42';

  return (
    <div className="flex items-center justify-between relative w-full gap-[12px]" data-name="header">
      <BackChevronBtn onClick={onSubmit} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onFocus={(e) => { setIsFocused(true); setHasTypedSinceFocus(false); if (isEditMode) e.target.select(); }}
        onBlur={() => { setIsFocused(false); setHasTypedSinceFocus(false); }}
        onChange={(e) => { if (!hasTypedSinceFocus) setHasTypedSinceFocus(true); onChange(e.target.value); }}
        placeholder="Tap here to name your list..."
        className="font-['Lato:Bold',sans-serif] not-italic text-[20px] whitespace-nowrap bg-transparent border-none outline-none flex-1 min-w-0 placeholder-[#bababa] caret-[#1c2c42]"
        style={{ color: textColor }}
      />
      <GearBtn onClick={onGearClick} />
    </div>
  );
}