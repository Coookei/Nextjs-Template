import prisma from "@/lib/prisma";
import type { CreateUserInput } from "@/lib/validators/users";

export const usersApi = {
  list: async () => {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  create: async (payload: CreateUserInput) => {
    return await prisma.user.create({
      data: payload,
    });
  },
};
