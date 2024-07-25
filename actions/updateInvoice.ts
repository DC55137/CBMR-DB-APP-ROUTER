// app/actions/updateInvoice.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { InvoiceStatus } from "@prisma/client";

const UpdateInvoiceSchema = z.object({
  id: z.string().min(1, "Invoice ID is required"),
  company: z.string().optional(),
  amount: z.number().optional(),
  description: z.string().optional(),
  issueDate: z.date().optional(),
  dueDate: z.date().optional(),
  status: z.nativeEnum(InvoiceStatus).optional(),
  invoiceImage: z.string().nullable().optional(),
});

type UpdateInvoiceInput = z.infer<typeof UpdateInvoiceSchema>;

export async function updateInvoice(
  data: UpdateInvoiceInput
): Promise<
  { success: true; invoice: any } | { success: false; error: string }
> {
  console.log("data", data);
  const validatedFields = UpdateInvoiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { id, ...updateData } = validatedFields.data;

  try {
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: updateData,
    });

    const job = await prisma.job.findUnique({
      where: { id: updatedInvoice.jobId },
    });

    if (job) {
      revalidatePath(`/jobs/${job.id}`);
    }

    return { success: true, invoice: updatedInvoice };
  } catch (error) {
    console.error("Failed to update invoice:", error);
    return { success: false, error: "Failed to update invoice" };
  }
}
