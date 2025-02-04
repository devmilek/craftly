import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/use-modals-store";
import { cn, formatDateRelative, formatStatus } from "@/lib/utils";
import { TaskPriority, TaskStatus } from "@/types";
import { CheckCheckIcon, FileIcon, FlagIcon, FolderIcon } from "lucide-react";
import React from "react";

export interface TaskCardProps {
  id: string;
  name: string;
  dueDate?: Date | null;
  status: TaskStatus;
  showStatus?: boolean;
  filesCount?: number;
  subtasksCount?: number;

  projectName?: string | null;
  priority?: TaskPriority | null;

  overlay?: boolean;
}

const TaskCard = ({
  id,
  dueDate,
  name,
  subtasksCount,
  filesCount,
  projectName,
  priority,
  status,
  showStatus = true,
  overlay = false,
}: TaskCardProps) => {
  const { onOpen } = useModal("view-task");
  return (
    <div
      className={cn(
        "bg-background border border-dashed rounded-xl hover:bg-accent/40 transition-colors w-full",
        {
          "shadow-lg bg-background/20 dark:bg-background/50 backdrop-blur-md":
            overlay,
        }
      )}
      onClick={() => onOpen({ taskId: id })}
    >
      <div className="p-5">
        {((status && showStatus) || dueDate) && (
          <div className="flex gap-2 mb-3">
            {status && showStatus && (
              <Badge variant="secondary">{formatStatus(status)}</Badge>
            )}
            {dueDate && (
              <Badge
                variant={
                  dueDate < new Date() ? "destructive-outline" : "secondary"
                }
              >
                Due {formatDateRelative(dueDate)}
              </Badge>
            )}
          </div>
        )}
        <h3 className="font-semibold">{name}</h3>
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <div
            className={cn(
              "flex items-center gap-2 text-sm text-muted-foreground",
              {
                "text-priority-low": priority === "low",
                "text-priority-medium": priority === "medium",
                "text-priority-high": priority === "high",
              }
            )}
          >
            <FlagIcon className="size-3" />
            <span className="truncate capitalize">{priority || "none"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCheckIcon className="size-3" />
            <span>{subtasksCount || "0"} Subtasks</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileIcon className="size-3" />
            <span>{filesCount || "0"} Files</span>
          </div>
        </div>
        {/* 
        {(projectName || priority) && (
          <div className="space-y-1 mt-6">
            
          </div>
        )} */}
      </div>
      {projectName && (
        <div className="flex items-center px-5 py-3 border-t gap-2 bg-muted/30 text-sm text-muted-foreground">
          <FolderIcon className="size-4" />
          <span className="truncate">{projectName}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
