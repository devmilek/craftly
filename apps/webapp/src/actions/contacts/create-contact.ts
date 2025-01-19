"use server";

import { createContactSchema } from "@/components/modals/create-contact-modal/schema";
import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schemas";
import { v4 as uuid } from "uuid";
import { serverAvatarUpload } from "../storage";

export const createContact = async (formData: FormData) => {
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

  const validatedData = createContactSchema.safeParse({
    avatar: formData.get("avatar"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    position: formData.get("position"),
    clientId: formData.get("clientId") || null,
    primary: formData.get("primary") === "true",
  });

  if (!validatedData.success) {
    console.log(validatedData.error);
    return {
      success: false,
      error: "Invalid data",
    };
  }

  const { name, email, clientId, phone, position, primary, avatar } =
    validatedData.data;

  console.log("avatar", avatar);

  let avatarId: string | null | undefined = null;

  if (avatar) {
    const { error, fileId } = await serverAvatarUpload({
      file: avatar,
      organizationId,
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    avatarId = fileId;
  }

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
      avatarId,
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
