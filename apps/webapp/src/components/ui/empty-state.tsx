import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

const EmptyState = ({
  icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) => {
  const Icon = icon;
  return (
    <div className={cn("border rounded-xl p-10", className)}>
      <div className="flex items-center justify-center">
        <Icon className="size-5" />
      </div>
      <h2 className="font-semibold text-center mt-4">{title}</h2>
      <p className="text-center mt-2 text-muted-foreground text-sm">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
