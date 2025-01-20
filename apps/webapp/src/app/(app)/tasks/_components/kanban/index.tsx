"use client";

import React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { DroppableColumn } from "./droppable-column";
import { Task, taskStatus } from "@/lib/db/schemas";

const KanbanView = ({ tasks }: { tasks?: Task[] }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  const onDragOver = (e: DragOverEvent) => {
    if (e.over?.id) {
      console.log(
        `Draggable item ${e.active.id} was moved over droppable area ${e.over.id}.`
      );
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const overId = e.over?.id;
    if (overId) {
      // setTasks((prev) => {
      //   const newTasks = [...prev];
      //   const task = newTasks.find((t) => t.id === e.active.id);
      //   if (task) {
      //     task.status = overId as Task["status"];
      //   }
      //   return newTasks;
      // });

      toast(`Draggable item was dropped over droppable area ${overId}`);
    }
  };

  return (
    <DndContext onDragOver={onDragOver} onDragEnd={onDragEnd} sensors={sensors}>
      <div className="grid grid-cols-3 gap-6">
        {taskStatus.map((status) => (
          <DroppableColumn
            key={status}
            id={status}
            title={status}
            tasks={tasks?.filter((task) => task.status === status) || []}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanView;
