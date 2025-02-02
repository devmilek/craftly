"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { and, eq, gte, lte, sql } from "drizzle-orm";

export const getChartTimeTrackings = async ({
  from,
  groupBy = "month",
}: {
  from: Date;
  groupBy: "week" | "month";
}) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const fromDate = groupBy === "month" ? startOfMonth(from) : startOfWeek(from);

  const getToDate = () => {
    if (groupBy === "month") {
      return endOfMonth(fromDate);
    } else {
      return endOfWeek(fromDate);
    }
  };

  console.log("fromDate", fromDate);
  console.log("getToDate", getToDate());

  const result = await db
    .select({
      date: timeTrackings.date,
      time: sql`sum(${timeTrackings.totalSeconds})`.mapWith(Number),
    })
    .from(timeTrackings)
    .where(
      and(
        eq(timeTrackings.organizationId, organizationId),
        lte(timeTrackings.date, getToDate()),
        gte(timeTrackings.date, fromDate)
      )
    )

    .groupBy(timeTrackings.date)
    .orderBy(timeTrackings.date);

  return result;
};
