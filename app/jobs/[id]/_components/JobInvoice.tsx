// components/JobInvoice.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Job, Invoice, InvoiceStatus } from "@prisma/client";
import TextField from "./TextField";
import { format } from "date-fns";
import { addInvoice } from "@/actions/addInvoice";
import { updateInvoice } from "@/actions/updateInvoice";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteInvoice } from "@/actions/deleteInvoice";
import { X } from "lucide-react";

interface JobInvoiceProps {
  job: Job & { invoices: Invoice[] };
}

const InvoiceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().optional(),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.nativeEnum(InvoiceStatus),
});

type InvoiceFormData = z.infer<typeof InvoiceSchema>;

export default function JobInvoice({ job: initialJob }: JobInvoiceProps) {
  const [job, setJob] = useState(initialJob);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [invoiceImage, setInvoiceImage] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      issueDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(new Date(), "yyyy-MM-dd"),
      status: InvoiceStatus.PENDING,
    },
  });

  const handleUploadSuccess = (result: any) => {
    const imageUrl = result.info.secure_url;
    setInvoiceImage(imageUrl);
    toast.success("Invoice image uploaded successfully");
  };

  const getNextInvoiceNumber = () => {
    const maxInvoiceNumber = job.invoices.reduce((max, invoice) => {
      const currentNumber = parseInt(invoice.invoiceNumber);
      return currentNumber > max ? currentNumber : max;
    }, 0);
    return (maxInvoiceNumber + 1).toString().padStart(3, "0");
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const result = await deleteInvoice(invoiceId);
        if (result.success) {
          toast.success("Invoice deleted successfully");
          setJob((prevJob) => ({
            ...prevJob,
            invoices: prevJob.invoices.filter((inv) => inv.id !== invoiceId),
          }));
          router.refresh();
        } else {
          toast.error(result.error || "Failed to delete invoice");
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
        toast.error("An error occurred while deleting the invoice");
      }
    }
  };

  const onSubmit = async (data: InvoiceFormData) => {
    setLoading(true);
    try {
      if (editingInvoice) {
        const result = await updateInvoice({
          id: editingInvoice.id,
          company: data.company,
          amount: parseFloat(data.amount),
          description: data.description,
          issueDate: new Date(data.issueDate),
          dueDate: new Date(data.dueDate),
          status: data.status,
          invoiceImage: invoiceImage || editingInvoice.invoiceImage,
        });
        if (result.success) {
          toast.success("Invoice updated successfully");
        } else {
          toast.error("Failed to update invoice");
        }
      } else {
        const invoiceNumber = getNextInvoiceNumber();
        const result = await addInvoice({
          ...data,
          jobId: job.id,
          invoiceNumber,
          amount: parseFloat(data.amount),
          issueDate: new Date(data.issueDate),
          dueDate: new Date(data.dueDate),
          invoiceImage: invoiceImage,
        });
        if ("success" in result && result.success) {
          toast.success("Invoice added successfully");
        } else {
          toast.error("Failed to add invoice");
        }
      }
      reset();
      setShowForm(false);
      setInvoiceImage("");
      setEditingInvoice(null);
      // You might want to refresh the job data here to show the new/updated invoice
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPaymentDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleClosePaymentDetails = () => {
    setSelectedInvoice(null);
  };

  const handleChangeStatus = async (invoice: Invoice) => {
    try {
      const newStatus =
        invoice.status === InvoiceStatus.PAID
          ? InvoiceStatus.PENDING
          : InvoiceStatus.PAID;
      const result = await updateInvoice({ id: invoice.id, status: newStatus });
      if (result.success) {
        toast.success(`Invoice status updated to ${newStatus}`);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update invoice status");
      }
    } catch (error) {
      console.error("Error updating invoice status:", error);
      toast.error("An error occurred while updating the invoice status");
    }
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
    setValue("company", invoice.company);
    setValue("amount", invoice.amount.toString());
    setValue("description", invoice.description || "");
    setValue("issueDate", format(new Date(invoice.issueDate), "yyyy-MM-dd"));
    setValue("dueDate", format(new Date(invoice.dueDate), "yyyy-MM-dd"));
    setValue("status", invoice.status);
    setInvoiceImage(invoice.invoiceImage || "");
  };

  return (
    <div className="mx-auto w-full md:w-[1000px]">
      <h1 className="my-2 mb-4 text-2xl text-white">
        Invoices for Job {job.number}
      </h1>

      {/* Existing Invoices */}
      {job.invoices.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl text-white mb-2">Existing Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-slate-700">
                  <th className="p-2">Invoice Number</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {job.invoices.map((invoice) => (
                  <tr key={invoice.id} className="bg-slate-800">
                    <td className="p-2">{invoice.invoiceNumber}</td>
                    <td className="p-2">{invoice.company}</td>
                    <td className="p-2">${invoice.amount.toFixed(2)}</td>
                    <td className="p-2">
                      {format(new Date(invoice.dueDate), "dd/MM/yyyy")}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          invoice.status === InvoiceStatus.PAID
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-2 flex justify-between">
                      <div>
                        <button
                          onClick={() => handleEditInvoice(invoice)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        {invoice.invoiceImage && (
                          <button
                            onClick={() => handleShowPaymentDetails(invoice)}
                            className="bg-purple-500 text-white px-2 py-1 rounded mr-2 hover:bg-purple-600"
                          >
                            Details
                          </button>
                        )}
                        <button
                          onClick={() => handleChangeStatus(invoice)}
                          className={`text-white px-2 py-1 rounded ${
                            invoice.status === InvoiceStatus.PAID
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {invoice.status === InvoiceStatus.PAID
                            ? "Mark Unpaid"
                            : "Mark Paid"}
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        <X className="w-4 h-4 " />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-white mb-6">No invoices found for this job.</p>
      )}

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-xl text-white mb-4">Invoice Details</h2>
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
              onClick={handleClosePaymentDetails}
              className="bg-main-500 text-white px-4 py-2 rounded hover:bg-main-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Invoice Button */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          if (!showForm) {
            reset();
            setEditingInvoice(null);
            setInvoiceImage("");
          }
        }}
        className="mb-4 bg-main-500 text-white px-4 py-2 rounded hover:bg-main-600"
      >
        {showForm
          ? "Cancel"
          : editingInvoice
          ? "Edit Invoice"
          : "Add New Invoice"}
      </button>

      {/* Add/Edit Invoice Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-800 p-6 rounded-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <TextField
              title="Company"
              name="company"
              register={register}
              errors={errors}
            />
            <TextField
              title="Amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              register={register}
              errors={errors}
            />
            <TextField
              title="Description"
              name="description"
              register={register}
              errors={errors}
            />
            <TextField
              title="Issue Date"
              name="issueDate"
              type="date"
              register={register}
              errors={errors}
            />
            <TextField
              title="Due Date"
              name="dueDate"
              type="date"
              register={register}
              errors={errors}
            />
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-white"
              >
                Status
              </label>
              <select
                {...register("status")}
                className="mt-1 block w-full rounded-md bg-slate-700 text-white py-2 px-3"
              >
                {Object.values(InvoiceStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            {/* Invoice Image Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-2">
                Invoice Image
              </label>
              {invoiceImage ? (
                <div className="relative h-64 w-full mb-4">
                  <Image
                    src={invoiceImage}
                    alt="Invoice Image"
                    layout="fill"
                    objectFit="contain"
                  />
                  <button
                    type="button"
                    onClick={() => setInvoiceImage("")}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <CldUploadWidget
                  uploadPreset="invoice_images"
                  onSuccess={handleUploadSuccess}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors duration-300"
                    >
                      <span>Click or drag to upload invoice image</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-main-500 text-white px-4 py-2 rounded hover:bg-main-600 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingInvoice
              ? "Update Invoice"
              : "Add Invoice"}
          </button>
        </form>
      )}
    </div>
  );
}
