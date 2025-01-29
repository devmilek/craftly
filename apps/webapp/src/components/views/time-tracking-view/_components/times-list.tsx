import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, UserIcon } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { getTimeTrackingsByDate } from "../actions";
import { TimeTracking } from "..";

interface TimesListProps {
  date: Date;
  projectId?: string;
}

const TimesList = memo(({ date, projectId }: TimesListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["timeTrackings", date, projectId],
    queryFn: async () =>
      await getTimeTrackingsByDate({
        date,
        projectId,
      }),
  });

  if (error) return <div>Error loading time trackings</div>;
  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-4">
      {data?.map((item) => <TimeTrackingItem key={item.id} item={item} />)}
    </div>
  );
});

const TimeTrackingItem = memo(({ item }: { item: TimeTracking }) => {
  const hours = item.totalSeconds / 60 / 60;
  const minutes = (hours - Math.floor(hours)) * 60;

  return (
    <div className="flex items-center pb-5 gap-4 border-b">
      <Avatar className="size-10">
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
        <p className="text-sm font-semibold">{item.task}</p>
      </div>
      <p className="text-base font-semibold">
        {Math.floor(hours)}h {Math.round(minutes)}m
      </p>
    </div>
  );
});

const LoadingState = () => (
  <div className="flex items-center justify-center h-32 ">
    <Loader2 className="animate-spin size-4" />
  </div>
);

TimesList.displayName = "TimesList";
TimeTrackingItem.displayName = "TimeTrackingItem";

export default TimesList;
