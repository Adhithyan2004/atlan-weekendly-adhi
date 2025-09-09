"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

const moodColors = {
  happy: "bg-yellow-100 border-yellow-300",
  chill: "bg-blue-100 border-blue-300",
  tired: "bg-gray-200 border-gray-400",
  excited: "bg-pink-100 border-pink-300",
};

const moodEmojis = {
  happy: "😊",
  chill: "😌",
  tired: "😴",
  excited: "🤩",
};

export default function SortableItem({ id, item, onDelete }) {
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
          <strong>{item.date}</strong> - {item.activity}
          {moodEmojis[item.mood] || ""}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(item.id)}
        className="p-1 hover:bg-red-100 rounded-md"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}
