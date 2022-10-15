/*
  Warnings:

  - You are about to drop the column `sharePostId` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `comment` on the `PostComment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "sharePostId",
ALTER COLUMN "content" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "PostComment" ALTER COLUMN "comment" SET DATA TYPE VARCHAR(300);
