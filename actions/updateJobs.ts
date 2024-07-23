"use server";

import prisma from "@/lib/prisma";
import { Job, JobStage } from "@prisma/client";

export default async function updateJobs({
  jobs,
  stage,
}: {
  jobs: Job[];
  stage: JobStage;
}) {
  const updatePromises = jobs.map((job) => {
    return prisma.job.update({
      where: {
        id: job.id,
      },
      data: {
        stage,
      },
    });
  });

  try {
    const updatedJobs = await prisma.$transaction(updatePromises);
    return { jobs: updatedJobs, success: true, message: "Jobs updated" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to update jobs: " + error.message);
    } else {
      throw new Error("Failed to update jobs due to an unknown error");
    }
  }
}
