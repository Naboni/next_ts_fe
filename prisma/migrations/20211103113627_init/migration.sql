/*
  Warnings:

  - Added the required column `averageEngagementRate` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalComments` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalLikes` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalShares` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalViews` to the `campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaign" ADD COLUMN     "averageEngagementRate" INTEGER NOT NULL,
ADD COLUMN     "totalComments" INTEGER NOT NULL,
ADD COLUMN     "totalLikes" INTEGER NOT NULL,
ADD COLUMN     "totalShares" INTEGER NOT NULL,
ADD COLUMN     "totalViews" INTEGER NOT NULL,
ADD COLUMN     "videos" TEXT[];
