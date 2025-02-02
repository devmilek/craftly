import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { taskAssignees, tasks } from "@/lib/db/schemas";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { eq, sql, sum } from "drizzle-orm";

export const getTasksStats = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return undefined;
  }

  const [data] = await db
    .select({
      todo: sql<number>`count(distinct CASE WHEN ${tasks.status} = 'todo' THEN ${tasks.id} END)`.mapWith(
        Number
      ),
      inProgress:
        sql<number>`count(distinct CASE WHEN ${tasks.status} = 'in_progress' THEN ${tasks.id} END)`.mapWith(
          Number
        ),
      completed:
        sql<number>`count(distinct CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END)`.mapWith(
          Number
        ),
    })
    .from(tasks)
    .innerJoin(taskAssignees, eq(tasks.id, taskAssignees.taskId))
    .where(eq(taskAssignees.userId, session.userId));

  return {
    todo: Number(data.todo),
    inProgress: Number(data.inProgress),
    completed: Number(data.completed),
  };
};

export const getTimeTrackingStats = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return undefined;
  }

  const result = await db
    .select({
      date: timeTrackings.date,
      time: sql`sum(${timeTrackings.totalSeconds})`.mapWith(Number),
    })
    .from(timeTrackings)
    .where(eq(timeTrackings.userId, session.userId))
    .groupBy(timeTrackings.date)
    .orderBy(timeTrackings.date);

  return result;
};
