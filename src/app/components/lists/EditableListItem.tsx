import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DONE_TICK_PATH = "M16.2615 8.39052C16.7715 7.86975 17.599 7.8699 18.1091 8.39052C18.6187 8.91126 18.6187 9.75551 18.1091 10.2763L11.3376 17.1903C11.0808 17.4525 10.7437 17.5819 10.407 17.58C10.0711 17.5887 9.73154 17.4668 9.46948 17.2108L6.40308 14.2157C5.882 13.7063 5.86382 12.8619 6.36206 12.33C6.86047 11.7985 7.6864 11.7808 8.20776 12.2899L10.3718 14.4042L16.2615 8.39052Z";

type EditableListItemProps = {
    name?: string;
    editable?: boolean;
    onChange?: (value: string) => void;
    onCommit?: (value: string) => void;
    onDelete?: () => void;
    isDeleteRevealed?: boolean;
    onDeleteRevealChange?: (revealed: boolean) => void;
    completed?: boolean;
    onToggle?: () => void;
    isHighlighted?: boolean;
    accentColor?: string;
};

export default function EditableListItem({
    name = "Carrot",
    editable,
    onChange,
    onCommit,
    onDelete,
    isDeleteRevealed = false,
    onDeleteRevealChange,
    completed,
    onToggle,
    isHighlighted,
    accentColor = "#00AFEE",
}: EditableListItemProps) {
    const DELETE_REVEAL_OFFSET = 64;
    const SWIPE_REVEAL_THRESHOLD = 28;
    const [isFocused, setIsFocused] = useState(false);
    const [hasTypedSinceFocus, setHasTypedSinceFocus] = useState(false);
    const [draftValue, setDraftValue] = useState(name);
    const [dragOffsetX, setDragOffsetX] = useState(0);
    const [isSwipeDragging, setIsSwipeDragging] = useState(false);
    const lastCommittedValueRef = useRef(name);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
    const swipeActiveRef = useRef(false);

    const showGrey = editable && isFocused && !hasTypedSinceFocus;
    const textColor = isDeleteRevealed ? "#FF1E0A" : isHighlighted ? accentColor : completed ? "#1C2C42" : showGrey ? "#B7B7B7" : "#1c2c42";
    const circleColor = isHighlighted ? accentColor : accentColor;

    useEffect(() => {
        setDraftValue(name);
        lastCommittedValueRef.current = name;
    }, [name]);

    useEffect(() => {
        if (!isDeleteRevealed) return;

        const handleOutsidePointerDown = (event: PointerEvent) => {
            const root = rootRef.current;
            if (!root) return;
            if (root.contains(event.target as Node)) return;
            onDeleteRevealChange?.(false);
        };

        document.addEventListener("pointerdown", handleOutsidePointerDown, true);
        return () => {
            document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
        };
    }, [isDeleteRevealed]);

    const commitDraft = () => {
        const normalizedValue = draftValue.trim();
        if (normalizedValue.length === 0) {
            setDraftValue(lastCommittedValueRef.current);
            return;
        }
        if (draftValue === lastCommittedValueRef.current) return;
        lastCommittedValueRef.current = draftValue;
        onCommit?.(draftValue);
    };

    const canSwipeToDelete = editable && !isFocused && typeof onDelete === "function";

    const resetSwipeTracking = () => {
        swipeStartRef.current = null;
        swipeActiveRef.current = false;
        setIsSwipeDragging(false);
        setDragOffsetX(0);
    };

    return (
        <div ref={rootRef} className="content-stretch relative flex w-full flex-col items-start overflow-hidden rounded-[6px]" data-name="list-item">
            {canSwipeToDelete && (
                <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-0">
                    <button
                        className="flex h-[33px] w-[48px] items-center justify-center rounded-[100px] border-none bg-[#FF1E0A] p-0"
                        onClick={onDelete}
                        aria-label="Delete list item"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                            <path d="M6.75 2.25H11.25L11.625 3.375H14.25C14.6642 3.375 15 3.71079 15 4.125C15 4.53921 14.6642 4.875 14.25 4.875H3.75C3.33579 4.875 3 4.53921 3 4.125C3 3.71079 3.33579 3.375 3.75 3.375H6.375L6.75 2.25Z" fill="white"/>
                            <path d="M5.25 6.375C5.25 5.96079 5.58579 5.625 6 5.625H12C12.4142 5.625 12.75 5.96079 12.75 6.375V12.375C12.75 13.4105 11.9105 14.25 10.875 14.25H7.125C6.08947 14.25 5.25 13.4105 5.25 12.375V6.375Z" fill="white"/>
                            <path d="M7.5 7.5V11.625" stroke="#FF1E0A" strokeWidth="1.2" strokeLinecap="round"/>
                            <path d="M10.5 7.5V11.625" stroke="#FF1E0A" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
            )}
            <motion.div
                className="content-stretch relative flex w-full shrink-0 items-center gap-[16px] bg-white"
                style={{ minHeight: "33px", touchAction: canSwipeToDelete ? "pan-y" : "auto" }}
                animate={{ x: isSwipeDragging ? dragOffsetX : (isDeleteRevealed ? -DELETE_REVEAL_OFFSET : 0) }}
                transition={isSwipeDragging ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
                onPointerDown={() => {
                    if (!isDeleteRevealed) return;
                    onDeleteRevealChange?.(false);
                }}
                onPointerDownCapture={(event) => {
                    if (!canSwipeToDelete) return;
                    if ((event.target as HTMLElement).closest("button")) return;
                    swipeStartRef.current = { x: event.clientX, y: event.clientY };
                    swipeActiveRef.current = false;
                }}
                onPointerMoveCapture={(event) => {
                    if (!canSwipeToDelete) return;
                    const start = swipeStartRef.current;
                    if (!start) return;

                    const deltaX = event.clientX - start.x;
                    const deltaY = event.clientY - start.y;

                    if (!swipeActiveRef.current) {
                        if (Math.abs(deltaX) < 8) return;
                        if (Math.abs(deltaX) <= Math.abs(deltaY)) {
                            swipeStartRef.current = null;
                            return;
                        }
                        swipeActiveRef.current = true;
                        setIsSwipeDragging(true);
                    }

                    event.preventDefault();
                    const nextOffset = Math.max(-DELETE_REVEAL_OFFSET, Math.min(0, deltaX));
                    setDragOffsetX(nextOffset);
                }}
                onPointerUpCapture={() => {
                    if (!canSwipeToDelete) {
                        resetSwipeTracking();
                        return;
                    }
                    const shouldReveal = dragOffsetX <= -SWIPE_REVEAL_THRESHOLD;
                    onDeleteRevealChange?.(shouldReveal);
                    resetSwipeTracking();
                }}
                onPointerCancelCapture={() => {
                    resetSwipeTracking();
                }}
            >
                <button
                    className="relative size-[25px] shrink-0 self-center cursor-pointer border-none bg-transparent p-0 leading-[0]"
                    data-name="Tick box"
                    onClick={isDeleteRevealed ? undefined : onToggle}
                    disabled={isDeleteRevealed}
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
                            value={draftValue}
                            readOnly={isDeleteRevealed}
                            onFocus={() => {
                                onDeleteRevealChange?.(false);
                                setIsFocused(true);
                                setHasTypedSinceFocus(false);
                            }}
                            onBlur={() => {
                                commitDraft();
                                setIsFocused(false);
                                setHasTypedSinceFocus(false);
                            }}
                            onChange={(event) => {
                                if (!hasTypedSinceFocus) setHasTypedSinceFocus(true);
                                setDraftValue(event.target.value);
                                onChange?.(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                if (event.key !== "Enter") return;
                                event.preventDefault();
                                commitDraft();
                                event.currentTarget.blur();
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
            </motion.div>
        </div>
    );
}
