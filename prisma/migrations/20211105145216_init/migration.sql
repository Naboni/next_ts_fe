/*
  Warnings:

  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Pv" AS ENUM ('INITIAL', 'APPROVED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isVerified",
ADD COLUMN     "profileVerification" "Pv" NOT NULL DEFAULT E'INITIAL';
