// app/jobs/[id]/page.tsx
import { notFound } from "next/navigation";
import { getJob } from "@/actions/getJob";
import JobGeneral from "./_components/JobGeneral";
import JobQuote from "./_components/JobQuote";
import JobImages from "./_components/JobImages";
import Tabs from "./_components/Tabs";
import JobInvoice from "./_components/JobInvoice";
import prisma from "@/lib/prisma";

interface ViewJobProps {
  params: { id: string };
}

export default async function ViewJob({ params }: ViewJobProps) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      invoices: true,
    },
  });

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
    {
      value: "quote",
      label: "Quote",
      icon: "ic:round-description",
      component: <JobQuote job={job} />,
    },
    {
      value: "images",
      label: "Images",
      icon: "ic:round-image",
      component: <JobImages job={job} />,
    },
    {
      value: "invoices",
      label: "Invoices",
      icon: "ic:round-receipt",
      component: <JobInvoice job={job} />,
    },
  ];

  return (
    <div className="bg-main-1">
      <main className="container mx-auto pb-10">
        <Tabs tabs={TABS} />
      </main>
    </div>
  );
}
