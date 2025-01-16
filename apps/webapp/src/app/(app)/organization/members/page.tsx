import MembersForm from "@/components/forms/members-form";
import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { AnnotatedSection } from "@/components/ui/annotated";
import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import React from "react";

const OrganizationMembersPage = async () => {
  const { organizationId } = await ensureSessionWithOrganization();
  return (
    <>
      <SidebarNavbar
        items={[
          { label: "Organization", href: "/organization" },
          { label: "Members" },
        ]}
      />
      <AnnotatedSection
        title="Members"
        description="Manage and invite your colleagues."
      >
        <MembersForm organizationId={organizationId} />
      </AnnotatedSection>
    </>
  );
};

export default OrganizationMembersPage;
