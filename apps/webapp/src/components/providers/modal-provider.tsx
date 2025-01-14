import React from "react";
import ChangeEmailModal from "../modals/change-email-modal";
import CreateOrganizationModal from "../modals/create-organization-modal";
import CreateProjectModal from "../modals/create-project-modal";
import CreateClientModal from "../modals/create-client-modal";

const ModalProvider = () => {
  return (
    <>
      <ChangeEmailModal />
      <CreateOrganizationModal />
      <CreateProjectModal />
      <CreateClientModal />
    </>
  );
};

export default ModalProvider;
