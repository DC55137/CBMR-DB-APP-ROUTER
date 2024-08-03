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
    const confirmMarkAsPaid = window.confirm(
      "Are you sure you want to mark this invoice as paid?"
    );
    if (confirmMarkAsPaid) {
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
    } else {
      toast.info("Invoice not marked as paid ");
    }
  };

  const handleShowDetails = (invoice: InvoiceWithJob) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseDetails = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      {Object.entries(groupedInvoices).map(([jobId, jobInvoices]) => (
        <div key={jobId} className="mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">
            Job #{jobInvoices[0].job.number} - {jobInvoices[0].job.address}
          </h2>
          <p className="text-white mb-2 text-sm sm:text-base">
            Customer: {jobInvoices[0].job.name}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-white mb-4 text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-slate-700">
                  <th className="p-1 sm:p-2">Invoice Number</th>
                  <th className="p-1 sm:p-2">Company</th>
                  <th className="p-1 sm:p-2">Amount</th>
                  <th className="p-1 sm:p-2">Due Date</th>
                  <th className="p-1 sm:p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobInvoices.map((invoice) => (
                  <tr key={invoice.id} className="bg-slate-800">
                    <td className="p-1 sm:p-2">{invoice.invoiceNumber}</td>
                    <td className="p-1 sm:p-2">{invoice.company}</td>
                    <td className="p-1 sm:p-2">${invoice.amount.toFixed(2)}</td>
                    <td className="p-1 sm:p-2">
                      {format(new Date(invoice.dueDate), "dd/MM/yyyy")}
                    </td>
                    <td className="p-1 sm:p-2">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                        <button
                          onClick={() => handleMarkAsPaid(invoice)}
                          className="bg-green-500 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm hover:bg-green-600"
                        >
                          Mark as Paid
                        </button>
                        <button
                          onClick={() => handleShowDetails(invoice)}
                          className="bg-blue-500 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm hover:bg-blue-600"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-2xl">
            <h2 className="text-lg sm:text-xl text-white mb-3 sm:mb-4">
              Invoice Details
            </h2>
            {selectedInvoice.invoiceImage ? (
              <div className="mb-3 sm:mb-4">
                <p className="text-white mb-2">Invoice Image:</p>
                <div className="relative w-full h-48 sm:h-64 md:h-96">
                  <Image
                    src={selectedInvoice.invoiceImage}
                    alt="Invoice"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            ) : (
              <p className="text-white mb-2">No invoice image available</p>
            )}
            <button
              onClick={handleCloseDetails}
              className="bg-main-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-main-600 w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
