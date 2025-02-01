"use client";

import AuthHeader from "@/app/(auth)/_components/auth-header";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/hooks/use-onboarding-form";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

const ThemeForm = () => {
  const { setTheme, theme } = useTheme();
  const { setStep } = useOnboardingStore();
  return (
    <div>
      <AuthHeader
        title="Choose your theme"
        description="Select the theme for the application. You’ll be able to change this
        later."
        showLogo={false}
      />
      <div className="grid grid-cols-3 gap-4">
        <div
          className={cn(
            "aspect-[4/3] border rounded-xl bg-gray-100 relative pl-6 pt-6 overflow-hidden group",
            {
              "border-primary ring-4 ring-primary/20": theme === "light",
            }
          )}
          onClick={() => {
            setTheme("light");
          }}
        >
          <div className="rounded-tl-lg bg-white text-black border-zinc-200 size-full border-t border-l p-2 font-medium group-hover:scale-110 transition">
            Aa
          </div>
        </div>
        <div
          className={cn(
            "aspect-[4/3] border rounded-xl bg-zinc-800 relative pl-6 pt-6 overflow-hidden group",
            {
              "border-primary ring-4 ring-primary/20": theme === "dark",
            }
          )}
          onClick={() => {
            setTheme("dark");
          }}
        >
          <div className="rounded-tl-lg bg-zinc-900 text-white border-zinc-700 size-full border-t border-l p-2 font-medium group-hover:scale-110 transition">
            Aa
          </div>
        </div>
        {/* SYSTEm */}
        <div
          className={cn(
            "aspect-[4/3] border rounded-xl relative overflow-hidden group grid grid-cols-2",
            {
              "border-primary ring-4 ring-primary/20": theme === "system",
            }
          )}
          onClick={() => {
            setTheme("system");
          }}
        >
          <div className="aspect-[4/3] border bg-gray-100 relative pl-6 pt-6 overflow-hidden group h-full w-full">
            <div className="rounded-tl-lg bg-white text-black border-zinc-200 size-full border-t border-l p-2 font-medium group-hover:scale-110 transition">
              Aa
            </div>
          </div>
          <div className="aspect-[4/3] border bg-zinc-800 relative pl-6 pt-6 overflow-hidden group h-full">
            <div className="rounded-tl-lg bg-zinc-900 text-white border-zinc-700 size-full border-t border-l p-2 font-medium group-hover:scale-110 transition">
              Aa
            </div>
          </div>
        </div>
      </div>
      <Button onClick={() => setStep("organization")} className="mt-4 w-full">
        Continue
      </Button>
    </div>
  );
};

export default ThemeForm;
