import React from "react";
import SectionHeader from "../section-header";
import {
  Headset,
  Sparkle,
  Trophy,
  Vault,
} from "@phosphor-icons/react/dist/ssr";

const items = [
  {
    icon: Sparkle,
    title: "All-in-One Solution",
    description: "No need for multiple apps—everything is built in.",
  },
  {
    icon: Headset,
    title: "Reliable Support",
    description:
      "Dedicated customer support to help you every step of the way.",
  },
  {
    icon: Vault,
    title: "Secure & Scalable",
    description:
      "Grow your business with confidence using our secure infrastructure.",
  },
  {
    icon: Trophy,
    title: "Proven Success",
    description: "Designed with industry best practices to help you thrive.",
  },
];

const WhyUs = () => {
  return (
    <section className="section grid grid-cols-2 gap-8">
      <div>
        <SectionHeader
          badge="Why Craftly?"
          title="Designed for Freelancers and Businesses Alike"
          description="Craftly is built for service providers who need a reliable and efficient way to manage their business without the complexity of traditional management tools."
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
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-muted-foreground text-sm mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
