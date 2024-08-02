// app/actions/getJob.ts
"use server";

import prisma from "@/lib/prisma";
import { Job, Invoice } from "@prisma/client";

export type JobWithInvoices = Job & { invoices: Invoice[] };

export async function getJob(id: string): Promise<JobWithInvoices | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        invoices: true,
      },
    });
    return job;
  } catch (error) {
    console.error("Failed to fetch job:", error);
    return null;
  }
}
