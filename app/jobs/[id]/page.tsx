// app/job/[id]/page.tsx

import { notFound } from "next/navigation";
import { getJob } from "@/actions/getJob";
import JobGeneral from "./_components/JobGeneral";
import Tabs from "./_components/Tabs";

interface ViewJobProps {
  params: { id: string };
}

export default async function ViewJob({ params }: ViewJobProps) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  const TABS = [
    {
      value: "general",
      label: "General",
      icon: "ic:round-account-box",
      component: <JobGeneral job={job} />,
    },
    // Add more tabs here in the future
  ];

  return (
    <div className="min-h-full bg-[#161c25]">
      <main className="container mx-auto pb-10">
        <Tabs tabs={TABS} />
      </main>
    </div>
  );
}
