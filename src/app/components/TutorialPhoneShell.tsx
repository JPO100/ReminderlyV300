import type { ReactNode } from "react";
import TutorialPhoneHeader from "./TutorialPhoneHeader";
import TutorialMainTabBar from "./TutorialMainTabBar";

export default function TutorialPhoneShell({
  activeMainTab,
  filterRow,
  children,
  blankBody = false,
  shellColor,
  bezelColor = "#1c2c42",
  showHeaderMenu = true,
}: {
  activeMainTab: "reminders" | "lists";
  filterRow: ReactNode;
  children?: ReactNode;
  blankBody?: boolean;
  shellColor?: string;
  bezelColor?: string;
  showHeaderMenu?: boolean;
}) {
  const resolvedShellColor = shellColor ?? (activeMainTab === "lists" ? "#1C2C42" : "#4784f8");

  return (
    <div className="h-[361px] relative shrink-0 w-full max-w-[308px] [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]">
      <div
        className="h-full w-full rounded-tl-[40px] rounded-tr-[40px]"
        style={{ backgroundColor: bezelColor, paddingTop: "14px", paddingLeft: "14px", paddingRight: "14px", boxSizing: "border-box" }}
      >
        <div
          className="overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full"
          style={{ backgroundColor: resolvedShellColor }}
        >
          <div
            className="absolute content-stretch flex flex-col h-[615px] items-center justify-start gap-0 left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full"
            style={{ backgroundColor: resolvedShellColor }}
          >
            <TutorialPhoneHeader activeMainTab={activeMainTab} backgroundColor={resolvedShellColor} showMenuIcon={showHeaderMenu} />
            <TutorialMainTabBar activeMainTab={activeMainTab} />
            <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full rounded-tl-[10.769px] rounded-tr-[10.769px]">
              <div className="flex flex-col items-center size-full">
                {filterRow}
                {blankBody ? (
                  <div className="flex-1 w-full" />
                ) : (
                  children
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
