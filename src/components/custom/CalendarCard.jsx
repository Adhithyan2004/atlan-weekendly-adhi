"use client";

import { Calendar } from "../ui/calendar";
import { clsx } from "clsx";

export default function CalendarCard({ selectedDate, onSelect, activities }) {
  const normalizeDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const toDateStr = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTaskCount = (date) => {
    const dateStr = toDateStr(date);
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
        hasActivity: "bg-blue-200 rounded-md",
      }}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isPast = date < today;
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        return isPast || !isWeekend;
      }}
      className="w-1/3 border-1 rounded-lg h-fit"
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
