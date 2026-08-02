import prisma from "../config/prisma.js";

export const getAnalytics = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "asc",
    },
  });

  const monthlyData = {};
  const categoryData = {};

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    const month = transaction.date.toISOString().slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = {
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "INCOME") {
      income += transaction.amount;
      monthlyData[month].income += transaction.amount;
    } else {
      expense += transaction.amount;
      monthlyData[month].expense += transaction.amount;
    }

    categoryData[transaction.category] =
      (categoryData[transaction.category] || 0) +
      transaction.amount;
  });

  return {
    income,
    expense,
    balance: income - expense,
    monthlyData,
    categoryData,
  };
};