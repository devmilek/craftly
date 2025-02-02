import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

const StatsCard = ({
  title,
  heading,
  description,
  icon,
  textClassName,
  isLoading,
}: {
  title: string;
  heading: string;
  description?: string;
  icon?: LucideIcon;
  textClassName?: string;
  isLoading?: boolean;
}) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground ml-auto" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-20 h-8" />
        ) : (
          <div className={cn("text-2xl font-semibold", textClassName)}>
            {heading}
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
