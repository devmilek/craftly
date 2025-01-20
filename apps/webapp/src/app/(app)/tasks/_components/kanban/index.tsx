"use client";

import React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { DroppableColumn } from "./droppable-column";
import { Task, taskStatus } from "@/lib/db/schemas";
import TaskCard from "./task-card";

const KanbanView = () => {
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  const onDragStart = (e: DragStartEvent) => {
    const task = e.active.data.current as Task;

    if (task) {
      setActiveTask(task);
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    if (e.over?.id) {
      console.log(
        `Draggable item ${e.active.id} was moved over droppable area ${e.over.id}.`
      );
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const overId = e.over?.id;
    setActiveTask(null);
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
    <DndContext
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={sensors}
      autoScroll={false}
    >
      <div className="grid grid-cols-3 gap-6">
        {taskStatus.map((status) => (
          <DroppableColumn key={status} id={status} status={status} />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          <TaskCard
            name={activeTask.name}
            dueDate={activeTask.dueDate}
            status={activeTask.status}
            priority={activeTask.priority}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanView;
