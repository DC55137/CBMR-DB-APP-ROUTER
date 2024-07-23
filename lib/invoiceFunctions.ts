// app/lib/invoiceFunctions.ts

import prisma from "./prisma";

export const getMonthlyRevenue = async (): Promise<string> => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const result = await prisma.invoice.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      issueDate: { gte: startOfMonth },
      status: "PAID",
    },
  });

  const totalRevenue = result._sum.amount || 0;
  return totalRevenue.toFixed(2);
};

export const getUnpaidInvoicesCount = async (): Promise<number> => {
  return await prisma.invoice.count({
    where: {
      status: {
        in: ["PENDING", "OVERDUE"],
      },
    },
  });
};

export const getAverageInvoiceAmount = async (): Promise<string> => {
  const result = await prisma.invoice.aggregate({
    _avg: {
      amount: true,
    },
    where: {
      status: "PAID",
    },
  });

  const averageAmount = result._avg.amount || 0;
  return averageAmount.toFixed(2);
};
