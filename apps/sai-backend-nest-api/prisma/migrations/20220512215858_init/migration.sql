/*
  Warnings:

  - You are about to drop the column `calorie` on the `ActivityDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "calorie" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "ActivityDay" DROP COLUMN "calorie";
