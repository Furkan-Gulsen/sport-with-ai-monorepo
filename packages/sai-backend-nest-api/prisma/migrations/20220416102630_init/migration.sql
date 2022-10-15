/*
  Warnings:

  - You are about to drop the column `activityIds` on the `ActivityDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ActivityDay" DROP COLUMN "activityIds";

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
