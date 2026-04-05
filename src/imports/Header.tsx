import svgPaths from "./svg-z3vqooufv8";
import gearPaths from "./svg-2owmcw62lt";
import backChevronPaths from "./svg-7vys4qis03";
import { useEffect, useRef, useState } from "react";

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

function GearBtn({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <button
      className={`relative shrink-0 size-[24px] p-0 m-0 border-none bg-transparent flex items-center justify-center ${active ? "cursor-pointer" : "cursor-default"}`}
      data-name="gear-btn"
      disabled={!active}
      onClick={active ? onClick : undefined}
    >
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.1994 23.75">
        <path clipRule="evenodd" d={gearPaths.p1100a300} fill={active ? "#1C2C42" : "#CCCCCC"} fillRule="evenodd" />
        <path clipRule="evenodd" d={gearPaths.p11234300} fill={active ? "#1C2C42" : "#CCCCCC"} fillRule="evenodd" />
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

function SmartRemindersIndicator() {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.01045 5.36829C5.34496 5.20257 5.73795 5.20253 6.07245 5.36829C6.21799 5.44044 6.34594 5.55543 6.46998 5.67748L12.3491 11.5566C12.4712 11.6807 12.5862 11.8086 12.6583 11.9541C12.8241 12.2886 12.824 12.6816 12.6583 13.0161C12.5621 13.2102 12.3901 13.3733 12.2262 13.5372C12.0623 13.7011 11.8992 13.8732 11.7051 13.9693C11.3706 14.135 10.9776 14.1351 10.6431 13.9693C10.4976 13.8972 10.3696 13.7822 10.2456 13.6601L4.36646 7.78101C4.2444 7.65696 4.12941 7.52901 4.05726 7.38348C3.8915 7.04897 3.89154 6.65599 4.05726 6.32147C4.15343 6.12741 4.32547 5.96428 4.48936 5.80039C4.65326 5.6365 4.81639 5.46445 5.01045 5.36829ZM6.94049 8.96464L10.8179 12.842C10.9177 12.9418 10.9784 13.002 11.0266 13.045C11.0602 13.075 11.0756 13.0853 11.0797 13.0878C11.1391 13.1173 11.2091 13.1173 11.2685 13.0878C11.2722 13.0856 11.2881 13.0755 11.3223 13.045C11.3704 13.002 11.4312 12.9418 11.531 12.842C11.6308 12.7423 11.691 12.6815 11.7339 12.6333C11.7645 12.5991 11.7746 12.5833 11.7768 12.5796C11.8063 12.5201 11.8063 12.4502 11.7768 12.3907C11.7743 12.3867 11.7639 12.3712 11.7339 12.3376C11.691 12.2895 11.6308 12.2287 11.531 12.1289L7.65362 8.25152L6.94049 8.96464ZM5.63587 6.24977C5.57642 6.22031 5.50648 6.22031 5.44703 6.24977C5.44334 6.25202 5.42751 6.26208 5.39325 6.29266C5.34514 6.33564 5.28434 6.39582 5.18457 6.49559C5.08479 6.59536 5.02461 6.65617 4.98164 6.70428C4.95105 6.73854 4.941 6.75437 4.93875 6.75805C4.90929 6.8175 4.90929 6.88745 4.93875 6.9469C4.94125 6.95095 4.95163 6.96642 4.98164 7.00003C5.0246 7.04814 5.08476 7.10891 5.18457 7.20872L6.24529 8.26944L6.95842 7.55632L5.89769 6.49559C5.79789 6.39579 5.73712 6.33563 5.689 6.29266C5.6554 6.26266 5.63993 6.25228 5.63587 6.24977Z" fill="#BABABA"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.45817 1.31102C2.66378 1.31102 2.8476 1.43899 2.91908 1.63174L3.06439 2.02351C3.27003 2.57924 3.32945 2.71106 3.42288 2.80449C3.5163 2.89792 3.64813 2.95734 4.20386 3.16298L4.59563 3.30829C4.78838 3.37977 4.91634 3.56359 4.91634 3.7692C4.91634 3.9748 4.78838 4.15863 4.59563 4.2301L4.20386 4.37542C3.64813 4.58106 3.5163 4.64047 3.42288 4.7339C3.32945 4.82733 3.27003 4.95916 3.06439 5.51488L2.91908 5.90665C2.8476 6.09941 2.66378 6.22737 2.45817 6.22737C2.25257 6.22737 2.06874 6.09941 1.99726 5.90665L1.85195 5.51488C1.64631 4.95916 1.58689 4.82733 1.49347 4.7339C1.40004 4.64047 1.26821 4.58106 0.712486 4.37542L0.320715 4.2301C0.127961 4.15863 0 3.9748 0 3.7692C0 3.56359 0.127961 3.37977 0.320715 3.30829L0.712486 3.16298C1.26821 2.95734 1.40004 2.89792 1.49347 2.80449C1.58689 2.71106 1.64631 2.57924 1.85195 2.02351L1.99726 1.63174L2.02927 1.5626C2.11517 1.40902 2.27829 1.31102 2.45817 1.31102ZM2.45817 3.12841C2.38328 3.26674 2.29746 3.3909 2.18867 3.49969C2.07987 3.60849 1.95571 3.6943 1.81738 3.7692C1.95571 3.84409 2.07987 3.9299 2.18867 4.0387C2.29733 4.14736 2.38334 4.27122 2.45817 4.40935C2.533 4.27122 2.61901 4.14736 2.72767 4.0387C2.83634 3.93003 2.96019 3.84403 3.09832 3.7692C2.96019 3.69437 2.83634 3.60836 2.72767 3.49969C2.61888 3.3909 2.53306 3.26674 2.45817 3.12841Z" fill="#BABABA"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.66881 0C9.87441 0 10.0582 0.127961 10.1297 0.320715L10.323 0.843076C10.592 1.56998 10.6838 1.78699 10.8396 1.94285C10.9955 2.09872 11.2125 2.19047 11.9394 2.45945L12.4618 2.65278C12.6545 2.72426 12.7825 2.90808 12.7825 3.11368C12.7825 3.31929 12.6545 3.50311 12.4618 3.57459L11.9394 3.76792C11.2125 4.0369 10.9955 4.12865 10.8396 4.28452C10.6838 4.44038 10.592 4.65738 10.323 5.38429L10.1297 5.90665C10.0582 6.09941 9.87441 6.22737 9.66881 6.22737C9.4632 6.22737 9.27938 6.09941 9.2079 5.90665L9.01458 5.38429C8.7456 4.65738 8.65384 4.44038 8.49798 4.28452C8.34211 4.12865 8.12511 4.0369 7.3982 3.76792L6.87584 3.57459C6.68309 3.50311 6.55512 3.31929 6.55512 3.11368C6.55512 2.90808 6.68309 2.72426 6.87584 2.65278L7.3982 2.45945C8.12511 2.19047 8.34211 2.09872 8.49798 1.94285C8.65384 1.78699 8.7456 1.56998 9.01458 0.843076L9.2079 0.320715L9.23991 0.251579C9.32581 0.0979978 9.48893 0 9.66881 0ZM9.66881 1.87756C9.53824 2.18256 9.39863 2.4326 9.19318 2.63805C8.98772 2.84351 8.73769 2.98312 8.43268 3.11368C8.73769 3.24425 8.98772 3.38386 9.19318 3.58931C9.39851 3.79465 9.53831 4.04441 9.66881 4.34917C9.79931 4.04441 9.9391 3.79465 10.1444 3.58931C10.3498 3.38398 10.5995 3.24419 10.9043 3.11368C10.5995 2.98318 10.3498 2.84339 10.1444 2.63805C9.93898 2.4326 9.79938 2.18256 9.66881 1.87756Z" fill="#BABABA"/>
    </svg>
  );
}

export default function Header({ value, onChange, active, onSubmit, isEditMode, onGearClick, subtitleText, subtitleHighlightColor, showSmartRemindersSubtitle, reserveSmartRemindersSubtitleSpace }: { value: string; onChange: (v: string) => void; active: boolean; onSubmit: () => void; isEditMode?: boolean; onGearClick?: () => void; subtitleText?: string; subtitleHighlightColor?: string | null; showSmartRemindersSubtitle?: boolean; reserveSmartRemindersSubtitleSpace?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasTypedSinceFocus, setHasTypedSinceFocus] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const lastCommittedValueRef = useRef(value);

  const showGrey = isEditMode && isFocused && !hasTypedSinceFocus;
  const textColor = showGrey ? '#B7B7B7' : '#1c2c42';

  useEffect(() => {
    setDraftValue(value);
    lastCommittedValueRef.current = value;
  }, [value]);

  const commitDraft = () => {
    const normalizedValue = draftValue.trim();
    if (normalizedValue.length === 0) {
      setDraftValue(lastCommittedValueRef.current);
      return;
    }
    if (draftValue === lastCommittedValueRef.current) return;
    lastCommittedValueRef.current = draftValue;
    onChange(draftValue);
  };

  return (
    <div className="flex flex-col relative w-full gap-[7px]" data-name="header">
      <div className="flex items-center justify-between relative w-full gap-[12px]">
        <BackChevronBtn onClick={onSubmit} />
        <div className="flex-1 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={draftValue}
            onFocus={() => { setIsFocused(true); setHasTypedSinceFocus(false); }}
            onBlur={() => { commitDraft(); setIsFocused(false); setHasTypedSinceFocus(false); }}
            onChange={(e) => { if (!hasTypedSinceFocus) setHasTypedSinceFocus(true); setDraftValue(e.target.value); onChange(e.target.value); }}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              commitDraft();
              event.currentTarget.blur();
            }}
            placeholder=""
            className="font-['Lato:Bold',sans-serif] not-italic text-[20px] whitespace-nowrap bg-transparent border-none outline-none w-full min-w-0 placeholder-[#bababa] caret-[#1c2c42]"
            style={{ color: textColor, transition: "color 300ms" }}
          />
        </div>
        <GearBtn active={active} onClick={onGearClick} />
      </div>
      {subtitleText || reserveSmartRemindersSubtitleSpace ? (
        <div
          className="flex items-center gap-[8px] min-w-0 pl-[34px] pr-[36px]"
          style={subtitleText ? undefined : { visibility: "hidden" }}
        >
          <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '13.5px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA' }}>
            {subtitleText?.includes('. Complete by ') ? (
              <>
                {subtitleText.split('. Complete by ')[0]}
                {'. '}
                <span style={{ color: subtitleHighlightColor ?? '#BABABA' }}>
                  {`Complete by ${subtitleText.split('. Complete by ')[1]}`}
                </span>
              </>
            ) : (
              subtitleText ?? "Complete this list by..."
            )}
          </p>
          {showSmartRemindersSubtitle ? <SmartRemindersIndicator /> : null}
        </div>
      ) : null}
    </div>
  );
}
