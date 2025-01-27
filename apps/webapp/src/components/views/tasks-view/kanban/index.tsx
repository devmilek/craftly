"use client";

import React from "react";
import {
  DndContext,
  DragEndEvent,
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
import { TaskStatus } from "@/types";
import { queryClient } from "@/components/providers/query-provider";
import { InfiniteData } from "@tanstack/react-query";
import { formatStatus } from "@/lib/utils";
import { setTaskStatus } from "@/app/(app)/tasks/actions";

export type KanbanTask = Task & {
  projectName: string | null;
};

type TaskInfiniteQueryData = InfiniteData<KanbanTask[]>;

const KanbanView = ({ projectId }: { projectId?: string }) => {
  const [activeTask, setActiveTask] = React.useState<KanbanTask | null>(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  });

  const sensors = useSensors(mouseSensor);

  const onDragStart = (e: DragStartEvent) => {
    const task = e.active.data.current as KanbanTask;

    if (task) {
      setActiveTask(task);
    }
  };

  const onDragEnd = async (e: DragEndEvent) => {
    const overId = e.over?.id;
    if (overId) {
      const taskId = String(e.active.id);
      const status = overId as TaskStatus;
      const previousStatus = activeTask?.status;
      const task = activeTask;
      setActiveTask(null);

      if (previousStatus === status) return;

      if (!task) {
        return;
      }

      const previousQueryData = queryClient.getQueryData<TaskInfiniteQueryData>(
        ["tasks", previousStatus, projectId]
      );
      const queryData = queryClient.getQueryData<TaskInfiniteQueryData>([
        "tasks",
        status,
        projectId,
      ]);

      toast.promise(
        (async () => {
          // Update optimistic UI first
          if (previousQueryData) {
            queryClient.setQueryData<TaskInfiniteQueryData>(
              ["tasks", previousStatus, projectId],
              {
                pages: previousQueryData.pages.map((page) =>
                  page.filter((t) => t.id !== taskId)
                ),
                pageParams: previousQueryData.pageParams,
              }
            );
          }

          if (queryData) {
            queryClient.setQueryData<TaskInfiniteQueryData>(
              ["tasks", status, projectId],
              {
                pages: queryData.pages.map((page, index) =>
                  index === 0 ? [{ ...task, status }, ...page] : page
                ),
                pageParams: queryData.pageParams,
              }
            );
          }

          // Perform actual updates

          try {
            await setTaskStatus(taskId, status);
          } catch {
            console.error("Failed to move task");
            await Promise.all([
              queryClient.invalidateQueries({
                queryKey: ["tasks", status, projectId],
              }),
              previousStatus &&
                queryClient.invalidateQueries({
                  queryKey: ["tasks", previousStatus, projectId],
                }),
            ]);
            throw new Error("Failed to move task");
          }
        })(),
        {
          loading: `Moving task to ${formatStatus(status)}...`,
          success: `Task moved to ${formatStatus(status)} successfully`,
          error: "Failed to move task",
        }
      );
    }
  };

  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={sensors}
      autoScroll={false}
    >
      <div className="grid grid-cols-3 gap-6">
        {taskStatus.map((status) => (
          <DroppableColumn
            key={status}
            id={status}
            status={status}
            projectId={projectId}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          <TaskCard
            name={activeTask.name}
            dueDate={activeTask.dueDate}
            priority={activeTask.priority}
            projectName={activeTask.projectName}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanView;
