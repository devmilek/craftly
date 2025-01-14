"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import ProjectsListView from "./list-view";
import { getProjects } from "../actions";
import { Loader2Icon } from "lucide-react";

const ProjectsView = () => {
  const view = useReadLocalStorage<string>("projects_view", {
    initializeWithValue: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center h-40 text-muted-foreground">
          <Loader2Icon className="size-5 animate-spin" />
        </div>
      )}
      {view === "kanban" && <div>Kanban view</div>}
      {view === "list" && <ProjectsListView data={data} />}
    </div>
  );
};

export default ProjectsView;
