import { AppSidebar } from "@/components/global/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import React from "react";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <SidebarProvider className="">
      <AppSidebar user={user} />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};

export default AppLayout;
