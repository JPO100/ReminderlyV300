"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <svg
            className={cn(className)}
            width="11"
            height="18"
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="M8.9209 0C9.1875 0 9.43066 0.0654297 9.64941 0.195312C9.87472 0.318336 10.0528 0.489446 10.1826 0.708008C10.3123 0.926614 10.377 1.17309 10.377 1.44629C10.3768 1.84257 10.2235 2.19153 9.91602 2.49219L3.4248 8.80859L9.91602 15.1143C10.2235 15.4218 10.377 15.7775 10.377 16.1807C10.377 16.4473 10.3125 16.6904 10.1826 16.9092C10.0528 17.1277 9.87478 17.3018 9.64941 17.4316C9.43066 17.5615 9.1875 17.627 8.9209 17.627C8.51782 17.627 8.1796 17.4899 7.90625 17.2168L0.523438 9.97754C0.338867 9.7998 0.205078 9.61816 0.123047 9.43359C0.0410748 9.24233 5.91461e-05 9.03399 0 8.80859C0 8.58317 0.0411364 8.37782 0.123047 8.19336C0.205078 8.00195 0.338867 7.81738 0.523438 7.63965L7.90625 0.410156C8.17964 0.136882 8.5177 0 8.9209 0Z"
              fill="#2B5DA0"
            />
          </svg>
        ),
        IconRight: ({ className, ...props }) => (
          <svg
            className={cn(className)}
            width="11"
            height="18"
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <g transform="translate(11 0) scale(-1 1)">
              <path
                d="M8.9209 0C9.1875 0 9.43066 0.0654297 9.64941 0.195312C9.87472 0.318336 10.0528 0.489446 10.1826 0.708008C10.3123 0.926614 10.377 1.17309 10.377 1.44629C10.3768 1.84257 10.2235 2.19153 9.91602 2.49219L3.4248 8.80859L9.91602 15.1143C10.2235 15.4218 10.377 15.7775 10.377 16.1807C10.377 16.4473 10.3125 16.6904 10.1826 16.9092C10.0528 17.1277 9.87478 17.3018 9.64941 17.4316C9.43066 17.5615 9.1875 17.627 8.9209 17.627C8.51782 17.627 8.1796 17.4899 7.90625 17.2168L0.523438 9.97754C0.338867 9.7998 0.205078 9.61816 0.123047 9.43359C0.0410748 9.24233 5.91461e-05 9.03399 0 8.80859C0 8.58317 0.0411364 8.37782 0.123047 8.19336C0.205078 8.00195 0.338867 7.81738 0.523438 7.63965L7.90625 0.410156C8.17964 0.136882 8.5177 0 8.9209 0Z"
                fill="#2B5DA0"
              />
            </g>
          </svg>
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
