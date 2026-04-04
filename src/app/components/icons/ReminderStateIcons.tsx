import repeatIconPaths from "../../../imports/svg-cep8nozhxy";
import scheduleSetPaths from "../../../imports/svg-ky2itz2q0i";
import scheduleUnsetPaths from "../../../imports/svg-4l9vgb24m5";
import doneCirclePaths from "../../../imports/svg-zbpmwo25rv";

type IconProps = {
    color: string;
    className?: string;
};

export function CompletedCircleIcon({ color, className }: IconProps) {
    return (
        <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <rect fill={color} height="23" rx="11.5" width="23" x="1" y="1" />
            <rect height="23" rx="11.5" stroke={color} strokeWidth="2" width="23" x="1" y="1" />
            <path d={doneCirclePaths.p1bc11a00} fill="white" />
        </svg>
    );
}

export function RepeatReminderIcon({ color, className }: IconProps) {
    return (
        <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 25.0003 25.0708">
            <g>
                <path d={repeatIconPaths.p19a7b000} fill={color} />
                <path d={repeatIconPaths.p9f3c880} fill={color} />
                <path d={repeatIconPaths.pf2d2300} fill={color} />
            </g>
        </svg>
    );
}

type ScheduledReminderIconProps = {
    color: string;
    maskId: string;
    className?: string;
};

export function ScheduledReminderIcon({ color, maskId, className }: ScheduledReminderIconProps) {
    return (
        <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <g>
                <mask fill="white" id={maskId}>
                    <path d={scheduleSetPaths.p37c4f500} />
                </mask>
                <path d={scheduleSetPaths.pde59c80} fill={color} mask={`url(#${maskId})`} />
            </g>
        </svg>
    );
}

export function UnscheduledReminderIcon({ color, className }: IconProps) {
    return (
        <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <g>
                <path d={scheduleUnsetPaths.pe7a3000} fill={color} />
                <path d={scheduleUnsetPaths.p1e7ee400} fill={color} />
                <path d={scheduleUnsetPaths.p37e67100} fill={color} />
                <path d={scheduleUnsetPaths.pfd088c0} fill={color} />
                <path d={scheduleUnsetPaths.p35b867f0} fill={color} />
                <path d={scheduleUnsetPaths.p16a18300} fill={color} />
                <path d={scheduleUnsetPaths.pcd64f00} fill={color} />
            </g>
        </svg>
    );
}
