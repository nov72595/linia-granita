-- CreateEnum
CREATE TYPE "TenderCategory" AS ENUM ('EARTHWORKS', 'LIFTING', 'FREIGHT', 'SAND_GRAVEL_DELIVERY');

-- CreateEnum
CREATE TYPE "TenderStatus" AS ENUM ('OPEN', 'ASSIGNED', 'EXPIRED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Tender" (
  "id" TEXT NOT NULL,
  "category" "TenderCategory" NOT NULL,
  "equipmentType" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "scheduledAt" TIMESTAMP(3) NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "comment" TEXT,
  "ttlMinutes" INTEGER NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "status" "TenderStatus" NOT NULL DEFAULT 'OPEN',
  "assignedDriverId" TEXT,
  "createdFromIp" TEXT,
  "createdFromUa" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tender"
ADD CONSTRAINT "Tender_assignedDriverId_fkey"
FOREIGN KEY ("assignedDriverId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "Tender_status_idx" ON "Tender"("status");
CREATE INDEX "Tender_expiresAt_idx" ON "Tender"("expiresAt");
CREATE INDEX "Tender_category_idx" ON "Tender"("category");
CREATE INDEX "Tender_createdAt_idx" ON "Tender"("createdAt");
CREATE INDEX "Tender_assignedDriverId_idx" ON "Tender"("assignedDriverId");

