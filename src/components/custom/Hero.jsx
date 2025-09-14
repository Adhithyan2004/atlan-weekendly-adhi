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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("hiking");
  const [selectTime, setSelectTime] = useState("10:00");
  const [editingActivity, setEditingActivity] = useState(null);
  const [error, setError] = useState("");

  function handleAddActivity() {
    if (!selectedDate) return setError("Pick a date first");
    if (!isWeekend(selectedDate)) return setError("Pick a weekend date");
    if (!selectTime) return setError("Pick a time");

    // check if an activity exist at same time
    const exists = activities.some(
      (a) => a.date === selectedDate && a.time === selectTime
    );
    if (exists) {
      return setError("An activity already exists at this time for this date.");
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

  // Updates data by relopping the id and updating the changed fields
  function handleUpdateActivity(updated) {
    setActivities((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    setEditingActivity(null);
    resetForm();
  }
  // clearing error message if any of the data cahnges
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [selectedDate, selectTime, selectedActivity, activities]);

  // This effect pre-fills form fields (date, time, activity) with the details of the activity being edited.
  useEffect(() => {
    if (editingActivity) {
      setSelectedDate(editingActivity.date);
      setSelectTime(editingActivity.time);
      setSelectedActivity(editingActivity.activity);
    }
  }, [editingActivity]);

  // Reset form after updating an activity
  function resetForm() {
    setSelectTime("10:00");
    setSelectedActivity("hiking");
  }

  // Show activites for the selected date
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
        {error && <div className="text-red-600 font-medium px-6 ">{error}</div>}
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
