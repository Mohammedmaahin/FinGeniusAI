import prisma from "../config/prisma.js";

export const getCachedAdvice = async (userId) => {
  const advice = await prisma.aIAdvice.findUnique({
    where: {
      userId,
    },
  });

  if (!advice) return null;

  const age =
    Date.now() - new Date(advice.createdAt).getTime();

  const TEN_MINUTES = 10 * 60 * 1000;

if (age > TEN_MINUTES) {
  return null;
}

  return advice.advice;
};

export const saveAdvice = async (userId, advice) => {
  return prisma.aIAdvice.upsert({
    where: {
      userId,
    },
    update: {
      advice,
      createdAt: new Date(),
    },
    create: {
      userId,
      advice,
    },
  });
};

export const clearAdviceCache = async (userId) => {
  return prisma.aIAdvice.deleteMany({
    where: {
      userId,
    },
  });
};