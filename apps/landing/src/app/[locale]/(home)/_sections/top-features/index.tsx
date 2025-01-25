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
    <section className="grid grid-cols-2 section relative gap-8">
      <div>
        <div className="sticky top-28">
          <SectionHeader
            badge={t("badge")}
            title={t("title")}
            description={t("description")}
          />
          <div className="flex flex-col gap-3 items-start mt-8">
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
      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div key={index} className="rounded-3xl border p-6">
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
