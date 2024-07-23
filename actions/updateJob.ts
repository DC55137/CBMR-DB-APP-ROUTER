// app/actions/updateJob.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Job, JobStage } from "@prisma/client";

export async function updateJob(data: Partial<Job>) {
  try {
    const updatedJob = await prisma.job.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        stage: data.stage as JobStage,
        address: data.address,
        notes: data.notes,
        quoteImage: data.quoteImage,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        image4: data.image4,
        // Add other fields as necessary
      },
    });

    revalidatePath("/jobs");
    revalidatePath(`/job/${data.id}`);

    return { success: true, job: updatedJob };
  } catch (error) {
    console.error("Failed to update job:", error);
    return { success: false, error: "Failed to update job" };
  }
}
