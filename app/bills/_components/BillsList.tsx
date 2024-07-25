// components/BillsList.tsx
"use client";

import { useState, useMemo } from "react";
import { Invoice, InvoiceStatus, Job } from "@prisma/client";
import { format } from "date-fns";
import { updateInvoice } from "@/actions/updateInvoice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

type InvoiceWithJob = Invoice & {
  job: Pick<Job, "id" | "number" | "address" | "name">;
};

interface BillsListProps {
  initialInvoices: InvoiceWithJob[];
}

export default function BillsList({ initialInvoices }: BillsListProps) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithJob | null>(
    null
  );
  const router = useRouter();

  const groupedInvoices = useMemo(() => {
    const groups: Record<string, InvoiceWithJob[]> = {};
    invoices.forEach((invoice) => {
      if (!groups[invoice.job.id]) {
        groups[invoice.job.id] = [];
      }
      groups[invoice.job.id].push(invoice);
    });
    return groups;
  }, [invoices]);

  const handleMarkAsPaid = async (invoice: InvoiceWithJob) => {
    try {
      const result = await updateInvoice({
        id: invoice.id,
        status: InvoiceStatus.PAID,
      });
      if (result.success) {
        toast.success("Invoice marked as paid");
        setInvoices((prevInvoices) =>
          prevInvoices.filter((inv) => inv.id !== invoice.id)
        );
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update invoice");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("An error occurred while updating the invoice");
    }
  };

  const handleShowDetails = (invoice: InvoiceWithJob) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseDetails = () => {
    setSelectedInvoice(null);
  };

  return (
    <div>
      {Object.entries(groupedInvoices).map(([jobId, jobInvoices]) => (
        <div key={jobId} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Job #{jobInvoices[0].job.number} - {jobInvoices[0].job.address}
          </h2>
          <p className="text-white mb-2">Customer: {jobInvoices[0].job.name}</p>
          <table className="w-full text-white mb-4">
            <thead>
              <tr className="bg-slate-700">
                <th className="p-2">Invoice Number</th>
                <th className="p-2">Company</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobInvoices.map((invoice) => (
                <tr key={invoice.id} className="bg-slate-800">
                  <td className="p-2">{invoice.invoiceNumber}</td>
                  <td className="p-2">{invoice.company}</td>
                  <td className="p-2">${invoice.amount.toFixed(2)}</td>
                  <td className="p-2">
                    {format(new Date(invoice.dueDate), "dd/MM/yyyy")}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleMarkAsPaid(invoice)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => handleShowDetails(invoice)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-xl text-white mb-4">Invoice Details</h2>
            <p className="text-white mb-2">
              Invoice Number: {selectedInvoice.invoiceNumber}
            </p>
            <p className="text-white mb-2">
              Company: {selectedInvoice.company}
            </p>
            <p className="text-white mb-2">
              Amount: ${selectedInvoice.amount.toFixed(2)}
            </p>
            <p className="text-white mb-2">
              Due Date:{" "}
              {format(new Date(selectedInvoice.dueDate), "dd/MM/yyyy")}
            </p>
            <p className="text-white mb-2">
              Job Number: {selectedInvoice.job.number}
            </p>
            <p className="text-white mb-2">
              Job Address: {selectedInvoice.job.address}
            </p>
            <p className="text-white mb-2">
              Customer: {selectedInvoice.job.name}
            </p>
            <p className="text-white mb-2">
              Description: {selectedInvoice.description}
            </p>
            {selectedInvoice.invoiceImage && (
              <div className="mb-4">
                <p className="text-white mb-2">Invoice Image:</p>
                <Image
                  src={selectedInvoice.invoiceImage}
                  alt="Invoice"
                  width={500}
                  height={500}
                  objectFit="contain"
                />
              </div>
            )}
            <button
              onClick={handleCloseDetails}
              className="bg-main-500 text-white px-4 py-2 rounded hover:bg-main-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
