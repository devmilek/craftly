"use client";

import StatsCard from "@/components/cards/stats-card";
import React from "react";
import { Coins, TimerIcon } from "lucide-react";
import { formatSeconds } from "@/lib/utils";

const TimeStats = ({
  data,
  isLoading,
}: {
  data?: {
    billableHours: number;
    notBillableHours: number;
    totalEarnings: number;
  };
  isLoading: boolean;
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="grid grid-cols-3 gap-4 mb-5">
      <StatsCard
        icon={TimerIcon}
        title="Billable hours"
        description="Total hours worked"
        heading={formatSeconds(data?.billableHours || 0)}
        isLoading={isLoading}
      />
      <StatsCard
        icon={TimerIcon}
        title="Non-billable hours"
        description="Total hours worked"
        heading={formatSeconds(data?.notBillableHours || 0)}
        isLoading={isLoading}
      />
      <StatsCard
        icon={Coins}
        title="Total earings"
        description="From billable hours"
        heading={formatter.format(data?.totalEarnings || 0)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TimeStats;
