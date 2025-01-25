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
    <header className={cn(className)}>
      <Badge variant="outline">{badge}</Badge>
      <h2 className="font-bold text-4xl mt-6">{title}</h2>
      <p className="text-muted-foreground mt-4">{description}</p>
    </header>
  );
};

export default SectionHeader;
