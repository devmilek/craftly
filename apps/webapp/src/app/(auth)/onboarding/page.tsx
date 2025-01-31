import React from "react";
import Stepper from "./_components/stepper";
import { getCurrentSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.onboardingCompleted) {
    redirect("/");
  }

  return (
    <div className="flex items-center flex-col justify-center size-full">
      <div className="max-w-md w-full">
        <Stepper email={user.email} name={user.name} />
      </div>
    </div>
  );
};

export default OnboardingPage;
