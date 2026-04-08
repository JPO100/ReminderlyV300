import { useMemo, useState } from "react";

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOffset(year: number, month: number): number {
  const firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
}

function formatMonthYear(year: number, month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[month]} ${year}`;
}

function isSameDate(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function ListSmartReminderCalendar({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}) {
  const initialDate = selectedDate ?? new Date(2026, 0, 1);
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayOffset = getFirstDayOffset(viewYear, viewMonth);
  const numDateRows = Math.ceil((firstDayOffset + daysInMonth) / 7);
  const gridRowsValue = useMemo(() => `20px${" 35px".repeat(numDateRows)}`, [numDateRows]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    date.setHours(0, 0, 0, 0);
    onDateSelect(date);
  };

  return (
    <div className="content-stretch flex flex-col items-center relative w-full" data-name="list-smart-reminder-calendar">
      <div aria-hidden="true" className="absolute border-[#EDEDED] border-solid border-t inset-0 pointer-events-none" />

      <div className="relative shrink-0 w-full pt-[20px] pb-[16px] px-[4px]">
        <div className="flex flex-row items-center justify-between size-full">
          <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
            <p className="font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[17px] text-[#1C2C42] tracking-[-0.2px]">
              {formatMonthYear(viewYear, viewMonth)}
            </p>
          </div>
          <div
            className="content-stretch flex items-center justify-end gap-[32px] leading-[normal] ml-auto relative shrink-0 text-[#1C2C42] text-nowrap"
          >
            <button
              onClick={handlePrevMonth}
              className="relative shrink-0 cursor-pointer select-none bg-transparent border-none p-0 flex items-center justify-center"
              style={{ width: "9px", height: "15px" }}
              type="button"
              aria-label="Previous month"
            >
              <svg width="9" height="15" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.9209 0C9.1875 0 9.43066 0.0654297 9.64941 0.195312C9.87472 0.318336 10.0528 0.489446 10.1826 0.708008C10.3123 0.926614 10.377 1.17309 10.377 1.44629C10.3768 1.84257 10.2235 2.19153 9.91602 2.49219L3.4248 8.80859L9.91602 15.1143C10.2235 15.4218 10.377 15.7775 10.377 16.1807C10.377 16.4473 10.3125 16.6904 10.1826 16.9092C10.0528 17.1277 9.87478 17.3018 9.64941 17.4316C9.43066 17.5615 9.1875 17.627 8.9209 17.627C8.51782 17.627 8.1796 17.4899 7.90625 17.2168L0.523438 9.97754C0.338867 9.7998 0.205078 9.61816 0.123047 9.43359C0.0410748 9.24233 5.91461e-05 9.03399 0 8.80859C0 8.58317 0.0411364 8.37782 0.123047 8.19336C0.205078 8.00195 0.338867 7.81738 0.523438 7.63965L7.90625 0.410156C8.17964 0.136882 8.5177 0 8.9209 0Z" fill="#1C2C42"/>
              </svg>
            </button>
            <button
              onClick={handleNextMonth}
              className="relative shrink-0 cursor-pointer select-none bg-transparent border-none p-0 flex items-center justify-center"
              style={{ width: "9px", height: "15px" }}
              type="button"
              aria-label="Next month"
            >
              <svg width="9" height="15" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(11 0) scale(-1 1)">
                  <path d="M8.9209 0C9.1875 0 9.43066 0.0654297 9.64941 0.195312C9.87472 0.318336 10.0528 0.489446 10.1826 0.708008C10.3123 0.926614 10.377 1.17309 10.377 1.44629C10.3768 1.84257 10.2235 2.19153 9.91602 2.49219L3.4248 8.80859L9.91602 15.1143C10.2235 15.4218 10.377 15.7775 10.377 16.1807C10.377 16.4473 10.3125 16.6904 10.1826 16.9092C10.0528 17.1277 9.87478 17.3018 9.64941 17.4316C9.43066 17.5615 9.1875 17.627 8.9209 17.627C8.51782 17.627 8.1796 17.4899 7.90625 17.2168L0.523438 9.97754C0.338867 9.7998 0.205078 9.61816 0.123047 9.43359C0.0410748 9.24233 5.91461e-05 9.03399 0 8.80859C0 8.58317 0.0411364 8.37782 0.123047 8.19336C0.205078 8.00195 0.338867 7.81738 0.523438 7.63965L7.90625 0.410156C8.17964 0.136882 8.5177 0 8.9209 0Z" fill="#1C2C42"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid relative shrink-0 w-full"
        style={{
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gridTemplateRows: gridRowsValue,
          rowGap: "0px",
        }}
      >
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, index) => (
          <div key={day} className="flex items-start justify-center" style={{ gridColumn: index + 1, gridRow: 1 }}>
            <p className="font-['Lato:Bold',sans-serif] leading-[normal] text-[12px] text-[#C9C9C9]">
              {day}
            </p>
          </div>
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const row = Math.floor((firstDayOffset + index) / 7) + 2;
          const col = ((firstDayOffset + index) % 7) + 1;
          const date = new Date(viewYear, viewMonth, day);
          const isSelected = isSameDate(selectedDate, date);

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`${isSelected ? "bg-[#1C2C42]" : ""} content-stretch flex flex-col h-[35px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0 cursor-pointer`}
              style={{ gridColumn: col, gridRow: row }}
              data-name="datepicker-day"
            >
              <p className={`font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[17px] text-center ${isSelected ? "text-white" : "text-[#1C2C42]"}`}>
                {day}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
