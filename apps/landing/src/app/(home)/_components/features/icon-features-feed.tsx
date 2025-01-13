"use client";

import React from "react";
import { ChartArea, Clock, LucideIcon, Users, Workflow } from "lucide-react";
import { motion, useInView } from "framer-motion";

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

const IconFeaturesFeed = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-14">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} index={index} />
      ))}
    </div>
  );
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: { icon: LucideIcon; title: string; description: string };
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
    >
      <div className="size-10 border rounded-xl bg-white flex items-center justify-center">
        <feature.icon className="size-4" />
      </div>
      <h3 className="font-semibold mt-4">{feature.title}</h3>
      <p className="text-muted-foreground text-sm">{feature.description}</p>
    </motion.div>
  );
};

export default IconFeaturesFeed;
