// app/bills/page.tsx
import { Suspense } from "react";
import BillsList from "./_components/BillsList";
import { getPendingInvoices } from "@/actions/getPendingInvoices";

export default async function BillsPage() {
  const pendingInvoices = await getPendingInvoices();

  return (
    <div className="container mx-auto px-4 py-8 bg-main-1">
      <h1 className="text-3xl font-bold mb-6 text-white">Bills to Pay</h1>
      <Suspense fallback={<div>Loading bills...</div>}>
        <BillsList initialInvoices={pendingInvoices} />
      </Suspense>
    </div>
  );
}
