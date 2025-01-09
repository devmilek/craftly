import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const SectionHeading = ({
  badge,
  title,
  description,
  className,
}: {
  badge: string;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={cn("text-center", className)}>
      <Badge variant="outline" className="mb-8">
        {badge}
      </Badge>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default SectionHeading;
