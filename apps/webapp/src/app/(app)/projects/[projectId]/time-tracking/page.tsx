import TimeTrackingView from "@/components/views/time-tracking-view";
import React from "react";

const TimeTrackingPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  return (
    <div className="mt-8">
      <TimeTrackingView projectId={projectId} />
    </div>
  );
};

export default TimeTrackingPage;
