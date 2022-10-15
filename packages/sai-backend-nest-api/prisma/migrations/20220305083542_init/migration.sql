/*
  Warnings:

  - You are about to drop the column `numberOfLikes` on the `PostComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "usersWhoLike" TEXT[],
ALTER COLUMN "postType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "numberOfLikes",
ADD COLUMN     "usersWhoLike" TEXT[];
