/*
  Warnings:

  - You are about to drop the column `creators` on the `campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "campaign" DROP COLUMN "creators",
ADD COLUMN     "acceptedInvitations" TEXT[],
ADD COLUMN     "pendingInvitations" TEXT[],
ADD COLUMN     "rejectedInvitations" TEXT[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "acceptedInvitations" TEXT[],
ADD COLUMN     "pendingInvitations" TEXT[],
ADD COLUMN     "rejectedInvitations" TEXT[];
