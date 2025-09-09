"use client";

import React, { useState, useEffect } from "react";
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
  const [selectedDate, setSelectedDate] = useState("2025-09-13");
  const [selectedActivity, setSelectedActivity] = useState("hiking");
  const [selectedMood, setSelectedMood] = useState("happy");
  const [activities, setActivities] = useState([]);
  const [selectTime, setSelectTime] = useState("10:00");
  const [editingActivity, setEditingActivity] = useState(null);

  // Load first
  useEffect(() => {
    const saved = localStorage.getItem("activities");
    if (saved) setActivities(JSON.parse(saved));
  }, []);

  // Save whenever activities change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  //  Restrict to weekends
  function isWeekend(dateStr) {
    if (!dateStr) return false;
    const [y, m, d] = dateStr.split("-");
    const dt = new Date(y, Number(m) - 1, d);
    const day = dt.getDay();
    return day === 0 || day === 6; // Sunday=0, Saturday=6
  }

  //  Add activity
  function handleAddActivity() {
    if (!selectedDate) return alert("Pick a date first");
    if (!isWeekend(selectedDate)) return alert("Pick a weekend date");
    if (!selectTime) return alert("Pick a time");

    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        time: selectTime,
        date: selectedDate,
        activity: selectedActivity,
        mood: selectedMood,
      },
    ]);
  }

  //  Update activity
  function handleUpdateActivity(id) {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              date: selectedDate,
              time: selectTime,
              activity: selectedActivity,
              mood: selectedMood,
            }
          : a
      )
    );
    setEditingActivity(null);
    resetForm();
  }

  //  Prefill form when editing
  useEffect(() => {
    if (editingActivity) {
      setSelectedDate(editingActivity.date);
      setSelectTime(editingActivity.time);
      setSelectedActivity(editingActivity.activity);
      setSelectedMood(editingActivity.mood);
    }
  }, [editingActivity]);

  function resetForm() {
    setSelectedDate("");
    setSelectTime("10:00");
    setSelectedActivity("hiking");
    setSelectedMood("happy");
  }

  //  Convert Date -> YYYY-MM-DD
  function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //  Filter activities for the selected day
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
          <CardTitle>
            {editingActivity ? "Edit Activity" : "Enter Activity"}
          </CardTitle>
          <CardDescription>
            {editingActivity
              ? "Update your scheduled activity"
              : "Fill the fields to enter a scheduled activity"}
          </CardDescription>
        </CardHeader>

        <ActivityForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          handleUpdateActivity={handleUpdateActivity}
          editingActivity={editingActivity}
          handleAddActivity={
            editingActivity
              ? () => handleUpdateActivity(editingActivity.id)
              : handleAddActivity
          }
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          isEditing={!!editingActivity}
          onCancelEdit={() => {
            setEditingActivity(null);
            resetForm();
          }}
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
            onEdit={(item) => setEditingActivity(item)} //  edit handler
          />
        )}
      </Card>
    </div>
  );
}
