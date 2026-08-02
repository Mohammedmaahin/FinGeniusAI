import prisma from "../config/prisma.js";

export const generateSummary = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const goals = await prisma.goal.findMany({
    where: {
      userId,
    },
    orderBy: {
      deadline: "asc",
    },
  });

  let income = 0;
  let expense = 0;

  const categories = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "INCOME") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
    }

    categories[transaction.category] =
      (categories[transaction.category] || 0) +
      Number(transaction.amount);
  });

  const savings = income - expense;

  const topCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, amount]) => ({
      category,
      amount,
    }));

  const completedGoals = goals.filter(
    (goal) =>
      goal.status === "COMPLETED" ||
      Number(goal.savedAmount) >= Number(goal.targetAmount)
  ).length;

  return {
    income,
    expense,
    savings,

    totalGoals: goals.length,
    completedGoals,

    topCategories,

    goals: goals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      targetAmount: Number(goal.targetAmount),
      savedAmount: Number(goal.savedAmount),
      deadline: goal.deadline,
      status: goal.status,
    })),

    transactions: transactions.slice(0, 10).map((transaction) => ({
      amount: Number(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      description: transaction.description,
      date: transaction.date,
    })),
  };
};