-- CreateTable
CREATE TABLE "UserAnsweredPool" (
    "id" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "poolId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAnsweredPool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAnsweredPool_id_key" ON "UserAnsweredPool"("id");

-- AddForeignKey
ALTER TABLE "UserAnsweredPool" ADD CONSTRAINT "UserAnsweredPool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnsweredPool" ADD CONSTRAINT "UserAnsweredPool_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
