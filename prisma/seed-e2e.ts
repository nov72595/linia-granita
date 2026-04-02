import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../app/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

const E2E_PASSWORD = 'Testpass123!';
const E2E_DRIVER_EMAIL = 'driver.e2e@shukai.test';
const E2E_ADMIN_EMAIL = 'admin.e2e@shukai.test';
const E2E_VEHICLE_ID = 'veh-e2e-freight-1';

async function main() {
  const passwordHash = await bcrypt.hash(E2E_PASSWORD, 10);

  const driver = await prisma.user.upsert({
    where: { email: E2E_DRIVER_EMAIL },
    update: {
      name: 'E2E Driver',
      passwordHash,
      type: 'PERSONAL',
      role: 'DRIVER',
      verified: true,
      phone: '+375291111111',
      city: 'Минск',
    },
    create: {
      email: E2E_DRIVER_EMAIL,
      name: 'E2E Driver',
      passwordHash,
      type: 'PERSONAL',
      role: 'DRIVER',
      verified: true,
      phone: '+375291111111',
      city: 'Минск',
    },
    select: { id: true },
  });

  await prisma.user.upsert({
    where: { email: E2E_ADMIN_EMAIL },
    update: {
      name: 'E2E Admin',
      passwordHash,
      type: 'PERSONAL',
      role: 'ADMIN',
      verified: true,
      phone: '+375292222222',
      city: 'Минск',
    },
    create: {
      email: E2E_ADMIN_EMAIL,
      name: 'E2E Admin',
      passwordHash,
      type: 'PERSONAL',
      role: 'ADMIN',
      verified: true,
      phone: '+375292222222',
      city: 'Минск',
    },
  });

  await prisma.vehicle.upsert({
    where: { id: E2E_VEHICLE_ID },
    update: {
      driverId: driver.id,
      title: 'E2E Самосвал',
      category: 'FREIGHT',
      plateNumber: 'E2E-001',
      status: 'ACTIVE',
    },
    create: {
      id: E2E_VEHICLE_ID,
      driverId: driver.id,
      title: 'E2E Самосвал',
      category: 'FREIGHT',
      plateNumber: 'E2E-001',
      status: 'ACTIVE',
    },
  });

  await prisma.carBrand.upsert({
    where: { name: 'E2EBrand' },
    update: {},
    create: { name: 'E2EBrand' },
  });

  console.log(
    JSON.stringify({
      ok: true,
      seed: 'e2e',
      users: [E2E_DRIVER_EMAIL, E2E_ADMIN_EMAIL],
      vehicleId: E2E_VEHICLE_ID,
    }),
  );
}

main()
  .catch((error) => {
    console.error('seed-e2e failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
