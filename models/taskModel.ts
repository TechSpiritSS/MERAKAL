import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (taskData: any) => {
  return prisma.task.create({
    data: taskData,
  });
};

export const getTasks = async () => {
  return prisma.task.findMany();
};

export const getTasksByStatus = async (status: string) => {
  return prisma.task.findMany({
    where: { status },
  });
};
