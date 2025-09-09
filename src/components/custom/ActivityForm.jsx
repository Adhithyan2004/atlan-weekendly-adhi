"use client";

import { CardContent } from "@/components/ui/card";

export default function ActivityForm({
  selectedDate,
  setSelectedDate,
  selectedActivity,
  setSelectedActivity,
  selectedMood,
  setSelectedMood,
  handleAddActivity,
}) {
  return (
    <CardContent className="space-y-4">
      {/* Date Input */}
      <div className="flex flex-col">
        <label className="mb-1">Date</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded-sm w-1/2"
        />
      </div>

      {/* Activity Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1">Activity</label>
        <select
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          className="border p-2 rounded-sm w-1/2"
        >
          <option value="hiking">Hiking</option>
          <option value="brunch">Brunch</option>
          <option value="golf">Golf</option>
          <option value="movie">Movie</option>
        </select>
      </div>

      {/* Mood Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1">Mood</label>
        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="border p-2 rounded-sm w-1/2"
        >
          <option value="happy">😊 Happy</option>
          <option value="chill">😌 Chill</option>
          <option value="tired">😴 Tired</option>
          <option value="excited">🤩 Excited</option>
        </select>
      </div>

      <button
        className="px-4 py-2 bg-primary text-white rounded-md"
        onClick={handleAddActivity}
      >
        Add Activity
      </button>
    </CardContent>
  );
}
