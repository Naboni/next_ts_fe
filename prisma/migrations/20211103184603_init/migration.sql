-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "campaign" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'ACTIVE';
