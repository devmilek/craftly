import TasksView from "@/components/views/tasks-view";
import React from "react";

const ProjectTasksPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return (
    <div className="pt-10">
      <TasksView projectId={projectId} />
    </div>
  );
};

export default ProjectTasksPage;
