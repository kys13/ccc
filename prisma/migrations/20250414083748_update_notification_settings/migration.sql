/*
  Warnings:

  - You are about to drop the column `applicationStatus` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `campaignUpdates` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `emailNotifications` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `pushNotifications` on the `notification_settings` table. All the data in the column will be lost.
  - You are about to drop the column `reviewReminders` on the `notification_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_settings" DROP COLUMN "applicationStatus",
DROP COLUMN "campaignUpdates",
DROP COLUMN "emailNotifications",
DROP COLUMN "pushNotifications",
DROP COLUMN "reviewReminders",
ADD COLUMN     "campaign" JSONB,
ADD COLUMN     "review" JSONB,
ADD COLUMN     "system" JSONB;
