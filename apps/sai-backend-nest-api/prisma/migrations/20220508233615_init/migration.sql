/*
  Warnings:

  - You are about to drop the column `days` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the `_UserToUserActivity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserToUserActivity" DROP CONSTRAINT "_UserToUserActivity_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserActivity" DROP CONSTRAINT "_UserToUserActivity_B_fkey";

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "days",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserToUserActivity";

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
