import svgPaths from "./svg-4xkxvo0xnr";

function Elements() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.8px]" data-name="elements">
      <div className="absolute inset-[-4.17%_-4.39%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.8 26">
          <g>
            <path d={svgPaths.p2051eb00} fill="var(--fill-0, #4784F8)" id="Vector" stroke="var(--stroke-3, #4784F8)" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3a866400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full">
      <div className="flex flex-col font-['Lato:ExtraBold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#4784f8] text-[18px] text-ellipsis whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden">Unlock premium features!</p>
      </div>
      <Elements />
    </div>
  );
}