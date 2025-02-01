import MembersForm from "@/components/forms/members-form";
import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { AnnotatedSection } from "@/components/ui/annotated";
import { Separator } from "@/components/ui/separator";
import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import React from "react";
import InvitationsCard from "./_components/invitations-card";

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
      <div className="space-y-16">
        <AnnotatedSection
          title="Members"
          description="Manage and invite your colleagues."
        >
          <MembersForm organizationId={organizationId} />
        </AnnotatedSection>
        <Separator />
        <AnnotatedSection
          title="Invitations"
          description="Manage invitations of users who haven't accepted yet."
        >
          <InvitationsCard />
        </AnnotatedSection>
      </div>
    </>
  );
};

export default OrganizationMembersPage;
