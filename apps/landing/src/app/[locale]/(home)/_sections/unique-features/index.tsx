"use client";

import React, { ReactNode } from "react";
import SectionHeader from "../section-header";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import Image from "next/image";

// const items = [
//   {
//     key: "effortless_client_management",
//   },
//   {
//     key: "seamless_project_tracking",
//   },
//   {
//     key: "automated_invoicing",
//   },
//   {
//     key: "smart_expense_tracking",
//   },
//   {
//     key: "ai_powered_assistance",
//   },
// ] as const;

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
        <CardComponent
          title={t(`features.effortless_client_management.title`)}
          description={t(`features.effortless_client_management.description`)}
        >
          <Image
            src="/client_managment.png"
            alt=""
            width={500}
            height={500}
            className="w-[80%] drop-shadow-2xl"
          />
        </CardComponent>
        <CardComponent
          title={t(`features.seamless_project_tracking.title`)}
          description={t(`features.seamless_project_tracking.description`)}
          className="lg:col-span-2"
        >
          <Image
            src="/kanban_view.png"
            alt=""
            width={1000}
            height={500}
            className="left-12 top-8 absolute shadow-2xl rounded-xl w-full"
          />
        </CardComponent>
        <CardComponent
          title={t(`features.automated_invoicing.title`)}
          description={t(`features.automated_invoicing.description`)}
        >
          <Image
            src="/automated_invoicing.png"
            alt=""
            width={500}
            height={500}
            className="w-[90%] drop-shadow-2xl"
          />
        </CardComponent>
        <CardComponent
          title={t(`features.smart_expense_tracking.title`)}
          description={t(`features.smart_expense_tracking.description`)}
        >
          <Image
            src="/smart_expense.png"
            alt=""
            width={500}
            height={500}
            className="w-[60%] drop-shadow-2xl"
          />
        </CardComponent>
        <CardComponent
          title={t(`features.ai_powered_assistance.title`)}
          description={t(`features.ai_powered_assistance.description`)}
        >
          <Image
            src="/ai.png"
            alt=""
            width={500}
            height={500}
            className="h-28 drop-shadow-2xl object-cover object-left absolute -right-10"
          />
        </CardComponent>

        {/* {items.map((item, i) => (
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
        ))} */}
      </div>
    </section>
  );
};

const CardComponent = ({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl bg-muted/30 border p-5 flex flex-col max-w-[500px] md:max-w-none md:w-full mx-auto",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <button className="border rounded-full p-2 text-muted-foreground bg-background transition hover:bg-muted">
          <ArrowUpRight className="size-6" weight="light" />
        </button>
      </div>
      <div className="min-h-56 overflow-hidden rounded-2xl relative bg-accent border mt-4 flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default UniqueFeatures;
