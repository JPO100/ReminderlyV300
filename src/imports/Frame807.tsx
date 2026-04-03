import { useState } from "react";

function AddTickBtn({ active }: { active: boolean }) {
  return (
    <button className={`block relative shrink-0 size-[24px] p-0 m-0 border-none bg-transparent ${active ? 'cursor-pointer' : 'cursor-default'}`} data-name="add-tick-btn" disabled={!active}>
      <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add-tick-btn">
          <rect fill={active ? "#1C2C42" : "#E0E0E0"} height="24" rx="12" width="24" />
          <path d="M12 18L12 6M6 12H18" id="Vector" stroke={active ? "white" : "#ffffff"} strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </button>
  );
}

export default function Frame1({ onAdd, isEmpty }: { onAdd?: (text: string) => void; isEmpty?: boolean }) {
  const [itemText, setItemText] = useState("");

  const handleAdd = () => {
    if (itemText.trim().length > 0) {
      onAdd?.(itemText.trim());
      setItemText("");
    }
  };

  return (
    <div className="content-stretch flex flex-col items-start pr-px relative w-full" data-name="list-item">
      <div className="content-stretch flex gap-[16px] h-[33px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[25px]" data-name="Tick box">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke="#BABABA" strokeWidth="2" />
          </svg>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
          <input
            type="text"
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
            placeholder={isEmpty ? "Add your first item..." : "Add your next item..."}
            className="font-['Lato:Bold',sans-serif] not-italic text-[17px] w-full bg-transparent border-none outline-none placeholder-[#bababa] text-[#1c2c42] caret-[#1c2c42]"
          />
        </div>
        <div className="flex items-center" onClick={handleAdd}>
          <AddTickBtn active={itemText.trim().length > 0} />
        </div>
      </div>
    </div>
  );
}