// app/page.tsx
import { Suspense } from "react";
import getJobs from "@/actions/getJobs";
import { JobStage } from "@prisma/client";
import { JobStagePieChart } from "@/components/ui/JobStagePieChart";
import Link from "next/link";
import { PATH_JOB, PATH_PAGE } from "@/routes/path";
import { Briefcase, FileText, PlusCircle, Calendar } from "lucide-react";
import RecentActivity from "./_components/RecentActivity";
import QuickMetrics from "./_components/QuickMetrics";
import ScheduledJobs from "./_components/ScheduledJobs";

type JobCounts = Partial<Record<JobStage, number>>;

export default async function Home() {
  const jobs = await getJobs();

  const jobCounts: JobCounts = jobs.reduce((counts, job) => {
    counts[job.stage] = (counts[job.stage] || 0) + 1;
    return counts;
  }, {} as JobCounts);

  const recentChanges = jobs.filter((job) => job.updatedAt !== null);
  const today = new Date().toISOString().split("T")[0];
  const recentActivity = recentChanges.filter(
    (job) => job.updatedAt?.toISOString().split("T")[0] === today
  );

  const scheduledJobs = jobs.filter((job) => job.stage === "schedule");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="pb-10 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-20">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <JobStagePieChart jobCounts={jobCounts} />
                <QuickMetrics jobs={jobs} jobCounts={jobCounts} />
              </div>

              <Suspense fallback={<div>Loading scheduled jobs...</div>}>
                <ScheduledJobs jobs={scheduledJobs} />
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
