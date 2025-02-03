"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schemas";
import { and, asc, eq, sql } from "drizzle-orm";

export const getInvoices = async ({ projectId }: { projectId?: string }) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return {
      invoices: [],
      stats: {
        overdue: 0,
        paid: 0,
        pending: 0,
      },
    };
  }

  // Base conditions that apply to all queries
  const baseConditions = [
    eq(invoices.organizationId, organizationId),
    projectId ? eq(invoices.projectId, projectId) : undefined,
  ].filter(Boolean);

  // Single query to get all stats using CASE expressions
  const [stats] = await db
    .select({
      pending:
        sql<number>`COALESCE(SUM(CASE WHEN ${invoices.paid} = false THEN ${invoices.amount} ELSE 0 END), 0)`.mapWith(
          Number
        ),
      overdue:
        sql<number>`COALESCE(SUM(CASE WHEN ${invoices.paid} = false AND ${invoices.dueDate} < NOW() THEN ${invoices.amount} ELSE 0 END), 0)`.mapWith(
          Number
        ),
      paid: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.paid} = true THEN ${invoices.amount} ELSE 0 END), 0)`.mapWith(
        Number
      ),
    })
    .from(invoices)
    .where(and(...baseConditions));

  // Get invoice details in parallel with stats
  const invoiceData = await db.query.invoices.findMany({
    where: and(...baseConditions),
    orderBy: [asc(invoices.paid), asc(invoices.createdAt)],
  });

  return {
    invoices: invoiceData,
    stats,
  };
};
