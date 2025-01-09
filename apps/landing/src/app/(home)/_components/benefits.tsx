import SectionHeading from "@/components/section-heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookUser,
  Clock,
  Coins,
  ConstructionIcon,
  HandCoins,
  ScanEye,
} from "lucide-react";
import React from "react";

const benefits = [
  {
    icon: Clock,
    title: "Save Time on Admin Work",
    description:
      "Automate repetitive tasks and focus on what matters most—delivering great work.",
  },
  {
    icon: BookUser,
    title: "Streamline Collaboration",
    description:
      "Keep your team and clients aligned with real-time updates and shared workspaces.",
  },
  {
    icon: Coins,
    title: "Get Paid Faster",
    description: "Send invoices in seconds and track payments effortlessly.",
  },
  {
    icon: ScanEye,
    title: "Track Progress Like a Pro",
    description:
      "Gain insights into your projects with dashboards and detailed reports.",
  },
  {
    icon: HandCoins,
    title: "Stay on Budget",
    description: "Monitor your expenses and manage project costs with ease.",
  },
  {
    icon: ConstructionIcon,
    title: "Work Your Way",
    description: "Customize workflows and tools to suit your business needs.",
  },
];

const Benefits = () => {
  return (
    <section className="py-14">
      <SectionHeading
        badge="Benefits"
        title="Why Freelancers and Small Teams Choose Craftly"
        description="Unlock the tools you need to boost productivity and grow your business effortlessly."
      />
      <div className="grid grid-cols-3 gap-6 mt-10">
        {benefits.map((benefit, index) => (
          <Card key={index} className="flex flex-col items-center space-y-4">
            <CardHeader>
              <div className="size-10 border rounded-xl bg-white flex items-center justify-center">
                <benefit.icon className="size-4" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {benefit.title}
              </CardTitle>
              <CardDescription>{benefit.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
