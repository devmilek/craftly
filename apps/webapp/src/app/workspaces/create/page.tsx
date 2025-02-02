import AuthHeader from "@/app/(auth)/_components/auth-header";
import React from "react";
import { CreateOrganizationForm } from "./_components/create-organization-form";

const CreateOrganizationPage = () => {
  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <AuthHeader
        title="Create Organization"
        description="Jump into existing organization or add a new one"
        className="text-center"
      />
      <CreateOrganizationForm />
    </div>
  );
};

export default CreateOrganizationPage;
