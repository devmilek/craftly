import React from "react";
import AuthHeader from "../(auth)/_components/auth-header";
import OrganizationsList from "./_components/organizations-list";

const OrganizationsPage = () => {
  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <AuthHeader
        title="Workspaces"
        description="Jump into existing workspace or add a new one"
        className="text-center"
      />
      <OrganizationsList />
    </div>
  );
};

export default OrganizationsPage;
