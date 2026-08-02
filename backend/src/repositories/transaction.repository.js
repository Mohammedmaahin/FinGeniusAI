import prisma from "../config/prisma.js";

export const create = (data) => {
  return prisma.transaction.create({ data });
};

export const findAllByUser = (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
};

export const findById = (id, userId) => {
  return prisma.transaction.findFirst({
    where: { id, userId },
  });
};

export const update = (id, data) => {
  return prisma.transaction.update({
    where: { id },
    data,
  });
};

export const remove = (id) => {
  return prisma.transaction.delete({
    where: { id },
  });
};