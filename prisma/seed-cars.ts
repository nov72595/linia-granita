import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { allBrands } from './car-data';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚗 Starting car database seeding...\n');
  console.log(`   Total brands to seed: ${allBrands.length}\n`);

  let brandCount = 0;
  let modelCount = 0;
  let genCount = 0;

  for (const brandData of allBrands) {
    const brand = await prisma.carBrand.upsert({
      where: { name: brandData.name },
      update: {},
      create: { name: brandData.name },
    });
    brandCount++;

    for (const modelData of brandData.models) {
      const vType = modelData.vehicleType ?? 'car';
      const model = await prisma.carModel.upsert({
        where: { brandId_name: { brandId: brand.id, name: modelData.name } },
        update: { vehicleType: vType },
        create: { name: modelData.name, brandId: brand.id, vehicleType: vType },
      });
      modelCount++;

      for (const gen of modelData.generations) {
        const existing = await prisma.carGeneration.findFirst({
          where: { modelId: model.id, name: gen.name },
        });

        if (existing) {
          await prisma.carGeneration.update({
            where: { id: existing.id },
            data: {
              yearFrom: gen.yearFrom,
              yearTo: gen.yearTo,
              bodyType: gen.bodyType,
            },
          });
        } else {
          await prisma.carGeneration.create({
            data: {
              name: gen.name,
              yearFrom: gen.yearFrom,
              yearTo: gen.yearTo,
              bodyType: gen.bodyType,
              modelId: model.id,
            },
          });
        }
        genCount++;
      }
    }

    console.log(`  ✅ ${brandData.name} — ${brandData.models.length} models`);
  }

  console.log(`\n🏁 Seeding complete!`);
  console.log(`   Brands:      ${brandCount}`);
  console.log(`   Models:      ${modelCount}`);
  console.log(`   Generations: ${genCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
