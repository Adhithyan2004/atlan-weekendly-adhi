"use client";

import React, { useState } from "react";
import CalendarCard from "./CalendarCard";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Hero() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("hiking");
  const [selectedMood, setSelectedMood] = useState("happy");
  const [activities, setActivities] = useState([]);

  function handleAddActivity() {
    if (!selectedDate) return alert("Pick a date first");
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        date: selectedDate,
        activity: selectedActivity,
        mood: selectedMood,
      },
    ]);
  }

  // ✅ Convert Date -> YYYY-MM-DD using local time
  function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // ✅ Only activities for the selected day
  const activitiesForDay = activities.filter((a) => a.date === selectedDate);

  return (
    <div className="flex justify-between px-20 py-10">
      <CalendarCard
        selectedDate={selectedDate ? new Date(selectedDate) : undefined}
        onSelect={(date) => date && setSelectedDate(formatDateLocal(date))}
        activities={activities}
      />

      <Card className="w-full flex-col ml-10">
        <CardHeader>
          <CardTitle>Enter Activity</CardTitle>
          <CardDescription>
            Fill the fields to enter a scheduled activity
          </CardDescription>
        </CardHeader>
        <ActivityForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          handleAddActivity={handleAddActivity}
        />

        {selectedDate && (
          <ActivityList
            activities={activitiesForDay}
            setActivities={(newDayList) => {
              setActivities((prev) => {
                const others = prev.filter((a) => a.date !== selectedDate);
                return [...others, ...newDayList];
              });
            }}
          />
        )}
      </Card>
    </div>
  );
}
