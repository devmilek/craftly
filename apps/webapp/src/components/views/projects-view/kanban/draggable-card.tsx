import ProjectCard from "@/components/cards/project-card";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { KanbanProject } from ".";
import { cn } from "@/lib/utils";

const DraggableCard = ({ project }: { project: KanbanProject }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: project.id,
    data: project,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn({
        "opacity-50": isDragging,
      })}
    >
      <ProjectCard {...project} showStatus={false} />
    </div>
  );
};

export default DraggableCard;
