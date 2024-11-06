import { PrismaClient } from '@prisma/client';

type CreateUserCategory = {
  userId: number;
  categoryId: number;
};

async function main() {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();

  const data: CreateUserCategory[] = users.map((user) => ({
    userId: user.id,
    categoryId: user.categoryId,
  }));

  console.log(data);

  await prisma.userCategory.createMany({
    data,
  });
}

main();
