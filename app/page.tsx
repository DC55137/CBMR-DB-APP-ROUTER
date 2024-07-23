// app/page.tsx
import { Suspense } from "react";
import getJobs from "@/actions/getJobs";
import { JobStage } from "@prisma/client";
import { JobStagePieChart } from "@/components/ui/JobStagePieChart";
import Link from "next/link";
import { PATH_JOB, PATH_PAGE } from "@/routes/path";
import { Briefcase, FileText, PlusCircle } from "lucide-react";
import RecentActivity from "./_components/RecentActivity";
import QuickMetrics from "./_components/QuickMetrics";

type JobCounts = Partial<Record<JobStage, number>>;

export default async function Home() {
  const jobs = await getJobs();

  const jobCounts: JobCounts = jobs.reduce((counts, job) => {
    counts[job.stage] = (counts[job.stage] || 0) + 1;
    return counts;
  }, {} as JobCounts);

  const recentJobs = jobs.slice(0, 5);
  const completionRate =
    jobs.length > 0
      ? ((Number(jobCounts.completed || 0) / jobs.length) * 100).toFixed(2)
      : "0";

  const averageJobsPerDay = (() => {
    const days = new Set(
      jobs.map((job) => job.date.toISOString().split("T")[0])
    ).size;
    return days > 0 ? (jobs.length / days).toFixed(2) : "0";
  })();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="pb-10 bg-gray-900">
        <div className="container mx-auto my-20">
          <div className="space-y-8">
            <h1 className="text-3xl font-semibold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <JobStagePieChart jobCounts={jobCounts} />

              <Suspense fallback={<div>Loading recent activity...</div>}>
                <RecentActivity recentJobs={recentJobs} />
              </Suspense>

              <Suspense fallback={<div>Loading quick metrics...</div>}>
                <QuickMetrics jobs={jobs} jobCounts={jobCounts} />
              </Suspense>

              <Link
                href={`${PATH_JOB.new}`}
                className="bg-green-600 hover:bg-green-700 p-6 rounded-lg shadow transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Add New Job</h2>
                    <p className="text-green-200">Create a new job entry</p>
                  </div>
                  <PlusCircle size={32} />
                </div>
              </Link>

              <Link
                href={`${PATH_JOB.root}`}
                className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg shadow transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Go to Jobs</h2>
                    <p className="text-blue-200">View and manage all jobs</p>
                  </div>
                  <Briefcase size={32} />
                </div>
              </Link>

              <Link
                href={`${PATH_PAGE.bills}`}
                className="bg-purple-600 hover:bg-purple-700 p-6 rounded-lg shadow transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Bills to Pay</h2>
                    <p className="text-purple-200">Manage outstanding bills</p>
                  </div>
                  <FileText size={32} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
