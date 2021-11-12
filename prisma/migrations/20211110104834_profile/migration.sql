/*
  Warnings:

  - Added the required column `handle` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "handle" TEXT NOT NULL;
