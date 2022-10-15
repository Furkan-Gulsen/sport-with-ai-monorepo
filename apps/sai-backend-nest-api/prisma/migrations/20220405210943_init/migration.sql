/*
  Warnings:

  - You are about to drop the `Questionnaire` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Questionnaire" DROP CONSTRAINT "Questionnaire_postId_fkey";

-- DropTable
DROP TABLE "Questionnaire";

-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL,
    "options" TEXT[],
    "statistics" INTEGER[],
    "postId" TEXT NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_id_key" ON "Pool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_postId_key" ON "Pool"("postId");

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
