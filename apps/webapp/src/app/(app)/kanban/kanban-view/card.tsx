import { cn, formatDateRelative } from "@/lib/utils";
import { TaskPriority } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CalendarIcon, FlagIcon, FolderIcon, WorkflowIcon } from "lucide-react";
import React from "react";

export interface TaskCardTask {
  id: string;
  name: string;
  status: string;
  priority?: TaskPriority | null;
  dueDate?: Date | null;
  projectId?: string | null;
  projectName?: string | null;
  assigneeId?: string | null;
  assigneeName?: string | null;
  assigneeImage?: string | null;
  subtasksCount?: number | null;
  doneSubtasksCount?: number | null;
}

export interface TaskCardProps {
  task: TaskCardTask;
  overlay?: boolean;
}

const Card = ({ task, overlay }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      {...(!overlay && listeners)}
      {...(!overlay && attributes)}
      className={cn(
        "rounded-xl border border-dashed overflow-hidden grid bg-background",
        {
          "bg-background/50 backdrop-blur-sm": overlay,
          "opacity-50": !overlay && isDragging,
        }
      )}
    >
      <div className="p-5">
        <h2 className="font-semibold">{task.name}</h2>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-muted-foreground">
          {(task.subtasksCount || 0) > 0 &&
            (task.doneSubtasksCount || 0) > 0 && (
              <div className="flex items-center space-x-2 text-xs">
                <WorkflowIcon className="size-3" />
                <span>
                  {task.doneSubtasksCount}/{task.subtasksCount}
                </span>
              </div>
            )}
          {task.dueDate && (
            <div
              className={cn("flex items-center space-x-2 text-xs", {
                "text-destructive": task.dueDate < new Date(),
              })}
            >
              <CalendarIcon className="size-3" />
              <span>{formatDateRelative(task.dueDate)}</span>
            </div>
          )}
          {task.priority && (
            <div
              className={cn("flex items-center space-x-2 text-xs", {
                "text-priority-low": task.priority === "low",
                "text-priority-medium": task.priority === "medium",
                "text-priority-high": task.priority === "high",
              })}
            >
              <FlagIcon className="size-3" />
              <span className="capitalize">{task.priority}</span>
            </div>
          )}
        </div>
      </div>
      {task.projectName && (
        <div className="px-5 py-3 flex gap-2 items-center text-xs bg-accent/50 min-w-0 max-w-full text-muted-foreground">
          <FolderIcon className="size-3 flex-shrink-0" />
          <span className="flex-1 truncate">{task.projectName}</span>
        </div>
      )}
    </div>
  );
};

export default Card;
