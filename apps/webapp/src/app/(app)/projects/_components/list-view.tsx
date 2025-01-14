import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Client, Project } from "@/lib/db/schemas";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckCheck, ChevronRight } from "lucide-react";
import React from "react";
import ProjectStatusDropdown from "./project-status-dropdown";
import Link from "next/link";

type ProjectData = Project & {
  client: Client | null;
};

const ProjectsListView = ({ data }: { data: ProjectData[] | undefined }) => {
  return (
    <div>
      {data?.map((project) => (
        <article
          key={project.id}
          className="py-8 border-b flex items-center gap-4"
        >
          <div className="flex-1">
            <Link
              href={`/projects/` + project.id}
              className="font-semibold hover:underline"
            >
              {project.name}
            </Link>
            <div className="flex gap-3 flex-wrap mt-2">
              {/* CLIENT INDICATOR */}
              {project.client && (
                <Link
                  href={`/clients/` + project.client.id}
                  className="flex items-center gap-2 group"
                >
                  <div className="leading-none text-xs uppercase size-5 rounded bg-accent text-foreground flex items-center justify-center">
                    {getInitials(project.client.name)}
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:underline">
                    {project.client.name}
                  </p>
                </Link>
              )}
              {/* DUE DATE */}
              {project.dueDate && (
                <Badge variant="outline" className="rounded-full">
                  <CalendarIcon className="size-3 mr-2" />
                  Due: {format(project.dueDate, "PP")}
                </Badge>
              )}
              <Badge variant="outline" className="rounded-full">
                <CheckCheck className="size-3 mr-2" />
                No tasks assigned
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
            <Button
              size="icon"
              variant="ghost"
              className="flex-shrink-0"
              asChild
            >
              <Link href={`/projects/` + project.id}>
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProjectsListView;
