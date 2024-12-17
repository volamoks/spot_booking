import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllStores = async () => {
  try {
    const stores = await prisma.store.findMany();
    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

export default prisma;
