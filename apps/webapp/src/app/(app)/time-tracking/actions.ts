"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, projects } from "@/lib/db/schemas";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { and, eq, gte, isNotNull, isNull, lte, sql } from "drizzle-orm";

const getChartTimeTrackings = async ({
  from,
  groupBy = "month",
  organizationId,
}: {
  from: Date;
  groupBy: "week" | "month";
  organizationId: string;
}) => {
  const fromDate = groupBy === "month" ? startOfMonth(from) : startOfWeek(from);

  const getToDate = () => {
    if (groupBy === "month") {
      return endOfMonth(fromDate);
    } else {
      return endOfWeek(fromDate);
    }
  };

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

const getTimeTrackingsStats = async ({
  from,
  groupBy = "month",
  organizationId,
}: {
  from: Date;
  groupBy: "week" | "month";
  organizationId: string;
}) => {
  try {
    const fromDate =
      groupBy === "month" ? startOfMonth(from) : startOfWeek(from);

    const getToDate = () => {
      if (groupBy === "month") {
        return endOfMonth(fromDate);
      } else {
        return endOfWeek(fromDate);
      }
    };

    const filters = [
      eq(timeTrackings.organizationId, organizationId),
      lte(timeTrackings.date, getToDate()),
      gte(timeTrackings.date, fromDate),
    ];

    const [totalEarnings] = await db
      .select({
        sum: sql`SUM(${timeTrackings.totalSeconds} / 60 / 60 * ${timeTrackings.billableRate})`.mapWith(
          Number
        ),
      })
      .from(timeTrackings)
      .where(and(...filters, isNotNull(timeTrackings.billableRate)));

    const [billableHours] = await db
      .select({
        sum: sql`SUM(${timeTrackings.totalSeconds})`.mapWith(Number),
      })
      .from(timeTrackings)
      .where(and(isNotNull(timeTrackings.billableRate), ...filters));

    const [notBillableHours] = await db
      .select({
        sum: sql`SUM(${timeTrackings.totalSeconds})`.mapWith(Number),
      })
      .from(timeTrackings)
      .where(and(isNull(timeTrackings.billableRate), ...filters));

    return {
      totalEarnings: totalEarnings.sum,
      billableHours: billableHours.sum,
      notBillableHours: notBillableHours.sum,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getTimeTrackingsTable = async ({
  from,
  groupBy = "month",
  organizationId,
}: {
  from: Date;
  groupBy: "week" | "month";
  organizationId: string;
}) => {
  const fromDate = groupBy === "month" ? startOfMonth(from) : startOfWeek(from);

  const getToDate = () => {
    if (groupBy === "month") {
      return endOfMonth(fromDate);
    } else {
      return endOfWeek(fromDate);
    }
  };

  const filters = [
    eq(timeTrackings.organizationId, organizationId),
    lte(timeTrackings.date, getToDate()),
    gte(timeTrackings.date, fromDate),
  ];

  const data = await db
    .select({
      projectId: projects.id,
      projectName: projects.name,
      clientName: clients.name,
      totalTime: sql`sum(${timeTrackings.totalSeconds})`.mapWith(Number),
      totalEarings:
        sql`sum(${timeTrackings.totalSeconds} / 60 / 60 * coalesce(${timeTrackings.billableRate}, 0))`.mapWith(
          Number
        ),
      totalBillableTime:
        sql`sum(case when ${timeTrackings.billableRate} is not null then ${timeTrackings.totalSeconds} else 0 end)`.mapWith(
          Number
        ),
    })
    .from(timeTrackings)
    .innerJoin(projects, eq(timeTrackings.projectId, projects.id))
    .leftJoin(clients, eq(projects.clientId, clients.id))
    .where(and(...filters))
    .groupBy(projects.id, clients.name);

  console.log("end fetching data");

  return data;
};

export const getTimeTrackingData = async ({
  from,
  groupBy = "month",
}: {
  from: Date;
  groupBy: "week" | "month";
}) => {
  const { organizationId, session } = await getCurrentSession();

  if (!organizationId || !session) {
    return null;
  }

  const [stats, table, chart] = await Promise.all([
    getTimeTrackingsStats({ from, groupBy, organizationId }),
    getTimeTrackingsTable({ from, groupBy, organizationId }),
    getChartTimeTrackings({ from, groupBy, organizationId }),
  ]);

  return {
    stats,
    table,
    chart,
  };
};
