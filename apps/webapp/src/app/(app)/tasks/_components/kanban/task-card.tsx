import { Badge } from "@/components/ui/badge";
import { formatStatus } from "@/lib/utils";
import { TaskPriority } from "@/types";
import { format } from "date-fns";
import { CheckCheckIcon, FileIcon, FlagIcon, FolderIcon } from "lucide-react";
import React from "react";

const TaskCard = ({
  dueDate,
  name,
  subtasksCount,
  filesCount,
  projectName,
  priority,
  status,
}: {
  dueDate?: Date | null;
  name: string;
  subtasksCount?: number;
  filesCount?: number;
  projectName?: string | null;
  priority?: TaskPriority | null;
  status?: string;
}) => {
  return (
    <div className="p-5 bg-background border rounded-xl hover:bg-accent/40 transition-colors">
      <div className="flex gap-2">
        {status && <Badge variant="secondary">{formatStatus(status)}</Badge>}
        {dueDate && (
          <Badge variant="secondary">Due {format(dueDate, "PP")}</Badge>
        )}
      </div>
      <h3 className="font-semibold mt-3">{name}</h3>
      <div className="flex items-center gap-4 mt-3">
        {subtasksCount && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCheckIcon className="size-3" />
            <span>{subtasksCount} Subtasks</span>
          </div>
        )}
        {filesCount && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileIcon className="size-3" />
            <span>{filesCount} Files</span>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default TaskCard;
