"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function ActivityList({ activities, setActivities, onEdit }) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return; // handle case where item is dropped outside list
    if (active.id !== over.id) {
      const oldIndex = activities.findIndex((a) => a.id === active.id);
      const newIndex = activities.findIndex((a) => a.id === over.id);
      setActivities(arrayMove(activities, oldIndex, newIndex));
    }
  }

  function handleDelete(id) {
    setActivities(activities.filter((a) => a.id !== id));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={activities.map((a) => a.id)} // just pass ids, cleaner
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 gap-3 px-4 py-3 overflow-y-auto">
          {activities.length === 0 && (
            <p className="text-base px-6 text-black italic">
              No activities scheduled for this date.
            </p>
          )}

          {activities.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={() => onEdit(item)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
