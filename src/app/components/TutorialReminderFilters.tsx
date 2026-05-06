import type { ReactNode } from "react";
import SettingsBtnSml from "@/imports/SettingsBtnSml";

export type TutorialReminderFilterKey = "today" | "thisWeek" | "later" | "sometime";

export interface TutorialReminderFilterItem {
  key: TutorialReminderFilterKey;
  label: string;
  color: string;
  hideOnNarrow?: boolean;
}

export const GROUPED_TUTORIAL_FILTER_ITEMS: TutorialReminderFilterItem[] = [
  { key: "today", label: "Today", color: "#00AFEE" },
  { key: "thisWeek", label: "This week", color: "#E466FD" },
  { key: "later", label: "Other", color: "#FDB146", hideOnNarrow: true },
];

export const UNGROUPED_TUTORIAL_FILTER_ITEMS: TutorialReminderFilterItem[] = [
  { key: "today", label: "Today", color: "#00AFEE" },
  { key: "thisWeek", label: "This week", color: "#E466FD" },
  { key: "later", label: "Later", color: "#FDB146" },
  { key: "sometime", label: "Sometime", color: "#939393", hideOnNarrow: true },
];

function TutorialReminderFilterPill({
  item,
  activeKey,
}: {
  item: TutorialReminderFilterItem;
  activeKey?: TutorialReminderFilterKey;
}) {
  const isActive = activeKey === item.key;
  const isDefault = activeKey == null;
  const color = isActive || isDefault ? item.color : "#D9D9D9";

  return (
    <div
      className={`content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px] ${item.hideOnNarrow ? "hidden min-[390px]:flex" : ""} ${isActive ? "bg-white" : "bg-transparent"}`}
      style={{ boxShadow: `inset 0 0 0 ${isActive ? "2px" : "1px"} ${color}` }}
    >
      <div
        className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px]"
        style={{ color }}
      >
        <p className="leading-[normal]">{item.label}</p>
      </div>
    </div>
  );
}

export default function TutorialReminderFilters({
  items,
  activeKey,
  showSettings = false,
  trailing,
}: {
  items: TutorialReminderFilterItem[];
  activeKey?: TutorialReminderFilterKey;
  showSettings?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative shrink-0 w-full px-[14px] pt-[14px] pb-[8px]">
      <div className="flex items-center justify-between gap-[10px]">
        <div className="flex items-center gap-[8px]">
          {items.map((item) => (
            <TutorialReminderFilterPill key={item.key} item={item} activeKey={activeKey} />
          ))}
        </div>
        {trailing ? (
          <div className="shrink-0">{trailing}</div>
        ) : showSettings ? (
          <div className="shrink-0" style={{ width: "35px", height: "28px" }}>
            <SettingsBtnSml />
          </div>
        ) : null}
      </div>
    </div>
  );
}
