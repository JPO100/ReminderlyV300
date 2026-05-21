import svgPaths from "@/imports/svg-k473gxyo2t";
import svgPathsRepeats from "@/imports/svg-4op7dnhswu";
import { useState, useEffect } from "react";

function DoneTick({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[34.826px]" data-name="Done tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.8259 34.8259">
        <g id="Done tick">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="34.8259" rx="17.4129" width="34.8259" />
          <path d={svgPaths.p6aae100} fill="var(--fill-0, #F0FAFE)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Frame({ isActive }: { isActive: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4784F8] text-[13.93px]">
        <p className="css-ew64yg leading-[normal]">New reminder</p>
      </div>
      <DoneTick isActive={isActive} />
    </div>
  );
}

function TakeBinsOut({ text }: { text: string }) {
  const renderText = () => {
    if (text.includes("6pm")) {
      const beforeWednesday = "Take the bins out every ";
      const wednesday = "Wednesday";
      const betweenWednesdayAnd6pm = " at ";
      const sixpm = "6pm";
      
      return (
        <>
          <span className="leading-[normal]">{beforeWednesday}</span>
          <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] text-[#4784f8]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {wednesday}
          </span>
          <span className="leading-[normal]">{betweenWednesdayAnd6pm}</span>
          <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] text-[#4784f8]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {sixpm}
          </span>
        </>
      );
    } else if (text.includes("Wednesday")) {
      const parts = text.split("Wednesday");
      return (
        <>
          <span className="leading-[normal]">{parts[0]}</span>
          <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] text-[#4784f8]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Wednesday
          </span>
          {parts[1] && <span className="leading-[normal]">{parts[1]}</span>}
        </>
      );
    } else {
      return <span className="leading-[normal]">{text}</span>;
    }
  };

  return (
    <div className="bg-[#f7f7f7] h-[60px] relative rounded-[7.83px] shrink-0 w-full" data-name="Take bins out">
      <div className="content-stretch flex items-start p-[12.529px] relative size-full">
        <div className="css-g0mm18 flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center relative w-full text-[#4784F8] text-[11.83px]" style={{ fontVariationSettings: "'wdth' 100", lineHeight: 'calc(1em + 8px)' }}>
          <p className="css-ew64yg whitespace-normal break-words" style={{ lineHeight: 'inherit' }}>
            {renderText()}
          </p>
        </div>
      </div>
    </div>
  );
}

