import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import SelectOrganizationFeed from "./_components/select-organization-feed";
import { Icons } from "@/components/global/icons";
import { getCurrentSession } from "@/lib/auth/utils";

const SelectOrganizationPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/sign-in");
  }

  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  });

  if (orgs.length === 0) {
    redirect("/auth/create-organization");
  }

  return (
    <div className="max-w-md w-full shadow-lg bg-accent rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-background">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Select an organization</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Choose an organization to continue
          </p>
        </header>
        <SelectOrganizationFeed orgs={orgs} />
      </div>
    </div>
  );
};

export default SelectOrganizationPage;
