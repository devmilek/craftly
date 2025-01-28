import StatsCard from "@/components/cards/stats-card";
import { db } from "@/lib/db";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { eq, sum } from "drizzle-orm";
import { TimerIcon } from "lucide-react";
import React from "react";

const TimeTracking = async ({ projectId }: { projectId: string }) => {
  const [time] = await db
    .select({
      sum: sum(timeTrackings.totalSeconds).as<number>("sum"),
    })
    .from(timeTrackings)
    .where(eq(timeTrackings.projectId, projectId));

  const totalHours = time.sum / 3600;

  // make string ex 2h 30m
  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);

  return (
    <StatsCard
      title="Total Hours"
      heading={`${hours}h ${minutes}m`}
      icon={TimerIcon}
    />
  );
};

export default TimeTracking;
