import DeleteAccountForm from "@/components/forms/delete-account-form";
import PersonalDetailsForm from "@/components/forms/personal-details-form";
import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { AnnotatedSection } from "@/components/ui/annotated";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Settings = () => {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Settings",
          },
        ]}
      />
      <div className="px-4 space-y-16 pb-10">
        <AnnotatedSection
          title="Personal details"
          description="Set your name and contact information, the email address entered here is used for your login access."
        >
          <PersonalDetailsForm />
        </AnnotatedSection>
        <Separator />
        <AnnotatedSection
          title="Danger zone"
          description="Delete your account and all associated data."
        >
          <DeleteAccountForm />
        </AnnotatedSection>
      </div>
    </>
  );
};

export default Settings;
