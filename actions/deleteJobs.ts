"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteJobs(jobIds: string[]) {
  try {
    const deleteResult = await prisma.job.deleteMany({
      where: {
        id: { in: jobIds },
      },
    });

    // After deleting jobs
    const updatedJobs = await prisma.job.findMany(); // Fetch all jobs
    revalidatePath("/jobs");

    return {
      success: true,
      message: `Successfully deleted ${deleteResult.count} job(s)`,
      jobs: updatedJobs, // Return all jobs
    };
  } catch (error) {
    console.error("Failed to delete jobs:", error);
    return { success: false, message: "Failed to delete jobs" };
  }
}
