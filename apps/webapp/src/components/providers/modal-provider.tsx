import React from "react";
import ChangeEmailModal from "../modals/change-email-modal";
import CreateOrganizationModal from "../modals/create-organization-modal";
import CreateProjectModal from "../modals/create-project-modal";
import CreateClientModal from "../modals/create-client-modal";
import CreateContactModal from "../modals/create-contact-modal";
import CreateTaskModal from "../modals/create-task-modal";
import InviteMembersModal from "../modals/invite-members-modal";
import { AlertModal } from "../modals/alert-modal";

const ModalProvider = () => {
  return (
    <>
      <ChangeEmailModal />
      <CreateOrganizationModal />
      <CreateProjectModal />
      <CreateClientModal />
      <CreateContactModal />
      <CreateTaskModal />
      <InviteMembersModal />
      <AlertModal />
    </>
  );
};

export default ModalProvider;
