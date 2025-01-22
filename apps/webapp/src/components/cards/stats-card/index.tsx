import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

const StatsCard = ({
  title,
  heading,
  description,
  icon,
}: {
  title: string;
  heading: string;
  description?: string;
  icon?: LucideIcon;
}) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground ml-auto" />}
      </CardHeader>
      <CardContent>
        {heading && <div className="text-2xl font-semibold">{heading}</div>}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
