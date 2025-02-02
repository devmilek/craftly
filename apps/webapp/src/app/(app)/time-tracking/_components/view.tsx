"use client";

import React from "react";
import { TimeChart } from "./time-chart";
import TimeStats from "./time-stats";
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from "nuqs";
import { fromZonedTime } from "date-fns-tz";
import { startOfMonth, startOfWeek } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getTimeTrackingData } from "../actions";
import TimeTable from "./time-table";

const View = () => {
  const [by] = useQueryState(
    "by",
    parseAsStringLiteral(["month", "week"]).withDefault("month")
  );
  const [from] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(
      fromZonedTime(
        by === "month" ? startOfMonth(new Date()) : startOfWeek(new Date()),
        "UTC"
      )
    )
  );

  const { data, isLoading } = useQuery({
    queryKey: ["timeTrackingsData", from, by],
    queryFn: async () => {
      return await getTimeTrackingData({
        from,
        groupBy: by,
      });
    },
  });

  return (
    <div>
      <TimeStats data={data?.stats} isLoading={isLoading} />
      <TimeChart by={by} data={data?.chart} from={from} />
      <TimeTable data={data?.table} />
    </div>
  );
};

export default View;
