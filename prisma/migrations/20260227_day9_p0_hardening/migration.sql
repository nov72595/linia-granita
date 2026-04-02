-- CreateTable
CREATE TABLE "AdminAuditLog" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitBucket" (
    "id" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminAuditLog_adminUserId_idx" ON "AdminAuditLog"("adminUserId");

-- CreateIndex
CREATE INDEX "AdminAuditLog_action_idx" ON "AdminAuditLog"("action");

-- CreateIndex
CREATE INDEX "AdminAuditLog_createdAt_idx" ON "AdminAuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimitBucket_policy_key_windowStart_key" ON "RateLimitBucket"("policy", "key", "windowStart");

-- CreateIndex
CREATE INDEX "RateLimitBucket_windowEnd_idx" ON "RateLimitBucket"("windowEnd");

-- CreateIndex
CREATE INDEX "RateLimitBucket_policy_key_windowEnd_idx" ON "RateLimitBucket"("policy", "key", "windowEnd");

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
