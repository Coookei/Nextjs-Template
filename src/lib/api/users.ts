import prisma from "@/lib/prisma";
import type { CreateUserInput } from "@/lib/validators/users";

// example abstract functions for users with prisma implementation

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(input: CreateUserInput) {
  return await prisma.user.create({
    data: input,
  });
}
