"use server";

import {
  createClientSchema,
  CreateClientSchema,
} from "@/components/modals/create-client-modal/schema";
import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schemas/clients";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export const createClient = async (values: CreateClientSchema) => {
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

  const validatedData = createClientSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data",
    };
  }

  const { name } = validatedData.data;

  const clientId = uuid();

  try {
    await db.insert(clients).values({
      id: clientId,
      name,
      organizationId: activeOrganizationId,
    });
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to create client",
    };
  }

  redirect("/clients/" + clientId);
};
