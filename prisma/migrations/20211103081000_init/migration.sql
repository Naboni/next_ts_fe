-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "campaign" (
    "id" TEXT NOT NULL,
    "brandIndustry" VARCHAR(50) NOT NULL,
    "brandName" VARCHAR(50) NOT NULL,
    "brandWebsite" VARCHAR(50) NOT NULL,
    "productName" VARCHAR(50) NOT NULL,
    "campaignDuration" TEXT[],
    "campaignGoal" VARCHAR(50) NOT NULL,
    "campaignName" VARCHAR(50) NOT NULL,
    "campaignPrice" VARCHAR(10) NOT NULL,
    "campaignPriceType" VARCHAR(5) NOT NULL,
    "negotiationType" VARCHAR(1) NOT NULL,
    "message" VARCHAR(800) NOT NULL,
    "contactName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "otherSocialMedia" JSONB[],
    "creators" TEXT[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
