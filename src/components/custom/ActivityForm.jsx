"use client";

import { CardContent } from "@/components/ui/card";
import { ACTIVITIES } from "@/app/datas/activitiesData";

export default function ActivityForm({
  selectedDate,
  setSelectedDate,
  selectedActivity,
  setSelectedActivity,
  selectedMood,
  setSelectedMood,
  handleAddActivity,
  selectTime,
  setSelectTime,
  handleUpdateActivity,
  editingActivity,
}) {
  return (
    <CardContent className="space-y-4">
      <div className="flex w-full gap-4">
        <div className="LftCntr w-full">
          {/* Date Input */}
          <div className="flex flex-col w-full">
            <label className="mb-1">Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded-sm"
            />
          </div>
          {/* Time Entry */}
          <div className="flex flex-col w-full">
            <label className="mb-1">Time</label>
            <input
              type="time"
              value={selectTime}
              onChange={(e) => {
                setSelectTime(e.target.value);
              }}
              className="border p-2 rounded-sm"
            />
          </div>
        </div>
        <div className="RgtCntr w-full">
          {/* Activity Dropdown */}
          <div className="flex flex-col w-full">
            <label className="mb-1">Activity</label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="border p-2 rounded-sm"
            >
              {ACTIVITIES.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mood Dropdown */}
          <div className="flex flex-col w-full">
            <label className="mb-1">Mood</label>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="border p-2 rounded-sm "
            >
              <option value="happy">😊 Happy</option>
              <option value="chill">😌 Chill</option>
              <option value="tired">😴 Tired</option>
              <option value="excited">🤩 Excited</option>
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
            mood: selectedMood,
          };
          editingActivity ? handleUpdateActivity(updated) : handleAddActivity();
        }}
      >
        {editingActivity ? "Update Activity" : "Add Activity"}
      </button>
    </CardContent>
  );
}
