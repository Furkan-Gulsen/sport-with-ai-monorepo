-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logType" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");
