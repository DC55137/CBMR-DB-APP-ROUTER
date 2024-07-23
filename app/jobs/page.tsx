// app/jobs/page.tsx
import getJobs from "@/actions/getJobs";
import Table from "./_components/Table";

export default async function JobPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-full bg-main-1">
      <main className="pb-10">
        <div className="container mx-auto my-20">
          <h1 className="text-3xl font-semibold text-white">Jobs</h1>
          <Table initialJobs={jobs} showExtra={false} />
        </div>
      </main>
    </div>
  );
}
