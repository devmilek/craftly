"use client";

import { projectStatus } from "@/lib/db/schemas";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useCallback, useState } from "react";
import Column from "./column";
import ProjectCard, { ProjectCardProps } from "@/components/cards/project-card";
import { ProjectStatus } from "@/types";
import { queryClient } from "@/components/providers/query-provider";
import { InfiniteData } from "@tanstack/react-query";
import { KanbanTask } from "../../tasks-view/kanban";
import { useSearchParams } from "next/navigation";
import { updateProjectStatus } from "../actions";
import { toast } from "sonner";

export type KanbanProject = ProjectCardProps;

const Kanban = () => {
  const [activeProject, setActiveProject] = useState<KanbanProject | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active.data) return;

    setActiveProject(active.data.current as KanbanProject);
  };

  const onDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const currentProject = active.data.current as KanbanProject;
      const targetStatus = over?.id as ProjectStatus;

      setActiveProject(null);

      if (!targetStatus) return;
      if (!currentProject) return;

      const previousStatus = currentProject.status;
      if (previousStatus === targetStatus) return;

      // Move project to new status
      const previousStatusData = queryClient.getQueryData<
        InfiniteData<KanbanTask[]>
      >(query ? ["tasks", previousStatus, query] : ["tasks", previousStatus]);

      const targetStatusData = queryClient.getQueryData<
        InfiniteData<KanbanTask[]>
      >(query ? ["tasks", targetStatus, query] : ["tasks", targetStatus]);

      if (previousStatusData) {
        queryClient.setQueryData(["tasks", previousStatus], {
          pages: previousStatusData.pages.map((page) =>
            page.filter((task) => task.id !== currentProject.id)
          ),
          pageParams: previousStatusData.pageParams,
        });
      }

      if (targetStatusData) {
        queryClient.setQueryData(["tasks", targetStatus], {
          pages: targetStatusData.pages.map((page) => [
            { ...currentProject, status: targetStatus },
            ...page,
          ]),
          pageParams: targetStatusData.pageParams,
        });
      }

      toast.promise(
        updateProjectStatus({
          status: targetStatus,
          projectId: currentProject.id,
        }),
        {
          loading: "Updating project status...",
          success: "Project status updated",
          error: "Failed to update project status",
        }
      );
    },
    [query]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="grid">
        <div className="flex overflow-y-auto gap-4">
          {projectStatus.map((status) => (
            <Column key={status} status={status} query={query} />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeProject ? (
          <ProjectCard {...activeProject} overlay showStatus={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Kanban;
