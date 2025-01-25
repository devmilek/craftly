import React from "react";
import SectionHeader from "../section-header";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const items = [
  {
    title: "Effortless Client Management",
    description:
      "Store, track, and manage all client details in one organized and easily accessible dashboard.",
  },
  {
    title: "Seamless Project Tracking",
    description:
      "Stay ahead of deadlines with an intuitive project management system that keeps your tasks and milestones in check.",
  },
  {
    title: "Automated Invoicing",
    description:
      "Generate, send, and track invoices with ease, ensuring timely payments and professional billing.",
  },
  {
    title: "Smart Expense Tracking",
    description:
      "Monitor your spending, track expenses, and optimize your financial management for better decision-making.",
  },
  {
    title: "AI-Powered Assistance",
    description:
      "Utilize AI-driven insights, task automation, and workflow suggestions to streamline operations and save time.",
  },
];

const UniqueFeatures = () => {
  return (
    <section className="section">
      <SectionHeader
        className="text-center"
        badge="Unique Features"
        title="Powerful Tools for a Streamlined Workflow"
        description="Boost your productivity, stay on top of your tasks, and manage your finances effortlessly with Craftly’s comprehensive business management suite. Our platform is tailored to fit the needs of service providers, freelancers, and businesses looking for a seamless way to manage operations."
      />
      <div className="grid grid-cols-3 gap-5 mt-12">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn("rounded-3xl bg-muted/30 border p-5 flex flex-col", {
              "col-span-2": i === 1,
            })}
          >
            <div className="flex items-center gap-4">
              <div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {item.description}
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
