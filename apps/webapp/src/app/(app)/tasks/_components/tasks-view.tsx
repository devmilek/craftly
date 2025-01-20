"use client";

import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import KanbanView from "./kanban";

const TaskView = () => {
  const view = useReadLocalStorage<string>("tasks_view", {
    initializeWithValue: false,
  });

  return (
    <div className="mt-5">
      {/* {isLoading && (
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
      )} */}
      {view === "kanban" && <KanbanView />}
      {/* {view === "list" && <ProjectsListView data={data} />} */}
    </div>
  );
};

export default TaskView;
