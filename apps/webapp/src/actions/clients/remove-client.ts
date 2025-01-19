"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schemas/clients";
import { and, eq } from "drizzle-orm";

export const removeClient = async (clientId: string) => {
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

  if (!clientId) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  const client = await db.query.clients.findFirst({
    where: and(
      eq(clients.id, clientId),
      eq(clients.organizationId, organizationId)
    ),
  });

  if (!client) {
    return {
      success: false,
      error: "Client not found",
    };
  }

  try {
    await db.delete(clients).where(eq(clients.id, client.id));
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to remove client",
    };
  }
};
