import prisma from "../config/prisma.js";

export const getDashboard = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "INCOME") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    totalBalance: totalIncome - totalExpense,
    recentTransactions: transactions.slice(0, 5),
  };
};