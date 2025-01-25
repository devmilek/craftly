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

const highlights = [
  {
    icon: Layout,
    text: "Intuitive User Interface for smooth navigation",
  },
  {
    icon: CursorClick,
    text: "Real-time collaboration for better teamwork",
  },
  {
    icon: ChartDonut,
    text: "Advanced analytics for data-driven decisions",
  },
  {
    icon: HardDrive,
    text: "Secure cloud storage for essential documents",
  },
];

const features = [
  {
    icon: Checks,
    title: "Smart Task Management",
    description:
      "Easily create, assign, and track tasks, ensuring nothing falls through the cracks.",
  },
  {
    icon: ChatCircle,
    title: "Seamless Communication",
    description:
      "Collaborate effectively with clients and team members through an integrated messaging system.",
  },
  {
    icon: ArrowsClockwise,
    title: "Automated Data Syncing",
    description:
      "Ensure that all your important data remains up to date across multiple devices.",
  },
  {
    icon: Users,
    title: "Simplified Contact Management",
    description:
      "Keep all your business contacts in one place for easy organization and access.",
  },
  {
    icon: BellRinging,
    title: "Deadline Tracking",
    description:
      "Set reminders, track deadlines, and ensure timely project completion.",
  },
];

const TopFeatures = () => {
  return (
    <section className="grid grid-cols-2 section relative">
      <div>
        <div className="sticky top-28">
          <SectionHeader
            badge="Top Features"
            title="Unlock the Full Potential of Your Business"
            description="Craftly is designed to provide everything you need to manage clients, projects, and finances efficiently."
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
                <p className="text-sm">{highlight.text}</p>
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
              <h3 className="font-bold">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground mt-4">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopFeatures;
