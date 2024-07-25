// app/page.tsx
import { Suspense } from "react";
import { JobStage } from "@prisma/client";
import { JobStagePieChart } from "@/components/ui/JobStagePieChart";
import Link from "next/link";
import { PATH_JOB, PATH_PAGE } from "@/routes/path";
import { Briefcase, FileText, PlusCircle, Calendar } from "lucide-react";
import RecentActivity from "./_components/RecentActivity";

import ScheduledJobs from "./_components/ScheduledJobs";
import InspectJobs from "./_components/InspectJobs";
import DashboardTodoList from "./_components/DashboardTodoList";
import prisma from "@/lib/prisma";
import updateTodo from "@/actions/updateTodo";

type JobCounts = Partial<Record<JobStage, number>>;

export default async function Home() {
  const jobs = await prisma.job.findMany();
  const todos = await prisma.todo.findMany();

  const jobCounts: JobCounts = jobs.reduce((counts, job) => {
    counts[job.stage] = (counts[job.stage] || 0) + 1;
    return counts;
  }, {} as JobCounts);

  const recentChanges = jobs.filter((job) => job.updatedAt !== null);
  const today = new Date().toISOString().split("T")[0];
  const recentActivity = recentChanges
    .filter((job) => job.updatedAt?.toISOString().split("T")[0] === today)
    .sort((a, b) => {
      const dateA = a.updatedAt || a.date;
      const dateB = b.updatedAt || b.date;
      return dateB.getTime() - dateA.getTime();
    });
  const scheduledJobs = jobs.filter((job) => job.stage === "schedule");
  const inspectJobs = jobs.filter((job) => job.stage === "inspect");

  return (
    <div className="min-h-screen bg-main-1 text-white">
      <main className="pb-10 bg-main-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-20">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <JobStagePieChart jobCounts={jobCounts} />
                <DashboardTodoList todos={todos} />
              </div>

              <Suspense fallback={<div>Loading scheduled jobs...</div>}>
                <ScheduledJobs jobs={scheduledJobs} />
              </Suspense>
              <Suspense fallback={<div>Loading scheduled jobs...</div>}>
                <InspectJobs jobs={inspectJobs} />
              </Suspense>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href={`${PATH_JOB.new}`}
                  className="bg-green-600 hover:bg-green-700 p-4 sm:p-6 rounded-lg shadow transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold mb-2">
                        Add New Job
                      </h2>
                      <p className="text-green-200 text-sm">
                        Create a new job entry
                      </p>
                    </div>
                    <PlusCircle size={32} />
                  </div>
                </Link>

                <Link
                  href={`${PATH_JOB.root}`}
                  className="bg-blue-600 hover:bg-blue-700 p-4 sm:p-6 rounded-lg shadow transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold mb-2">
                        Go to Jobs
                      </h2>
                      <p className="text-blue-200 text-sm">
                        View and manage all jobs
                      </p>
                    </div>
                    <Briefcase size={32} />
                  </div>
                </Link>

                <Link
                  href={`${PATH_PAGE.bills}`}
                  className="bg-purple-600 hover:bg-purple-700 p-4 sm:p-6 rounded-lg shadow transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold mb-2">
                        Bills to Pay
                      </h2>
                      <p className="text-purple-200 text-sm">
                        Manage outstanding bills
                      </p>
                    </div>
                    <FileText size={32} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div>Loading recent activity...</div>}>
                <RecentActivity recentJobs={recentActivity} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
