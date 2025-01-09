import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

const plans = [
  {
    headline: "Starter",
    price: "Free",
    perMonth: false,
    description: "Perfect for freelancers starting out.",
    features: [
      "2 Projects",
      "Basic Task Management",
      "Client Management",
      "Community Support",
    ],
  },
  {
    headline: "Pro",
    price: "$12",
    description: "Ideal for growing freelancers and small teams.",
    perMonth: true,
    main: true,
    features: [
      "Unlimited Projects",
      "Advanced Reporting",
      "Time Tracking",
      "Premium Support",
    ],
  },
  {
    headline: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for larger teams.",
    perMonth: false,
    features: [
      "All Pro Features",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Priority Support",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="py-14">
      <SectionHeading
        badge="Pricing"
        title="Choose the Perfect Plan for Your Business"
        description="Whether you're starting out or scaling up, Craftly has a plan that fits your needs."
      />
      <div className="grid md:grid-cols-3 mt-12 gap-6">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

const PricingCard = ({
  headline,
  price,
  description,
  perMonth,
  features,
  main = false,
}: {
  headline: string;
  price: string;
  description: string;
  perMonth: boolean;
  features: string[];
  main?: boolean;
}) => {
  return (
    <article
      className={cn(
        "p-8 border rounded-2xl shadow",
        main && "bg-primary text-white"
      )}
    >
      <h5 className="font-semibold text-lg mb-4">{headline}</h5>
      <h4 className="font-semibold text-3xl">
        {price}
        {perMonth ? (
          <span className="text-base font-normal">/month</span>
        ) : null}
      </h4>
      <p
        className={cn("text-muted-foreground text-sm mb-6 mt-4", {
          "text-white/60": main,
        })}
      >
        {description}
      </p>
      <Button className="w-full" variant={main ? "secondary" : "default"}>
        Choose plan
      </Button>
      <Separator className="my-6" />
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Checkbox checked />
            <span className="ml-2 text-sm font-medium leading-none">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Pricing;
