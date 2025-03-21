import { AppSidebar } from "@/components/global/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import React from "react";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user, session } = await getCurrentSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (!user.onboardingCompleted) {
    redirect("/onboarding");
  }

  if (!session.activeOrganizationId) {
    redirect("/workspaces");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="w-full px-8">{children}</main>
    </SidebarProvider>
  );
};

export default AppLayout;
