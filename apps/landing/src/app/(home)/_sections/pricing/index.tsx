import React from "react";
import SectionHeader from "../section-header";
import {
  ArrowRight,
  Check,
  Cube,
  Diamond,
  Square,
} from "@phosphor-icons/react/dist/ssr";

const plans = [
  {
    icon: Square,
    price: "0",
    title: "Starter",
    badge: "Free",
    description:
      "Perfect for freelancers and individuals managing their own projects, as well as members of organizations using the free plan.",
    features: [
      "Unlimited clients",
      "Unlimited projects",
      "Unlimited invoices",
      "Full task and project management",
      "Basic expense tracking",
      "1 GB file storage",
      "Basic analytics",
      "1 organization member",
    ],
  },
  {
    icon: Cube,
    price: "7",
    title: "Pro",
    badge: "For Individuals",
    description:
      "For professionals looking for better organization and automation.",
    features: [
      "Unlimited clients",
      "Unlimited projects",
      "Unlimited invoices",
      "Full task and project management",
      "Basic expense tracking",
      "10 GB file storage",
      "Basic analytics",
      "Up to 15 organization members",
      "AI-driven insights",
    ],
  },
  {
    icon: Diamond,
    price: "25",
    title: "Business",
    badge: "For Business",
    description: "For businesses requiring full control over the platform.",
    features: [
      "Unlimited clients",
      "Unlimited projects",
      "Unlimited invoices",
      "Full task and project management",
      "Basic expense tracking",
      "10 GB file storage",
      "Basic analytics",
      "Up to 25 organization members",
      "AI-driven insights",
      "Priority support",
      "Automated workflows",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="section">
      <SectionHeader
        className="text-center"
        badge="Pricing"
        title="Our Pricing Plans"
        description="Discover Craftly, your ultimate solution for seamless project management. With cutting-edge tools and intuitive features."
      />
      <div className="grid grid-cols-3 gap-6 mt-12">
        {plans.map((plan, i) => (
          <div key={i} className="p-6 border rounded-3xl">
            <div className="flex items-center justify-between">
              <plan.icon className="size-12" weight="light" />
              <div className="text-end">
                <p className="font-semibold text-2xl">${plan.price}</p>
                <p className="text-sm text-muted-foreground">
                  / Per Organization Per Month
                </p>
              </div>
            </div>
            <h3 className="mt-8">
              <span className="font-semibold">{plan.title} </span>
              <span className="text-sm bg-lime-200 py-1 px-2 rounded-lg">
                {plan.badge}
              </span>
            </h3>
            <p className="text-muted-foreground text-sm mt-4 h-16">
              {plan.description}
            </p>
            <button className="flex items-center gap-2 mt-6 w-full border bg-muted/50 justify-center rounded-2xl p-3 font-medium">
              Get Started <ArrowRight className="size-6" weight="light" />
            </button>
            <div className="grid gap-4 mt-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex gap-2">
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
