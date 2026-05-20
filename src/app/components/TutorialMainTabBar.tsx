export default function TutorialMainTabBar({
  activeMainTab,
  remindersLabel = "Reminders",
  listsLabel = "Lists",
}: {
  activeMainTab: "reminders" | "lists";
  remindersLabel?: string;
  listsLabel?: string;
}) {
  return (
    <div className="content-stretch flex gap-[7.179px] items-end justify-center px-[14.359px] relative w-full">
      <div className={`${activeMainTab === "reminders" ? "bg-white" : "bg-[rgba(255,255,255,0.25)]"} flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[8.615px] rounded-tr-[8.615px] h-[37.333px]`}>
        {activeMainTab === "reminders" && (
          <div aria-hidden="true" className="absolute border-[1.077px] border-solid border-white inset-[-0.538px] pointer-events-none rounded-tl-[9.154px] rounded-tr-[9.154px]" />
        )}
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[21.538px] relative size-full">
            <div className={`flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.205px] whitespace-nowrap ${activeMainTab === "reminders" ? "text-[#4784f8]" : "text-white"}`}>
              <p className="leading-[normal]">{remindersLabel}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${activeMainTab === "lists" ? "bg-white" : "bg-[rgba(255,255,255,0.25)]"} flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[8.615px] rounded-tr-[8.615px] h-[37.333px]`}>
        {activeMainTab === "lists" && (
          <div aria-hidden="true" className="absolute border-[1.077px] border-solid border-white inset-[-0.538px] pointer-events-none rounded-tl-[9.154px] rounded-tr-[9.154px]" />
        )}
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[21.538px] relative size-full">
            <div className={`flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.205px] whitespace-nowrap ${activeMainTab === "lists" ? "text-[#2B5DA0]" : "text-white"}`}>
              <p className="leading-[normal]">{listsLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
