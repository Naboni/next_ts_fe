/*
  Warnings:

  - The `acceptedInvitations` column on the `campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pendingInvitations` column on the `campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rejectedInvitations` column on the `campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "campaign" DROP COLUMN "acceptedInvitations",
ADD COLUMN     "acceptedInvitations" JSONB[],
DROP COLUMN "pendingInvitations",
ADD COLUMN     "pendingInvitations" JSONB[],
DROP COLUMN "rejectedInvitations",
ADD COLUMN     "rejectedInvitations" JSONB[];
