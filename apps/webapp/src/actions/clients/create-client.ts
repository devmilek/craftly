"use server";

import { createClientSchema } from "@/components/modals/create-client-modal/schema";
import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schemas/clients";
import { v4 as uuid } from "uuid";
import { serverAvatarUpload } from "../storage";

export const createClient = async (formData: FormData) => {
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

  const validatedData = createClientSchema.safeParse({
    name: formData.get("name"),
    avatar: formData.get("avatar"),
  });

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data",
    };
  }

  const { name, avatar } = validatedData.data;

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

  const clientId = uuid();

  try {
    await db.insert(clients).values({
      id: clientId,
      name,
      organizationId,
      avatarId,
    });
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to create client",
    };
  }

  return {
    success: true,
    id: clientId,
  };
};
