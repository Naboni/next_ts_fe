-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('BEGGINER', 'INTERMEDIATE', 'EXPERT');

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" VARCHAR(500) NOT NULL,
    "followers" INTEGER NOT NULL,
    "trend" TEXT[],
    "bio" VARCHAR(500) NOT NULL,
    "experience" "Experience" NOT NULL DEFAULT E'BEGGINER',
    "view" INTEGER NOT NULL,
    "like" INTEGER NOT NULL,
    "share" INTEGER NOT NULL,
    "comment" INTEGER NOT NULL,
    "engagementRate" INTEGER NOT NULL,
    "sampleVideos" TEXT[],
    "sponsoredVideos" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
