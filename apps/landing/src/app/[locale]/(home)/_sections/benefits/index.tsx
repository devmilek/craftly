import React from "react";
import SectionHeader from "../section-header";
import {
  CursorClick,
  Hourglass,
  Lock,
  Resize,
  TrendUp,
  UserCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@phosphor-icons/react/dist/lib/types";
import { useTranslations } from "next-intl";

interface BenefitCardProps {
  icon: Icon;
  title: string;
  description: string;
}

const benefits = [
  {
    icon: TrendUp,
    key: "enhanced_productivity",
  },
  {
    icon: UserCheck,
    key: "improved_client_relationships",
  },
  {
    icon: CursorClick,
    key: "real_time_insights",
  },
  {
    icon: Hourglass,
    key: "faster_payments",
  },
  {
    icon: Resize,
    key: "scalability",
  },
  {
    icon: Lock,
    key: "data_security",
  },
] as const;

const Benefits = () => {
  const t = useTranslations("benefits");
  return (
    <section className="section">
      <SectionHeader
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        className="mb-12 text-center"
      />
      <div className="grid lg:grid-cols-3 gap-4 mt-12">
        <div className="grid gap-4 max-w-[500px] mx-auto">
          {benefits.slice(0, benefits.length / 2).map((benefit) => (
            <BenefitCard
              key={benefit.key}
              icon={benefit.icon}
              title={t(`items.${benefit.key}.title`)}
              description={t(`items.${benefit.key}.description`)}
            />
          ))}
        </div>
        <div className="rounded-3xl bg-muted/50 border hidden lg:block"></div>
        <div className="grid gap-4 max-w-[500px] mx-auto">
          {benefits
            .slice(benefits.length / 2, benefits.length)
            .map((benefit) => (
              <BenefitCard
                key={benefit.key}
                icon={benefit.icon}
                title={t(`items.${benefit.key}.title`)}
                description={t(`items.${benefit.key}.description`)}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  const Icon = icon;
  return (
    <div className="p-6 rounded-3xl bg-muted/50 border">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-2xl bg-lime-200 w-max">
          <Icon className="size-6" weight="light" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm mt-2">{description}</p>
    </div>
  );
};

export default Benefits;
