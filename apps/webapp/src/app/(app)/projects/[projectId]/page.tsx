import React from "react";

const ProjectDetailsScreen = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return (
    <div>
      <div>ProjectDetailsScreen</div>
      <div>{projectId}</div>
    </div>
  );
};

export default ProjectDetailsScreen;
