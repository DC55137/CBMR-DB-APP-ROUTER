// app/actions/updateJob.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

type JobUpdateData = Prisma.JobUpdateInput & { id: string };

export async function updateJob(data: JobUpdateData) {
  const { id, ...updateData } = data;
  try {
    const updatedJob = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/jobs");
    revalidatePath(`/job/${id}`);

    return { success: true, job: updatedJob };
  } catch (error) {
    console.error("Failed to update job:", error);
    return { success: false, error: "Failed to update job" };
  }
}
