// app/actions/addInvoice.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { InvoiceStatus } from "@prisma/client";

const InvoiceSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  description: z.string().optional(),
  issueDate: z.date(),
  dueDate: z.date(),
  status: z.nativeEnum(InvoiceStatus),
  invoiceImage: z.string().optional(),
  company: z.string(),
});

type InvoiceInput = z.infer<typeof InvoiceSchema>;

export async function addInvoice(
  data: InvoiceInput
): Promise<
  { success: true; invoice: any } | { success: false; error: string }
> {
  const validatedFields = InvoiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const {
    jobId,
    invoiceNumber,
    amount,
    description,
    issueDate,
    dueDate,
    status,
    invoiceImage,
    company,
  } = validatedFields.data;

  try {
    // Check if the invoice number already exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoiceNumber },
    });

    if (existingInvoice) {
      return { success: false, error: "Invoice number already exists" };
    }

    // Create the new invoice
    const newInvoice = await prisma.invoice.create({
      data: {
        jobId,
        invoiceNumber,
        amount,
        description,
        issueDate,
        dueDate,
        status,
        invoiceImage,
        company,
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    return { success: true, invoice: newInvoice };
  } catch (error) {
    console.error("Failed to create invoice:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}
