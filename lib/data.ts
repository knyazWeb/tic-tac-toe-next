import prisma from "@/prisma/prisma";

export async function getAllUsers() {
  try {
    const data = prisma.user.findMany();
    return data;
  } catch (error) {
    return error.message;
  }
}
