/*
  Warnings:

  - You are about to drop the column `userId` on the `UserActivity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_userId_fkey";

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "userId",
ADD COLUMN     "activityDayId" TEXT;

-- CreateTable
CREATE TABLE "_UserToUserActivity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserActivity_AB_unique" ON "_UserToUserActivity"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserActivity_B_index" ON "_UserToUserActivity"("B");

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_activityDayId_fkey" FOREIGN KEY ("activityDayId") REFERENCES "ActivityDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserActivity" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserActivity" ADD FOREIGN KEY ("B") REFERENCES "UserActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
