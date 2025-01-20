"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { FolderX, Loader2Icon } from "lucide-react";
import EmptyState from "@/components/ui/empty-state";
import { getTasks } from "@/app/(app)/tasks/actions";
import KanbanView from "./kanban";

const TaskView = () => {
  const view = useReadLocalStorage<string>("projects_view", {
    initializeWithValue: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getTasks,
  });

  return (
    <div className="mt-5">
      {isLoading && (
        <div className="flex items-center justify-center h-40 text-muted-foreground">
          <Loader2Icon className="size-5 animate-spin" />
        </div>
      )}
      {JSON.stringify(data)}
      {data?.length === 0 && !isLoading && (
        <EmptyState
          icon={FolderX}
          title="No projects"
          description="Get started by creating a new project."
        />
      )}
      {view === "kanban" && <KanbanView tasks={data} />}
      {/* {view === "list" && <ProjectsListView data={data} />} */}
    </div>
  );
};

export default TaskView;
