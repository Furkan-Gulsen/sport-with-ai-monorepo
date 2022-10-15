/*
  Warnings:

  - You are about to drop the column `workoutId` on the `UserActivity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_workoutId_fkey";

-- DropIndex
DROP INDEX "UserActivity_workoutId_key";

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "workoutId";
