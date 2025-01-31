import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarUserButton } from "./sidebar-user-button";
import { User } from "better-auth";
import { TeamSwitcher } from "./workspace-switcher";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCurrentSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import SidebarNav from "./sidebar-nav";

export async function AppSidebar({
  user,
  ...props
}: {
  user: User;
} & React.ComponentProps<typeof Sidebar>) {
  const { session } = await getCurrentSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (!session.activeOrganizationId) {
    redirect("/auth/select-organization");
  }

  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  });

  const org = orgs.find((o) => o.id === session.activeOrganizationId);

  if (!org) {
    redirect("/auth/select-organization");
  }

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher organizations={orgs} activeOrganization={org} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserButton user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
