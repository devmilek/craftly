"use server";

import {
  createContactSchema,
  CreateContactSchema,
} from "@/components/modals/create-contact-modal/schema";
import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schemas";
import { v4 as uuid } from "uuid";

export const createContact = async (values: CreateContactSchema) => {
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

  const validatedData = createContactSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data",
    };
  }

  const { name, email, clientId, phone, position, primary } =
    validatedData.data;

  const contactId = uuid();

  try {
    await db.insert(contacts).values({
      id: contactId,
      name,
      email,
      clientId,
      phone,
      position,
      organizationId,
      primary,
    });

    return {
      success: true,
      id: contactId,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to create contact",
    };
  }
};
