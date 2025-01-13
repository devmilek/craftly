import React from "react";

const TaskDetailsScreen = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const taskId = (await params).taskId;

  return (
    <div>
      <div>TaskDetailsScreen</div>
      <div>{taskId}</div>
    </div>
  );
};

export default TaskDetailsScreen;
