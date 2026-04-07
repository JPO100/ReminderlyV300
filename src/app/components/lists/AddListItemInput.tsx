import { useRef, useState } from "react";

function AddTickButton({ active }: { active: boolean }) {
    return (
        <button
            className={`relative block size-[35px] shrink-0 border-none bg-transparent p-0 ${active ? "cursor-pointer" : "cursor-default"}`}
            data-name="add-tick-btn"
            disabled={!active}
        >
            <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                <g id="add-tick-btn">
                    <rect fill={active ? "#1C2C42" : "#D9D9D9"} height="35" rx="17.5" width="35" />
                    <path d="M17.5 25.5L17.5 9.5M9.5 17.5H25.5" id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
                </g>
            </svg>
        </button>
    );
}

type AddListItemInputProps = {
    onAdd?: (text: string) => void;
    isEmpty?: boolean;
    accentColor?: string;
    idleCircleColor?: string;
};

export default function AddListItemInput({
    onAdd,
    isEmpty,
    accentColor = "#D9D9D9",
    idleCircleColor,
}: AddListItemInputProps) {
    const [itemText, setItemText] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

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
                        <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke={idleCircleColor ?? accentColor} strokeWidth="2" />
                    </svg>
                </div>
                <div className="content-stretch relative flex min-h-px min-w-px flex-[1_0_0] flex-col items-start justify-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={itemText}
                        onChange={(event) => setItemText(event.target.value)}
                        onPointerDownCapture={(event) => {
                            if (!isEmpty) return;
                            event.preventDefault();
                            inputRef.current?.focus({ preventScroll: true });
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") handleAdd();
                        }}
                        placeholder={isEmpty ? "Add your first item..." : "Add your next item..."}
                        className="font-['Lato:Bold',sans-serif] w-full border-none bg-transparent text-[17px] not-italic text-[#1c2c42] caret-[#1c2c42] outline-none placeholder-[#D9D9D9]"
                    />
                </div>
                <div className="flex items-center" onClick={handleAdd}>
                    <AddTickButton active={itemText.trim().length > 0} />
                </div>
            </div>
        </div>
    );
}
