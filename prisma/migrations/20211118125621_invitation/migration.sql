/*
  Warnings:

  - You are about to drop the column `from` on the `invitation` table. All the data in the column will be lost.
  - Added the required column `brandName` to the `invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaignId` to the `invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invitation" DROP COLUMN "from",
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "campaignId" TEXT NOT NULL;
