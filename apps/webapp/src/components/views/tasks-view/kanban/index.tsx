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
import { Column } from "./column";
import { taskStatus } from "@/lib/db/schemas";
import { TaskStatus } from "@/types";
import { queryClient } from "@/components/providers/query-provider";
import { InfiniteData } from "@tanstack/react-query";
import { formatStatus } from "@/lib/utils";
import { setTaskStatus } from "@/app/(app)/tasks/actions";
import TaskCard, { TaskCardProps } from "@/components/cards/task-card";

type TaskInfiniteQueryData = InfiniteData<TaskCardProps[]>;

const KanbanView = ({
  projectId,
  membersIds,
}: {
  projectId?: string;
  membersIds?: string[];
}) => {
  const [activeTask, setActiveTask] = React.useState<TaskCardProps | null>(
    null
  );
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  });

  const sensors = useSensors(mouseSensor);

  const onDragStart = (e: DragStartEvent) => {
    const task = e.active.data.current as TaskCardProps;

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
      <div className="grid">
        <div className="flex gap-6 overflow-x-auto">
          {taskStatus.map((status) => (
            <Column
              key={status}
              id={status}
              status={status}
              projectId={projectId}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask && <TaskCard {...activeTask} overlay showStatus={false} />}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanView;
