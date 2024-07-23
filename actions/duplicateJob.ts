"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function duplicateJob(
  jobId: string,
  numberOfDuplicates: number
) {
  try {
    const originalJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!originalJob) {
      return { success: false, message: "Job not found" };
    }

    // Find the highest job number
    const highestNumberJob = await prisma.job.findFirst({
      orderBy: { number: "desc" },
      select: { number: true },
    });

    let nextJobNumber = (highestNumberJob?.number || 0) + 1;

    const duplicates = [];

    for (let i = 0; i < numberOfDuplicates; i++) {
      const newJob = await prisma.job.create({
        data: {
          ...originalJob,
          stage: "lead", // Set the stage to 'lead' for the new job
          id: undefined, // Allow Prisma to generate a new ID
          number: nextJobNumber, // Assign the next available number
          date: new Date(), // Set the current date for the new job
        },
      });
      duplicates.push(newJob);
      nextJobNumber++; // Increment for the next duplicate
    }

    const updatedJobs = await prisma.job.findMany(); // Fetch all jobs
    revalidatePath("/jobs");

    return {
      success: true,
      message: `Successfully created ${numberOfDuplicates} duplicate(s)`,
      jobs: updatedJobs, // Return all jobs
    };
  } catch (error) {
    console.error("Failed to duplicate job:", error);
    return { success: false, message: "Failed to duplicate job" };
  }
}
