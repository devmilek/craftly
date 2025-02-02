import React from "react";
import InvoicesView from "./_components/invoices-view";

const ProjectInvoicesPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  return (
    <div className="py-6">
      <InvoicesView projectId={projectId} />
    </div>
  );
};

export default ProjectInvoicesPage;
