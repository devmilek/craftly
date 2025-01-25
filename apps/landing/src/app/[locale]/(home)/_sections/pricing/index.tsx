import React from "react";
import SectionHeader from "../section-header";
import {
  ArrowRight,
  Check,
  Cube,
  Diamond,
  Square,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const plans = [
  {
    icon: Square,
    key: "starter_plan",
  },
  {
    icon: Cube,
    key: "pro_plan",
  },
  {
    icon: Diamond,
    key: "business_plan",
  },
] as const;

const Pricing = () => {
  const t = useTranslations("pricing");
  return (
    <section className="section">
      <SectionHeader
        className="text-center"
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <div className="grid grid-cols-3 gap-6 mt-12">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={cn("p-7 border rounded-3xl", {
              "bg-muted/50": i === 1,
            })}
          >
            <div className="flex items-center justify-between">
              <plan.icon className="size-12" weight="light" />
              <div className="text-end">
                <p className="font-bold text-2xl">
                  ${t(`plans.${plan.key}.price`)}
                </p>
                <p className="text-sm text-muted-foreground">
                  / {t(`per_organization_per_month`)}
                </p>
              </div>
            </div>
            <h3 className="mt-8 flex flex-wrap gap-2">
              <span className="font-semibold">
                {t(`plans.${plan.key}.title`)}
                {"  "}
              </span>
              <span className="text-xs bg-lime-200 py-1 px-2 rounded-lg">
                {t(`plans.${plan.key}.badge`)}
              </span>
            </h3>
            <p className="text-muted-foreground text-sm mt-4 h-16">
              {t(`plans.${plan.key}.description`)}
            </p>
            <button
              className={cn(
                "flex items-center group gap-2 mt-6 w-full border hover:bg-muted transition-colors bg-muted/50 justify-center rounded-2xl p-3 font-medium",
                {
                  "bg-foreground text-background border-background hover:bg-foreground/90":
                    i == 1,
                }
              )}
            >
              {t("get_started")}{" "}
              <ArrowRight
                className="size-4 group-hover:translate-x-2 transition-transform"
                weight="light"
              />
            </button>
            <div className="grid gap-4 mt-8">
              {t(`plans.${plan.key}.features`)
                .split(",")
                .map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="p-1 rounded bg-lime-200">
                      <Check className="size-3" weight="light" />
                    </div>
                    <span className="leading-none">{feature}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