function SetTimeClock({ isActive }: { isActive: boolean }) {
  const strokeColor = isActive ? "#4784F8" : "#939393";
  
  return (
    <div className="relative shrink-0 size-[17.413px]" data-name="Set time clock">
      <div className="absolute inset-[-0.31%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4129 17.4677">
          <g id="Set time clock">
            <rect fill="white" height="17.4129" transform="translate(0 0.0547263)" width="17.4129" />
            <circle cx="8.70647" cy="8.70647" id="Ellipse 1116" r="8.00995" stroke={strokeColor} strokeWidth="1.39303" />
            <path d={svgPaths.pdc0c980} id="Vector" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39303" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame3({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  const textColor = isActive ? "#4784F8" : "#939393";
  
  return (
    <div className="content-stretch flex gap-[11.144px] items-center relative shrink-0 w-[135.734px]">
      <SetTimeClock isActive={isActive} />
      <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[11.841px]" style={{ color: textColor }}>Set date</p>
      {isActive && valueText && <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[#4784f8] text-[11.841px]">{valueText}</p>}
    </div>
  );
}

function SettingSliderButtonLrg({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[20.896px] relative shrink-0 w-[39.005px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.005 20.8955">
        <g id="Setting slider button - lrg">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="20.8955" rx="10.4478" width="39.005" />
          <circle cx={isActive ? "28.5572" : "10.4478"} cy="10.4478" fill="var(--fill-0, white)" id="Ellipse 117" r="7.83582" />
        </g>
      </svg>
    </div>
  );
}

function Frame1({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between pb-[11.144px] pt-0 px-0 relative shrink-0 w-full">
      <Frame3 isActive={isActive} valueText={valueText} />
      <SettingSliderButtonLrg isActive={isActive} />
    </div>
  );
}

function SetDate({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Set date">
      <Frame1 isActive={isActive} valueText={valueText} />
    </div>
  );
}

function SetTimeClock1({ isActive }: { isActive: boolean }) {
  const strokeColor = isActive ? "#4784F8" : "#939393";
  
  return (
    <div className="relative shrink-0 size-[17.413px]" data-name="Set time clock">
      <div className="absolute inset-[-0.31%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4129 17.4677">
          <g id="Set time clock">
            <rect fill="white" height="17.4129" transform="translate(0 0.0547263)" width="17.4129" />
            <circle cx="8.70647" cy="8.70647" id="Ellipse 1116" r="8.00995" stroke={strokeColor} strokeWidth="1.39303" />
            <path d={svgPaths.pdc0c980} id="Vector" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39303" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame6({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  const textColor = isActive ? "#4784F8" : "#939393";
  
  return (
    <div className="content-stretch flex gap-[11.144px] items-center relative shrink-0 w-[135.734px]">
      <SetTimeClock1 isActive={isActive} />
      <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[11.841px]" style={{ color: textColor }}>Set time</p>
      {isActive && valueText && <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[#4784f8] text-[11.841px]">{valueText}</p>}
    </div>
  );
}

function SettingSliderButtonLrg1({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[20.896px] relative shrink-0 w-[39.005px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.005 20.8955">
        <g id="Setting slider button - lrg">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="20.8955" rx="10.4478" width="39.005" />
          <circle cx={isActive ? "28.5572" : "10.4478"} cy="10.4478" fill="var(--fill-0, white)" id="Ellipse 117" r="7.83582" />
        </g>
      </svg>
    </div>
  );
}

function Frame2({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between pb-[11.144px] pt-0 px-0 relative shrink-0 w-full">
      <Frame6 isActive={isActive} valueText={valueText} />
      <SettingSliderButtonLrg1 isActive={isActive} />
    </div>
  );
}

function SetDate1({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Set date">
      <Frame2 isActive={isActive} valueText={valueText} />
    </div>
  );
}

function RepeatTimeClock({ isActive }: { isActive: boolean }) {
  const fillColor = isActive ? "#4784F8" : "#939393";
  const strokeColor = isActive ? "#4784F8" : "#939393";
  
  return (
    <div className="bg-white h-[17.462px] relative shrink-0 w-[17.413px]" data-name="Repeat time clock">
      <div className="absolute h-[17.462px] left-0 top-0 w-[17.413px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4132 17.4624">
          <g id="Group 23">
            <g id="Group 20">
              <path d={svgPathsRepeats.p355c7440} fill={fillColor} id="Vector" />
              <path d={svgPathsRepeats.p2e8cfd80} fill={fillColor} id="Union" />
            </g>
            <path d={svgPathsRepeats.p2d088d00} id="Vector_2" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39303" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame7({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  const textColor = isActive ? "#4784F8" : "#939393";
  
  return (
    <div className="content-stretch flex gap-[11.144px] items-center relative shrink-0 w-[135.734px]">
      <RepeatTimeClock isActive={isActive} />
      <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[11.841px]" style={{ color: textColor }}>Repeats</p>
      {isActive && valueText && <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[#4784f8] text-[11.841px]">{valueText}</p>}
    </div>
  );
}

function SettingSliderButtonLrg2({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[20.896px] relative shrink-0 w-[39.005px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.005 20.8955">
        <g id="Setting slider button - lrg">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="20.8955" rx="10.4478" width="39.005" />
          <circle cx={isActive ? "28.5572" : "10.4478"} cy="10.4478" fill="var(--fill-0, white)" id="Ellipse 117" r="7.83582" />
        </g>
      </svg>
    </div>
  );
}

function Frame8({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between pb-[11.144px] pt-0 px-0 relative shrink-0 w-full">
      <Frame7 isActive={isActive} valueText={valueText} />
      <SettingSliderButtonLrg2 isActive={isActive} />
    </div>
  );
}

function SetDate2({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Set date">
      <Frame8 isActive={isActive} valueText={valueText} />
    </div>
  );
}

function Frame4({ 
  setDateActive, 
  setTimeActive, 
  repeatsActive,
  setDateValue,
  setTimeValue,
  repeatsValue
}: { 
  setDateActive: boolean; 
  setTimeActive: boolean; 
  repeatsActive: boolean;
  setDateValue?: string;
  setTimeValue?: string;
  repeatsValue?: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[8.358px] items-start relative shrink-0 w-full">
      <SetDate isActive={setDateActive} valueText={setDateValue} />
      <SetDate1 isActive={setTimeActive} valueText={setTimeValue} />
      <SetDate2 isActive={repeatsActive} valueText={repeatsValue} />
    </div>
  );
}

function Frame5({ 
  tickActive, 
  text, 
  setDateActive, 
  setTimeActive, 
  repeatsActive,
  setDateValue,
  setTimeValue,
  repeatsValue
}: { 
  tickActive: boolean; 
  text: string; 
  setDateActive: boolean; 
  setTimeActive: boolean; 
  repeatsActive: boolean;
  setDateValue?: string;
  setTimeValue?: string;
  repeatsValue?: string;
}) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame isActive={tickActive} />
      <div className="mt-[19.682px] w-full">
        <TakeBinsOut text={text} />
      </div>
      <div className="mt-[19.682px] w-full">
        <Frame4 
          setDateActive={setDateActive} 
          setTimeActive={setTimeActive} 
          repeatsActive={repeatsActive}
          setDateValue={setDateValue}
          setTimeValue={setTimeValue}
          repeatsValue={repeatsValue}
        />
      </div>
    </div>
  );
}

export default function NewReminderPopPage4() {
  const [tickActive, setTickActive] = useState(false);
  const [text, setText] = useState("");
  const [setDateActive, setSetDateActive] = useState(false);
  const [setTimeActive, setSetTimeActive] = useState(false);
  const [repeatsActive, setRepeatsActive] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setText("Take");
        setTickActive(true);
      }, 550),
      setTimeout(() => setText("Take the"), 700),
      setTimeout(() => setText("Take the bins"), 950),
      setTimeout(() => setText("Take the bins out"), 1100),
      setTimeout(() => setText("Take the bins out every"), 1600),
      setTimeout(() => setText("Take the bins out every Wednesday"), 1800),
      setTimeout(() => setText("Take the bins out every Wednesday at"), 2050),
      setTimeout(() => setText("Take the bins out every Wednesday at 6pm"), 2250),
      setTimeout(() => setSetDateActive(true), 2950),
      setTimeout(() => setSetTimeActive(true), 3450),
      setTimeout(() => setRepeatsActive(true), 3950),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="New reminder pop">
      <Frame5 
        tickActive={tickActive} 
        text={text} 
        setDateActive={setDateActive} 
        setTimeActive={setTimeActive} 
        repeatsActive={repeatsActive}
        setDateValue="Wednesday"
        setTimeValue="6pm"
        repeatsValue="Every Wednesday"
      />
    </div>
  );
}
