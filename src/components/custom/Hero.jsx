"use client";

import React, { useState, useEffect } from "react";
import { formatDateLocal, isWeekend } from "@/utils/date.utils";
import CalendarCard from "./CalendarCard";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Hero({ activities, setActivities }) {
  const [selectedDate, setSelectedDate] = useState("2025-09-13");
  const [selectedActivity, setSelectedActivity] = useState("hiking");
  const [selectTime, setSelectTime] = useState("10:00");
  const [editingActivity, setEditingActivity] = useState(null);

  function handleAddActivity() {
    if (!selectedDate) return alert("Pick a date first");
    if (!isWeekend(selectedDate)) return alert("Pick a weekend date");
    if (!selectTime) return alert("Pick a time");

    const exists = activities.some(
      (a) => a.date === selectedDate && a.time === selectTime
    );
    if (exists) {
      return alert("An activity already exists at this time for this date.");
    }

    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        time: selectTime,
        date: selectedDate,
        activity: selectedActivity,
      },
    ]);
  }

  function handleUpdateActivity(updated) {
    setActivities((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    setEditingActivity(null);
    resetForm();
  }

  useEffect(() => {
    if (editingActivity) {
      setSelectedDate(editingActivity.date);
      setSelectTime(editingActivity.time);
      setSelectedActivity(editingActivity.activity);
    }
  }, [editingActivity]);

  function resetForm() {
    setSelectTime("10:00");
    setSelectedActivity("hiking");
  }

  const activitiesForDay = activities.filter((a) => a.date === selectedDate);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 items-center lg:flex-row lg:justify-between px-6 lg:px-0 md:mx-16  sm:mx-12 xl:px-20 py-10">
      <CalendarCard
        selectedDate={selectedDate ? new Date(selectedDate) : undefined}
        onSelect={(date) => date && setSelectedDate(formatDateLocal(date))}
        activities={activities}
      />

      <Card
        className={`w-full shadow-[7px_3px_0px_rgba(0,0,0,1)] transition-colors duration-700 ease-in-out flex-col xl:ml-10 ${
          editingActivity ? "bg-cyan-200" : "bg-yellow-200"
        }`}
      >
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
          handleUpdateActivity={handleUpdateActivity}
          editingActivity={editingActivity}
          handleAddActivity={handleAddActivity}
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
            onEdit={(item) => setEditingActivity(item)}
            onDelete={(id) => {
              //  if the deleted item is being edited, reset form + edit mode
              if (editingActivity?.id === id) {
                setEditingActivity(null);
                resetForm();
              }
            }}
          />
        )}
      </Card>
    </div>
  );
}
