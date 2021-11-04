-- CreateTable
CREATE TABLE "claim" (
    "id" TEXT NOT NULL,
    "pasteCode" VARCHAR(255) NOT NULL,
    "tiktokHandle" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "claim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
