-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('EMAIL', 'SMS');

-- CreateTable
CREATE TABLE "VerifyServices" (
    "id" SERIAL NOT NULL,
    "sid" VARCHAR(255) NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "ChannelType" NOT NULL DEFAULT 'EMAIL',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifyServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifyServicesUsage" (
    "id" SERIAL NOT NULL,
    "verifyServicesId" INTEGER NOT NULL,
    "emailToVerify" TEXT NOT NULL,
    "otp" VARCHAR(10) NOT NULL,
    "generatedOn" TIMESTAMP(3) NOT NULL,
    "expireIn" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "VerifyServicesUsage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerifyServicesUsage" ADD CONSTRAINT "VerifyServicesUsage_verifyServicesId_fkey" FOREIGN KEY ("verifyServicesId") REFERENCES "VerifyServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
