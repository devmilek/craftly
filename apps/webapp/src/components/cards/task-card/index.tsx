import { Badge } from "@/components/ui/badge";
import { cn, formatStatus } from "@/lib/utils";
import { TaskPriority, TaskStatus } from "@/types";
import { format } from "date-fns";
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

  // CLIENT
  clientName?: string | null;
  clientId?: string | null;

  overlay?: boolean;
}

const TaskCard = ({
  dueDate,
  name,
  subtasksCount,
  filesCount,
  projectName,
  priority,
  status,
  overlay = false,
}: TaskCardProps) => {
  return (
    <div
      className={cn(
        "p-5 bg-background border rounded-xl hover:bg-accent/40 transition-colors",
        {
          "shadow-lg bg-background/50 backdrop-blur-md": overlay,
        }
      )}
    >
      {(status || dueDate) && (
        <div className="flex gap-2 mb-3">
          {status && <Badge variant="secondary">{formatStatus(status)}</Badge>}
          {dueDate && (
            <Badge variant="secondary">Due {format(dueDate, "PP")}</Badge>
          )}
        </div>
      )}
      <h3 className="font-semibold">{name}</h3>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCheckIcon className="size-3" />
          <span>{subtasksCount || "0"} Subtasks</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileIcon className="size-3" />
          <span>{filesCount || "0"} Files</span>
        </div>
      </div>

      {(projectName || priority) && (
        <div className="space-y-1 mt-6">
          {projectName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderIcon className="size-4" />
              <span className="truncate">{projectName}</span>
            </div>
          )}

          {priority && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FlagIcon className="size-4" />
              <span className="truncate capitalize">{priority}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
