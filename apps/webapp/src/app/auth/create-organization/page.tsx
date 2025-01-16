import OnboardingOrganizationForm from "@/components/forms/onboarding-organization-form";
import { Icons } from "@/components/global/icons";
import { auth } from "@/lib/auth";
import { getCurrentSession } from "@/lib/auth/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const CreateOrganizationPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    return redirect("/sign-in");
  }

  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  });

  if (orgs.length > 0) {
    return redirect("/auth/select-organization");
  }

  return (
    <div className="max-w-md w-full shadow-lg bg-accent rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-background rounded-xl">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Organization details</h1>
          <p className="text-muted-foreground text-sm mt-1">
            We just need some basic info to get your organization set up. You’ll
            be able to edit this later.
          </p>
        </header>
        <OnboardingOrganizationForm name={user?.name || ""} />
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
