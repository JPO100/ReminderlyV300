export default function TutorialMainTabBar() {
  return (
    <div className="content-stretch flex gap-[8px] items-end justify-center px-[14px] pt-[2px] relative w-full">
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[14px] rounded-tr-[14px] h-[36px]">
        <div aria-hidden="true" className="absolute border-[1.5px] border-solid border-white inset-[-0.75px] pointer-events-none rounded-tl-[14.75px] rounded-tr-[14.75px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[18px] relative size-full">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4784f8] text-[13px] whitespace-nowrap">
              <p className="leading-[normal]">Reminders</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.25)] flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[14px] rounded-tr-[14px] h-[36px]">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[18px] relative size-full">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">
              <p className="leading-[normal]">Lists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
