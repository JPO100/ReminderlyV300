import { useState } from "react";

const DONE_TICK_PATH = "M16.2615 8.39052C16.7715 7.86975 17.599 7.8699 18.1091 8.39052C18.6187 8.91126 18.6187 9.75551 18.1091 10.2763L11.3376 17.1903C11.0808 17.4525 10.7437 17.5819 10.407 17.58C10.0711 17.5887 9.73154 17.4668 9.46948 17.2108L6.40308 14.2157C5.882 13.7063 5.86382 12.8619 6.36206 12.33C6.86047 11.7985 7.6864 11.7808 8.20776 12.2899L10.3718 14.4042L16.2615 8.39052Z";

type EditableListItemProps = {
    name?: string;
    editable?: boolean;
    onChange?: (value: string) => void;
    completed?: boolean;
    onToggle?: () => void;
    isHighlighted?: boolean;
};

export default function EditableListItem({
    name = "Carrot",
    editable,
    onChange,
    completed,
    onToggle,
    isHighlighted,
}: EditableListItemProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasTypedSinceFocus, setHasTypedSinceFocus] = useState(false);

    const showGrey = editable && isFocused && !hasTypedSinceFocus;
    const textColor = isHighlighted ? "#00AFEE" : completed ? "#1C2C42" : showGrey ? "#B7B7B7" : "#1c2c42";
    const circleColor = isHighlighted ? "#00AFEE" : "#BABABA";

    return (
        <div className="content-stretch relative flex w-full flex-col items-start rounded-[6px]" data-name="list-item">
            <div className="content-stretch relative flex w-full shrink-0 items-center gap-[16px]" style={{ minHeight: "33px" }}>
                <button
                    className="relative size-[25px] shrink-0 self-center cursor-pointer border-none bg-transparent p-0 leading-[0]"
                    data-name="Tick box"
                    onClick={onToggle}
                >
                    <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                        {completed ? (
                            <g>
                                <rect fill="#1C2C42" height="23" rx="11.5" width="23" x="1" y="1" />
                                <rect height="23" rx="11.5" stroke="#1C2C42" strokeWidth="2" width="23" x="1" y="1" />
                                <path d={DONE_TICK_PATH} fill="white" />
                            </g>
                        ) : (
                            <circle
                                cx="12.5"
                                cy="12.5"
                                fill="var(--fill-0, white)"
                                id="Tick box"
                                r="11.5"
                                stroke={circleColor}
                                strokeWidth="2"
                            />
                        )}
                    </svg>
                </button>
                <div className="content-stretch relative flex w-[278px] shrink-0 flex-col items-start justify-center self-center">
                    {editable ? (
                        <input
                            type="text"
                            value={name}
                            onFocus={() => {
                                setIsFocused(true);
                                setHasTypedSinceFocus(false);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                                setHasTypedSinceFocus(false);
                            }}
                            onChange={(event) => {
                                if (!hasTypedSinceFocus) setHasTypedSinceFocus(true);
                                onChange?.(event.target.value);
                            }}
                            className={`font-['Lato:Bold',sans-serif] w-full border-none bg-transparent text-[17px] not-italic leading-[normal] caret-[#1c2c42] outline-none${completed ? " line-through" : ""}`}
                            style={{ color: textColor, transition: "color 300ms" }}
                        />
                    ) : (
                        <div
                            className={`flex w-full shrink-0 flex-col justify-center overflow-hidden font-['Lato:Bold',sans-serif] text-[17px] not-italic leading-[0] whitespace-nowrap${completed ? " line-through" : ""}`}
                            style={{ color: textColor, transition: "color 300ms" }}
                        >
                            <p className="overflow-hidden text-ellipsis leading-[normal]">{name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
