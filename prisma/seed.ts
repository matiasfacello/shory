import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tier1 = await prisma.plans.create({
    data: {
      name: "tier1",
      title: "Tier 1",
      linkQuota: 10,
    },
  });
  const tier2 = await prisma.plans.create({
    data: {
      name: "tier2",
      title: "Tier 2",
      linkQuota: 50,
    },
  });

  console.log({ tier1, tier2 });
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
