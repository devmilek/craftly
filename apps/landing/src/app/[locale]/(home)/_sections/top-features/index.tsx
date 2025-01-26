import React from "react";
import SectionHeader from "../section-header";
import {
  Layout,
  CursorClick,
  ChartDonut,
  HardDrive,
  Checks,
  ChatCircle,
  ArrowsClockwise,
  Users,
  BellRinging,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: Layout,
    key: "1",
  },
  {
    icon: CursorClick,
    key: "2",
  },
  {
    icon: ChartDonut,
    key: "3",
  },
  {
    icon: HardDrive,
    key: "4",
  },
] as const;

const features = [
  {
    icon: Checks,
    key: "smart_task_management",
  },
  {
    icon: ChatCircle,
    key: "seamless_communication",
  },
  {
    icon: ArrowsClockwise,
    key: "automated_data_syncing",
  },
  {
    icon: Users,
    key: "simplified_contact_management",
  },
  {
    icon: BellRinging,
    key: "deadline_tracking",
  },
] as const;

const TopFeatures = () => {
  const t = useTranslations("top_features");
  return (
    <section className="grid lg:grid-cols-2 section relative gap-8">
      <div>
        <div className="sticky top-28">
          <SectionHeader
            badge={t("badge")}
            title={t("title")}
            description={t("description")}
            className="text-center lg:text-start"
          />
          <div className="flex lg:flex-col gap-3 items-start mt-8 flex-wrap justify-center">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-5 py-3 border rounded-full"
              >
                <highlight.icon
                  className="size-5 text-primary"
                  weight="light"
                />
                <p className="text-sm">{t(`highlights.${highlight.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn("rounded-3xl border p-6", {
              "sm:col-span-2 lg:col-span-1": index === features.length - 1,
            })}
          >
            <div className="flex items-center gap-4">
              <div className="bg-lime-200 p-3 rounded-2xl w-max">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="font-bold">
                {t(`features.${feature.key}.title`)}
              </h3>
            </div>
            <p className="text-muted-foreground mt-4">
              {t(`features.${feature.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopFeatures;
