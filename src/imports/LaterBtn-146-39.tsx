import svgPaths from "./svg-192tb0whmu";

function Elements() {
  return (
    <div className="h-[18px] relative shrink-0 w-[17.55px]" data-name="elements">
      <div className="absolute inset-[-4.17%_-4.27%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0501 19.5">
          <g>
            <path d={svgPaths.pef92af0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p1ae98000} id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function LaterBtn() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[16px] py-[15px] relative rounded-[100px] size-full" data-name="later-btn">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[100px]" />
      <Elements />
    </div>
  );
}