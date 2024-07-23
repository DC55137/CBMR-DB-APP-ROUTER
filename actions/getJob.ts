// app/actions/getJob.ts
"use server";

import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";

export async function getJob(id: string): Promise<Job | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });
    return job;
  } catch (error) {
    console.error("Failed to fetch job:", error);
    return null;
  }
}
