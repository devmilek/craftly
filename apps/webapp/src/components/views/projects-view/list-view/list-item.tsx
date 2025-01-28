import { ProjectCardProps } from "@/components/cards/project-card";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProjectStatusDropdown from "../project-status-dropdown";
import { Button } from "@/components/ui/button";

const ListItem = (project: ProjectCardProps) => {
  return (
    <article key={project.id} className="py-8 border-b flex items-center gap-4">
      <div className="flex-1">
        <Link
          href={`/projects/` + project.id}
          className="font-semibold hover:underline"
        >
          {project.name}
        </Link>
        <div className="flex gap-3 flex-wrap mt-2">
          {/* CLIENT INDICATOR */}
          {project.clientName && (
            <Link
              href={`/clients/` + project.clientId}
              className="flex items-center gap-2 group"
            >
              <div className="leading-none text-xs uppercase size-5 rounded bg-accent text-foreground flex items-center justify-center">
                {getInitials(project.clientName)}
              </div>
              <p className="text-sm text-muted-foreground group-hover:underline">
                {project.clientName}
              </p>
            </Link>
          )}
          {/* DUE DATE */}
          {project.dueDate && (
            <Badge
              variant={
                project.dueDate > new Date() ? "outline" : "destructive-outline"
              }
              className="rounded-full"
            >
              <CalendarIcon className="size-3 mr-2" />
              Due: {format(project.dueDate, "PP")}
            </Badge>
          )}
          <Badge variant="outline" className="rounded-full">
            <CheckCheck className="size-3 mr-2" />
            {project.tasksCount && project.tasksCount > 0 ? (
              <>
                {project.tasksCompleted} / {project.tasksCount} tasks done
              </>
            ) : (
              <>No tasks assigned</>
            )}
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        {project.status && (
          <ProjectStatusDropdown
            status={project.status}
            projectId={project.id}
          />
        )}
        <Button size="icon" variant="ghost" className="flex-shrink-0" asChild>
          <Link href={`/projects/` + project.id}>
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default ListItem;
