"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ProjectsListView from "./list-view";
import { getProjects } from "../actions";
import { FolderX, Loader2Icon } from "lucide-react";
import EmptyState from "@/components/ui/empty-state";

const ProjectsView = () => {
  const view = useReadLocalStorage<string>("projects_view", {
    initializeWithValue: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div className="mt-5">
      {isLoading && (
        <div className="flex items-center justify-center h-40 text-muted-foreground">
          <Loader2Icon className="size-5 animate-spin" />
        </div>
      )}
      {data?.length === 0 && !isLoading && (
        <EmptyState
          icon={FolderX}
          title="No projects"
          description="Get started by creating a new project."
        />
      )}
      {view === "kanban" && <div></div>}
      {view === "list" && <ProjectsListView data={data} />}
    </div>
  );
};

export default ProjectsView;
