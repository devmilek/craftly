import { OnboardingForm } from "@/app/(auth)/onboarding/_components/forms/schema";
import { OnboardingStep } from "@/app/(auth)/onboarding/_components/stepper";
import { create } from "zustand";

interface OnboardingStore {
  // State
  currentStep: OnboardingStep;
  data: OnboardingForm;

  // Actions
  setStep: (step: OnboardingStep) => void;
  setData: (data: Partial<OnboardingForm>) => void;
  reset: () => void;
}

const initialData: OnboardingForm = {
  name: "",
  email: "",
  organizationName: "",
  organizationSlug: "",
  addSampleData: false,
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  // Initial state
  currentStep: "profile",
  data: initialData,

  // Actions
  setStep: (step) => set({ currentStep: step }),

  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),

  reset: () =>
    set({
      currentStep: "profile",
      data: initialData,
    }),
}));
