/*
  Warnings:

  - You are about to drop the `_ActivityToActivityDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivityToActivityDay" DROP CONSTRAINT "_ActivityToActivityDay_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToActivityDay" DROP CONSTRAINT "_ActivityToActivityDay_B_fkey";

-- AlterTable
ALTER TABLE "ActivityDay" ADD COLUMN     "activityIds" TEXT[];

-- DropTable
DROP TABLE "_ActivityToActivityDay";
