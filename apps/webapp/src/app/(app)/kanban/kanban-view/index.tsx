"use client";

import { taskStatus } from "@/lib/db/schemas";
import React from "react";
import Column from "./column";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import Card, { TaskCardTask } from "./card";

const KanbanView = ({ tasks }: { tasks: TaskCardTask[] }) => {
  const [activeTask, setActiveTask] = React.useState<TaskCardTask | null>(null);

  const onDragStart = (e: DragStartEvent) => {
    const task = e.active.data.current as TaskCardTask;

    if (task) {
      setActiveTask(task);
    }
  };

  const onDragEnd = async () => {
    setActiveTask(null);
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid">
        <div className="flex px-8 gap-6 overflow-x-auto  h-screen">
          {taskStatus.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask && <Card task={activeTask} overlay />}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanView;
