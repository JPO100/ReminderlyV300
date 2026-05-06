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
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TutorialWordmark() {
  return (
    <div className="flex items-center justify-center gap-[7.179px]">
      <div className="relative shrink-0 size-[17.949px]">
        <div aria-hidden="true" className="absolute inset-0 rounded-full border-[1.436px] border-white" />
        <div aria-hidden="true" className="absolute left-[5.026px] top-[7.897px] h-[1.436px] w-[7.179px] bg-white" />
        <div aria-hidden="true" className="absolute left-[7.897px] top-[5.026px] h-[7.179px] w-[1.436px] bg-white" />
      </div>
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white">
        <p className="leading-[normal]">reminderly</p>
      </div>
    </div>
  );
}

export default function TutorialPhoneHeader({
  activeMainTab,
  backgroundColor,
}: {
  activeMainTab: "reminders" | "lists";
  backgroundColor?: string;
}) {
  const resolvedBackgroundColor = backgroundColor ?? (activeMainTab === "lists" ? "#1C2C42" : "#4784f8");

  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0 w-full px-[14.359px] pt-[11px] pb-[14.359px]"
      style={{ backgroundColor: resolvedBackgroundColor }}
    >
      <TutorialSensorBar />
      <div className="relative flex items-center justify-center w-full mt-[12.205px]">
        <TutorialWordmark />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[12.205px] h-[25.579px]">
          <TutorialHeaderMenuIcon />
        </div>
      </div>
    </div>
  );
}
