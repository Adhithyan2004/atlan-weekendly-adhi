"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil } from "lucide-react";
import { ACTIVITIES } from "@/app/datas/activitiesData";
import { reorderDate, formatTime12hr } from "@/utils/date.utils";

const moodColors = {
  happy: "bg-yellow-100 border-yellow-300",
  chill: "bg-blue-100 border-blue-300",
  tired: "bg-gray-200 border-gray-400",
  excited: "bg-pink-100 border-pink-300",
};

function getActivityLabel(id) {
  const found = ACTIVITIES.find((a) => a.id === id);
  return found ? found.label : id;
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
      className={`flex items-center shadow-[3px_3px_0px_rgba(0,0,0,1)] justify-between p-3  rounded-md  ${
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
