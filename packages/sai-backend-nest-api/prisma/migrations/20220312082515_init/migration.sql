/*
  Warnings:

  - You are about to drop the column `activityDayId` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_activityDayId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "activityDayId";

-- CreateTable
CREATE TABLE "_ActivityToActivityDay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToActivityDay_AB_unique" ON "_ActivityToActivityDay"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToActivityDay_B_index" ON "_ActivityToActivityDay"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToActivityDay" ADD FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToActivityDay" ADD FOREIGN KEY ("B") REFERENCES "ActivityDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
