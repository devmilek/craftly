"use server";

import {
  createProjectSchema,
  CreateProjectSchema,
} from "@/components/modals/create-project-modal/schema";
import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export const createProject = async (values: CreateProjectSchema) => {
  const { session, activeOrganizationId } = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  if (!activeOrganizationId) {
    return {
      success: false,
      error: "No active organization",
    };
  }

  const validatedData = createProjectSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data",
    };
  }

  const { name, clientId, description, dueDate } = validatedData.data;

  const projectId = uuid();

  try {
    await db.insert(projects).values({
      name,
      clientId,
      description,
      dueDate,
      organizationId: activeOrganizationId,
    });
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to create client",
    };
  }

  redirect("/projects/" + projectId);
};
