import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, UserIcon } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { getTimeTrackingsByDate } from "../actions";
import { TimeTracking } from "..";

interface TimesListProps {
  date: Date;
}

const TimesList = memo(({ date }: TimesListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["timeTrackings", date],
    queryFn: async () => await getTimeTrackingsByDate(date),
  });

  if (error) return <div>Error loading time trackings</div>;
  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-4">
      {data?.map((item) => <TimeTrackingItem key={item.id} item={item} />)}
    </div>
  );
});

const TimeTrackingItem = memo(({ item }: { item: TimeTracking }) => (
  <div className="flex items-center py-5 gap-4 border-b">
    <Avatar>
      <AvatarFallback>
        {item.userName ? (
          getInitials(item.userName)
        ) : (
          <UserIcon className="size-4" />
        )}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-xs text-muted-foreground">Task</p>
      <p className="text-base font-semibold">{item.task}</p>
    </div>
    <p className="text-base font-semibold">
      {(item.totalSeconds / 60 / 60).toFixed(2)}h
    </p>
  </div>
));

const LoadingState = () => (
  <div className="flex items-center justify-center h-32 ">
    <Loader2 className="animate-spin size-4" />
  </div>
);

TimesList.displayName = "TimesList";
TimeTrackingItem.displayName = "TimeTrackingItem";

export default TimesList;
