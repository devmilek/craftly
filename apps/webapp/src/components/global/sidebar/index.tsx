import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { User } from "better-auth";
import { TeamSwitcher } from "./team-switcher";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCurrentSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

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
        <NavMain />
        <NavProjects />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
