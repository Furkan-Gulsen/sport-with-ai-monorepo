/*
  Warnings:

  - You are about to drop the `_activityRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_activityRelation" DROP CONSTRAINT "_activityRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_activityRelation" DROP CONSTRAINT "_activityRelation_B_fkey";

-- AlterTable
ALTER TABLE "ActivityDay" ADD COLUMN     "activiteIDs" TEXT[];

-- DropTable
DROP TABLE "_activityRelation";
