// app/actions/addJob.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const JobSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  stage: z
    .enum([
      "lead",
      "inspect",
      "schedule",
      "missed",
      "completed",
      "subcontractors",
      "followup",
      "accepted",
      "website",
    ])
    .default("lead"),
});

export async function addJob(formData: FormData) {
  const validatedFields = JobSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    address: formData.get("address"),
    notes: formData.get("notes"),
    stage: formData.get("stage"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  let { name, email, mobile, address, notes, stage } = validatedFields.data;

  if (email) {
    // Remove "mailto:" and colon from email
    email = email.replace(/^mailto:/, "");
  }
  if (mobile) {
    // Remove "tel:" and colon from mobile
    mobile = mobile.replace(/^tel:/, "");
  }

  try {
    // Find the highest job number
    const highestJob = await prisma.job.findFirst({
      orderBy: {
        number: "desc",
      },
      select: {
        number: true,
      },
    });

    const newJobNumber = (highestJob?.number ?? 0) + 1;

    // Create the new job with the incremented number
    const newJob = await prisma.job.create({
      data: {
        name,
        email,
        mobile,
        address,
        notes,
        stage,
        number: newJobNumber,
        date: new Date(),
      },
    });

    revalidatePath("/jobs");
    return { success: true, job: newJob };
  } catch (error) {
    return { error: "Failed to create job" };
  }
}

export async function getHighestJobNumber() {
  try {
    const highestJob = await prisma.job.findFirst({
      orderBy: {
        number: "desc",
      },
      select: {
        number: true,
      },
    });

    return { highestNumber: highestJob?.number ?? 0 };
  } catch (error) {
    return { error: "Failed to get highest job number" };
  }
}
