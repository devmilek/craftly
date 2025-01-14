"use server";

import {
  createClientSchema,
  CreateClientSchema,
} from "@/components/modals/create-client-modal/schema";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schemas/clients";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export const createClient = async (values: CreateClientSchema) => {
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
    db.transaction(async (tx) => {
      await tx.insert(clients).values({
        id: clientId,
        name,
      });
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
