import prisma from "../config/prisma.js";
import { clearAdviceCache } from "./aiCache.service.js";

export const createGoal = async (userId, data) => {
  const goal = await prisma.goal.create({
    data: {
      title: data.title,
      targetAmount: data.targetAmount,
      deadline: new Date(data.deadline),
      userId,
    },
  });

  await clearAdviceCache(userId);

  return goal;
};

export const getGoals = async (userId) => {
  return prisma.goal.findMany({
    where: {
      userId,
    },
    orderBy: {
      deadline: "asc",
    },
  });
};

export const updateGoal = async (id, userId, data) => {
  const goal = await prisma.goal.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!goal) {
    throw new Error("Goal not found");
  }

  const updatedGoal = await prisma.goal.update({
    where: {
      id,
    },
    data: {
      ...data,
      deadline: data.deadline
        ? new Date(data.deadline)
        : undefined,
    },
  });

  await clearAdviceCache(userId);

  return updatedGoal;
};

export const deleteGoal = async (id, userId) => {
  const goal = await prisma.goal.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!goal) {
    throw new Error("Goal not found");
  }

  await prisma.goal.delete({
    where: {
      id,
    },
  });

  await clearAdviceCache(userId);

  return goal;
};