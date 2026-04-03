function TodayBtn() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-tl-[12px] rounded-tr-[12px]" data-name="today-btn">
      <div aria-hidden="true" className="absolute border-[1.5px] border-solid border-white inset-[-0.75px] pointer-events-none rounded-tl-[12.75px] rounded-tr-[12.75px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[30px] py-[20px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4784f8] text-[17px] whitespace-nowrap">
            <p className="leading-[normal]">Reminders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayBtn1() {
  return (
    <div className="bg-[rgba(255,255,255,0.25)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-tl-[12px] rounded-tr-[12px]" data-name="today-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[30px] py-[20px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Lists</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-end justify-center px-[20px] relative size-full">
      <TodayBtn />
      <TodayBtn1 />
    </div>
  );
}