"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";

export const getInvoices = async ({ projectId }: { projectId?: string }) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db.query.invoices.findMany({
    where: and(
      eq(invoices.organizationId, organizationId),
      projectId ? eq(invoices.projectId, projectId) : undefined
    ),
  });

  return data;
};
