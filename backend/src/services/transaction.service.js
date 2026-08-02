import prisma from "../config/prisma.js";
import { clearAdviceCache } from "./aiCache.service.js";

export const createTransaction = async (userId, data) => {
  const transaction = await prisma.transaction.create({
    data: {
      ...data,
      userId,
    },
  });

  await clearAdviceCache(userId);

  return transaction;
};

export const getTransactions = async (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
};

export const getTransactionById = async (id, userId) => {
  return prisma.transaction.findFirst({
    where: {
      id,
      userId,
    },
  });
};

export const updateTransaction = async (id, userId, data) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data,
  });

  await clearAdviceCache(userId);

  return updatedTransaction;
};

export const deleteTransaction = async (id, userId) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  await prisma.transaction.delete({
    where: {
      id,
    },
  });

  await clearAdviceCache(userId);

  return transaction;
};