import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, formatStatus, getInitials } from "@/lib/utils";
import { ProjectStatus } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import ProjectCardDropdown from "./project-card-dropdown";

export interface ProjectCardProps {
  id: string;
  name: string;
  dueDate: Date | null;
  status: ProjectStatus;
  showStatus?: boolean;
  tasksCount?: number | null;
  tasksCompleted?: number | null;

  // CLIENT
  clientName?: string | null;
  clientId?: string | null;

  overlay?: boolean;
}

const ProjectCard = ({
  id,
  name,
  dueDate,
  status,
  tasksCompleted,
  tasksCount,
  clientName,
  showStatus = true,
  overlay = false,
}: ProjectCardProps) => {
  const progress =
    tasksCount && tasksCompleted ? (tasksCompleted / tasksCount) * 100 : 0;
  return (
    <Link
      href={`/projects/${id}`}
      className={cn(
        "rounded-2xl border border-dashed bg-background block overflow-hidden relative",
        {
          "shadow-lg bg-background/50 backdrop-blur-md": overlay,
        }
      )}
    >
      <ProjectCardDropdown projectId={id} />
      <div className="p-5">
        {(dueDate || (status && showStatus)) && (
          <div className="flex gap-2 flex-wrap mb-4">
            {dueDate && (
              <Badge
                variant={
                  dueDate > new Date() ? "outline" : "destructive-outline"
                }
              >
                {format(dueDate, "MMM dd")}
              </Badge>
            )}
            {status && showStatus && (
              <Badge variant="secondary">{formatStatus(status)}</Badge>
            )}
          </div>
        )}
        <h3 className="font-semibold">{name}</h3>

        <Progress value={progress} className="mt-4" />
        <div className="flex mt-2">
          <p className="text-sm text-muted-foreground">
            {tasksCount ? (
              <>
                {tasksCompleted} / {tasksCount} tasks done
              </>
            ) : (
              "No tasks"
            )}
          </p>
        </div>
      </div>
      {clientName && (
        <div className="flex items-center px-5 py-3 border-t gap-2 bg-muted/30">
          <Avatar className="size-5">
            <AvatarFallback className="text-[10px]">
              {getInitials(clientName)}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground line-clamp-1 w-full">
            {clientName}
          </p>
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
