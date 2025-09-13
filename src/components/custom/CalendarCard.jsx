"use client";

import { Calendar } from "../ui/calendar";
import { clsx } from "clsx";
import { formatDateLocal, normalizeDate } from "@/utils/date.utils";

export default function CalendarCard({ selectedDate, onSelect, activities }) {
  const getTaskCount = (date) => {
    const dateStr = formatDateLocal(date);
    return activities.filter((a) => a.date === dateStr).length;
  };

  return (
    <Calendar
      mode="single"
      selected={normalizeDate(selectedDate)}
      onSelect={(date) => {
        if (!date) return;
        onSelect(normalizeDate(date));
      }}
      modifiers={{
        hasActivity: activities.map((a) => normalizeDate(a.date)),
      }}
      modifiersClassNames={{
        hasActivity: "bg-emerald-100 rounded-md",
      }}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isPast = date < today;
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        return isPast || !isWeekend;
      }}
      className="2xl:w-1/2 h-[50vh] sm:w-full sm:h-full w-full bg-emerald-300 shadow-[7px_4px_0px_rgba(0,0,0,1)] border-2 rounded-lg"
      components={{
        DayButton: ({ day, modifiers, ...props }) => {
          const date = day?.date;
          if (!date) return null;

          const taskCount = getTaskCount(date);
  
          return (
            <button
              {...props}
              className={clsx(
                "relative flex flex-col items-center justify-center w-full h-full rounded-md transition-colors",
                // base
                "hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",

                // states
                modifiers.selected &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-white",
                modifiers.today && "border border-primary font-semibold",
                modifiers.disabled && "opacity-50 pointer-events-none",
                modifiers.outside && "text-muted-foreground"
              )}
            >
              <span>{date.getDate()}</span>
              {taskCount > 0 && (
                <span className="absolute bottom-1 right-1 h-4 w-4 text-[10px] rounded-full bg-red-500 flex items-center justify-center text-white">
                  {taskCount}
                </span>
              )}
            </button>
          );
        },
      }}
    />
  );
}
