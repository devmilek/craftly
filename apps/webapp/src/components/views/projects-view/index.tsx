"use client";

import ListView from "@/components/views/projects-view/list-view";
import EmptyState from "@/components/ui/empty-state";
import { useQuery } from "@tanstack/react-query";
import { FolderX, Loader2Icon } from "lucide-react";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import Header from "./header";
import { getProjects } from "./actions";
import Kanban from "./kanban";

const ProjectsView = () => {
  const view = useReadLocalStorage<string>("projects_view", {
    initializeWithValue: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <>
      <Header />
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
        {view === "kanban" && <Kanban />}
        {view === "list" && <ListView data={data} />}
      </div>
    </>
  );
};

export default ProjectsView;
