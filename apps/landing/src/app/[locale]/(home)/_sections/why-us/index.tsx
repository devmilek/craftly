import React from "react";
import SectionHeader from "../section-header";
import {
  Headset,
  Sparkle,
  Trophy,
  Vault,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

const items = [
  {
    icon: Sparkle,
    key: "all_in_one_solution",
  },
  {
    icon: Headset,
    key: "reliable_support",
  },
  {
    icon: Vault,
    key: "secure_scalable",
  },
  {
    icon: Trophy,
    key: "proven_success",
  },
] as const;

const WhyUs = () => {
  const t = useTranslations("why_us");
  return (
    <section className="section grid grid-cols-2 gap-8">
      <div>
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
        />
        <div className="flex mt-8">
          <div className="pr-8 border-r">
            <h5 className="text-3xl font-bold">5.6k</h5>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="pl-8">
            <h5 className="text-3xl font-bold">4.7</h5>
            <p className="text-muted-foreground">Ratings</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="p-6 border rounded-3xl bg-muted/50">
            <div className="p-2 rounded-2xl bg-lime-200 w-max mb-4">
              <item.icon className="size-6" weight="light" />
            </div>
            <h3 className="font-semibold">{t(`items.${item.key}.title`)}</h3>
            <p className="text-muted-foreground text-sm mt-2">
              {t(`items.${item.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
