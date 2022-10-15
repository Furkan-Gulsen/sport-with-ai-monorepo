/*
  Warnings:

  - You are about to drop the `_ActivityToActivityDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivityToActivityDay" DROP CONSTRAINT "_ActivityToActivityDay_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToActivityDay" DROP CONSTRAINT "_ActivityToActivityDay_B_fkey";

-- AlterTable
ALTER TABLE "ActivityDay" ADD COLUMN     "activityIDs" TEXT[];

-- DropTable
DROP TABLE "_ActivityToActivityDay";

-- CreateTable
CREATE TABLE "_activityRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_activityRelation_AB_unique" ON "_activityRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_activityRelation_B_index" ON "_activityRelation"("B");

-- AddForeignKey
ALTER TABLE "_activityRelation" ADD FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activityRelation" ADD FOREIGN KEY ("B") REFERENCES "ActivityDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
