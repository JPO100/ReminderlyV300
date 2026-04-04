import { useState } from "react";

function AddTickButton({ active }: { active: boolean }) {
    return (
        <button
            className={`relative block size-[24px] shrink-0 border-none bg-transparent p-0 ${active ? "cursor-pointer" : "cursor-default"}`}
            data-name="add-tick-btn"
            disabled={!active}
        >
            <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="add-tick-btn">
                    <rect fill={active ? "#1C2C42" : "#E0E0E0"} height="24" rx="12" width="24" />
                    <path d="M12 18L12 6M6 12H18" id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
                </g>
            </svg>
        </button>
    );
}

type AddListItemInputProps = {
    onAdd?: (text: string) => void;
    isEmpty?: boolean;
    accentColor?: string;
};

export default function AddListItemInput({ onAdd, isEmpty, accentColor = "#BABABA" }: AddListItemInputProps) {
    const [itemText, setItemText] = useState("");

    const handleAdd = () => {
        const trimmed = itemText.trim();
        if (!trimmed) return;
        onAdd?.(trimmed);
        setItemText("");
    };

    return (
        <div className="content-stretch relative flex w-full flex-col items-start pr-px" data-name="list-item">
            <div className="content-stretch relative flex h-[33px] w-full shrink-0 items-center gap-[16px]">
                <div className="relative size-[25px] shrink-0" data-name="Tick box">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                        <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke={accentColor} strokeWidth="2" />
                    </svg>
                </div>
                <div className="content-stretch relative flex min-h-px min-w-px flex-[1_0_0] flex-col items-start justify-center">
                    <input
                        type="text"
                        value={itemText}
                        onChange={(event) => setItemText(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") handleAdd();
                        }}
                        placeholder={isEmpty ? "Add your first item..." : "Add your next item..."}
                        className="font-['Lato:Bold',sans-serif] w-full border-none bg-transparent text-[17px] not-italic text-[#1c2c42] caret-[#1c2c42] outline-none placeholder-[#bababa]"
                    />
                </div>
                <div className="flex items-center" onClick={handleAdd}>
                    <AddTickButton active={itemText.trim().length > 0} />
                </div>
            </div>
        </div>
    );
}
