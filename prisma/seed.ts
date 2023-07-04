import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tier0 = await prisma.plans.create({
    data: {
      name: "tier0",
      title: "Free Plan",
      linkQuota: 10,
    },
  });
  const tier1 = await prisma.plans.create({
    data: {
      name: "tier1",
      title: "Basic Plan",
      linkQuota: 50,
    },
  });
  const tier2 = await prisma.plans.create({
    data: {
      name: "tier2",
      title: "Standard Plan",
      linkQuota: 200,
    },
  });

  console.log({ tier0, tier1, tier2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
