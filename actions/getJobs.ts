// app/actions/getJob.ts
"use server";

import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";

export default async function getJobs(): Promise<Job[]> {
  try {
    const jobs = await prisma.job.findMany({});
    return jobs;
  } catch (error) {
    console.error("Failed to fetch job:", error);
    return [];
  }
}
