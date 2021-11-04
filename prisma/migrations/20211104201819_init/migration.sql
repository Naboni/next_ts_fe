/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `claim` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "claim_userId_key" ON "claim"("userId");
