"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";

export const removeInvoice = async (invoiceId: string) => {
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

  if (!invoiceId) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, invoiceId),
      eq(invoices.organizationId, organizationId)
    ),
  });

  if (!invoice) {
    return {
      success: false,
      error: "Invoice not found",
    };
  }

  try {
    await db.delete(invoices).where(eq(invoices.id, invoice.id));
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to remove invoice",
    };
  }
};

export const changeInvoicePaidStatus = async (
  invoiceId: string,
  paid: boolean
) => {
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

  if (!invoiceId) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, invoiceId),
      eq(invoices.organizationId, organizationId)
    ),
  });

  if (!invoice) {
    return {
      success: false,
      error: "Invoice not found",
    };
  }

  try {
    await db.update(invoices).set({ paid }).where(eq(invoices.id, invoice.id));
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to mark invoice as paid",
    };
  }
};
