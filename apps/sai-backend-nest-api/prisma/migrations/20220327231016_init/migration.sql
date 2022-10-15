/*
  Warnings:

  - You are about to drop the column `profile_photo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_photo",
ADD COLUMN     "profilePhoto" TEXT;
