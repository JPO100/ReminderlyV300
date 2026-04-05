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
            className="content-stretch flex items-center justify-between leading-[normal] relative shrink-0 text-[#1C2C42] text-nowrap w-[76px]"
            style={{ transform: "translateY(-5px)" }}
          >
            <p
              onClick={handlePrevMonth}
              className="relative shrink-0 cursor-pointer select-none"
              style={{ width: "32px", height: "32px", fontSize: "30px", fontWeight: 700, lineHeight: "32px", textAlign: "center" }}
            >
              ‹
            </p>
            <p
              onClick={handleNextMonth}
              className="relative shrink-0 cursor-pointer select-none"
              style={{ width: "32px", height: "32px", fontSize: "30px", fontWeight: 700, lineHeight: "32px", textAlign: "center" }}
            >
              ›
            </p>
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
