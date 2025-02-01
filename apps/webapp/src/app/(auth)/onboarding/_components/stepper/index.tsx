"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ProfileForm } from "../forms/profile-form";
import ThemeForm from "../forms/theme-form";
import { useOnboardingStore } from "@/hooks/use-onboarding-form";
import { OrganizationForm } from "../forms/organization-form";

const steps = ["profile", "theme", "organization"] as const;
export type OnboardingStep = (typeof steps)[number];

const Stepper = ({ email, name }: { email: string; name: string }) => {
  const { currentStep, setStep } = useOnboardingStore();
  const displayForm = () => {
    switch (currentStep) {
      case "profile":
        return <ProfileForm email={email} name={name} />;
      case "theme":
        return <ThemeForm />;
      case "organization":
        return <OrganizationForm name={name} />;
    }
  };
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Step {steps.indexOf(currentStep) + 1} of {steps.length}
      </p>
      <div className="grid grid-cols-3 gap-2 mt-2 mb-5">
        {steps.map((step, index) => (
          <div
            onClick={() => setStep(step)}
            key={index}
            className={cn("h-1 rounded-xl bg-muted cursor-pointer", {
              "bg-primary":
                step === currentStep ||
                (steps.indexOf(currentStep) === 1 && index <= 1) ||
                (steps.indexOf(currentStep) === 2 && index <= 2),
            })}
          />
        ))}
      </div>
      {displayForm()}
    </div>
  );
};

export default Stepper;
