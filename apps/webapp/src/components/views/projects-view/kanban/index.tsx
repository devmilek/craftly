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
import React, { useState } from "react";
import Column from "./column";
import ProjectCard, { ProjectCardProps } from "@/components/cards/project-card";
import { ProjectStatus } from "@/types";

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

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active.data) return;

    setActiveProject(active.data.current as KanbanProject);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const currentProject = active.data.current as KanbanProject;
    const targetStatus = over?.id as ProjectStatus;

    if (!targetStatus) return;
    if (!currentProject) return;

    console.log(`Moved project ${currentProject.name} to ${targetStatus}`);

    setActiveProject(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="grid">
        <div className="flex overflow-y-auto gap-4">
          {projectStatus.map((status) => (
            <Column key={status} status={status} />
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
