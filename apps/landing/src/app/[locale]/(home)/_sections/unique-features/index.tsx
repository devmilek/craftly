"use client";

import React from "react";
import SectionHeader from "../section-header";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

const items = [
  {
    key: "effortless_client_management",
  },
  {
    key: "seamless_project_tracking",
  },
  {
    key: "automated_invoicing",
  },
  {
    key: "smart_expense_tracking",
  },
  {
    key: "ai_powered_assistance",
  },
] as const;

const UniqueFeatures = () => {
  const t = useTranslations("unique_features");
  return (
    <section className="section">
      <SectionHeader
        className="text-center"
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <div className="grid lg:grid-cols-3 gap-5 mt-12">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "rounded-3xl bg-muted/30 border p-5 flex flex-col max-w-[500px] md:max-w-none md:w-full mx-auto",
              {
                "lg:col-span-2": i === 1,
                "md:col-span-2 lg:col-span-1": i === 2,
              }
            )}
          >
            <div className="flex items-center gap-4">
              <div>
                <h4 className="text-lg font-semibold">
                  {t(`features.${item.key}.title`)}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {t(`features.${item.key}.description`)}
                </p>
              </div>
              <button className="border rounded-full p-2 text-muted-foreground hover:bg-muted transition">
                <ArrowUpRight className="size-6" weight="light" />
              </button>
            </div>
            <div className="min-h-56 rounded-2xl bg-accent border mt-4 flex-1"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UniqueFeatures;
