function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#bababa] text-[17px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden">Add your next item...</p>
      </div>
    </div>
  );
}

function AddTickBtn() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="add-tick-btn">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add-tick-btn">
          <rect fill="var(--fill-0, #214677)" height="24" rx="12" width="24" />
          <path d="M12 18L12 6M6 12H18" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </button>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] h-[33px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[25px]" data-name="Tick box">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
          <circle cx="12.5" cy="12.5" fill="var(--fill-0, white)" id="Tick box" r="11.5" stroke="var(--stroke-0, #BABABA)" strokeWidth="2" />
        </svg>
      </div>
      <Frame />
      <AddTickBtn />
    </div>
  );
}

export default function ListItem() {
  return (
    <div className="content-stretch flex flex-col items-start pr-px relative rounded-[6px] size-full" data-name="list-item">
      <Frame1 />
    </div>
  );
}