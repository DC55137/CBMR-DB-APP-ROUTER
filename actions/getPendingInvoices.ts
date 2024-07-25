// actions/getPendingInvoices.ts
"use server";

import prisma from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function getPendingInvoices() {
  try {
    const pendingInvoices = await prisma.invoice.findMany({
      where: {
        status: InvoiceStatus.PENDING,
      },
      include: {
        job: {
          select: {
            id: true,
            number: true,
            address: true,
            name: true,
          },
        },
      },
      orderBy: [{ job: { number: "asc" } }, { dueDate: "asc" }],
    });

    return pendingInvoices;
  } catch (error) {
    console.error("Failed to fetch pending invoices:", error);
    throw new Error("Failed to fetch pending invoices");
  }
}
