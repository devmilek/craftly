import OnboardingOrganizationForm from "@/components/forms/onboarding-organization-form";
import { Icons } from "@/components/global/icons";
import { getCurrentSession } from "@/lib/auth/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-white rounded-xl border-b">
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
      <div className="text-center py-4 text-sm text-muted-foreground">
        You remember your password?{" "}
        <Link href="/sign-up" className="text-primary font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default OnboardingPage;
