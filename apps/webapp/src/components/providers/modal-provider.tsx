import React from "react";
import ChangeEmailModal from "../modals/change-email-modal";
import CreateOrganizationModal from "../modals/create-organization-modal";
import CreateProjectModal from "../modals/create-project-modal";
import CreateClientModal from "../modals/create-client-modal";
import CreateContactModal from "../modals/create-contact-modal";
import ViewTaskModal from "../modals/view-task-modal";
import InviteMembersModal from "../modals/invite-members-modal";
import { AlertModal } from "../modals/alert-modal";
import UploadFileModal from "../modals/upload-file-modal";
import CreateTaskModal from "../modals/create-task-modal";

const ModalProvider = () => {
  return (
    <>
      <ChangeEmailModal />
      <CreateOrganizationModal />
      <CreateProjectModal />
      <CreateClientModal />
      <CreateContactModal />
      <ViewTaskModal />
      <InviteMembersModal />
      <AlertModal />
      <UploadFileModal />
      <CreateTaskModal />
    </>
  );
};

export default ModalProvider;
