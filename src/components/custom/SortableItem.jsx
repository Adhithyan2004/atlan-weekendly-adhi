"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil } from "lucide-react";
import { ACTIVITIES } from "@/app/datas/activitiesData";

const moodColors = {
  happy: "bg-yellow-100 border-yellow-300",
  chill: "bg-blue-100 border-blue-300",
  tired: "bg-gray-200 border-gray-400",
  excited: "bg-pink-100 border-pink-300",
};

function formatTime12hr(time) {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 → 12, 13 → 1, etc.
  return `${hour}:${minute} ${ampm}`;
}

function getActivityLabel(id) {
  const found = ACTIVITIES.find((a) => a.id === id);
  return found ? found.label : id;
}

function reorderDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

const moodEmojis = {
  happy: "😊",
  chill: "😌",
  tired: "😴",
  excited: "🤩",
};

export default function SortableItem({ id, item, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center w-1/2 mx-6 justify-between p-2 rounded-md shadow-sm ${
        moodColors[item.mood] || "bg-white border"
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab flex items-center gap-2"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
        <span>
          <strong>{reorderDate(item.date)}</strong> -{" "}
          <strong>{formatTime12hr(item.time)}</strong> -{" "}
          {getActivityLabel(item.activity)}
          {moodEmojis[item.mood] || ""}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="p-1 hover:bg-blue-100 rounded-md"
        >
          <Pencil className="w-4 h-4 text-blue-500" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 hover:bg-red-100 rounded-md"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
