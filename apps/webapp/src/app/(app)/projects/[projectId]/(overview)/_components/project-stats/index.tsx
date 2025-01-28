import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import StatsCard from "@/components/cards/stats-card";
import { endOfWeek, startOfWeek } from "date-fns";
import { taskAssignees, tasks } from "@/lib/db/schemas";
import { and, count, eq, gt, gte, isNull, lte } from "drizzle-orm";
import { db } from "@/lib/db";

const ProjectStats = async ({ projectId }: { projectId: string }) => {
  const today = new Date();

  const [[unnasignesTasks]] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(tasks)
      .leftJoin(taskAssignees, eq(tasks.id, taskAssignees.taskId))
      .where(and(eq(tasks.projectId, projectId), isNull(taskAssignees.id))),
  ]);

  const [[todoTasks], [plannedTasks]] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(tasks)
      .where(and(eq(tasks.projectId, projectId), eq(tasks.status, "todo"))),
    await db
      .select({
        count: count(),
      })
      .from(tasks)
      .where(
        and(
          eq(tasks.projectId, projectId),
          gte(tasks.dueDate, startOfWeek(today)),
          lte(tasks.dueDate, endOfWeek(today))
        )
      ),
  ]);

  const [[inProgressTasks]] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(tasks)
      .where(
        and(eq(tasks.projectId, projectId), eq(tasks.status, "in_progress"))
      ),
  ]);

  const [[overDueTasks]] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(tasks)
      .where(and(eq(tasks.projectId, projectId), gt(tasks.dueDate, today))),
  ]);

  const [[completedTasks]] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(tasks)
      .where(
        and(eq(tasks.projectId, projectId), eq(tasks.status, "completed"))
      ),
  ]);

  const statsCards = [
    {
      title: "Unassigned",
      header: unnasignesTasks.count + " tasks",
      description: "+38% new tasks this week",
      textColor: "text-muted-foreground",
    },
    {
      title: "To Do",
      header: todoTasks.count + " tasks",
      description: plannedTasks.count + " planned for this week",
      textColor: "text-status-todo",
    },
    {
      title: "In Progress",
      header: inProgressTasks.count + " tasks",
      description: "+38% new tasks this week",
      textColor: "text-status-in-progress",
    },
    {
      title: "Overdue",
      header: overDueTasks.count + " tasks",
      description: "Longest overdue: 12 days",
      textColor: "text-destructive",
    },
    {
      title: "Completed",
      header: completedTasks.count + " tasks",
      description: "+78% more than last week",
      textColor: "text-status-completed",
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button variant="ghost">
          Create
          <PlusIcon />
        </Button>
      </header>
      <div className="grid grid-cols-5 gap-4">
        {statsCards.map((card, index) => (
          <StatsCard
            heading={card.header}
            title={card.title}
            description={card.description}
            key={index}
            textClassName={card.textColor}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectStats;
