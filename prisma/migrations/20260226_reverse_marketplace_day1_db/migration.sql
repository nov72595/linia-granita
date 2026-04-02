-- CreateEnum
CREATE TYPE "DriverRole" AS ENUM ('DRIVER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TenderCategory" AS ENUM ('EARTHWORKS', 'LIFTING', 'FREIGHT', 'SAND_GRAVEL_DELIVERY');

-- CreateEnum
CREATE TYPE "TenderStatus" AS ENUM ('OPEN', 'EXPIRED', 'ASSIGNED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "DriverRole" NOT NULL DEFAULT 'DRIVER';

-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL,
    "category" "TenderCategory" NOT NULL,
    "address" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "comment" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "TenderStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedDriverId" TEXT,
    "createdFromIp" TEXT,
    "createdFromUa" TEXT,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
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

-- CreateTable
CREATE TABLE "VehicleBusySlot" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleBusySlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenderResponse" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "message" TEXT,
    "offeredPrice" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenderResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tender_status_idx" ON "Tender"("status");

-- CreateIndex
CREATE INDEX "Tender_expiresAt_idx" ON "Tender"("expiresAt");

-- CreateIndex
CREATE INDEX "Tender_category_idx" ON "Tender"("category");

-- CreateIndex
CREATE INDEX "Tender_createdAt_idx" ON "Tender"("createdAt");

-- CreateIndex
CREATE INDEX "Vehicle_driverId_status_idx" ON "Vehicle"("driverId", "status");

-- CreateIndex
CREATE INDEX "VehicleBusySlot_vehicleId_idx" ON "VehicleBusySlot"("vehicleId");

-- CreateIndex
CREATE INDEX "VehicleBusySlot_startsAt_idx" ON "VehicleBusySlot"("startsAt");

-- CreateIndex
CREATE INDEX "VehicleBusySlot_endsAt_idx" ON "VehicleBusySlot"("endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "TenderResponse_tenderId_driverId_key" ON "TenderResponse"("tenderId", "driverId");

-- CreateIndex
CREATE INDEX "TenderResponse_tenderId_idx" ON "TenderResponse"("tenderId");

-- CreateIndex
CREATE INDEX "TenderResponse_driverId_idx" ON "TenderResponse"("driverId");

-- CreateIndex
CREATE INDEX "TenderResponse_vehicleId_idx" ON "TenderResponse"("vehicleId");

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_assignedDriverId_fkey" FOREIGN KEY ("assignedDriverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleBusySlot" ADD CONSTRAINT "VehicleBusySlot_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderResponse" ADD CONSTRAINT "TenderResponse_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderResponse" ADD CONSTRAINT "TenderResponse_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderResponse" ADD CONSTRAINT "TenderResponse_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
