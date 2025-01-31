"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

export const completeOnboarding = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    return;
  }

  if (user.onboardingCompleted) {
    return;
  }

  await db
    .update(users)
    .set({ onboardingCompleted: true })
    .where(eq(users.id, user.id));
};
