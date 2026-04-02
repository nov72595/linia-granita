-- CreateEnum (idempotent)
DO $$
BEGIN
  CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'INACTIVE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- CreateTable Vehicle
CREATE TABLE IF NOT EXISTS "Vehicle" (
  "id" TEXT NOT NULL,
  "driverId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "category" "TenderCategory" NOT NULL,
  "payloadTons" DOUBLE PRECISION,
  "bodyVolumeM3" DOUBLE PRECISION,
  "plateNumber" TEXT,
  "status" "VehicleStatus" NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable VehicleBusySlot
CREATE TABLE IF NOT EXISTS "VehicleBusySlot" (
  "id" TEXT NOT NULL,
  "vehicleId" TEXT NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "endsAt" TIMESTAMP(3) NOT NULL,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "VehicleBusySlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey Vehicle.driverId -> User.id (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Vehicle_driverId_fkey'
  ) THEN
    ALTER TABLE "Vehicle"
      ADD CONSTRAINT "Vehicle_driverId_fkey"
      FOREIGN KEY ("driverId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey VehicleBusySlot.vehicleId -> Vehicle.id (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'VehicleBusySlot_vehicleId_fkey'
  ) THEN
    ALTER TABLE "VehicleBusySlot"
      ADD CONSTRAINT "VehicleBusySlot_vehicleId_fkey"
      FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Vehicle_driverId_idx" ON "Vehicle"("driverId");
CREATE INDEX IF NOT EXISTS "Vehicle_category_idx" ON "Vehicle"("category");
CREATE INDEX IF NOT EXISTS "Vehicle_status_idx" ON "Vehicle"("status");
CREATE INDEX IF NOT EXISTS "VehicleBusySlot_vehicleId_startsAt_endsAt_idx" ON "VehicleBusySlot"("vehicleId", "startsAt", "endsAt");
