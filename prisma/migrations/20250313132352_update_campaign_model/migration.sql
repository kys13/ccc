/*
  Warnings:

  - You are about to drop the column `location` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `snsTypes` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - The `emailVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CampaignCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SEO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CampaignToCampaignCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_settings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ssn]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Made the column `applicationId` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressDetail` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "SEO" DROP CONSTRAINT "SEO_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CampaignToCampaignCategory" DROP CONSTRAINT "_CampaignToCampaignCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_CampaignToCampaignCategory" DROP CONSTRAINT "_CampaignToCampaignCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_deliveryCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_visitCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "notification_settings" DROP CONSTRAINT "notification_settings_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_applicationId_fkey";

-- DropIndex
DROP INDEX "locations_city_district_key";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "location",
DROP COLUMN "snsTypes",
ADD COLUMN     "showDeadline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "city",
DROP COLUMN "district",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "title",
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressDetail" TEXT NOT NULL,
ADD COLUMN     "businessNumber" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "ssn" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'INDIVIDUAL',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "CampaignCategory";

-- DropTable
DROP TABLE "DeliveryCategory";

-- DropTable
DROP TABLE "SEO";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "VisitCategory";

-- DropTable
DROP TABLE "_CampaignToCampaignCategory";

-- DropTable
DROP TABLE "notification_settings";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "visit_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visit_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_categories" (
    "campaignId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "campaign_categories_pkey" PRIMARY KEY ("campaignId","categoryId")
);

-- CreateTable
CREATE TABLE "seo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT[],
    "pageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visit_categories_name_key" ON "visit_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_categories_name_key" ON "delivery_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "seo_pageId_key" ON "seo"("pageId");

-- CreateIndex
CREATE INDEX "campaign_applications_campaignId_idx" ON "campaign_applications"("campaignId");

-- CreateIndex
CREATE INDEX "campaign_applications_userId_idx" ON "campaign_applications"("userId");

-- CreateIndex
CREATE INDEX "campaigns_userId_idx" ON "campaigns"("userId");

-- CreateIndex
CREATE INDEX "campaigns_locationId_idx" ON "campaigns"("locationId");

-- CreateIndex
CREATE INDEX "campaigns_visitCategoryId_idx" ON "campaigns"("visitCategoryId");

-- CreateIndex
CREATE INDEX "campaigns_deliveryCategoryId_idx" ON "campaigns"("deliveryCategoryId");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_campaignId_idx" ON "notifications"("campaignId");

-- CreateIndex
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");

-- CreateIndex
CREATE INDEX "reviews_campaignId_idx" ON "reviews"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_ssn_key" ON "users"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "users_businessNumber_key" ON "users"("businessNumber");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_visitCategoryId_fkey" FOREIGN KEY ("visitCategoryId") REFERENCES "visit_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_deliveryCategoryId_fkey" FOREIGN KEY ("deliveryCategoryId") REFERENCES "delivery_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_categories" ADD CONSTRAINT "campaign_categories_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_categories" ADD CONSTRAINT "campaign_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "campaign_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seo" ADD CONSTRAINT "seo_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
