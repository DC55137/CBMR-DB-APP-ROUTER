// app/jobs/page.tsx
import { unstable_noStore as noStore } from "next/cache";
import getJobs from "@/actions/getJobs";
import Table from "./_components/Table";

export default async function JobPage() {
  noStore();
  const jobs = await getJobs();

  if (!jobs) {
    return <div>Failed to load jobs</div>;
  }

  return (
    <div className="min-h-full bg-main-1">
      <main className="pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-20">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
            Jobs
          </h1>
          <Table initialJobs={jobs} />
        </div>
      </main>
    </div>
  );
}
