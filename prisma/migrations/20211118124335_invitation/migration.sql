/*
  Warnings:

  - You are about to drop the column `acceptedInvitations` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `pendingInvitations` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedInvitations` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `acceptedInvitations` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `pendingInvitations` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedInvitations` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "campaign" DROP COLUMN "acceptedInvitations",
DROP COLUMN "pendingInvitations",
DROP COLUMN "rejectedInvitations";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "acceptedInvitations",
DROP COLUMN "pendingInvitations",
DROP COLUMN "rejectedInvitations";

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT E'PENDING',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
