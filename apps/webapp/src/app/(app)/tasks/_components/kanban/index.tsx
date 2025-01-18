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

const statuses = ["todo", "in-progress", "completed"] as const;

export interface Task {
  id: string;
  name: string;
  status: (typeof statuses)[number];
  description: string;
}

const rawTasks: Task[] = [
  {
    id: "1",
    name: "Design Homepage",
    status: "todo",
    description: "Create the initial design for the homepage.",
  },
  {
    id: "2",
    name: "Develop Login Feature",
    status: "in-progress",
    description: "Implement the login feature with authentication.",
  },
  {
    id: "3",
    name: "Write Unit Tests",
    status: "completed",
    description: "Write unit tests for the user module.",
  },
  {
    id: "4",
    name: "Setup CI/CD Pipeline",
    status: "todo",
    description: "Setup continuous integration and deployment pipeline.",
  },
  {
    id: "5",
    name: "Fix Bugs",
    status: "in-progress",
    description: "Fix bugs reported by the QA team.",
  },
  {
    id: "6",
    name: "Deploy to Production",
    status: "completed",
    description: "Deploy the latest version to the production environment.",
  },
];

const KanbanView = () => {
  const [tasks, setTasks] = React.useState(rawTasks);

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
      setTasks((prev) => {
        const newTasks = [...prev];
        const task = newTasks.find((t) => t.id === e.active.id);
        if (task) {
          task.status = overId as Task["status"];
        }
        return newTasks;
      });

      toast(`Draggable item was dropped over droppable area ${overId}`);
    }
  };

  return (
    <DndContext onDragOver={onDragOver} onDragEnd={onDragEnd} sensors={sensors}>
      <div className="grid grid-cols-3 gap-6">
        {statuses.map((status) => (
          <DroppableColumn
            key={status}
            id={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanView;
