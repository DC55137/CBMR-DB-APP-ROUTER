"use server";
import prisma from "@/lib/prisma";

export default async function getJobs() {
  const jobs = await prisma.job.findMany({});
  if (!jobs) {
    throw new Error("Jobs not found");
  }
  return jobs;
}
