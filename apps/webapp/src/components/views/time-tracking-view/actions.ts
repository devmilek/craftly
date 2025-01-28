"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { tasks, users } from "@/lib/db/schemas";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { and, desc, eq, getTableColumns, gte, lte, sum } from "drizzle-orm";

export const getTimeTrackings = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      ...getTableColumns(timeTrackings),
    })
    .from(timeTrackings)
    .where(and(eq(timeTrackings.organizationId, organizationId)))
    .orderBy(timeTrackings.date);

  return data;
};

export const getTimeTrackingsDates = async ({
  page,
  from,
  to,
}: {
  page: number;
  from?: Date | null;
  to?: Date | null;
}) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .selectDistinct({
      date: timeTrackings.date,
      totalSeconds: sum(timeTrackings.totalSeconds).as<number>("totalSeconds"),
    })
    .from(timeTrackings)
    .where(
      and(
        eq(timeTrackings.organizationId, organizationId),
        from ? gte(timeTrackings.date, from) : undefined,
        to ? lte(timeTrackings.date, to) : undefined
      )
    )
    .orderBy(desc(timeTrackings.date))
    .groupBy(timeTrackings.date)
    .limit(10)
    .offset(page * 10);

  return data;
};

export const getTimeTrackingsByDate = async (date: Date) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: timeTrackings.id,
      totalSeconds: timeTrackings.totalSeconds,
      userName: users.name,
      task: tasks.name,
    })
    .from(timeTrackings)
    .where(
      and(
        eq(timeTrackings.organizationId, organizationId),
        eq(timeTrackings.date, date)
      )
    )
    .leftJoin(users, eq(timeTrackings.userId, users.id))
    .leftJoin(tasks, eq(timeTrackings.taskId, tasks.id))
    .orderBy(desc(timeTrackings.date));

  return data;
};
