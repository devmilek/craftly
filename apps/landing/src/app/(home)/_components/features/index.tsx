import SectionHeading from "@/components/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChartArea, Clock, Users, Workflow } from "lucide-react";
import Image from "next/image";
import React from "react";

const mainFeatures = [
  {
    heading: "Project Management Made Simple",
    description:
      "Plan, track, and manage all your projects in one place with Gantt charts, milestones, and detailed reporting tools.",
    image: "/project2.png",
  },
  {
    heading: "Task Organization Simplified",
    description:
      "Organize tasks with Kanban boards, set priorities, and track progress in real-time to ensure nothing gets overlooked.",
    image: "/project.png",
  },
  {
    heading: "Client Management at Your Fingertips",
    description:
      "Keep client information centralized, track communication, and automate reminders for seamless collaboration.",
    image: "/project.png",
  },
  {
    heading: "Financial Tracking Done Right",
    description:
      "Manage budgets, monitor expenses, and send professional invoices—all from your dashboard.",
    image: "/project2.png",
  },
];

const features = [
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Stay on top of billable hours with intuitive time tracking tools.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Communicate with your team using integrated chat and file-sharing tools.",
  },
  {
    icon: ChartArea,
    title: "Risk Management",
    description: "Identify and mitigate project risks with ease.",
  },
  {
    icon: Workflow,
    title: "Integrations",
    description:
      "Connect with tools like Slack, Trello, and Google Drive for a unified workflow.",
  },
];

const Features = () => {
  return (
    <section className="py-14">
      <SectionHeading
        badge="Features"
        title="Powerful Features for Seamless Workflow"
        description="Discover tools designed to help you stay organized, collaborate effectively, and deliver results faster."
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-10 gap-6 mt-10">
        {mainFeatures.map((feature, index) => (
          <Card
            key={index}
            className={cn("md:col-span-6 shadow", {
              "md:col-span-4": index === 0 || index === 3,
            })}
          >
            <CardHeader>
              <CardTitle>{feature.heading}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                alt=""
                src={feature.image}
                width={600}
                height={600}
                className="w-80 mx-auto my-auto"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-14">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="size-10 border rounded-xl bg-white flex items-center justify-center">
              <feature.icon className="size-4" />
            </div>
            <h3 className="font-semibold mt-4">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
