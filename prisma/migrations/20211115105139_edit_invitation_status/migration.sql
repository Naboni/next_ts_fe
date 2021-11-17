/*
  Warnings:

  - The `acceptedInvitations` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pendingInvitations` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rejectedInvitations` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "campaign" ALTER COLUMN "acceptedInvitations" SET DATA TYPE TEXT[],
ALTER COLUMN "pendingInvitations" SET DATA TYPE TEXT[],
ALTER COLUMN "rejectedInvitations" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "user" DROP COLUMN "acceptedInvitations",
ADD COLUMN     "acceptedInvitations" JSONB[],
DROP COLUMN "pendingInvitations",
ADD COLUMN     "pendingInvitations" JSONB[],
DROP COLUMN "rejectedInvitations",
ADD COLUMN     "rejectedInvitations" JSONB[];
