import svgPaths from "@/imports/svg-tzdfx9foxi";

function TutorialSensorBar() {
  return (
    <div className="content-stretch flex gap-[2.872px] items-center relative shrink-0">
      <div className="bg-[#1c2c42] h-[5.026px] rounded-[7.179px] shrink-0 w-[17.231px]" />
      <div className="bg-[#1c2c42] rounded-[7.179px] shrink-0 size-[5.026px]" />
    </div>
  );
}

function TutorialHeaderMenuIcon() {
  return (
    <svg
      className="block h-[14.359px] w-[15.795px] shrink-0"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 1.5H20.5M1.5 10H20.5M1.5 18.5H20.5"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TutorialWordmark() {
  return (
    <div className="relative shrink-0 h-[25.579px] w-[150.505px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 209.653 35.6533">
        <g>
          <g>
            <path d={svgPaths.p2e09d80} fill="white" />
            <path d={svgPaths.p3b133a00} fill="white" />
            <path d={svgPaths.p11840600} fill="white" />
            <path d={svgPaths.p170f9700} fill="white" />
            <path d={svgPaths.pf876500} fill="white" />
            <path d={svgPaths.pc9c4a00} fill="white" />
            <path d={svgPaths.p6114100} fill="white" />
            <path d={svgPaths.pb9f8400} fill="white" />
            <path d={svgPaths.pe461c40} fill="white" />
            <path d={svgPaths.p38e87300} fill="white" />
            <path d={svgPaths.p26dc1e00} fill="white" />
            <path d={svgPaths.p82ca600} fill="white" />
          </g>
          <path d={svgPaths.p3babd700} fill="white" />
        </g>
      </svg>
    </div>
  );
}

export default function TutorialPhoneHeader({
  activeMainTab,
  backgroundColor,
  showMenuIcon = true,
}: {
  activeMainTab: "reminders" | "lists";
  backgroundColor?: string;
  showMenuIcon?: boolean;
}) {
  const resolvedBackgroundColor = backgroundColor ?? (activeMainTab === "lists" ? "#1C2C42" : "#4784f8");

  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0 w-full px-[14.359px] pt-[11px]"
      style={{ backgroundColor: resolvedBackgroundColor }}
    >
      <TutorialSensorBar />
      <div className="relative flex items-center justify-center w-full mt-[10px] mb-[10px]">
        <TutorialWordmark />
        {showMenuIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[12.205px] h-[25.579px]">
            <TutorialHeaderMenuIcon />
          </div>
        )}
      </div>
    </div>
  );
}
