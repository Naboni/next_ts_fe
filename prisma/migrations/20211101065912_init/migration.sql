-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VISITOR', 'BRAND', 'CREATOR', 'ADMIN', 'DEV');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'VISITOR',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
