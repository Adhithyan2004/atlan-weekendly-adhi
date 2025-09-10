"use client";

import { CardContent } from "@/components/ui/card";
import { ACTIVITIES } from "@/app/datas/activitiesData";
import { CalendarDays, Heart, Clock } from "lucide-react";

export default function ActivityForm({
  selectedDate,
  setSelectedDate,
  selectedActivity,
  setSelectedActivity,
  handleAddActivity,
  selectTime,
  setSelectTime,
  handleUpdateActivity,
  editingActivity,
}) {
  return (
    <CardContent className={`space-y-4 `}>
      <div className="flex w-full gap-6">
        <div className="LftCntr w-full">
          {/* Date Input */}
          <div className="flex flex-col mb-3 w-full">
            <label className="mb-1 flex gap-2 font-bold">
              <CalendarDays />
              Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 p-2 rounded-sm"
            />
          </div>
          {/* Time Entry */}
          <div className="flex flex-col  w-full">
            <label className="mb-1 flex gap-2 font-bold">
              <Clock />
              Time
            </label>
            <input
              type="time"
              value={selectTime}
              onChange={(e) => {
                setSelectTime(e.target.value);
              }}
              className="border-2 p-2 rounded-sm"
            />
          </div>
        </div>
        <div className="RgtCntr w-full">
          {/* Activity Dropdown */}
          <div className="flex flex-col mb-3 w-full">
            <label className="mb-1 flex gap-2 font-bold">
              <Heart />
              Activity
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className={`border-2 p-2 rounded-sm transition-colors duration-700 ease-in-out  ${
                editingActivity ? "bg-cyan-200" : "bg-yellow-200"
              }`}
            >
              {ACTIVITIES.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        className="px-4 py-2 bg-primary text-white rounded-md"
        onClick={() => {
          const updated = {
            ...editingActivity,
            date: selectedDate,
            time: selectTime,
            activity: selectedActivity,
          };
          editingActivity ? handleUpdateActivity(updated) : handleAddActivity();
        }}
      >
        {editingActivity ? "Update Activity" : "Add Activity"}
      </button>
    </CardContent>
  );
}
