import { LucideIcon } from "lucide-react";
import React from "react";

const EmptyState = ({
  icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => {
  const Icon = icon;
  return (
    <div className="border rounded-xl p-10">
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
