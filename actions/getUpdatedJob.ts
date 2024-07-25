// actions/getUpdatedJob.ts
"use server";

import prisma from "@/lib/prisma";

export async function getUpdatedJob(jobId: string) {
  const updatedJob = await prisma.job.findUnique({
    where: { id: jobId },
    include: { invoices: true },
  });
  return updatedJob;
}
