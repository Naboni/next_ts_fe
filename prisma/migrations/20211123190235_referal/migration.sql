-- CreateTable
CREATE TABLE "referal" (
    "id" TEXT NOT NULL,
    "referedId" TEXT NOT NULL,
    "isNotFake" BOOLEAN NOT NULL DEFAULT false,
    "referrerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "referal_referedId_key" ON "referal"("referedId");

-- AddForeignKey
ALTER TABLE "referal" ADD CONSTRAINT "referal_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
