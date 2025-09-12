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

export default function ActivityList({
  activities,
  setActivities,
  onEdit,
  onDelete,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // dragging begins only if moved 5px preventing unwanted drags
      activationConstraint: { distance: 5 },
    })
  );

  // Handle drag and drop and update in the UI
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = activities.findIndex((a) => a.id === active.id);
      const newIndex = activities.findIndex((a) => a.id === over.id);
      setActivities(arrayMove(activities, oldIndex, newIndex));
    }
  }

  function handleDelete(id) {
    setActivities(activities.filter((a) => a.id !== id));
    if (onDelete) onDelete(id); //  tell parent what got deleted so that parent detects deleted activity beign edited
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={activities.map((a) => a.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid 2xl:grid-cols-2 gap-2 px-3 py-3 overflow-y-auto">
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
