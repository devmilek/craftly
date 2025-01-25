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

interface BenefitCardProps {
  icon: Icon;
  title: string;
  description: string;
}

const benefits = [
  {
    icon: TrendUp,
    title: "Enhanced Productivity",
    description:
      "Streamline your workflows, automate tasks, and reduce manual effort to focus on what matters most.",
  },
  {
    icon: UserCheck,
    title: "Improved Client Relationships",
    description:
      "Keep all client interactions, documents, and invoices in one place for seamless communication and service delivery.",
  },
  {
    icon: CursorClick,
    title: "Real-time Insights",
    description:
      "Access up-to-the-minute financial data, project performance reports, and task progress updates instantly.",
  },
  {
    icon: Hourglass,
    title: "Faster Payments",
    description:
      "Create and send professional invoices with automated tracking, ensuring you get paid on time.",
  },
  {
    icon: Resize,
    title: "Scalability",
    description:
      "As your business grows, Craftly grows with you, offering flexible tools and features that adapt to your evolving needs.",
  },
  {
    icon: Lock,
    title: "Data Security",
    description:
      "Protect your sensitive business information with cutting-edge security and compliance measures.",
  },
];

const Benefits = () => {
  return (
    <section className="section">
      <SectionHeader
        badge="Benefits"
        title="What You Gain with Craftly"
        description="Discover how Craftly transforms business operations, helping you work smarter and more efficiently."
        className="text-center"
      />
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="grid gap-4">
          {benefits.slice(0, benefits.length / 2).map((benefit) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
        <div className="rounded-3xl bg-muted/50 border"></div>
        <div className="grid gap-4">
          {benefits
            .slice(benefits.length / 2, benefits.length)
            .map((benefit) => (
              <BenefitCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
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
