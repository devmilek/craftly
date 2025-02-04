"use server";

import {
  createTaskSchema,
  CreateTaskSchema,
} from "@/components/modals/view-task-modal/schema";
import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schemas";
import { v4 as uuid } from "uuid";

export const createTask = async (values: CreateTaskSchema) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  if (!organizationId) {
    return {
      success: false,
      error: "No active organization",
    };
  }

  const validatedData = createTaskSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data",
    };
  }

  const { name, description, status, dueDate, priority, projectId } =
    validatedData.data;

  const taskId = uuid();

  try {
    await db.insert(tasks).values({
      id: taskId,
      name,
      organizationId,
      projectId: projectId || null,
      status,
      description,
      priority,
      dueDate: dueDate || null,
    });

    // if (assigneesId && assigneesId.length > 0) {
    //   const mems = await db.query.members.findMany({
    //     where: and(
    //       inArray(members.userId, assigneesId),
    //       eq(members.organizationId, organizationId)
    //     ),
    //   });

    //   await db.insert(taskAssignees).values(
    //     mems.map((mem) => ({
    //       taskId,
    //       userId: mem.userId,
    //     }))
    //   );
    // }

    return {
      success: true,
      taskId,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "Failed to create task",
    };
  }
};
