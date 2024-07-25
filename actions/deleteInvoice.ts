// app/actions/deleteInvoice.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteInvoice(
  invoiceId: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const deletedInvoice = await prisma.invoice.delete({
      where: { id: invoiceId },
    });

    const job = await prisma.job.findUnique({
      where: { id: deletedInvoice.jobId },
    });

    if (job) {
      revalidatePath(`/jobs/${job.id}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    return { success: false, error: "Failed to delete invoice" };
  }
}
