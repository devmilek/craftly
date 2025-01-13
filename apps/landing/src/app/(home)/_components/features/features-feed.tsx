"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";

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

const FeaturesFeed = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-10 gap-6 mt-10">
      {mainFeatures.map((feature, index) => (
        <FeatureCard key={index} feature={feature} index={index} />
      ))}
    </div>
  );
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: { heading: string; description: string; image: string };
  index: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className={cn("md:col-span-6 shadow rounded-xl", {
        "md:col-span-4": index === 0 || index === 3,
      })}
    >
      <Card className="h-full">
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
    </motion.div>
  );
};

export default FeaturesFeed;
