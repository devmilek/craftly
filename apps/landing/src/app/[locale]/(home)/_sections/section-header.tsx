import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

const SectionHeader = ({
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
    <header className={cn("max-w-4xl mx-auto", className)}>
      <Badge variant="outline">{badge}</Badge>
      <h2 className="font-bold text-3xl lg:text-3xl mt-6">{title}</h2>
      <p className="text-muted-foreground mt-4 text-sm md:text-base">
        {description}
      </p>
    </header>
  );
};

export default SectionHeader;
