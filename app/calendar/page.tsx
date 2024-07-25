import CalendarClient from "./_components/CalendarClient";
import prisma from "@/lib/prisma";

async function getJobs() {
  "use server";

  const jobs = await prisma.job.findMany({
    where: {
      startDate: { not: null },
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return jobs;
}

export default async function CalendarPage() {
  const jobs = await getJobs();

  return <CalendarClient />;
}
